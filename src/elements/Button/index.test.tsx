import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '.';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

const getButton = (button: React.ReactNode) =>
    mount(<ThemeProvider theme={{ mode: 'light' }}>{button}</ThemeProvider>).find('button');

test('Standard <button> attributes passed through', () => {
    const testClick = jest.fn();
    let button = getButton(<Button aria-pressed='false' type='submit' onClick={testClick}>click</Button>);

    expect(button.text()).toEqual('click');
    expect(button.prop('aria-pressed')).toEqual('false');
    expect(button.prop('type')).toEqual('submit');
    button.simulate('click');
    expect(testClick.mock.calls).toHaveLength(1);

    button = getButton(<Button disabled>disabled</Button>);
    expect(button.prop('disabled')).toBeDefined();
});

test('Button outputs correct styling', () => {
    let button = getButton(<Button>standard</Button>);
    expect(toJson(button)).toMatchSnapshot();

    button = getButton(<Button disabled>plain disabled</Button>);
    expect(toJson(button)).toMatchSnapshot();

    button = getButton(<Button default>default</Button>);
    expect(toJson(button)).toMatchSnapshot();

    button = getButton(<Button disabled default>default disabled</Button>);
    expect(toJson(button)).toMatchSnapshot();
});

test('class names override initial classes', () => {
    let button = getButton(<Button className='different-class'>different</Button>);
    expect(button.prop('className')).toEqual('different-class');

    button = getButton(<Button default className='another-class'>another</Button>);
    expect(button.prop('className')).toEqual('another-class');
});

test('children rendered inside <button>', () => {
    const content = <b>Content</b>;
    const button = getButton(<Button>{ content }</Button>);
    expect(button.contains(content)).toBe(true);
});

test('render function overrides children', () => {
    const content = <b>Content</b>;
    const button = getButton(<Button render={ () => content }/>);
    expect(button.contains(content)).toBe(true);
});
