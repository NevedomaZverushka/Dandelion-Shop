import React from "react";
import axios from "axios";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

import Header from "./Header/Header";
import Home from "./Home";
import Account from "./Account/Account";
import { AddItem, UpdateItem } from "./Products/Edit";
import NewAdmin from "./Account/NewAdmin";
import { Cart, Order } from "./Orders/Cart";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { user_id: null, user_role: null, user_name: null, orders: [] },
      message: this.props.notice,
      load: false,
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("id")) {
      axios.get("/users/" + cookies.get("id")).then((response) => {
        this.setState({
          user: {
            user_id: response.data.id,
            user_role: response.data.role,
            user_name: response.data.name,
            orders: response.data.orders,
          },
        });

        const currOrder = this.state.user.orders.find(
          (order) => order.order_id === response.data.active_order_id
        );
        if (currOrder) {
          cookies.set("activeOrder", currOrder);
        } else {
          cookies.set("activeOrder", {
            created_at: "",
            order_id: null,
            products: [],
            status: 0,
            user_id: this.state.user.user_id,
          });
        }
        this.setState({ load: true });
      });
    } else {
      cookies.set("activeOrder", {
        created_at: "",
        order_id: null,
        products: [],
        status: 0,
        user_id: this.state.user.user_id,
      });
      this.setState({ load: true });
    }
  }
  render() {
    if (this.state.load) {
      return (
        <BrowserRouter>
          <div className="App">
            <Header user_id={this.state.user.user_id} />
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Home message={this.state.message} user={this.state.user} />
                )}
              />
              <Route
                exact
                path="/account"
                component={() => <Account user={this.state.user} />}
              />
              <Route
                exact
                path="/account/add"
                component={() => <AddItem role={this.state.user.user_role} />}
              />
              <Route exact path="/update/:id" component={UpdateItem} />
              <Route
                exact
                path="/account/new_admin"
                component={() => <NewAdmin user={this.state.user} />}
              />
              <Route
                exact
                path="/account/cart"
                component={() => <Cart user={this.state.user} />}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </BrowserRouter>
      );
    } else {
      return null;
    }
  }
}
