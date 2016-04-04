import { readFileSync, writeFileSync } from 'fs';
import { load as loadYaml } from 'yaml-js';

const userConfig = loadYaml(readFileSync('./dory.yml', 'utf8'));
const version = JSON.parse(readFileSync('./package.json', 'utf8')).version;
const config = JSON.stringify({ ...userConfig, version });

const exportConfig = `export default ${config};`;
writeFileSync('./public/js/config.js', exportConfig, 'utf8');
