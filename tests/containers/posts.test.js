import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import { Component } from '../../public/js/containers/posts';
import { spy } from 'sinon';

test('Should be able to render layout;', t => {

    const props = {
        catalogue: [
            { slug: 'first-post', title: 'First' },
            { slug: 'second-post', title: 'Second' },
            { slug: 'third-post', title: 'Third' }
        ],
        params: {
            pageNumber: 1
        },
        fetchData: spy()
    };

    const wrapper = mount(<Component {...props} />);
    t.is(props.fetchData.callCount, 1);
    t.is(wrapper.find('label').text(), '(3 Posts)');
    wrapper.setProps({ catalogue: [{ slug: 'first-post', title: 'First' }] });
    t.is(wrapper.find('label').text(), '(1 Post)');

});
