import React from 'react';
import styled from 'styled-components';
import { getThemedContent, testStyling, testMedia } from './__testing-utils';

test('Themed content returned', () => {
    const content = <><div>a</div> b <div>b</div></>;
    const expected = <div>{content}</div>;

    const TestStyledComponent = styled.div`
        display: block;
    `;
    const testComponent = <TestStyledComponent>${content}</TestStyledComponent>;
    const actual = getThemedContent(testComponent, 'div');
    expect(actual.matchesElement(expected));
});

describe('Testing simple styling', () => {
    test('Correct styling passes', () => {
        const TestStyledComponent = styled.div`
            border: 1px solid red;
            display: inline;
        `;
        const testDiv = getThemedContent(<TestStyledComponent />, 'div');

        const testStyles = {
            border: '1px solid red',
            display: 'inline'
        };

        testStyling(testDiv, testStyles);
    });

    test('Incorrect styling fails', () => {
        const TestStyledComponent = styled.div`
            border: 1px solid red;
            display: table;
        `;
        const testDiv = getThemedContent(<TestStyledComponent />, 'div');

        const testStyles = {
            border: '1px solid red',
            display: 'inline'
        };

        expect(() => testStyling(testDiv, testStyles)).toThrow('inline');
    });

})

describe('Testing media styling', () => {
    test('Correct media styling passes', () => {
        const TestStyledComponent = styled.div`
            @media (max-width: 500px) {
                display: table;
            }

            @media (min-width: 500px) {
                display: inline-table;
            }
        `;
        const testDiv = getThemedContent(<TestStyledComponent />, 'div');

        const testStyles = {
            '(max-width:500px)': {
                display: 'table'
            },
            '(min-width:500px)': {
                display: 'inline-table'
            }
        };

        testMedia(testDiv, testStyles);
    });

    test('Incorrect media styling fails', () => {
        const TestStyledComponent = styled.div`
            @media (max-width: 500px) {
                display: table;
            }

            @media (min-width: 500px) {
                display: inline-table;
            }
        `;
        const testDiv = getThemedContent(<TestStyledComponent />, 'div');

        const testStyles = {
            '(max-width:500px)': {
                display: 'table'
            },
            '(min-width:500px)': {
                display: 'inline'
            }
        };

        expect(() => testMedia(testDiv, testStyles)).toThrow('inline');
    });

})
