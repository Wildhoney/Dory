import 'babel-core/register';
import 'babel-polyfill';

import {stat, readFileSync, writeFile} from 'fs';
import {parse} from 'path';
import glob from 'glob';
import yaml from 'js-yaml';

glob(`${__dirname}/public/posts/*.md`, {}, async (error, files) => {

    const posts = await files.reduce(async (accumulator, file) => {

        const stats = await new Promise(resolve => stat(file, (error, stats) => resolve(stats)));
        const createdDate = stats.birthtime.getTime();
        const slug = parse(file).name;

        accumulator.push({ slug, createdDate, modifiedDates: [] });
        return accumulator;

    }, []);

    const {catalogue} = yaml.safeLoad(readFileSync('dory.yml', 'utf8'));
    writeFile(catalogue, JSON.stringify(posts), 'utf-8');

});
