import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import Cookies from 'universal-cookie'
import axios from 'axios'

import Messages from '../Messages'

export default function Account(props) {
    const [popUp, setPopUp] = useState(false)
    const [user, setUser] = useState(props.user)

    if (user.user_id !== null) {
        return (
            <div>
                <Helmet><title>Аккаунт | {user.user_name}</title></Helmet>
                { user.user_role
                    ? <Admin user={user} setUser={setUser} popUp={popUp} setPopUp={setPopUp} />
                    : <User user={user} setUser={setUser} popUp={popUp} setPopUp={setPopUp} />
                }
            </div>
        )
    }
    else {
        return <Redirect to="/" />
    }
}


function handleNewOrder(id) {
    const cookies = new Cookies();
    cookies.set('activeOrder', { created_at: "", order_id: null, products: [], status: 0, user_id: id })
    axios
        .get('/change_active_order/null')
        .then((response) => {
            if (response.status === 204) {
                location.replace('/')
            }
            else {
                setPopUp(true)
            }
        })
}

function User({user, setUser, popUp, setPopUp}) {
    return (
        <div className="acc_block user">
            <h3>Добро пожаловать, {user.user_name}!</h3>
            <ul>
                <li><button onClick={() => handleNewOrder(user.user_id)}>Добавить заказ</button></li>
                <li><Link to='/account/cart' data-method="get">История заказов</Link></li>
                <li><Link to='/users/edit' data-method="get">Изменить данные аккаунта</Link></li>
                <li><Link to="/users/sign_out" data-method="delete">Выйти</Link></li>
            </ul>

            {popUp
                ? <Messages message={'Произошла ошибка!'} color={'rgba(255, 119, 119, 0.7)'} closePopup={() => setPopUp(false)} />
                : null
            }
        </div>
    )
}

function Admin({user, setUser, popUp, setPopUp}) {
    return (
        <div className="acc_block admin">
            <h3>Добро пожаловать, {user.user_name}!</h3>
            <ul>
                <li><Link to='/account/new_admin'>Добавить администратора</Link></li>
                <li><Link to='/account/add'>Добавить товар</Link></li>
                <li><button onClick={() => handleNewOrder(user.user_id)}>Добавить заказ</button></li>
                <li><Link to='/account/cart' data-method="get">История заказов</Link></li>
                <li><Link to='/users/edit' data-method="get">Изменить данные аккаунта</Link></li>
                <li><Link to="/users/sign_out" data-method="delete">Выйти</Link></li>
            </ul>

            {popUp
                ? <Messages message={'Произошла ошибка!'} color={'rgba(255, 119, 119, 0.7)'} closePopup={() => setPopUp(false)} />
                : null
            }
        </div>
    )
}