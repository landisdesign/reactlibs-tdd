import React from 'react';
import { shallow } from 'enzyme';
import Button from '.';

test('Standard <button> attributes passed through', () => {
    const testClick = jest.fn();
    const wrapper = shallow(<Button aria-pressed='false' type='submit' onClick={testClick}>click</Button>);

    expect(wrapper.text()).toEqual('click');
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('[aria-pressed="false"]')).toHaveLength(1);
    expect(wrapper.find('[type="submit"]')).toHaveLength(1);

    wrapper.simulate('click');
    expect(testClick.mock.calls).toHaveLength(1);
});

test('isDefault outputs .default instead of .button', () => {
    let wrapper = shallow(<Button>button</Button>);
    expect(wrapper.find('.button')).toHaveLength(1);

    wrapper = shallow(<Button isDefault={false}>button</Button>);
    expect(wrapper.find('.button')).toHaveLength(1);

    wrapper = shallow(<Button isDefault={true}>default</Button>);
    expect(wrapper.find('.button')).toHaveLength(0);
    expect(wrapper.find('.default')).toHaveLength(1);
});

test('class names override initial classes', () => {
    let wrapper = shallow(<Button className='different-class'>different</Button>);
    expect(wrapper.find('.different-class')).toHaveLength(1);
    expect(wrapper.find('.button')).toHaveLength(0);

    wrapper = shallow(<Button isDefault={true} className='another-class'>another</Button>);
    expect(wrapper.find('.another-class')).toHaveLength(1);
    expect(wrapper.find('.default')).toHaveLength(0);
});

test('children rendered inside <button>', () => {
    const content = <b>Content</b>;
    const wrapper = shallow(<Button>{ content }</Button>);
    expect(wrapper.contains(content)).toBe(true);
});

test('render function overrides children', () => {
    const content = <b>Content</b>;
    const wrapper = shallow(<Button render={ () => content }/>);
    expect(wrapper.contains(content)).toBe(true);
});
