import { readFileSync, writeFileSync } from 'fs';
import { exec } from 'shelljs';
import config from './package.json';

// Make the necessary directory structure.
exec('mkdir -p core/build');

// Export the configuration file, and generate the SASS file.
exec('npm run config');

// Build the assets.
exec('webpack -p --optimize-minimize --optimize-dedupe');
exec('html-minifier public/index.html --collapse-whitespace > core/build/index.html');

// Add the cache busting parameters to the index document.
const index = readFileSync('core/build/index.html', 'utf8');
writeFileSync('core/build/index.html', index.replace(/\$id\$/g, config.version));
