import React from "react";
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ResetPassword from '../components/Account/ResetPassword'

const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() });

it('render without errors', () => {
    const wrapper =  mount(<ResetPassword/>)
    expect(wrapper.find('.reset_password')).toBeDefined()
})