import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Navigation from '../../public/js/components/navigation';

test('Should be able to render navigation;', t => {

    const dispatchSpy = spy();
    const options = { menuOpen: false };

    const wrapper = shallow(<Navigation options={options} dispatch={dispatchSpy} />);

    t.true(wrapper.find('ul').hasClass('closed'));
    wrapper.find('a.icon').simulate('click');
    t.is(dispatchSpy.callCount, 1);

    wrapper.setProps({ options: { menuOpen: true } });
    t.true(wrapper.find('ul').hasClass('open'));

});
