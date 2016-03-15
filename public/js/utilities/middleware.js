/**
 * @constant SUCCESS
 * @type {String}
 */
export const SUCCESS = 'success';

/**
 * @constant FAILURE
 * @type {String}
 */
export const FAILURE = 'failure';

/**
 * @constant REQUEST
 * @type {String}
 */
export const REQUEST = 'request';

/**
 * @method result
 * @return {Function}
 */
export default () => {

    return next => action => {

        const { promise, ...rest } = action;

        if (!promise) {
            return next(action);
        }

        next({ ...rest, readyState: REQUEST });

        return promise.then(
            result => next({ ...rest, result, readyState: SUCCESS }),
            error => next({ ...rest, error, readyState: FAILURE })
        );
    };
};
