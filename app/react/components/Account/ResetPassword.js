import React from "react";
import Helmet from "react-helmet";

export default function ResetPassword () {
    return (
        <div className="reset_password">
            <Helmet><title>Смена пароля</title></Helmet>

            <h3 style={{textAlign: 'center', marginTop: '0'}}>Забыли пароль?</h3>

            <div className="field">
                <p>Введите адрес вашей электронной почты:<br />
                    <input autoFocus="autofocus" autoComplete="email" type="email" name="user[email]" id="user_email" />
                </p>
            </div>

            <div className="actions">
                <center>
                    <input className="submit" type="submit" name="commit" value="Отправить инструкции" />
                </center>
            </div>

            <div style={{textAlign: 'center'}}>
                <a href="/users/sign_in">Войти</a><br />
                <a href="/users/sign_up">Зарегистрироваться</a><br />
            </div>
        </div>
    )
}