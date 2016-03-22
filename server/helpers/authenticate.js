/**
 * @param github {Object}
 * @return {Object}
 */
export default github => {

    const { GITHUB_KEY, GITHUB_SECRET } = process.env;

    if (GITHUB_KEY && GITHUB_SECRET) {

        github.authenticate({
            type: 'oauth',
            key: GITHUB_KEY,
            secret: GITHUB_SECRET
        });

    }

    return github;

};
