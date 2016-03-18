import { parse } from 'url';
import config from '../config';

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

            }).catch(() => cache.match(request));

        }));
    });

})(global.caches, self);
