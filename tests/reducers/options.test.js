import test from 'ava';
import 'babel-register';
import reducer from '../../public/js/reducers/options';
import { SUCCESS } from '../../public/js/helpers/middleware';
import { MENU } from '../../public/js/config/events';

test('Should be able to reduce the menu toggle action;', t => {

    const openAction = { type: MENU, readyState: SUCCESS, open: true };
    const closeAction = { type: MENU, readyState: SUCCESS, open: false };

    t.same(reducer({}, openAction), { menuOpen: true });
    t.same(reducer({}, closeAction), { menuOpen: false });

});
