import React from 'react';

import { getThemedContent, testStyling, testMedia } from '../../common/__testing-utils';
import Text from '.';

test('Children are output', () => {
    const content = <b>Hello</b>;
    const expected = <div>{content}</div>;

    const actual = getThemedContent(<Text>{content}</Text>, 'div');
    expect(actual.matchesElement(expected)).toEqual(true);
});

test('HTML is output dangerously', () => {
    const content = '<b>Hello</b>';
    const expected = <div dangerouslySetInnerHTML={{__html: content}}/>;

    let actual = getThemedContent(<Text html={content} />, 'div');
    expect(actual.matchesElement(expected)).toEqual(true);

    actual = getThemedContent(<Text html={content}>This should not be output</Text>, 'div');
    expect(actual.matchesElement(expected)).toEqual(true);
});

test('Styles are applied', () => {
    const defaultStyling = {
        'font-family': '"mr-eaves-modern",sans-serif'
    };
    let actual = getThemedContent(<Text>foo</Text>, 'div');
    testStyling(actual, defaultStyling);

    const storyStyling = {
        'padding-right': '.5rem',
        'font-family': '"mandrel-normal",serif',
        'line-height': '2'
    };
    actual = getThemedContent(<Text type='story'>foo</Text>, 'div');
    testStyling(actual, storyStyling);

    const mediaTests = {
        '(max-width:30rem)': {'font-size': '1rem'},
        '(min-width:30rem) and (max-width:48rem)': {'font-size': '1rem'},
        '(min-width:48rem)': {'font-size': '1.5rem'}
    } as const;
    testMedia(actual, mediaTests);
})
