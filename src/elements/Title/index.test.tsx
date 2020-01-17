import React from 'react';
import { getThemedContent, testStyling, testMedia } from '../../common/__testing-utils';
import Title from '.';

test('Title outputs contents properly', () => {
    const expected = <h1>Title</h1>;
    const actual = getThemedContent(<Title>Title</Title>, 'h1');

    expect(actual.matchesElement(expected)).toBe(true);
})

test('Title styling is accurate', () => {
    const defaultStyles = {
        padding: '0',
        'font-weight': '900',
        'font-family': '"mr-eaves-modern",sans-serif',
        margin: '.25em 0',
        'line-height': '1.5'
    };
    let actual = getThemedContent(<Title>default</Title>, 'h1');
    testStyling(actual, defaultStyles);

    const packedStyles = {
        ...defaultStyles,
        margin: '0',
        'line-height': '1'
    };
    actual = getThemedContent(<Title packed>packed</Title>, 'h1');
    testStyling(actual, packedStyles);

    const mediaStyles = {
        '(max-width:30rem)': {
            'font-size': '1.5rem'
        },
        '(min-width:30rem) and (max-width:48rem)': {
            'font-size': '2rem'
        },
        '(min-width:48rem)': {
            'font-size': '3rem'
        }
    };
    testMedia(actual, mediaStyles);
});
