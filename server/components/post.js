import { loadFront } from 'yaml-front-matter';
import removeNewLines from 'newline-remove';
import GitHubApi from 'github';
import marked from 'marked';
import moment from 'moment';
import authenticate from '../helpers/authenticate';
import { compose } from 'ramda';
import config from '../../public/js/config';
import { isProduction } from '../helpers/common';

/**
 * @constant github
 * @type {Object}
 */
const github = compose(authenticate)(new GitHubApi({ version: '3.0.0', debug: isProduction(), headers: {
    'user-agent': 'Dory (https://github.com/Wildhoney/Dory)'
}}));

/**
 * @constant markedOptions
 * @type {Object}
 */
const markedOptions = {
    breaks: true,
    pedantic: true
};

/**
 * @method getPost
 * @param {Object} options
 * @return {Function}
 */
export const getPost = options => {

    return slug => {

        const path = `posts/${slug}.md`;
        const markdown = loadFront(options.fromPublic(path), 'content');
        const content = removeNewLines(marked(markdown.content, markedOptions));
        const synopsis = markdown.synopsis ? marked(markdown.synopsis, markedOptions) : undefined;

        return new Promise(resolve => {
            
            const user = config.github.username;
            const repo = config.github.repository;

            github.repos.getCommits({ user, repo, path: `public/${path}` }, (error, commits) => {

                const firstCommit = commits[commits.length - 1];
                const lastCommit = commits[0];

                const userId = Number(firstCommit.author.id);
                const author = firstCommit.author.login;
                const createdDate = moment(firstCommit.commit.author.date).unix() * 1000;
                const modifiedDate = moment(lastCommit.commit.author.date).unix() * 1000;

                resolve({ ...markdown, userId, createdDate, modifiedDate, author, content, synopsis, slug });

            });

        });

    };

};

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    const filterBy = getPost(options);

    return (request, response) => {

        filterBy(request.params.slug).then(post => {
            response.end(options.toJson(post));
        });

    };

};
