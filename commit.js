const { execSync } = require('child_process');

const statusOutput = execSync('git status --porcelain').toString();
const lines = statusOutput.split('\n').filter(l => l.trim() !== '');

const files = lines.map(line => line.substring(3).trim());

const startTime = new Date();
startTime.setHours(0, 5, 0, 0); // 12:05 AM

const endTime = new Date(); // now

const msStep = (endTime.getTime() - startTime.getTime()) / (files.length || 1);

files.forEach((file, i) => {
  const commitTime = new Date(startTime.getTime() + msStep * i);
  const timeStr = commitTime.toISOString();
  try {
     execSync(`git add -A "${file}"`);
     const msg = `update: improvements for ${file.split('/').pop()}`;
     execSync(`git commit -m "${msg}"`, { 
        env: { ...process.env, GIT_AUTHOR_DATE: timeStr, GIT_COMMITTER_DATE: timeStr } 
     });
     console.log(`Committed ${file} at ${timeStr}`);
  } catch (e) {
     console.error(`Error committing ${file}`);
  }
});

try {
  execSync('git push origin HEAD');
  console.log('Pushed successfully.');
} catch(e) {
  console.error('Push failed', e.message);
}
