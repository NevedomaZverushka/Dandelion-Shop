import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
//import Cookies from 'universal-cookie'
import axios from 'axios'
import ReactTestUtils from 'react-dom/test-utils';

import Product from '../components/Products/Product'
import Messages from "../components/Messages";
//import Messages from '../components/Messages'

const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() });


const productData = [
    { image_url: null, name: 'Такая-то', author: 'Такой-то', description: 'Красочное', price: 12, id: 1 },
    { image_url: "https://www.pinterest.com/pin/844917580075644138/", name: 'Такая-то', author: 'Такой-то', description: 'Красочное', price: 12, id: 1 }
]


describe('renders with different user statuses', () => {
    it('renders when user is admin', () => {
        const wrapper = mount(<Router><Product data={productData[0]} user_role={1} /></Router>);
        expect(wrapper.find('.admin_product_block')).toHaveLength(1);
        expect(wrapper.find('center')).toHaveLength(1);
    })
    it('renders when user is not admin', () => {
        const wrapper = mount(<Router><Product data={productData[0]} user_role={0} /></Router>);
        expect(wrapper.find('.admin_product_block').get(0).props.style).toHaveProperty('display', 'none');
        expect(wrapper.find('center')).toHaveLength(1);
    })
    it('when user is not autheticated', () => {
        const wrapper = mount(<Router><Product data={productData[0]} user_role={null} /></Router>);
        expect(wrapper.find('.admin_product_block').get(0).props.style).toHaveProperty('display', 'none');
        expect(wrapper.find('center').get(0).props.style).toHaveProperty('display', 'none');
    })
})

describe('render with different state of image from db', () => {
    it('when image is not define', () => {
        const wrapper = mount(<Router><Product data={productData[0]} user_role={1} /></Router>);
        expect(wrapper.find('.img').get(0).props.style).toHaveProperty(
            'backgroundImage',
            "url(http://localhost:3000/packs/media/images/default_avatar-826a3503.jpg)",
        );
    })
    it('when image is define', () => {
        const wrapper = mount(<Router><Product data={productData[1]} user_role={1} /></Router>);
        expect(wrapper.find('.img').get(0).props.style).toHaveProperty(
            'backgroundImage',
            "url(https://www.pinterest.com/pin/844917580075644138/)",
        );
    })
})



// TODO Cookie
describe('click on btn', () => {
    it('click to btn with adding data item', () => {
        const wrapper = mount(<Router><Product data={productData[1]} user_role={1} /></Router>);
        let btn = wrapper.find('center').find('button');
        btn.instance().onClick = jest.fn();
        expect(btn.instance().onClick.mock.calls).toHaveLength(0);
        btn.instance().onClick();
        expect(btn.instance().onClick.mock.calls).toHaveLength(1);
        btn.instance().onClick();
        expect(btn.instance().onClick.mock.calls).toHaveLength(2);
    })
    it('click to btn with deleting item', () => {
        const wrapper = mount(<Router><Product data={productData[1]} user_role={1} /></Router>);
        let btn = wrapper.find('.admin_product_block').find('button');
        btn.instance().onClick = jest.fn();
        expect(btn.instance().onClick.mock.calls).toHaveLength(0);
        btn.instance().onClick();
        expect(btn.instance().onClick.mock.calls).toHaveLength(1);
    })
    it('click to btn with redirecting to another page', () => {
        const wrapper = mount(<Router><Product data={productData[1]} user_role={1} /></Router>);
        let link = wrapper.find('.admin_product_block').find('a');
        link.instance().onClick = jest.fn();
        link.instance().onClick();
        expect(link.instance().onClick.mock.calls).toHaveLength(1);
    })
})


it('change cookie', () => {
    // const Cookies = require('universal-cookie');
    // const cookies = new Cookies();

    const mockCookie = { activeOrder: { products: [] } }

    Object.defineProperty(document, 'cookies', {
        get: jest.fn().mockImplementation((key) => { return mockCookie[key]; }),
        set: jest.fn().mockImplementation((key, data) => { mockCookie[key] = data })
    });

    //console.log(cookies.get('activeOrder'))

    //expect(cookies.get('activeOrder')).toBeDefined();

    // const wrapper = mount(<Router><Product data={productData[1]} user_role={1} /></Router>);
    // let btn = wrapper.find('center').find('button');
    // btn.simulate('click');
})


it('open popup', () => {
    let wrapper = mount(<Router><Product data={productData[1]} user_role={1} /></Router>);
    wrapper.setState({popUp: true}, () => {
        wrapper = wrapper.update();
        expect(wrapper.state('popUp')).toEqual(true);
    })
    wrapper.setState({popUp: false}, () => {
        wrapper = wrapper.update();
        expect(wrapper.state('popUp')).toEqual(false);
    })
})

// TODO axios
// jest.mock('axios')

// it('', async () => {
//     const f = jest.fn();
//     const wrapper = mount(<Router><Product data={productData[1]} user_role={1} /></Router>);
//     wrapper.find('button').at(1).simulate('click');
//     expect(f).toHaveBeenCalledTimes(1);
// })