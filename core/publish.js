import 'babel-core/register';
import 'babel-polyfill';

import {stat, readFileSync, writeFile} from 'fs';
import {parse} from 'path';
import glob from 'glob';
import yaml from 'js-yaml';

glob(`${__dirname}/public/posts/*.md`, {}, async (error, files) => {

    const config = yaml.safeLoad(readFileSync('dory.yml', 'utf8'));
    const catalogue = JSON.parse(readFileSync(config.catalogue, 'utf8'));

    const posts = await files.reduce(async (accumulator, file) => {

        const stats = await new Promise(resolve => stat(file, (error, stats) => resolve(stats)));
        const createdDate = stats.ctime.getTime();
        const slug = parse(file).name;
        const post = catalogue.find(item => item.slug === slug);

        if (post) {

            // Update the modified time if it differs from the created time, and we haven't already recorded it.
            const modifiedDate = stats.mtime.getTime();
            const differsToCreated = post.createdDate !== modifiedDate;
            const notAlreadyRecorded = !!~post.modifiedDates.indexOf(modifiedDate);
            differsToCreated && notAlreadyRecorded && post.modifiedDates.push(modifiedDate);

            return post;

        }

        accumulator.push({ slug, createdDate, modifiedDates: [] });

        return accumulator;

    }, []);

    console.log(posts);

    //writeFile(config.catalogue, JSON.stringify(posts), 'utf-8');

});
