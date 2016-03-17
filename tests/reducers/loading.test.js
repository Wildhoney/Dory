import test from 'ava';
import reducer from '../../public/js/reducers/loading';
import { SUCCESS, FAILURE, REQUEST } from '../../public/js/utilities/middleware';
import { POST, POSTS, CATALOGUE } from '../../public/js/config/events';

test('it can manage which items are loading;', t => {

    const firstReduction = reducer(undefined, { type: CATALOGUE, readyState: REQUEST });
    t.same(firstReduction, [CATALOGUE]);

    const secondReduction = reducer(firstReduction, { type: POST, readyState: REQUEST });
    t.same(secondReduction, [CATALOGUE, POST]);

    const thirdReduction = reducer(secondReduction, { type: CATALOGUE, readyState: FAILURE });
    t.same(thirdReduction, [POST]);

    const fourthReduction = reducer(thirdReduction, { type: POSTS, readyState: REQUEST });
    t.same(fourthReduction, [POST, POSTS]);

    const fifthReduction = reducer(fourthReduction, { type: POSTS, readyState: SUCCESS });
    t.same(fifthReduction, [POST]);

    const sixthReduction = reducer(fifthReduction, { type: POST, readyState: SUCCESS });
    t.same(sixthReduction, []);

});
