const { GITHUB_KEY, GITHUB_SECRET } = process.env;

/**
 * @param github {Object}
 * @return {void}
 */
export default github => {

    if (GITHUB_KEY && GITHUB_SECRET) {

        github.authenticate({
            type: 'oauth',
            key: '2d29a37ba0a4494ea432',
            secret: '15730f2f0ab95d31295df13c26c7c40cacbf7d10'
        });

    }

};
