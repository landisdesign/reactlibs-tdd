import React from 'react';
import { shallow } from 'enzyme';
import Copyright from '.';

test('Copyright creates expected output', () => {
    const output = <div className='copyright'>Copyright ©{(new Date()).getFullYear()} Michael Landis</div>;
    const wrapper = shallow(<Copyright/>);

    expect(wrapper.contains(output));
});
