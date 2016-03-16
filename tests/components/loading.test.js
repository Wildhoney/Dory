import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../../public/js/components/loading';

test('Should be able to render loader;', t => {

    const wrapper = shallow(<Loading loading={['posts', 'catalogue']} />);
    t.true(wrapper.find('div.status-icon').hasClass('loading'));
    wrapper.setProps({ loading: [] });
    t.false(wrapper.find('div.status-icon').hasClass('loading'));
    t.is(wrapper.find('img').length, 1);

});
