import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';

import ProgressIndicator from '.';
import { ThemeProvider } from 'styled-components';

const divIn = (node: React.ReactNode) => mount(<ThemeProvider theme={{ mode: 'light' }}>{node}</ThemeProvider>).find('div');

test('HTML structure is proper', () => {
    const wrapper = divIn(<ProgressIndicator current={0} total={100}/>);
    expect(wrapper).toHaveStyleRule('background', '#FFF');
});

test('Background styled properly for current/total values', () => {
    let expected = '#FFF';
    let wrapper = divIn(<ProgressIndicator current={1} total={1000}/>);
    expect(wrapper).toHaveStyleRule('background', expected);

    expected = '#356';
    wrapper = divIn(<ProgressIndicator current={999} total={1000}/>);
    expect(wrapper).toHaveStyleRule(expected);

    expected = 'linear-gradient(to right,#356 49.9%,#FFF 50.1%)';
    wrapper = divIn(<ProgressIndicator current={50} total={100}/>);
    expect(wrapper).toHaveStyleRule('background', expected);
});

test('Width received', () => {
    const expectedWidth = '75%';
    let wrapper = divIn(<ProgressIndicator current={1} total={100} width={expectedWidth}/>);
    expect(wrapper).toHaveStyleRule('width', '75%');

    wrapper = divIn(<ProgressIndicator current={1} total={100}/>);
    expect(wrapper).not.toHaveStyleRule('width');
});

test('Current/Total clamped properly', () => {
    let expected = '#356';

    let wrapper = divIn(<ProgressIndicator current={200} total={100}/>);
    expect(wrapper).toHaveStyleRule('background', expected);

    wrapper = divIn(<ProgressIndicator current={1} total={0}/>);
    expect(wrapper).toHaveStyleRule('background', expected);

    wrapper = divIn(<ProgressIndicator current={1} total={-1}/>);
    expect(wrapper).toHaveStyleRule('background', expected);

    expected = '#FFF';

    wrapper = divIn(<ProgressIndicator current={-1} total={5}/>);
    expect(wrapper).toHaveStyleRule('background', expected);

    wrapper = divIn(<ProgressIndicator current={0} total={-1}/>);
    expect(wrapper).toHaveStyleRule('background', expected);

    wrapper = divIn(<ProgressIndicator current={-1} total={-1}/>);
    expect(wrapper).toHaveStyleRule('background', expected);
});
