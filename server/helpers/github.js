import GitHubApi from 'github';
import RedisApi from 'redis';
import { parse } from 'url';
import { compose } from 'ramda';
import PrettyError from 'pretty-error';
import crc32 from 'crc-32';
import { isProduction } from './common';
import config from '../../public/js/config';

/**
 * @constant github
 * @type {Object}
 */
const github = compose(authenticate)(new GitHubApi({ version: '3.0.0', debug: !isProduction(), headers: {
    'user-agent': 'Dory (https://github.com/Wildhoney/Dory)'
}}));

/**
 * @constant redis
 * @type {Object}
 */
const redis = process.env.REDIS_HOST ? RedisApi.createClient(process.env.REDIS_HOST) : mockRedis();

/**
 * @method getCommits
 * @param {Object} options
 * @return {Promise}
 */
export const getCommits = options => {

    const key = Math.abs(crc32.str(JSON.stringify(options)));

    return new Promise((resolve, reject) => {

        redis.get(key, (error, response) => {

            if (response) {
                return void resolve(JSON.parse(response));
            }

            github.repos.getCommits(options, (error, response) => {

                redis.set(key, JSON.stringify(response));
                redis.expire(key, config.cacheExpiration);

                if (error) {
                    const response = JSON.parse(error.message);
                    const prettyError = new PrettyError();
                    console.log(prettyError.render(new Error(response.message)));
                    reject();
                    return;
                }

                resolve(response);

            });

        });

    });

};

/**
 * @method mockRedis
 * @return {Object}
 */
function mockRedis() {

    return {
        set: () => {},
        expire: () => {},
        get: (_, callback) => callback(false, false)
    };

}

/**
 * @method authenticate
 * @param github {Object}
 * @return {Object}
 */
function authenticate(github) {

    const { GITHUB_KEY, GITHUB_SECRET } = process.env;

    if (GITHUB_KEY && GITHUB_SECRET) {

        github.authenticate({
            type: 'oauth',
            key: GITHUB_KEY,
            secret: GITHUB_SECRET
        });

    }

    return github;

}
