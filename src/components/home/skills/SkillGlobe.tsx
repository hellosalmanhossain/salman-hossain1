"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useTheme } from "next-themes";

export function SkillGlobe({ apiSkills }: { apiSkills: any[] }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mountRef.current || !mounted) return;

    const isLight = theme === 'light';
    const currentMount = mountRef.current;

    // ১. সিন, ক্যামেরা ও রেন্ডারার সেটআপ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      1,
      1000
    );
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // ২. কন্ট্রোল সেটআপ (মাউস দিয়ে ঘোরানোর জন্য)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true; // অটো রোটেশন চালু
    controls.autoRotateSpeed = 1.2;
    controls.enableZoom = false; // জুম বন্ধ রাখতে চাইলে false দিন

    // ৩. মাঝখানের Earth Sphere
    const sphereRadius = 8.5;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');

    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.6,
      metalness: 0.1,
      transparent: true,
      opacity: isLight ? 0.95 : 0.85,
    });
    const earthSphere = new THREE.Mesh(sphereGeo, earthMat);
    scene.add(earthSphere);

    // Add Lights for the Earth
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 1.5 : 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, isLight ? 2 : 1.5);
    directionalLight.position.set(10, 15, 10);
    scene.add(directionalLight);

    // ৪. টেকনোলজি আইটেম তালিকা
    const colors = ["#326ce5", "#844fba", "#a97bff", "#00758f", "#ffca28", "#4285f4", "#78c257", "#e535ab", "#dea584", "#0089d6"];
    const visibleSkills = apiSkills.filter(s => s.showIn3d !== false);
    const techItems = visibleSkills.length > 0 ? visibleSkills.map((s, idx) => ({
      name: s.name,
      symbol: s.icon || '📌',
      color: colors[idx % colors.length]
    })) : [
      { name: "No Skills", symbol: "∅", color: "#a97bff" }
    ];

    // ক্যানভাসে আইকন + টেক্সট ড্র করে স্প্রাইট তৈরি করার ফাংশন
    const createIconSprite = (item: { name: string; symbol: string; color: string }) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(3.2, 3.2, 1);

      if (ctx) {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = isLight ? "#1a202c" : "#cfd8dc";
        ctx.font = "bold 26px monospace";
        ctx.fillText(item.name, 128, 200);

        if (item.symbol.startsWith('http') || item.symbol.startsWith('/') || item.symbol.startsWith('data:image')) {
          const img = new window.Image();
          
          let imageSrc = item.symbol;
          if (item.symbol.startsWith('http')) {
             // Use our local proxy to avoid canvas CORS tainting issues
             imageSrc = `/api/proxy-image?url=${encodeURIComponent(item.symbol)}`;
          } else {
             // For relative paths or data URIs, we don't need proxy but might need crossOrigin for external relative? Not usually.
          }
          
          img.onload = () => {
            // Draw image scaled down
            ctx.drawImage(img, 78, 40, 100, 100);
            texture.needsUpdate = true;
          };
          img.onerror = (e) => {
            console.error("Image failed to load on 3D globe:", item.symbol, e);
            // Fallback to first letter if image fails to load
            ctx.fillStyle = item.color;
            ctx.font = "bold 85px sans-serif";
            ctx.fillText(item.name.charAt(0) || "📌", 128, 100);
            texture.needsUpdate = true;
          };

          img.src = imageSrc;
        } else {
          ctx.fillStyle = item.color;
          ctx.font = "bold 85px sans-serif";
          // Check if symbol is a long broken string
          const displaySymbol = item.symbol.length > 2 && !item.symbol.includes('️') ? item.name.charAt(0) : item.symbol;
          ctx.fillText(displaySymbol, 128, 100);
          texture.needsUpdate = true;
        }
      }

      return sprite;
    };

    // ৫. স্ফিয়ারের চারপাশে সমদূরত্বে বসানো (Fibonacci Sphere)
    const totalItems = techItems.length;
    const phi = Math.PI * (3 - Math.sqrt(5));

    techItems.forEach((tech, i) => {
      const y = 1 - (i / (totalItems - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const sprite = createIconSprite(tech);
      const iconRadius = sphereRadius * 1.08;
      sprite.position.set(x * iconRadius, y * iconRadius, z * iconRadius);

      earthSphere.add(sprite);
    });

    // ৬. রেসপন্সিভ হ্যান্ডলার
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ৭. অ্যানিমেশন লুপ
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ৮. ক্লিনআপ (Memory Leak রোধ করতে)
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      scene.clear();
    };
  }, [theme, mounted, apiSkills]);

  return (
    <div
      ref={mountRef}
      className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[600px] aspect-square flex justify-center items-center bg-transparent grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer mx-auto"
    />
  );
}
