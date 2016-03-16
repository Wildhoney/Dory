import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../public/js/components/pagination';
import config from '../../public/js/config';

test('Should be able to render pagination;', t => {

    const props = {
        catalogue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        pageNumber: 2
    };

    const wrapper = shallow(<Pagination {...props} />);
    const maxPage = Math.ceil(props.catalogue.length / config.perPage);

    t.false(wrapper.find('.previous').hasClass('disabled'));
    t.false(wrapper.find('.next').hasClass('disabled'));
    t.is(wrapper.find('.page-number').text(), `Page 2 of ${maxPage}`);

    wrapper.setProps({ pageNumber: 5 });
    t.true(wrapper.find('.previous').hasClass('disabled'));
    t.false(wrapper.find('.next').hasClass('disabled'));
    t.is(wrapper.find('.page-number').text(), `Page 5 of ${maxPage}`);

    wrapper.setProps({ pageNumber: 1 });
    t.false(wrapper.find('.previous').hasClass('disabled'));
    t.true(wrapper.find('.next').hasClass('disabled'));
    t.is(wrapper.find('.page-number').text(), `Page 1 of ${maxPage}`);

});
