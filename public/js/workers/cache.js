import { parse } from 'url';
import config from '../config';
import catalogue from '../../catalogue.json';

/**
 * @constant CACHE_NAME
 * @type {String}
 */
const CACHE_NAME = `dory-${config.cacheRevision}`;

/**
 * @constant cacheList
 * @type {RegExp[]}
 */
const cacheList = [
    /^\/$/,
    /^\/dory(\.css|\.js)$/,
    /^\/api/,
    /^\/images/
];

(function main(caches, worker) {

    worker.addEventListener('install', event => {

        return event.waitUntil(caches.open(CACHE_NAME).then(cache => {

            // Cache each available page, but in a non-blocking lazy fashion.
            const maxPages = Math.ceil(catalogue.length / config.perPage);
            const pages = new Array(maxPages).fill().map((_, i) => i + 1);
            pages.forEach(pageNumber => cache.addAll([`/archive/page-${pageNumber}`, `/api/posts/page-${pageNumber}`]));

            return cache.addAll([
                '/dory.js',
                '/dory.css',
                '/favicon.ico',
                '/archive/page-2',
                '/api/posts/page-2'
            ]);

        }));

    });

    worker.addEventListener('fetch', event => {

        const {request} = event;

        if (request.method !== 'GET') {
            return false;
        }

        event.respondWith(caches.open(CACHE_NAME).then(cache => {

            return fetch(request).then(networkResponse => {

                const path = parse(request.url).pathname;

                // Determine if we wish to cache this resource.
                if (cacheList.some(r => r.test(path))) {
                    cache.put(request, networkResponse.clone());
                }

                return networkResponse;

            }).catch(() => cache.match(request).catch(() => fetch(request.url)));

        }));
    });

})(global.caches, self);