import React, { Component } from 'react'
import '../styles/FavouriteComponent.css';

export default function FavouriteComponent(props) {
    return (
        <div onClick={props.onClick}>
            <div className="row favrecipeBox">
            <div style={{ padding: 0, borderRadius: "25px" }} className="col-6">
                <img className="favrecipeImg" src={props.recipe.image} alt="None" />
            </div>
            <div className="col-6">
                <div className="favrecipedetails">
                    <h2>{props.recipe.title}</h2>
                    <p>The total calories is {Math.round(parseFloat(props.recipe.nutrition.calories))} kcal. 
                    Total time taken is {props.recipe.readyInMinutes} minutes.</p>
                </div>
            </div>
        </div>
        </div>
    )
    
}
