import React, {useState} from 'react'
import '../styles/Button.css'

function Button(props) {

    return(
        <button type="button" onClick={props.onClick} className="button"> {props.text} </button>
    );
}

export default Button;