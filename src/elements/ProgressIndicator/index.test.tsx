import React from 'react';
import { shallow } from 'enzyme';

import ProgressIndicator from '.';

test('HTML structure is proper', () => {
    const expectedStyle = {
        background: '#FFF'
    }
    const expected = <div className='progressIndicator' style={expectedStyle}/>;
    const wrapper = shallow(<ProgressIndicator current={0} total={100}/>);

    expect(wrapper.matchesElement(expected)).toEqual(true);
});

test('Background styled properly for current/total values', () => {
    let expected: React.CSSProperties = {
        background: '#333'
    };
    let wrapper = shallow(<ProgressIndicator current={1} total={100} backgroundColor='#333'/>);
    expect(wrapper.prop('style')).toEqual(expected);

    expected = {
        background: '#CCC'
    };
    wrapper = shallow(<ProgressIndicator current={99} total={100} progressColor='#CCC'/>);
    expect(wrapper.prop('style')).toEqual(expected);

    expected = {
        background: 'linear-gradient(to right, #369 49.9%, #FFF 50.1%)'
    };
    wrapper = shallow(<ProgressIndicator current={50} total={100}/>);
    expect(wrapper.prop('style')).toEqual(expected);
});

test('Current/Total clamped properly', () => {
    let expected: React.CSSProperties = {
        background: '#369'
    };

    let wrapper = shallow(<ProgressIndicator current={200} total={100}/>);
    expect(wrapper.prop('style')).toEqual(expected);

    wrapper = shallow(<ProgressIndicator current={1} total={0}/>);
    expect(wrapper.prop('style')).toEqual(expected);

    wrapper = shallow(<ProgressIndicator current={1} total={-1}/>);
    expect(wrapper.prop('style')).toEqual(expected);

    expected = {
        background: '#FFF'
    };

    wrapper = shallow(<ProgressIndicator current={-1} total={5}/>);
    expect(wrapper.prop('style')).toEqual(expected);

    wrapper = shallow(<ProgressIndicator current={0} total={-1}/>);
    expect(wrapper.prop('style')).toEqual(expected);

    wrapper = shallow(<ProgressIndicator current={-1} total={-1}/>);
    expect(wrapper.prop('style')).toEqual(expected);
});
