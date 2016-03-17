import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import { Component } from '../../public/js/containers/layout';
import { spy } from 'sinon';

test('Should be able to render layout;', t => {

    const props = {
        children: <a>Dory</a>,
        loading: [],
        options: { menuOpen: false },
        fetchData: spy()
    };

    const wrapper = mount(<Component {...props} />);
    t.is(props.fetchData.callCount, 1);

    t.true(wrapper.find('section.layout').hasClass('closed'));
    wrapper.setProps({ options: { menuOpen: true } });
    t.true(wrapper.find('section.layout').hasClass('open'));

});
