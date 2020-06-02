import React, { useEffect } from "react";

// export default function Messages(props) {
//     useEffect(() => {
//         setTimeout(props.closePopup, 3000)
//         window.onclick = function(event) {
//             console.log('here')
//             if (event.target !== document.getElementById('popup_inner')) {
//                 props.closePopup()
//             }
//         }
//     })
    
//     return (
//         <div className='popup'>
//             <div className='popup_inner' style={{backgroundColor: props.color ? props.color : 'none' }}>
//                 <h1>{props.message ? props.message : null}</h1>
//             </div>
//         </div>
//     )
// }

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: true
        }
    }
    componentDidMount() {
        window.onclick = function(event) {
            console.log('here')
            if (event.target !== document.getElementById('popup_inner')) {
                props.closePopup()
            }
        }
    }
    
    render() {
        return (
            <div className='popup'>
                <div id="popup_inner" className='popup_inner' style={{backgroundColor: this.props.color ? this.props.color : 'none' }}>
                    <h1>{this.props.message ? this.props.message : "Ошибка!"}</h1>
                </div>
            </div>
        )
    }
}