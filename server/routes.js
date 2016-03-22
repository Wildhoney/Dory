import { readFileSync } from 'fs';
import mime from 'mime';
import handleAssets from './components/assets';
import handleCatalogue from './components/catalogue';
import handlePost from './components/post';
import handlePosts from './components/posts';
import handleFeed from './components/feed';
import handleUniversal from './components/universal';

/**
 * @method configure
 * @param {Object} options
 * @return {Function}
 */
export function configure(options) {

    const script = options.fromCore('/dory.js');
    const styles = options.fromCore('/dory.css');
    const xsl = options.fromPublic('/templates/feed.xsl');
    const favIcon = readFileSync(`${options.publicPath}/favicon.ico`);
    const serviceWorker = options.fromCore('/cache.js');

    /**
     * @method sendFile
     * @param {Object} file
     * @return {Function}
     */
    const sendFile = file => {
        return (request, response) => {
            response.set('content-type', mime.lookup(request.url));
            response.send(file);
        };
    };

    return app => {

        // Non-React routes.
        app.get('/rss', handleFeed(options));
        app.get('/rss/xsl', sendFile(xsl));

        // Define the API routes.
        app.get('/api/catalogue', handleCatalogue(options));
        app.get('/api/post/:slug', handlePost(options));
        app.get('/api/posts/page-:pageNumber', handlePosts(options));
        app.get('/api/posts/page-:pageNumber/limit-:perPage', handlePosts(options));
        app.get('/api/posts/page-:pageNumber/by-:sortProperty-:sortOrder/limit-:perPage', handlePosts(options));

        // Followed by the asset routes.
        app.get('/dory.js', sendFile(script));
        app.get('/dory.css', sendFile(styles));
        app.get('/favicon.ico', sendFile(favIcon));
        app.get('/cache.js', sendFile(serviceWorker));
        app.use('(/images|.json$)', handleAssets(`${options.publicPath}/images`)(options));

        // ...And finally the universal application.
        app.use(handleUniversal(options));

    };

}
