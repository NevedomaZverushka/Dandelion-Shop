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

const Messages = ({ closePopup, color, message }) => {
  useEffect(() => {
    window.onclick = function (event) {
      console.log("here");
      if (event.target !== document.getElementById("popup_inner")) {
        closePopup();
      }
    };
  }, []);

  return (
    <div className="popup">
      <div
        id="popup_inner"
        className="popup_inner"
        style={{
          backgroundColor: color || "none",
        }}
      >
        <h1>{message || "Ошибка!"}</h1>
      </div>
    </div>
  );
};

export default Messages;
