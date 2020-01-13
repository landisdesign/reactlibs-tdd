import React from 'react';
import { shallow } from 'enzyme';
import Image from '.';

test('Outputs image with passed through attributes', () => {
    const testLoad = () => {};
    const wrapper = shallow(<Image src='foo' role='button' onLoad={testLoad} className='bar'/>);
    expect(wrapper.is('img')).toEqual(true);
    expect(wrapper.is('[src="foo"]')).toEqual(true);
    expect(wrapper.is('[role="button"]')).toEqual(true);
    expect(wrapper.is('.bar')).toEqual(true);
    expect(wrapper.prop('onLoad')).toBe(testLoad);
});

test('Adds .center to image', () => {
    let wrapper = shallow(<Image align='center' src='foo'/>);
    expect(wrapper.is('.center')).toEqual(true);

    wrapper = shallow(<Image align='center' className='bar' src='foo'/>);
    expect(wrapper.is('.center.bar')).toEqual(true);
});
