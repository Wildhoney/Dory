import test from 'ava';
import by from 'sort-by';
import 'babel-register';
import { merge } from '../../public/js/helpers/merge';

test('It can merge objects by prioritising models with "content" over those without;', t => {

    const currentState = [
        { title: 'My First Post', slug: 'first-post' },
        { title: 'My Second Post', slug: 'second-post' },
        { title: 'My Third Post', slug: 'third-post', content: 'Third Content' },
        { title: 'My Fourth Post', slug: 'fourth-post' },
        { title: 'My First Post', slug: 'first-post' }
    ];

    const updatedState = [
        { title: 'My First Post', slug: 'first-post', content: 'First Content' },
        { title: 'My Second Post', slug: 'second-post', content: 'Second Content' },
        { title: 'My Third Post', slug: 'third-post' },
        { title: 'My Fifth Post', slug: 'fifth-post' },
        { title: 'My Sixth Post', slug: 'sixth-post', content: 'Sixth Content' }
    ];

    const merged = merge(currentState, updatedState).sort(by('title'));

    t.same(merged, [
        { title: 'My Fifth Post', slug: 'fifth-post' },
        { title: 'My First Post', slug: 'first-post', content: 'First Content' },
        { title: 'My Fourth Post', slug: 'fourth-post' },
        { title: 'My Second Post', slug: 'second-post', content: 'Second Content' },
        { title: 'My Sixth Post', slug: 'sixth-post', content: 'Sixth Content' },
        { title: 'My Third Post', slug: 'third-post', content: 'Third Content' }
    ]);

});
