import test from 'ava';
import reducer from '../../public/js/reducers/options';
import { SUCCESS } from '../../public/js/utilities/middleware';
import { MENU } from '../../public/js/config/events';

test('it toggles the menu;', t => {

    const openAction = { type: MENU, readyState: SUCCESS, open: true };
    const closeAction = { type: MENU, readyState: SUCCESS, open: false };

    t.same(reducer(undefined, openAction), { menuOpen: true });
    t.same(reducer(undefined, closeAction), { menuOpen: false });

});
