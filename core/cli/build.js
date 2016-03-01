import { exec } from 'shelljs';

// Make the necessary directories.
exec('mkdir -p core/build/assets');
exec('mkdir -p core/build/posts');

// Build the assets, and copy the favicon.
exec('webpack');
exec('html-minifier public/index.html --collapse-whitespace > core/build/index.html');
exec('cp public/favicon.ico core/build/assets/favicon.ico');

// Ensure the catalogue is up-to-date.
exec('npm run catalogue');
