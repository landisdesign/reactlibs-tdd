import React from 'react';
import { mount, CommonWrapper } from 'enzyme';
import 'jest-styled-components';

import Text from '.';
import { ThemeProvider } from 'styled-components';
import toJson from 'enzyme-to-json';

const getTextDiv = (container: React.ReactNode) => mount(<ThemeProvider theme={{ mode: 'light' }}>{container}</ThemeProvider>).find('div');

test('Children are output', () => {
    const content = <b>Hello</b>;
    const expected = <div>{content}</div>;

    const actual = getTextDiv(<Text>{content}</Text>);
    expect(actual.matchesElement(expected)).toEqual(true);
});

test('HTML is output dangerously', () => {
    const content = '<b>Hello</b>';
    const expected = <div dangerouslySetInnerHTML={{__html: content}}/>;

    let actual = getTextDiv(<Text html={content} />);
    expect(actual.matchesElement(expected)).toEqual(true);

    actual = getTextDiv(<Text html={content}>This should not be output</Text>);
    expect(actual.matchesElement(expected)).toEqual(true);
});

const testStyles = (element: CommonWrapper, styles: any) => {
    const json = toJson(element);
    Object.keys(styles).forEach(property => expect(json).toHaveStyleRule(property, styles[property]));
}

test('Styles are applied', () => {
    const defaultStyling = {
        'font-family': '"mr-eaves-modern",sans-serif'
    };
    let actual = getTextDiv(<Text>foo</Text>);
    testStyles(actual, defaultStyling);

    const storyStyling = {
        'padding-right': '.5rem',
        'font-family': '"mandrel-normal",serif',
        'line-height': '2'
    };
    actual = getTextDiv(<Text type='story'>foo</Text>);
    testStyles(actual, storyStyling);

    const mediaTests = {
        '(max-width:30rem)': ['font-size', '1rem'],
        '(min-width:30rem) and (max-width:48rem)': ['font-size', '1rem'],
        '(min-width:48rem)': ['font-size', '1.5rem']
    } as const;
    const json = toJson(actual);
    Object.keys(mediaTests).forEach(media => {
        const [property, value] = mediaTests[media as keyof typeof mediaTests];
        expect(json).toHaveStyleRule(property, value, { media });
    });
})
