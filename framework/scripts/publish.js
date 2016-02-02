import {stat} from 'fs';
import glob from 'glob';

const posts = glob(`${__dirname}/public/posts/*.md`, {}, (error, files) => {

    files.forEach(file => {

        stat(file, (error, {birthtime: createdDate}) => {

            console.log(createdDate);

        });

    });

});
