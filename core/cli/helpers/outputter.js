import marked from 'marked';
import chalk from 'chalk';
import TerminalRenderer from 'marked-terminal';
import { stdout as log } from 'single-line-log';

marked.setOptions({
    renderer: new TerminalRenderer({
        firstHeading: chalk.red.bold,
        heading: chalk.white,
        del: chalk.red,
        paragraph: chalk.gray,
        em: chalk.green,
        showSectionPrefix: false
    })
});

/**
 * @method removeBreak
 * @param {String} text
 * @return {String}
 */
const removeBreak = text => text.replace('\n', '');

/**
 * @method print
 * @param {String} message
 * @return {void}
 */
export const print = message => {
    process.stdout.write(marked(message));
};

/**
 * @method run
 * @param {String} message
 * @param {Function} [action]
 * @return {void}
 */
export const run = (message, action = () => Promise.resolve(true)) => {

    log(removeBreak(marked(`${message}: *Processing*`)));

    action().then(()  => log(removeBreak(marked(`${message}: *Done*`))))
            .catch(() => log(removeBreak(marked(`${message}: ~~Error~~`))));
    
    
};
