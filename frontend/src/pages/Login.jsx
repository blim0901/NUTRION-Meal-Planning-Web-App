import axios from 'axios';
import async from 'async';
import React, {useState, useContext} from 'react';
import {Link, Redirect} from "react-router-dom";
import '../styles/Login.css';
import logo from '../assets/images/nutrion-black.png'


export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const login = async(e) => {
        e.preventDefault();
    
        const form = { 
            email: email,
            password: password,
        }

        console.log(form)

        // Call API provided by Backend
        try{
            const res = await axios.post('https://cz2006-nutrion.herokuapp.com/user/login', form);
            console.log(res.data);
            props.setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data))
            // Redirect to HomePage, Login Button > Logout Button in NavBar, update generalStates
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data); // => the response payload
                setErrorMessage(error.response.data.message)
            }
        }

    }

    return (
        <div className="background-container">
            <div className="log-container">
                <div><img className="logo" src={logo} alt=""/></div>

                <div className="log-form">
                    <article className="card-body mx-auto" style={{maxWidth: "400px"}}>

                        <h1 className="card-title mt-3 text-center">Account Login</h1>

                        <form>
                            <div className="form-group input-group">
                                <input onChange={e=>setEmail(e.target.value)} name="" className="form-control" placeholder="Email address" type="email"/>
                            </div> 

                            <div className="form-group input-group">
                                <input onChange={e=>setPassword(e.target.value)} name="" className="form-control" placeholder="Password" type="password"/>
                            </div> 

                            {errorMessage==""?"":<p className="error-message">{errorMessage}</p>}

                            <div className="login-button">
                                <button onClick={login} className="btn btn-dark btn-block">Login</button>
                            </div> 
                            <p className="text-center">Don't have an account? <Link to="/register">Register now!</Link> </p>                                                                 
                        </form>
                    </article>
                </div>
            </div>
        </div>
    )
}