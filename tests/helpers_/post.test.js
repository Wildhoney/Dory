import test from 'ava';
import by from 'sort-by';
import 'babel-register';
import { hasPost } from '../../public/js/helpers/data';

test('It can determine when we already have a post with a "content" property;', t => {
    const postModel = { slug: 'second-post' };
    t.false(hasPost([{ slug: 'first-post' }], postModel));
    t.false(hasPost([{ slug: 'first-post' }, { slug: 'second-post' }], postModel));
    t.true(hasPost([{ slug: 'first-post' }, { slug: 'second-post', content: 'Second Post' }], postModel));
});
