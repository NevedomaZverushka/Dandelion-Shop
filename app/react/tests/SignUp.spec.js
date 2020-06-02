import React from "react";
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SignUp from '../components/Account/SignUp'

const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() });

it('render without errors', () => {
    const wrapper =  mount(<SignUp/>)
    expect(wrapper.find('.sign_up')).toBeDefined()
})