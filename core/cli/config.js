import { readFileSync, writeFileSync } from 'fs';
import { load as loadYaml } from 'yaml-js';

const exportConfig = `export default ${JSON.stringify(loadYaml(readFileSync('./dory.yml')))};`;
writeFileSync('./public/js/config.js', exportConfig, 'utf8');
