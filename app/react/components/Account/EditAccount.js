import React from "react";
import Helmet from "react-helmet";

export default function EditAccount(props) {
    return (
        <div className="edit_account">
            <Helmet><title>Редактировать аккаунт</title></Helmet>

            <h3 style={{textAlign: 'center', marginTop: '0'}}>Изменить данные аккаунта</h3>
            
            <div className="field">
                <p>Имя<br />
                    <input autocomplete="name" type="text" defaultValue={props.name} name="user[name]" id="user_name" />
                </p>
                <p>Почта<br />
                    <input className="required" autocomplete="email" type="email" defaultValue={props.email} name="user[email]" id="user_email" required/>
                </p>
                <p>Текущий пароль<br />
                    <input className="required" autocomplete="current-password" type="password" name="user[current_password]" id="user_current_password" required/>
                </p>
                <p>Новый пароль <em>(оставьте поле пустым, если не будете менять пароль)</em><br />
                    <input autocomplete="new-password" type="password" name="user[password]" id="user_password" />
                    <em>(минимум 6 символов)</em>
                </p>
                <p>Повторите новый пароль<br />
                    <input autocomplete="new-password" type="password" name="user[password_confirmation]" id="user_password_confirmation" />
                </p>
            </div>

            <div className="actions">
                <center><input className="submit" type="submit" name="commit" value="Изменить" /></center>
            </div>

            <form className="button_to" method="post" action="/users">
                <input type="hidden" name="_method" value="delete" />
                <center><input className="submit" data-confirm="Вы уверены?" type="submit" value="Удалить мой аккаунт" /></center>
                <input type="hidden" name="authenticity_token" value="JRAMm855ZacNOIHSNeaG4jpxdMeCmxV2C9RK17RnHv+/VuEadtEj/tTIC4NbsVU9Ljiw1GqmM8+lzh0O1azvqw==" />
            </form>
        </div>
    )
}