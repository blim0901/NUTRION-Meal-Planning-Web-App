import React, {useState} from 'react'
import '../styles/Button.css'

function SearchBar(props) {
    return(
        <button className="button"> {props.text} </button>
    );
}

export default Button;