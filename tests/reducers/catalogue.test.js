import test from 'ava';
import 'babel-register';
import reducer from '../../public/js/reducers/catalogue';
import { SUCCESS } from '../../public/js/helpers/middleware';
import { POST } from '../../public/js/config/events';

test('Should be able to reduce a post action;', t => {

    const firstModel = { slug: 'my-first-post' };
    const secondModel = { slug: 'my-second-post' };

    const firstAction = { type: POST, readyState: SUCCESS, result: firstModel };
    const secondAction = { type: POST, readyState: SUCCESS, result: secondModel };

    const reduced = reducer([], firstAction);

    t.same(reduced, [firstModel]);
    t.same(reducer(reduced, secondAction), [firstModel, secondModel]);

});
