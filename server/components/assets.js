import express from 'express';
import { join } from 'path';

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {
    return  express.static(join(options.assetsPath));
};
