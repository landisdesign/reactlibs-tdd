import React from 'react';

import { testStyling, getThemedContent } from '../../common/__testing-utils';
import Image, { ImageProps } from '.';

test('Outputs image with passed through attributes', () => {
    const testLoad = () => {};
    const wrapper = getThemedContent(<Image src='foo' role='button' onLoad={testLoad} />, 'img');

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
        let wrapper = getThemedContent(<Image align={key as keyof ImageProps['align']} />, 'img');
        testStyling(wrapper, alignments[key]);
    });
});
