import { readFileSync, writeFileSync } from 'fs';
import { exec } from 'shelljs';
import { load as loadYaml } from 'yaml-js';

// Make the necessary directory structure.
exec('mkdir -p core/build/assets');

// Export the configuration file.
const exportConfig = `export default ${JSON.stringify(loadYaml(readFileSync('./dory.yml')))};`;
writeFileSync('./public/js/config.js', exportConfig, 'utf8');

// Build the assets, and copy the favicon.
exec('webpack');
exec('html-minifier public/index.html --collapse-whitespace > core/build/index.html');
exec('cp public/favicon.ico core/build/assets/favicon.ico');

// Ensure the catalogue is up-to-date.
exec('npm run catalogue');
