import { readFileSync, writeFileSync } from 'fs';
import { exec } from 'shelljs';

// Make the necessary directory structure.
exec('mkdir -p core/build');

// Export the configuration file, and generate the SASS file.
exec('npm run config');

// Build the assets, and copy the favicon.
exec('webpack -p --optimize-minimize --optimize-dedupe');
exec('html-minifier public/index.html --collapse-whitespace > core/build/index.html');
