const { GITHUB_KEY, GITHUB_SECRET } = process.env;

/**
 * @param github {Object}
 * @return {void}
 */
export default github => {

    if (GITHUB_KEY && GITHUB_SECRET) {

        github.authenticate({
            type: 'oauth',
            key: GITHUB_KEY,
            secret: GITHUB_SECRET
        });

    }

};
