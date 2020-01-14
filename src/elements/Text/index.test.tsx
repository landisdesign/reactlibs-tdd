import React from 'react';
import { shallow } from 'enzyme';

import Text from '.';

test.todo('Children are output', () => {
    const content = <b>Hello</b>;
    const expected = <div>{content}</div>;
    const wrapper = shallow(<Text>{content}</Text>);

    expect(wrapper.matchesElement(expected)).toEqual(true);
});

test.todo('HTML is output', () => {
    const content = '<b>Hello</b>';
    const expected = <div><b>Hello</b></div>;
    const wrapper = shallow(<Text html={content}/>);

    expect(wrapper.matchesElement(expected)).toEqual(true);
});

test.todo('Styles are applied', () => {
    const content = <b>Hello</b>;
    const expected = <div className='story'>{content}</div>;
    const wrapper = shallow(<Text type='story'>{content}</Text>);

    expect(wrapper.matchesElement(expected)).toEqual(true);
})
