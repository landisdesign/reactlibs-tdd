import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Copyright from '.';
import 'jest-styled-components';

test('Copyright creates expected output', () => {
    const output = <div className='copyright'>Copyright ©{(new Date()).getFullYear()} Michael Landis</div>;
    const wrapper = shallow(<Copyright/>);

    expect(wrapper.contains(output));
});

test('Copyright styling is maintained', () => {
    const expectedStyles = {
        padding: '1rem',
        color: '#246',
        font: '1rem/1.5 "mr-eaves-modern",sans-serif',
        'text-align': 'center'
    } as const;

    const wrapper = mount(<ThemeProvider theme={{ mode: 'light' }}><Copyright /></ThemeProvider>).find('div');

    Object.keys(expectedStyles).forEach(key => expect(wrapper).toHaveStyleRule(key, expectedStyles[key as keyof typeof expectedStyles]));
    expect(wrapper).toHaveStyleRule('font-size', '1.25rem', { media: '(min-width:48rem)' });
    expect(wrapper).toHaveStyleRule('font-size', '.85rem', { media: '(max-width:48rem)' });
});
