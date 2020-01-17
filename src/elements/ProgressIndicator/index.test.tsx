import React from 'react';

import { getThemedContent, testStyling } from '../../common/__testing-utils';
import ProgressIndicator from '.';

const testStyle = (component: React.ReactNode, background: string) => {
    const wrapper = getThemedContent(component, 'div');
    testStyling(wrapper, { background });
};

test('HTML structure is proper', () => {
    const wrapper = getThemedContent(<ProgressIndicator current={0} total={100} />, 'div');
    expect(wrapper).toHaveLength(1);
});

test('Background styled properly for current/total values', () => {
    testStyle(<ProgressIndicator current={0} total={100} />, '#FFF');
    testStyle(<ProgressIndicator current={1} total={1000} />, '#FFF');
    testStyle(<ProgressIndicator current={999} total={1000} />, '#356');
    testStyle(<ProgressIndicator current={50} total={100}/>, 'linear-gradient(to right,#356 49.9%,#FFF 50.1%)');
});

test('Width received', () => {
    const width = '75%';
    let wrapper = getThemedContent(<ProgressIndicator current={1} total={100} width={width} />, 'div');
    testStyling(wrapper, { width });

    wrapper = getThemedContent(<ProgressIndicator current={1} total={100}/>, 'div');
    expect(wrapper).not.toHaveStyleRule('width');
});

test('Current/Total clamped properly', () => {
    testStyle(<ProgressIndicator current={200} total={100} />, '#356');
    testStyle(<ProgressIndicator current={1} total={0} />, '#356');
    testStyle(<ProgressIndicator current={1} total={-1} />, '#356');
    testStyle(<ProgressIndicator current={-1} total={5} />, '#FFF');
    testStyle(<ProgressIndicator current={0} total={-1} />, '#FFF');
    testStyle(<ProgressIndicator current={-1} total={-1} />, '#FFF');
});
