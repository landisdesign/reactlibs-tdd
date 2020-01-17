import React from 'react';

import { getThemedContent, testStyling, testMedia } from '../../common/__testing-utils';
import Copyright from '.';

test('Copyright creates expected output', () => {
    const output = <div>Copyright ©{(new Date()).getFullYear()} Michael Landis</div>;
    const wrapper = getThemedContent(<Copyright />, 'div');

    expect(wrapper.contains(output));
});

test('Copyright styling is maintained', () => {
    const expectedStyles = {
        padding: '1rem',
        color: '#246',
        font: '1rem/1.5 "mr-eaves-modern",sans-serif',
        'text-align': 'center'
    };

    const wrapper = getThemedContent(<Copyright />, 'div');

    testStyling(wrapper, expectedStyles);

    const expectedMediaStyles = {
        '(max-width:48rem)': {'font-size': '.85rem'},
        '(min-width:48rem)': {'font-size': '1.25rem'}
    }

    testMedia(wrapper, expectedMediaStyles);
});
