import test from 'ava';
import reducer from '../../public/js/reducers/catalogue';
import { SUCCESS } from '../../public/js/helpers/middleware';
import { POST, POSTS, CATALOGUE } from '../../public/js/config/events';

test('it adds posts to the catalogue;', t => {

    // First we apply a collection to the reducer.

    const firstState = [
        { slug: 'first-post' },
        { slug: 'second-post' },
        { slug: 'third-post' },
        { slug: 'first-post' },
        { slug: 'fourth-post' }
    ];
    const firstAction = { type: CATALOGUE, readyState: SUCCESS, result: firstState };
    const firstReduction = reducer(undefined, firstAction);
    t.same(firstReduction, [
        { slug: 'first-post' },
        { slug: 'second-post' },
        { slug: 'third-post' },
        { slug: 'fourth-post' }
    ]);

    // Pass in a single model which should be treated as an array.

    const secondState = { slug: 'second-post', content: 'text' };
    const secondAction = { type: POST, readyState: SUCCESS, result: secondState };
    const secondReduction = reducer(firstReduction, secondAction);
    t.same(secondReduction, [
        { slug: 'second-post', content: 'text' },
        { slug: 'first-post' },
        { slug: 'third-post' },
        { slug: 'fourth-post' }
    ]);

    // Overwrite the "fourth-post" with a content property.

    const thirdState = [
        { slug: 'fourth-post', content: 'text' }
    ];
    const thirdAction = { type: POSTS, readyState: SUCCESS, result: thirdState };
    const thirdReduction = reducer(secondReduction, thirdAction);
    t.same(thirdReduction, [
        { slug: 'fourth-post', content: 'text' },
        { slug: 'second-post', content: 'text' },
        { slug: 'first-post' },
        { slug: 'third-post' }
    ]);

    // Attempt to load the catalogue again which should only add one model, and overwrite none.

    const fourthState = [
        { slug: 'first-post' },
        { slug: 'second-post' },
        { slug: 'third-post' },
        { slug: 'first-post' },
        { slug: 'fourth-post' },
        { slug: 'sixth-post' }
    ];
    const fourthAction = { type: CATALOGUE, readyState: SUCCESS, result: fourthState };
    const fourthReduction = reducer(thirdReduction, fourthAction);
    t.same(fourthReduction, [
        { slug: 'fourth-post', content: 'text' },
        { slug: 'second-post', content: 'text' },
        { slug: 'first-post' },
        { slug: 'third-post' },
        { slug: 'sixth-post' }
    ]);

});
