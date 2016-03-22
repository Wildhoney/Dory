import { getPosts } from './posts';
import { render } from 'mustache';
import moment from 'moment';
import sort from '../../public/js/utilities/sort';

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    const rfc822Format = 'ddd, DD MMM YYYY hh:mm:ss';
    const perPage = options.config.rssLimit;
    const feed = options.fromPublic('/templates/feed.xml');

    return (request, response) => {

        getPosts(options).then(posts => {

            const sorted = sort()(posts).slice(0, perPage).map((post, index) => {

                return {
                    ...post,
                    guid: ((index + 1) * 1000).toString(16),
                    createdDate: moment(post.createdDate).format(rfc822Format)
                };

            }).reverse();

            response.end(render(feed, {
                ...options.config,
                createdDate: posts[0].createdDate,
                posts: sorted
            }));

        });
    }
};
