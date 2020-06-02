import React, { useEffect } from "react";
import Helmet from "react-helmet";

export default function SignUp () {
    return (
        <div className="sign_up">
            <Helmet><title>Регистрация</title></Helmet>

            <h3 style={{textAlign: 'center', marginTop: '0'}}>Регистрация</h3>

            <div className="field">
                <p>Имя<br />
                    <input autoComplete="name" type="text" name="user[name]" id="user_name" />
                </p>
                <p>Электронная почта<br />
                    <input autoComplete="email" type="email" name="user[email]" id="user_email" required />
                </p>
                <p className="password">Пароль <em>(минимум 6 символов)</em><br />
                    <input id="pass" autoComplete="new-password" type="password" name="user[password]" id="user_password" required />
                </p>
                <p className="password">Повторите пароль<br />
                    <input id="passch" autoComplete="new-password" type="password" name="user[password_confirmation]" id="user_password_confirmation" required />
                </p>
            </div>

            <div className="actions">
                <center><input className="submit" type="submit" name="commit" value="Отправить" data-disable-with="Отправить" /></center>
            </div>

            <div style={{textAlign: 'center'}}>
                <a href="/users/sign_in">Войти</a><br />
            </div>
        </div>
    )
}