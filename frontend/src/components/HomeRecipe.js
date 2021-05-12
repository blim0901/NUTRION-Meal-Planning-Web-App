import React, {useContext} from 'react';
import {Link} from "react-router-dom";

import '../styles/HomeRecipe.css';

import { generalContext } from '../contexts';

export default function HomeRecipe(props) {
    const general = useContext(generalContext);

    return (
        <div className="home-recipe-container">
            <Link to={{pathname:'/recipe'}} className="dish-anchor">
                <div className="recipeBox" onClick={()=>{
                        general.setGeneralState({...general.generalState, selectedDish: props.recipe});
                    }}>
                    <img className="recipeImg" src={props.recipe.image} alt="None"/>
                    <h2>{props.recipe.title}</h2>
                    <p>The total calories is {Math.round(parseFloat(props.recipe.nutrition.calories))} kcal. 
                    Total time taken is {props.recipe.readyInMinutes} minutes.</p>
                </div>
            </Link>
        </div>
    );
}    
