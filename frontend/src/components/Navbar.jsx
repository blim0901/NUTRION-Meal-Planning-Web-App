import React, { useState, useContext, useEffect, useReducer } from 'react';
import { Link } from "react-router-dom";
import '../styles/Navbar.css'
import '../assets/images/nutrion-black.png';
import logo from '../assets/images/nutrion-white.png';
import '../styles/Navbar.css';

import { generalContext, userContext } from '../contexts';

function Navbar(props) {

    const user = useContext(userContext);
    const general = useContext(generalContext);

    return (
        <nav class="navbar navbar-dark navbar-expand-md bg-faded justify-content-center">
            <div class="container">
                <a href="/" class="navbar-brand d-flex w-50 me-auto">
                    <Link to="/">
                        <img className="logo" src={logo} alt="" />
                    </Link>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsingNavbar3">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse w-100" id="collapsingNavbar3">
                    <ul class="nav navbar-nav ms-auto w-100 justify-content-end">
                        <li class="nav-item">
                            <Link to="/dish" className="nav-link">Dishes</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/mealplan" className="nav-link">Meal Plans</Link>
                        </li>
                        {user.userId ?
                            <>
                                <li class="nav-item">
                                    <Link to="/planner" className="nav-link">Planner</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/profile" className="nav-link">Profile</Link>
                                </li>
                            </> :
                            <></>
                        }
                        {user.userId ? <li class="nav-item" onClick={general.logout}>
                            <Link to="/" className="nav-link">Logout</Link>
                        </li> :
                            <li class="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;