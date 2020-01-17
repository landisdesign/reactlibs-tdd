import React from 'react';
import { mount, CommonWrapper } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

export const getThemedContent = (content: React.ReactNode, selector: string, theme: any = { mode: 'light' }) =>
    mount(<ThemeProvider theme={theme}>{content}</ThemeProvider>).find(selector).first();

interface PropertyDeclarations {
    [index: string]: string;
}

interface MediaDeclarations {
    [index: string]: PropertyDeclarations;
}

export const testStyling = (wrapper: CommonWrapper, styles: PropertyDeclarations) => {
    const json = toJson(wrapper);
    Object.keys(styles).forEach(property => expect(json).toHaveStyleRule(property, styles[property]));
};

export const testMedia = (wrapper: CommonWrapper, mediaStyles: MediaDeclarations) => {
    const json = toJson(wrapper);
    Object.keys(mediaStyles).forEach(media => {
        Object.keys(mediaStyles[media]).forEach(property =>
            expect(json).toHaveStyleRule(property, mediaStyles[media][property], { media })
        );
    })
};
