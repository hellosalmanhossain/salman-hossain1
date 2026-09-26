"use client";

import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, X, File as FileIcon, Loader2, Image as ImageIcon, Plus } from 'lucide-react';
import { UploadService } from '@/services/upload.service';

interface FileUploadProps {
  value?: any; // Allow string or string[]
  onChange: (value: any) => void;
  accept?: string;
  label?: string;
  className?: string;
  isPdf?: boolean;
  multiple?: boolean;
}

export default function FileUpload({ 
  value, 
  onChange, 
  accept = "image/*", 
  label = "Upload File", 
  className = "",
  isPdf = false,
  multiple = false
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: File[]) => {
    setError(null);
    setIsUploading(true);

    try {
      // Validate file type
      for (const file of files) {
        if (accept.includes('image') && !file.type.startsWith('image/')) {
          throw new Error('Please select an image file');
        }
        if (accept.includes('pdf') && file.type !== 'application/pdf') {
          throw new Error('Please select a PDF file');
        }
        if (file.size > 10 * 1024 * 1024) {
          throw new Error('File size should not exceed 10MB');
        }
      }

      const response = await UploadService.uploadFile(multiple ? files : files[0]);
      
      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        if (multiple) {
          const newUrls = response.data.map(item => item.url);
          const currentUrls = Array.isArray(value) ? value : (value ? [value] : []);
          onChange([...currentUrls, ...newUrls]);
        } else {
          onChange(response.data[0].url);
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, [multiple, value, onChange, accept]);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleRemove = (e: React.MouseEvent, indexToRemove?: number) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value) && typeof indexToRemove === 'number') {
      const newValues = value.filter((_, idx) => idx !== indexToRemove);
      onChange(newValues.length > 0 ? newValues : '');
    } else {
      onChange('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderSinglePreview = (url: string, index?: number) => {
    const isImageValue = url && !url.endsWith('.pdf') && !isPdf;
    const isPdfValue = url && (url.endsWith('.pdf') || isPdf);
    
    return (
      <div key={index ?? url} className="relative w-full h-full flex flex-col items-center justify-center group/item border border-black/10 dark:border-white/10 rounded-lg overflow-hidden bg-white dark:bg-black/20 aspect-square">
        {isImageValue ? (
          <img 
            src={url} 
            alt="Uploaded file preview" 
            className="w-full h-full object-cover shadow-sm"
          />
        ) : isPdfValue ? (
          <div className="flex flex-col items-center text-red-500 p-4">
            <FileIcon className="w-8 h-8 mb-2" />
            <span className="text-xs font-medium truncate max-w-[100px]" title={url}>
              PDF
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-blue-500 p-4">
            <FileIcon className="w-8 h-8 mb-2" />
            <span className="text-xs font-medium truncate max-w-[100px]" title={url}>
              File
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <button 
            onClick={(e) => handleRemove(e, index)}
            type="button"
            className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-transform transform hover:scale-110 shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const hasValue = multiple ? Array.isArray(value) && value.length > 0 : !!value;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      
      <div 
        className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 flex flex-col items-center justify-center min-h-[160px] overflow-hidden group cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' 
            : 'border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-black/20 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-gray-100 dark:hover:bg-black/40'
          }
          ${error ? 'border-red-500' : ''}
          ${hasValue && !multiple ? 'cursor-default border-transparent bg-transparent hover:border-transparent hover:bg-transparent' : ''}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => {
          if (!hasValue || multiple) {
            !isUploading && fileInputRef.current?.click();
          }
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={onFileInputChange} 
          accept={accept}
          multiple={multiple}
          className="hidden" 
        />

        {isUploading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploading...</span>
          </div>
        )}

        {hasValue ? (
          multiple ? (
            <div className="w-full h-full relative" onClick={(e) => e.stopPropagation()}>
               <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 w-full">
                 {value.map((url: string, i: number) => renderSinglePreview(url, i))}
                 {/* Add more button */}
                 <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-white/20 rounded-lg aspect-square hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group/add"
                 >
                   <Plus className="w-6 h-6 text-gray-400 group-hover/add:text-blue-500 transition-colors" />
                   <span className="text-xs font-medium text-gray-400 group-hover/add:text-blue-500 mt-1">Add More</span>
                 </div>
               </div>
            </div>
          ) : (
            // Single value view
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {(() => {
                const isImageValue = value && !value.endsWith('.pdf') && !isPdf;
                const isPdfValue = value && (value.endsWith('.pdf') || isPdf);
                return isImageValue ? (
                  <img 
                    src={value} 
                    alt="Uploaded file preview" 
                    className="max-h-[140px] w-auto object-contain rounded-lg shadow-sm"
                  />
                ) : isPdfValue ? (
                  <div className="flex flex-col items-center text-red-500">
                    <FileIcon className="w-12 h-12 mb-2" />
                    <span className="text-sm font-medium truncate max-w-[200px]" title={value}>
                      PDF Document Uploaded
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-blue-500">
                    <FileIcon className="w-12 h-12 mb-2" />
                    <span className="text-sm font-medium truncate max-w-[200px]" title={value}>
                      File Uploaded
                    </span>
                  </div>
                );
              })()}
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg backdrop-blur-[2px]">
                <button 
                  onClick={(e) => handleRemove(e)}
                  type="button"
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-transform transform hover:scale-110 shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
            <div className="w-12 h-12 mb-3 rounded-full bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-500">
               {accept.includes('image') ? <ImageIcon className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
            </div>
            <p className="text-sm font-medium text-center">
              <span className="text-blue-500 hover:underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {accept === "image/*" ? "SVG, PNG, JPG or GIF (max. 10MB)" : "PDF or Document (max. 10MB)"}
              {multiple && " (Multiple files allowed)"}
            </p>
          </div>
        )}
      </div>
      
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      
      {/* Hidden input to bind with react-hook-form if needed */}
      <input type="hidden" value={Array.isArray(value) ? value.join(',') : (value || '')} />
    </div>
  );
}
