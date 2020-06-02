import React from "react";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btn: null
        }
    }
    componentDidMount() {
        if (this.props.user_id != null) {
            this.setState({btn: <a href='/account'>Аккаунт</a>})
        }
        else {
            this.setState({btn: <a href='/users/sign_in'>Вход</a>})
        }
    }
    render() {
        return ( 
            <div className="header">
                <ul>
                    <li><a href='/'>Главная</a><br/></li>
                    <li>{this.state.btn}</li>
                </ul>
            </div>
        )
    }
}