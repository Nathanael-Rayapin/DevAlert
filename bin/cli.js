#!/usr/bin/env node

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
