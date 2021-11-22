import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

import Messages from "../Messages";
//import default_avatar from 'images/default_avatar.jpg'

export default function Product(props) {
  const [user, setUser] = useState(props.user_role);
  const [popUp, setPopUp] = useState(false);

  function handleChange(id) {
    axios.delete("api/products/" + id).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      } else {
        setPopUp(true);
      }
    });
  }
  function handleAddItem(data) {
    const cookies = new Cookies();
    const setProducts = cookies.get("activeOrder");
    console.log(cookies.get("activeOrder"));

    if (setProducts.products.length != 0) {
      let flag = false;
      setProducts.products.forEach((product) => {
        if (product.product_data.id === data.id) {
          product.count += 1;
          flag = true;
        }
      });

      if (!flag) {
        setProducts.products.push({ count: 1, product_data: data });
      }
    } else {
      setProducts.products.push({ count: 1, product_data: data });
    }
    cookies.set("activeOrder", setProducts);
  }

  return (
    <div className="product">
      <div
        className="img"
        style={{
          backgroundImage: props.data.image_url
            ? "url(" + props.data.image_url + ")"
            : "url(http://localhost:3000/packs/media/images/default_avatar-826a3503.jpg)",
        }}
      />
      <div>
        <h3>
          {props.data.name} - {props.data.author}
        </h3>
        <p className="description">{props.data.description}</p>
        <p className="price">Цена: {props.data.price} грн.</p>
        <p className="price">
          Залог: {Math.round(props.data.price * 0.2)} грн.
        </p>
      </div>
      <center style={{ display: user != null ? "" : "none" }}>
        <button onClick={() => handleAddItem(props.data)}>
          Добавить в корзину
        </button>
      </center>
      <div
        className="admin_product_block"
        style={{ textAlign: "center", display: user == 1 ? "" : "none" }}
      >
        <button onClick={() => handleChange(props.data.id)}>Удалить</button>
        <Link to={"/update/" + props.data.id}>Изменить данные</Link>
      </div>

      {popUp ? (
        <Messages
          message={"Произошла ошибка!"}
          color={"rgba(255, 119, 119, 0.7)"}
          closePopup={() => setPopUp(false)}
        />
      ) : null}
    </div>
  );
}
