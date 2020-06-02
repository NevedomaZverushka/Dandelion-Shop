import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect } from 'react-router';

import Account from '../components/Account/Account'
import Messages from '../components/Messages'

const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() });

const user = [
    { user_id: 1, user_role: 1, user_name: 'admin', orders: [] },
    { user_id: 2, user_role: 0, user_name: 'user', orders: [] },
    { user_id: null, user_role: null, user_name: null, orders: [] }
]

describe('renders with different user statuses', () => {
    it("user is admin", () => {
        const wrapper = mount(<Router><Account user={user[0]} /></Router>);
        expect(wrapper.find('.user')).toHaveLength(0);
        expect(wrapper.find('.admin')).toHaveLength(1);
        expect(wrapper.find('.admin').find('h3').text()).toBe('Добро пожаловать, ' + user[0].user_name + '!');
    })
    it("user isn't admin", () => {
        const wrapper = mount(<Router><Account user={user[1]} /></Router>);
        expect(wrapper.find('.user')).toHaveLength(1);
        expect(wrapper.find('.admin')).toHaveLength(0);
        expect(wrapper.find('.user').find('h3').text()).toBe('Добро пожаловать, ' + user[1].user_name + '!');
    })
    it("check user is not autheticated", () => {
        const wrapper = mount(<Router><Account user={user[2]} /></Router>);
        expect(wrapper.find(Redirect)).toHaveLength(1);
    })
})

describe('click on btn', () => {
    it('on admin page', () => {
        const wrapper = mount(<Router><Account user={user[0]} /></Router>);
        let btn = wrapper.find('.admin').find('button');
        btn.instance().onClick = jest.fn();
        expect(btn.instance().onClick.mock.calls).toHaveLength(0);
        btn.instance().onClick();
        expect(btn.instance().onClick.mock.calls).toHaveLength(1);
    })
    it('on user page', () => {
        const wrapper = mount(<Router><Account user={user[1]} /></Router>);
        let btn = wrapper.find('.user').find('button');
        btn.instance().onClick = jest.fn();
        expect(btn.instance().onClick.mock.calls).toHaveLength(0);
        btn.instance().onClick();
        expect(btn.instance().onClick.mock.calls).toHaveLength(1);
    })
})

describe('open popup with different user statuses', () => {
    it('user is admin', () => {
        let wrapper = mount(<Router><Account user={user[0]} /></Router>);
        wrapper.setState({popUp: true}, () => {
            wrapper = wrapper.update();
            expect(wrapper.state('popUp')).toEqual(true);
        })
        wrapper.setState({popUp: false}, () => {
            wrapper = wrapper.update();
            expect(wrapper.state('popUp')).toEqual(false);
        })
    })
    it('user is not admin', () => {
        let wrapper = mount(<Router><Account user={user[1]} /></Router>);
        wrapper.setState({popUp: true}, () => {
            wrapper = wrapper.update();
            expect(wrapper.state('popUp')).toEqual(true);
        })
        wrapper.setState({popUp: false}, () => {
            wrapper = wrapper.update();
            expect(wrapper.state('popUp')).toEqual(false);
        })
    })
})