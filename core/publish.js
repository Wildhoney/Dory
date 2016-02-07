import 'babel-core/register';
import 'babel-polyfill';

import {stat, readFileSync, writeFile, existsSync} from 'fs';
import {parse} from 'path';
import glob from 'glob';
import yaml from 'js-yaml';
import {uniq} from 'lodash';

glob(`${__dirname}/public/posts/*.md`, {}, async (error, files) => {

    const config = yaml.safeLoad(readFileSync('dory.yml', 'utf8'));
    const catalogue = existsSync(config.catalogue) ? JSON.parse(readFileSync(config.catalogue, 'utf8')) : [];

    try {

        const posts = await Promise.all(files.map(file => {

            return new Promise(async resolve => {

                const slug = parse(file).name;
                const stats = await new Promise(resolve => stat(file, (error, stats) => resolve(stats)));
                const post = catalogue.find(item => item.slug === slug);
                const createdDate = post && post.createdDate || stats.ctime.getTime();
                const modifiedDate = stats.mtime.getTime();
                const modifiedDates = post && post.createdDate !== modifiedDate ? uniq([ ...post.modifiedDates, modifiedDate ]) : [];

                resolve({ slug, createdDate, modifiedDates });

            });

        }));

        writeFile(config.catalogue, JSON.stringify(posts), 'utf-8');

    }

    catch (e) {

    }

});
