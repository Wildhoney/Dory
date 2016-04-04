# Publishing

The documentation defined within concerns new blog posts as well as changes to the project &mdash; such as CSS styles, JavaScript changes, etc... 

Generally speaking the following strategy should hold true for most cases:

* Increment the `version` value &mdash; [*optional*](#caching).
* Issue `npm run build` to ensure everything is up-to-date;
* Issue `git commit -m "my update"` to publish to GitHub;
* Push all changes to GitHub with `git push`;

**Note:** New and updated blog posts simply require committing the new Markdown file &mdash; no builds are required.

## Caching

You need to determine when changing the `version` is required, as there are a handful of areas in Dory that manage cache &mdash; it's important to get these right otherwise your readers could be seeing an old representation of your blog due to caching.

Dory uses a common strategy involving query strings to return the control of cached assets back to the developer, and therefore every time you release a change in either the JavaScript or CSS, it's crucial that you increment the version. For the most part Dory uses the `version` parameter in the `package.json` file; thus it's simply a case of incrementing that value upon release.

* 1 JavaScript file &mdash; `dory.js`
* 1 CSS file &mdash; `dory.css`
* Images referenced in CSS
* [`ServiceWorker`](#service-worker)

Upon incrementing the `version` parameter the above items will **all** receive non-cached versions. Therefore if you have made any changes to the above files, you **should** be changing the `version` parameter.

### Service Worker

Dory's `ServiceWorker` &mdash; `cache.js` &mdash; uses web caching for an improved offline experience. You can investigate what's cached by opening your dev tools and then looking for **Cache Storage**. When you increment the `version` parameter a new cache container is used, and the previous ones ignored &mdash; this is crucial because otherwise offline users *may* otherwise have seen an old representation of your blog.

### Redis Cache

One cache item that isn't invalidated when changing `version` is the Redis cache &mdash; this **still** adheres to the `cacheExpiration` value defined in `dory.yml` and is therefore important to have a realistic value defined.
