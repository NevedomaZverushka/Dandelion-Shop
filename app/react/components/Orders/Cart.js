import React, { useState, useEffect } from "react";
import axios from 'axios'
import Helmet from "react-helmet";
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie'

import Messages from '../Messages'
import cart from 'images/cart.png'

function CartLink() {
    const [modalWindow, setModalWindow] = useState(false)
    return (
        <>
            <div onClick={() => setModalWindow(true)} className="cart_link"><img src={cart} /></div>         
            {modalWindow ? <Order closeWindow={() => setModalWindow(false)}/> : null }
        </>
    )
}


function handleChangeStatus(currId) {
    axios
        .post('/api/change_status', { id: currId })
        .then((response) => {
            location.replace('/account/cart')
        })
        .catch((error) => {
            setPopUp(true)
        });
}

function Order(props) {
    const cookies = new Cookies()
    const [order, setOrder] = useState(cookies.get('activeOrder'))
    const [items, setItems] = useState(orderItems())
    const [popUp, setPopUp] = useState(false)

    useEffect(() => {
        window.onclick = function(event) {
            if (event.target === document.getElementById('order_wrap')) {
                props.closeWindow()
            }
        }
    })

    function handleCount(e, id) {
        const bufOrder = order;
        bufOrder.products[order.products.findIndex(product => product.product_data.id === id)].count = e.target.value
        setOrder(bufOrder)
        cookies.set('activeOrder', bufOrder)
        setItems(orderItems())
    }

    function orderItems() {
        return (
            order.products.map(function (product) {
                return (
                    <tr key={product.product_data.id}>
                        <td>"{product.product_data.name}" - {product.product_data.author}</td>
                        <td>
                            <input onChange={(e) => handleCount(e, product.product_data.id)} type="number" defaultValue={product.count} />
                        </td>
                        <td>{product.product_data.price}</td>
                        <td>{product.product_data.price * product.count}</td>
                        <td><button onClick={() => handleDeleteItem(product.product_data.id)}>Удалить</button></td>
                    </tr>
                )
            })
        )
    }

    function handleDeleteItem(id) {
        const bufOrder = order;
        bufOrder.products = order.products.filter(product => product.product_data.id !== id)
        setOrder(bufOrder)
        cookies.set('activeOrder', bufOrder)
        setItems(orderItems())
    }
    function handleSave() {
        axios
            .post('/api/orders', {order: order})
            .then((response) => {
                axios
                    .get('/change_active_order/' + response.data.order_id)
                    .then((response) => {
                       window.location.reload()
                    })
                    .catch((error) => {
                        setPopUp(true)
                    });
            })
            .catch((error) => {
                setPopUp(true)
            });
        
    }

    if (order.status == 0) {
        return (
            <div id="order_wrap" className="order_wrap">
                <div className="order">
                    <Helmet><title>Заказ {String(order.order_id)}</title></Helmet>

                    <span onClick={props.closeWindow} className="close">&times;</span>
        
                    <h3>{order.order_id ? 'Заказ №' + order.order_id : 'Несохраненный заказ'}</h3>
                    {items.length == 0
                        ? <>Ваш заказ пуст</>
                        : <>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Товар</td>
                                        <td>Количество</td>
                                        <td>Цена (за 1 шт.)</td>
                                        <td>Общая цена</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items}
                                </tbody>
                            </table>
                
                            <center>
                                <button onClick={handleSave}>Сохранить заказ</button>
                                <button  onClick={() => handleChangeStatus(order.order_id)}>Подтвердить заказ</button>
                            </center>
                        </>
                    }
        
                    {popUp
                        ? <Messages message={'Произошла ошибка!'} color={'rgba(255, 119, 119, 0.7)'} closePopup={() => setPopUp(false)} />
                        : null
                    }
                </div>
            </div>
        )
    }
    else {
        return <Redirect to="/cart" />
    }
}

function Cart(props) {
    const [ordersData, setOrdersData] = useState(props.user.orders)
    const [popUp, setPopUp] = useState(false)
    const [modalWindow, setModalWindow] = useState(false)
    
    const timeFormatter = new Intl.DateTimeFormat(
        'ru-RU',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    )

    function handleActiveOrder(id) {
        axios
            .get('/change_active_order/' + id)
            .then((response) => {
                if (response.status === 204) {
                    const cookies = new Cookies()
                    const currOrder = ordersData.find(order => order.order_id === id)
                    cookies.set('activeOrder', currOrder)
                    setModalWindow(true)
                }
                else {
                    setPopUp(true)
                }
            })
    }

    function handleDeleteItem(id) {
        axios
            .delete('/api/orders/' + id)
            .then((response) => {
                if (response.status === 204) {
                    window.location.reload()
                }
                else {
                    setPopUp(true)
                }
            })
    }

    const orders = ordersData.map(function (currOrder) {
        let orderStatus = ''
        let itemsCount = null
        let orderSum = null

        switch (currOrder.status) {
            case 0: orderStatus = 'Не завершен'; break
            case 1: orderStatus = 'Ожидается доставка'; break
            case 2: orderStatus = 'Завершен'; break
        }

        currOrder.products.forEach(product => {
            itemsCount += product.count
            orderSum += product.count * Number(product.product_data.price)
        });

        return (
            <div key={currOrder.order_id} className="order_block">
                <h3>Заказ №{currOrder.order_id}</h3>
                <table>
                    <thead>
                        <tr>
                            <td>Данные заказа</td>
                            <td>Продукты в заказе</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Дата заказа</b> - {timeFormatter.format(Date.parse(currOrder.created_at))}</td>
                            <td rowSpan="3">
                                <ol>
                                    {currOrder.products.map(function (product) {
                                        return (
                                            <li key={product.product_data.id}>
                                                {product.product_data.name} - {product.product_data.author}<br />
                                            </li>
                                        )
                                    })}
                                </ol>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Количество товаров</b> - {itemsCount}</td>
                        </tr>
                        <tr>
                            <td><b>Текущий статус заказа</b> - {orderStatus}</td>
                        </tr>
                        <tr>
                            <td><b>Общая сумма заказа</b> - {orderSum} грн.</td>
                        </tr>
                    </tbody>
                </table>

                <center style={{ display: currOrder.status != 0 ? 'none' : '' }}>
                    <button onClick={() => handleActiveOrder(currOrder.order_id)}>Редактировать</button>
                    <button onClick={() => handleDeleteItem(currOrder.order_id)}>Удалить</button>
                    <button onClick={() => handleChangeStatus(currOrder.order_id)}>Подтвердить</button>
                </center>
            </div>
        )
    })

    if (props.user.user_id != '') {
        if (ordersData.length == 0) {
            return (
                <div className="set_orders">
                    <Helmet><title>Корзина</title></Helmet>

                    <div className="empty_set">
                        <h3>У вас нет ни одного подтвержденного заказа!</h3>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="set_orders">
                    <Helmet><title>Корзина</title></Helmet>

                    {orders}

                    {popUp
                        ? <Messages message={'Произошла ошибка!'} color={'rgba(255, 119, 119, 0.7)'} closePopup={() => setPopUp(false)} />
                        : null
                    }
                    
                    {modalWindow
                        ? <Order closeWindow={() => setModalWindow(false)}/>
                        : null
                    }
                </div>
            )
        }
    }
    else {
        return <Redirect to="/" />
    }
}

export { CartLink, Cart, Order }