import 'babel-register';
import 'babel-polyfill';

import {stat, readFileSync, writeFile, existsSync, writeFileSync} from 'fs';
import {parse} from 'path';
import glob from 'glob';
import {safeLoad} from 'js-yaml';
import {uniq} from 'lodash';
import {loadFront} from 'yaml-front-matter';

const catalogue = `${__dirname}/core/build/assets/catalogue.json`;

glob(`${__dirname}/public/posts/*`, {}, async (error, files) => {

    const blogPosts = existsSync(catalogue) ? JSON.parse(readFileSync(catalogue, 'utf8')) : [];

    try {

        const posts = await Promise.all(files.map(file => {

            return new Promise(async resolve => {

                const {name: slug} = parse(file);
                const meta = loadFront(file);
                const stats = await new Promise(resolve => stat(file, (error, stats) => resolve(stats)));
                const post = blogPosts.find(item => item.slug === slug);
                const createdDate = post && post.createdDate || stats.ctime.getTime();
                const modifiedDate = stats.mtime.getTime();
                const modifiedDates = post && post.createdDate !== modifiedDate ? uniq([ ...post.modifiedDates, modifiedDate ]) : [];

                // Remove the `__content` property as it's ugly.
                const content = meta.__content;
                delete meta.__content;

                writeFileSync(`core/build/posts/${slug}.json`, JSON.stringify({ ...meta, content }), 'utf8');
                resolve({ slug, meta, createdDate, modifiedDates });

            });

        }));

        writeFile(catalogue, JSON.stringify(posts), 'utf-8');

    }

    catch (e) {
        console.log(e);
    }

});
