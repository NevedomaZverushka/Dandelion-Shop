import React from "react";
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Messages from "../components/Messages";

const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() });

describe('render with deffirent props', () => {
    it('send full props', () => {
        const wrapper = mount(
            <Messages message={'Произошла ошибка!'} color={'rgba(255, 119, 119, 0.7)'} closePopup={jest.fn()} />
        );
        expect(wrapper.find('h1').text()).toBe('Произошла ошибка!');
        expect(wrapper.find('.popup_inner').get(0).props.style).toHaveProperty('backgroundColor', 'rgba(255, 119, 119, 0.7)')
    })
    it('send props without color', () => {    
        const wrapper = mount(<Messages message={'Произошла ошибка!'} closePopup={jest.fn()} />);
        expect(wrapper.find('h1').text()).toBe('Произошла ошибка!');
        expect(wrapper.find('.popup_inner').get(0).props.style).toHaveProperty('backgroundColor', 'none')
    })
    it('send props without message', () => {    
        const wrapper = mount(<Messages color={'rgba(255, 119, 119, 0.7)'} closePopup={jest.fn()} />);
        expect(wrapper.find('h1').text()).toBe("Ошибка!");
        expect(wrapper.find('.popup_inner').get(0).props.style).toHaveProperty('backgroundColor', 'rgba(255, 119, 119, 0.7)')
    })
    it('send without props', () => {    
        const wrapper = mount(<Messages closePopup={jest.fn()} />);
        expect(wrapper.find('h1').text()).toBe("Ошибка!");
        expect(wrapper.find('.popup_inner').get(0).props.style).toHaveProperty('backgroundColor', 'none')
    })
})

// window.state = {
//     popUp: false
// };

// function setPopUp(prop) {
//     state.popUp = prop;
// }

// it('', () => {
//     //const setPopUp = jest.fn();
//     //const closePopup = jest.fn()
//     const wrapper = mount(
//         <Messages message={'Произошла ошибка!'} color={'rgba(255, 119, 119, 0.7)'} closePopup={jest.fn()} />
//     );
//     console.log(wrapper.contains(wrapper.find('.popup_inner')))
//     expect(wrapper).toContainEqual('.popup_inner')
//     //expect(wrapper.state().flag).toBe(true)
//     //const windowOnclick = jest.spyOn(wrapper, 'wrapper.props().closePopup');
//     //let obj = wrapper.find('#popup');
//     //console.log(obj)
//     //expect(obj.get(0).props.style).toHaveProperty('position', 'fixed')
//     //window.simulate('click');
//     //expect(wrapper.props().closePopup).toHaveBeenCalled();
//     //console.log(wrapper.props())
//     //expect(wrapper.props())
// })