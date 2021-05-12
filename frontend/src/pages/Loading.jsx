import React from 'react'
import '../styles/Loading.css'
import logo from '../assets/images/nutrion-black.png'

export default function Loading() {
    return (
        <div>
            <section class="wrapper">
                
                <div className="spinner">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                
                </div>
                <div className="loading-text">
                    <h2><b>LOADING</b><br/><h3>We're getting your recipes ready...</h3></h2>
                </div>
            </section>
        </div>
    )
}