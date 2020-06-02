import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from "../components/Header/Header";

const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() });

it("renders with logged-in user", () => {
  const wrapper = mount(<Header user_id={1} />);
  expect(wrapper.find("a").at(1).text()).toBe("Аккаунт")
})
it("renders with logged-out user", () => {
  const wrapper = mount(<Header user_id={null} />);
  expect(wrapper.find("a").at(1).text()).toBe("Вход")
});