#!/usr/bin/env node
/**
 * Fix TypeScript declaration files after build
 * Move generated declarations to correct locations for package exports
 */

const fs = require('fs');
const path = require('path');

function copyAndCleanup() {
  try {
    // Copy main entry types (React)
    const srcIndexDts = path.join(__dirname, '../dist/src/index.d.ts');
    const destIndexDts = path.join(__dirname, '../dist/index.d.ts');
    
    if (fs.existsSync(srcIndexDts)) {
      fs.copyFileSync(srcIndexDts, destIndexDts);
      console.log('✓ Copied index.d.ts to dist root');
    } else {
      console.error('✗ src/index.d.ts not found');
    }

    // Copy wc entry types  
    const srcWcDts = path.join(__dirname, '../dist/src/wc/index.d.ts');
    const destWcDts = path.join(__dirname, '../dist/wc.d.ts');
    
    if (fs.existsSync(srcWcDts)) {
      fs.copyFileSync(srcWcDts, destWcDts);
      console.log('✓ Copied wc.d.ts to dist root');
    } else {
      console.error('✗ src/wc/index.d.ts not found');
    }

    // Clean up nested src directories (optional, helps reduce package size)
    const srcDir = path.join(__dirname, '../dist/src');
    const sharedDir = path.join(__dirname, '../dist/shared');
    
    if (fs.existsSync(srcDir)) {
      fs.rmSync(srcDir, { recursive: true, force: true });
      console.log('✓ Cleaned up dist/src directory');
    }
    
    if (fs.existsSync(sharedDir)) {
      fs.rmSync(sharedDir, { recursive: true, force: true });
      console.log('✓ Cleaned up dist/shared directory');
    }

  } catch (error) {
    console.error('Error organizing type declarations:', error);
    process.exit(1);
  }
}

copyAndCleanup();