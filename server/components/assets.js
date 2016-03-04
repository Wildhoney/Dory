import express from 'express';

/**
 * @param {String} path
 * @return {Function}
 */
export default path => {
    return () => {
        return express.static(path);
    };
};
