import test from 'ava';
import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import Post, { Author } from '../../public/js/components/post';
import config from '../../public/js/config';

test('Should be able to render post;', t => {

    const props = {
        title: 'Test Post',
        slug: 'my-test-post',
        createdDate: Date.now(),
        content: 'Example of some content for our unit-tests!'
    };

    const wrapper = shallow(<Post model={props} />);
    t.is(wrapper.find('datetime').text(), moment(props.createdDate).format(config.dateFormat));
    t.is(wrapper.find('h3').text(), '<Link />');
    t.true(wrapper.find('h3').contains(props.title));
    t.is(wrapper.find('article').html(), `<article>${props.content}</article>`);

});

test('Should be able to render an author;', t => {

    const props = {
        author: 'Adam Timberlake',
        email: 'adam.timberlake@gmail.com'
    };

    const wrapper = shallow(<Author model={props} />);
    t.is(wrapper.find('div.author').text(), 'by <Link />');
    t.true(wrapper.find('div.author').contains('Adam Timberlake'));
    t.is(wrapper.find('img').length, 1);

});
