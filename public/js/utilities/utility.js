/**
 * Attempts to determine in a naive way whether the user is connected to the Internet or not. Of course this is
 * a terrible way of determining that, as in many cases the connection is online, but is simply too slow to load
 * resources. However for those cases Dory utilises ServiceWorker.
 *
 * With the above in mind, `isOnline` should only be used in non-critical instances.
 *
 * @method isOnline
 * @return {Boolean}
 */
export const isOnline = () => {
    const navigator = global.navigator;
    const isDeterminable = typeof navigator !== 'undefined' && 'onLine' in navigator;
    return isDeterminable ? navigator.onLine : true;
};
