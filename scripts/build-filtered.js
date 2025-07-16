#!/usr/bin/env node

import { spawn } from 'child_process';

// Start the astro build process
const buildProcess = spawn('npx', ['astro', 'build'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

// Filter out Shiki warnings for unknown languages
buildProcess.stdout.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach(line => {
    if (!line.includes('[Shiki] The language') || !line.includes("doesn't exist, falling back to 'plaintext'")) {
      process.stdout.write(line + '\n');
    }
  });
});

buildProcess.stderr.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach(line => {
    if (!line.includes('[Shiki] The language') || !line.includes("doesn't exist, falling back to 'plaintext'")) {
      process.stderr.write(line + '\n');
    }
  });
});

buildProcess.on('close', (code) => {
  process.exit(code);
});

buildProcess.on('error', (error) => {
  console.error('Build process error:', error);
  process.exit(1);
}); 