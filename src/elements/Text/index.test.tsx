import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Text from '.';

test('Children are output', () => {
    const content = <b>Hello</b>;
    const expected = <div className='default'>{content}</div>;
    const wrapper = shallow(<Text>{content}</Text>);

    expect(wrapper.matchesElement(expected)).toEqual(true);
});

test('HTML is output dangerously', () => {
    let tree = renderer.create(<Text html='<b>Hello</b>' />).toJSON();
    expect(tree).toMatchSnapshot();

    tree = renderer.create(<Text html='<b>Hello</b>'>This is not rendered</Text>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Styles are applied', () => {
    const content = <b>Hello</b>;
    const expected = <div className='story'>{content}</div>;
    const wrapper = shallow(<Text type='story'>{content}</Text>);

    expect(wrapper.matchesElement(expected)).toEqual(true);
})
