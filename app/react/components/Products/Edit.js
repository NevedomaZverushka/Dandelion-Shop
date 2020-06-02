import React, { useState, useEffect } from "react";
import axios from 'axios'
import Helmet from "react-helmet";
import $ from "jquery";
import { Redirect } from 'react-router';

import Messages from '../Messages'

function AddItem(props) {
    const [client, setClient] = useState(props.role);
    const [item, setItem] = useState({name: '', author: '', description: '', price: 0, image: null})
    const [popUp, setPopUp] = useState(false)
    const [error, setError] = useState(false)

    function handleChange(e) {
        if (e.target.name === 'price') {
            item[e.target.name] = Number(e.target.value)
        }
        else {
            item[e.target.name] = e.target.value
        }
    }

    function handleFile(e) {
        item[e.target.name] = e.target.files[0]
    }

    function handleSubmit(e) {
        const formData = new FormData();
        Object.keys(item).forEach(function(key) {
            if (key == 'image' && item[key] === null) {
            }
            else {
                formData.append('product[' + key + ']', item[key])
            }
        }); 

        e.preventDefault()
        $.ajax({
            url: '/api/products',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false

        })
        .done((response) => {
            $("input").val("");
            $("textarea").val("");
            setPopUp(true)
        })
        .catch((error) => {
            setPopUp(true)
            setError(true)
        });
    }

    if (client == 1) {
        return (
            <div className="add_form">
                <Helmet><title>Добавление товара</title></Helmet>
    
                <form onSubmit={handleSubmit}>
                    <p>Название книги:<br/><input onChange={handleChange} name="name" type="text" required/></p>
                    <p>Автор:<br/><input onChange={handleChange} name="author" type="text" required/></p>
                    <p>Цена:<br/><input onChange={handleChange} name="price" type="number" required/></p>
                    <p>Описание:<br/><textarea onChange={handleChange} name="description" type="text" rows="5" required/></p>
                    <p>Изображение:</p>
                    <input onChange={handleFile} name="image" type="file"/><br/>
    
                    <center><input className="submit" type="submit" value="Отправить" /></center>
                </form>
    
                {popUp ? <Messages
                    message={error ? 'Произошла ошибка!' : 'Успешно добавлено!'}
                    color={!error ? 'rgba(124, 255, 119, 0.7)' : 'rgba(255, 119, 119, 0.7)'}
                    closePopup={() => setPopUp(false)}/> : null
                }
            </div>
        )
    }
    else {
        return <Redirect to="/" />
    }
}

function UpdateItem(props) {
    const [item, setItem] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        axios
            .get('/api/products/' + props.match.params.id)
            .then((response) => {
                setItem(response.data)
            })
    }, []);

    function handleChange(e) {
        if (e.target.name === 'price') {
            item[e.target.name] = Number(e.target.value)
        }
        else {
            item[e.target.name] = e.target.value
        }
    }

    function handleFile(e) {
        item[e.target.name] = e.target.files[0]
    }

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        Object.keys(item).forEach(function(key) {
            formData.append('product[' + key + ']', item[key])
        });

        e.preventDefault()
        $.ajax({
            url: '/api/products/' + props.match.params.id,
            method: 'PATCH',
            data: formData,
            contentType: false,
            processData: false

        })
        .done((response) => {
            $("input").val("");
            $("textarea").val("");
            setPopUp(true)
        })
        .catch((error) => {
            setPopUp(true)
            setError(true)
        });
    }

    return (
        <div className="add_form">
            <Helmet><title>Добавление товара</title></Helmet>

            <form onSubmit={handleSubmit}>
                <p>Название книги:<br/><input onChange={handleChange} name="name" type="text" defaultValue={item.name} /></p>
                <p>Автор:<br/><input onChange={handleChange} name="author" type="text" defaultValue={item.author} /></p>
                <p>Цена:<br/><input onChange={handleChange} name="price" type="number" defaultValue={item.price} /></p>
                <p>Описание:<br/><textarea onChange={handleChange} name="description" type="text" rows="5" defaultValue={item.description} /></p>
                <p>Изображение:</p>
                <input onChange={handleFile} name="image" type="file"/><br/>

                <center><input className="submit" type="submit" value="Отправить" /></center>
            </form>

            {popUp ? <Messages
                message={error ? 'Произошла ошибка!' : 'Успешно изменено!'}
                color={!error ? 'rgba(124, 255, 119, 0.7)' : 'rgba(255, 119, 119, 0.7)'}
                closePopup={() => setPopUp(false)}/> : null
            }
        </div>
    )
}

export { AddItem, UpdateItem }