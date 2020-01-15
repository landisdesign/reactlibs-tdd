import React from 'react';
import { mount } from 'enzyme';
import Image, { ImageProps } from '.';
import 'jest-styled-components';

test('Outputs image with passed through attributes', () => {
    const testLoad = () => {};
    const wrapper = mount(<Image src='foo' role='button' onLoad={testLoad} />).find('img');

    expect(wrapper).toHaveLength(1);
    expect(wrapper.prop('src')).toEqual('foo');
    expect(wrapper.prop('role')).toEqual('button');
    expect(wrapper.prop('onLoad')).toBe(testLoad);
});

test('Adds alignment styling', () => {
    interface Props {
        [index: string]: string;
    }
    interface Alignments {
        [index: string]: Props;
    }

    const alignments: Alignments = {
        center: {
            display: 'block',
            margin: '1rem auto'
        }
    };

    Object.keys(alignments).forEach(key => {
        let wrapper = mount(<Image align={key as keyof ImageProps['align']} />);
        Object.keys(alignments[key]).forEach(property => expect(wrapper).toHaveStyleRule(property, alignments[key][property]));
    });
});
