import GitHubApi from 'github';
import { compose } from 'ramda';
import authenticate from './authenticate';
import { isProduction } from './common';
import PrettyError from 'pretty-error';

/**
 * @constant github
 * @type {Object}
 */
const github = compose(authenticate)(new GitHubApi({ version: '3.0.0', debug: !isProduction(), headers: {
    'user-agent': 'Dory (https://github.com/Wildhoney/Dory)'
}}));

/**
 * @method getCommits
 * @param {Object} options
 * @return {Promise}
 */
export const getCommits = options => {

    return new Promise((resolve, reject) => {

        github.repos.getCommits(options, (error, commits) => {

            if (error) {
                const response = JSON.parse(error.message);
                const prettyError = new PrettyError();
                console.log(prettyError.render(new Error(response.message)));
                reject();
                return;
            }

            resolve(commits);

        });
    });
};
