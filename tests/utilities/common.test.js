import test from 'ava';
import { isOnline } from '../../public/js/utilities/common';

test('Should be able to determine when online;', t => {

    // No access to `navigator` object.
    navigator = null;
    t.true(isOnline());

    // Cannot find `onLine` property in object.
    navigator = { url: 'http://dory-app.herokuapp.com/' };
    t.true(isOnline());

    // Able to read the `onLine` property.
    navigator = { url: 'http://dory-app.herokuapp.com/', onLine: true };
    t.true(isOnline());
    navigator = { onLine: false };
    t.false(isOnline());

    // Even when on the prototype chain.
    const Navigator = class {};
    Navigator.prototype = { onLine: false };
    navigator = new Navigator();
    t.false(isOnline());

});
