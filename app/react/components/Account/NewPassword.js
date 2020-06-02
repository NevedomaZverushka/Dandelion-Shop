import React from "react";
import Helmet from "react-helmet";

export default function NewPassword () {
    return (
        <div className="new_password">
            <Helmet><title>Новый пароль</title></Helmet>

            <h3 style={{textAlign: 'center', marginTop: '0'}}>Смена пароля</h3>

            <div class="field">
                <p>Новый пароль <em>(минимум 6 символов)</em><br />
                    <input autocomplete="new-password" type="password" name="user[password]" id="user_password" required />
                </p>
                <p>Повторите новый пароль<br />
                    <input autocomplete="new-password" type="password" name="user[password_confirmation]" id="user_password_confirmation" required />
                </p>
            </div>

            <div class="actions">
                <center>
                    <input className='submit' type="submit" name="commit" value="Изменить пароль" />
                </center>
            </div>
            
            <div style={{textAlign: 'center'}}>
                <a href="/users/sign_in">Войти</a><br />
                <a href="/users/sign_up">Зарегистрироваться</a><br />
            </div>
        </div>
    )
}