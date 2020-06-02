import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";

import Messages from '../Messages'

export default function SignIn(props) {
    const [popUp, setPopUp] = useState(props.errorMessage ? true : false)

    return (
        <div className="log_in">
            <Helmet><title>Авторизация</title></Helmet>

            <h3 style={{textAlign: 'center', marginTop: '0'}}>Авторизация</h3>

            <div className="field">
                <p>Электронная почта:<br/>
                    <input autoFocus="autofocus" autoComplete="email" type="email" name="user[email]" id="user_email" required/>
                </p>
                <p>Пароль:<br/>
                    <input autoComplete="current-password" type="password" name="user[password]" id="user_password" required/>
                </p>

                <input name="user[remember_me]" type="hidden" value="0"/>
                <input type="checkbox" value="1" name="user[remember_me]" id="user_remember_me"/>
                <label htmlFor="user_remember_me">Запомнить меня</label>
            </div>

            <div className="actions">
                <center><input className="submit" type="submit" name="commit" value="Войти" data-disable-with="Войти"/></center>
            </div>

            <div style={{textAlign: 'center'}}>
                <a href="/users/sign_up">Зарегистрироваться</a><br />
                <a href="/users/password/new">Забыли пароль?</a><br />
            </div>

            {popUp
                ? <Messages message={props.errorMessage} color={'rgba(255, 119, 119, 0.7)'} closePopup={() => setPopUp(false)} />
                : null
            }
        </div>
    )
}