import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router';
import axios from 'axios'
import Helmet from "react-helmet";

import Messages from '../Messages'

function sortById(arr) {
    arr.sort((a, b) => a.id > b.id ? 1 : -1);
}

export default function NewAdmin(props) {
    const [client, setClient] = useState( !props.user.user_id ? null : props.user.user_role );
    const [usersData, setUsersData] = useState([]);
    const [load, setLoad] = useState(false);
    const [popUp, setPopUp] = useState(false)
    
    useEffect(() => {
        axios
            .get('/users')
            .then(response => {
                console.log(response.data)
                setUsersData(response.data)
                setLoad(true)
            })
    }, []);

    function handleAdmin(e) {
        axios
            .post('/make_admin', {id: e.target.name})
            .then((response) => {
                window.location.reload()
            })
            .catch((error) => {
                setPopUp(true)
            });
    }
    function handleUser(e) {
        axios
            .post('/remove_admin', {id: e.target.name})
            .then((response) => {
                window.location.reload()
            })
            .catch((error) => {
                setPopUp(true)
            });
    }

    sortById(usersData);
    const users = usersData.map(function(currUser) {
        return(
            <p key={currUser.id}>
                {currUser.id}. {currUser.name} - <em>{currUser.role ? 'Администратор' : 'Пользователь'}</em><br/>
                { currUser.role
                    ? <button onClick={handleUser} name={currUser.id}>Убрать из администраторов</button>
                    : <button onClick={handleAdmin} name={currUser.id}>Сделать администратором</button>
                }
            </p>
        )
    })

    if (client == 1) {
        return (
            <div className="new_admin">
                <Helmet><title>Добавить администратора</title></Helmet>

                <h3>Список авторизированных пользователей:</h3>
                <>{load ? users : <h3>Загрузка...</h3>}</>

                {popUp ? <Messages
                    message={'Произошла ошибка!'}
                    color={'rgba(255, 119, 119, 0.7)'}
                    closePopup={() => setPopUp(false)}/> : null
                }
            </div>
        )
    }
    else {
        return <Redirect to="/" />
    }
}

// export default class NewAdmin extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             client: !this.props.user.user_id ? null : this.props.user.user_role,
//             usersData: [],
//             load: false,
//             popUp: false
//         }
//         this.handleAdmin = this.handleAdmin.bind(this);
//         this.handleUser = this.handleUser.bind(this);
//     }
//     componentDidMount() {
//         axios
//         .get('/users')
//         .then(response => {
//             console.log(response.data)
//             this.setState({usersData: response.data})
//             this.setState({load: true})
//         })
//         sortById(this.state.usersData);
//     }

//     handleAdmin(e) {
//         axios
//             .post('/make_admin', {id: e.target.name})
//             .then((response) => {
//                 window.location.reload()
//             })
//             .catch((error) => {
//                 this.setState({popUp: true})
//             });
//     }
//     handleUser(e) {
//         axios
//             .post('/remove_admin', {id: e.target.name})
//             .then((response) => {
//                 window.location.reload()
//             })
//             .catch((error) => {
//                 this.setState({popUp: true})
//             });
//     }

//     render() {
//         const users = this.state.usersData.map(function(currUser) {
//             return(
//                 <p key={currUser.id}>
//                     {currUser.id}. {currUser.name} - <em>{currUser.role ? 'Администратор' : 'Пользователь'}</em><br/>
//                     { currUser.role
//                         ? <button onClick={handleUser} name={currUser.id}>Убрать из администраторов</button>
//                         : <button onClick={handleAdmin} name={currUser.id}>Сделать администратором</button>
//                     }
//                 </p>
//             )
//         })

//         if (this.state.client == 1) {
//             return (
//                 <div className="new_admin">
//                     <Helmet><title>Добавить администратора</title></Helmet>
    
//                     <h3>Список авторизированных пользователей:</h3>
//                     <>{this.state.load ? users : <h3>Загрузка...</h3>}</>
    
//                     {this.state.popUp ? <Messages
//                         message={'Произошла ошибка!'}
//                         color={'rgba(255, 119, 119, 0.7)'}
//                         closePopup={() => this.setState({popUp: false})}/> : null
//                     }
//                 </div>
//             )
//         }
//         else {
//             return <Redirect to="/" />
//         }
//     }
// }