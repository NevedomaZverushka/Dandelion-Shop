import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'universal-cookie'
import axios from 'axios'
import { Redirect } from 'react-router';
import pretty from "pretty";

import NewAdmin from '../components/Account/NewAdmin'

const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() });

const user = [
    { user_id: 1, user_role: 1, user_name: 'null', orders: [] },
    { user_id: 2, user_role: 0, user_name: 'null', orders: [] },
    { user_id: null, user_role: null, user_name: null, orders: [] }
]

describe('render with differen user status', () => {
    it('if user is admin', () => {
        const wrapper = mount(<Router><NewAdmin user={user[0]} /></Router>);
        expect(wrapper.find('.new_admin')).toHaveLength(1);
    })
    it('if user is not admin', () => {
        const wrapper = mount(<Router><NewAdmin user={user[1]} /></Router>);
        expect(wrapper.find(Redirect)).toHaveLength(1);
    })
    it('if user is not autheticated', () => {
        const wrapper = mount(<Router><NewAdmin user={user[2]} /></Router>);
        expect(wrapper.find(Redirect)).toHaveLength(1);
    })
})


// TODO get request
// jest.mock("axios");

// describe('', () => {
//     it('', async () => {
//         const listUsers = [
//             {id: 1, name: 'user1', role: 1},
//             {id: 2, name: 'user2', role: 0}
//         ];

//         axios.get.mockImplementation(() => Promise.reject({ listUsers }));

//         await act(async () => {
//             shallow(<Router><NewAdmin user={user[0]} /></Router>);
//         });
//     })
// })