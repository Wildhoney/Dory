/**
 * @constant SUCCESS
 * @type {Symbol}
 */
export const SUCCESS = Symbol('success');

/**
 * @constant FAILURE
 * @type {Symbol}
 */
export const FAILURE = Symbol('failure');

/**
 * @constant REQUEST
 * @type {Symbol}
 */
export const REQUEST = Symbol('request');

/**
 * @method result
 * @return {Function}
 */
export function promise() {

    return next => action => {

        const { promise, ...rest } = action;

        if (!promise) {
            return next(action);
        }

        next({ ...rest, readyState: REQUEST });

        return promise.then(
            result => next({ ...rest, result, readyState: SUCCESS }),
            error  => next({ ...rest, error, readyState: FAILURE })
        );
    };
}
