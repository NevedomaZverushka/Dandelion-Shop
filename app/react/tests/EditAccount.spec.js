import React from "react";
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EditAccount from '../components/Account/EditAccount'

const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() });

it('render without errors', () => {
    const wrapper =  mount(<EditAccount name={'user'} email={'test@email.com'}/>)
    expect(wrapper.find('.field').find('input').get(0).props.defaultValue).toBe('user')
    expect(wrapper.find('.field').find('input').get(1).props.defaultValue).toBe('test@email.com')
})