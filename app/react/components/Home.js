import React, { useState, useEffect } from "react";
import axios from 'axios'
import Helmet from "react-helmet";

import Product from './Products/Product'
import Messages from './Messages'
import { CartLink } from './Orders/Cart'

export default function Home(props) {
    const [productsData, setProductsData] = useState([]);
    const [load, setLoad] = useState(false);
    const [popUp, setPopUp] = useState(props.message ? true : false);

    useEffect(() => {
        axios
            .get('/api/products')
            .then(response => {
                setProductsData(response.data)
                setLoad(true)
            })
    }, []);

    const products = productsData.map(function(currProduct) {
        return ( <Product key={currProduct.id} data={currProduct} user_role={props.user.user_role} /> )
    })

    return (
        <>
            <Helmet><title>Главная</title></Helmet>

            <div className="set_prodicts">{load ? products : <h3>Загрузка...</h3>}</div>
            
            {popUp
                ? <Messages message={props.message} color={'rgba(255, 196, 0, 0.7)'} closePopup={() => setPopUp(false)} />
                : null
            }

            {props.user.user_id != null ? <CartLink /> : null}
        </>
    )
}