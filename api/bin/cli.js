#!/usr/bin/env node

/**
 * Global CLI entry point
 * 
 * This file is referenced in package.json “bin”
 * It will be copied to /usr/local/bin/api-monitor during global installation
 * 
 * Reasoning:
 * - In dev: Uses tsx to run TypeScript directly
 * - In prod: Points to the compiled JS in dist/
 */

const path = require('path');
const { spawn } = require('child_process');

const isDev = process.env.NODE_ENV === 'development' || !require('fs').existsSync(path.join(__dirname, '../dist'));

if (isDev) {
    const tsxPath = path.join(__dirname, '../node_modules/.bin/tsx');
    const scriptPath = path.join(__dirname, '../src/cli/commands.ts');

    const child = spawn(tsxPath, [scriptPath, ...process.argv.slice(2)], {
        stdio: 'inherit',
        shell: true
    });

    child.on('exit', (code) => {
        process.exit(code || 0);
    });
} else {
    require('../dist/cli/commands.js');
}
