import { parse } from 'url';
import config from '../config';

/**
 * @constant CACHE_NAME
 * @type {String}
 */
const CACHE_NAME = `dory/${config.version}`;

/**
 * @constant cacheList
 * @type {RegExp[]}
 */
const cacheList = [
    /^\/$/,
    /^\/dory(\.css|\.js)$/,
    /^\/api/,
    /^\/images/,
    /^\/post/,
    /^\/archive/
];

(function main(caches, worker) {

    worker.addEventListener('install', event => {

        return event.waitUntil(caches.open(CACHE_NAME).then(cache => {

            return cache.addAll([
                '/dory.js',
                '/dory.css',
                '/favicon.ico'
            ]);

        }));

    });

    worker.addEventListener('fetch', event => {

        const { request } = event;

        if (request.method !== 'GET') {
            return false;
        }

        event.respondWith(caches.open(CACHE_NAME).then(cache => {

            return global.fetch(request).then(networkResponse => {

                const path = parse(request.url).pathname;

                // Determine if we wish to cache this resource.
                if (cacheList.some(r => r.test(path))) {
                    cache.put(request, networkResponse.clone());
                }

                return networkResponse;

            }).catch(() => cache.match(request));

        }));
    });

})(global.caches, self);
