/**
 * @method parse
 * @param {String} post
 * @return {Object}
 */
export const parse = post => {

    const title = post.match(/#(.+)/)[1].trim();
    const content = post.split('\n').slice(1).join('\n');

    return { title, content };

};
