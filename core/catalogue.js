import 'babel-core/register';
import 'babel-polyfill';

import {stat, readFileSync, writeFile, existsSync} from 'fs';
import {parse} from 'path';
import glob from 'glob';
import {safeLoad} from 'js-yaml';
import {uniq} from 'lodash';

const {locations} = safeLoad(readFileSync('dory.yml', 'utf8'));

glob(locations.posts, {}, async (error, files) => {

    const catalogue = existsSync(locations.catalogue) ? JSON.parse(readFileSync(locations.catalogue, 'utf8')) : [];
    
    try {
    
        const posts = await Promise.all(files.map(file => {
    
            return new Promise(async resolve => {
    
                const {name: slug, base: filename} = parse(file);
                const stats = await new Promise(resolve => stat(file, (error, stats) => resolve(stats)));
                const post = catalogue.find(item => item.slug === slug);
                const createdDate = post && post.createdDate || stats.ctime.getTime();
                const modifiedDate = stats.mtime.getTime();
                const modifiedDates = post && post.createdDate !== modifiedDate ? uniq([ ...post.modifiedDates, modifiedDate ]) : [];
    
                resolve({ slug, filename, createdDate, modifiedDates });
    
            });
    
        }));
    
        writeFile(locations.catalogue, JSON.stringify(posts), 'utf-8');

    }
    
    catch (e) {
    
    }

});
