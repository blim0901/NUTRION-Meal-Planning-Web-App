import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import '../styles/ShortRecipe.css';

import { generalContext } from '../contexts';

export default function ShortRecipe(props) {
    const general = useContext(generalContext);

    return (
        <div className="short-recipe">
            <Link to={{pathname:'/recipe'}} className="dish-anchor">
                <div className="recipeBox2" onClick={()=>{
                        general.setGeneralState({...general.generalState, selectedDish: props.recipe});
                    }}>
                    <img className="recipeImg" src={props.recipe.image} alt="recipe" />
                    <h2 className="recipeTitle">{props.recipe.title}</h2>
                    <ul className="instructions">
                        <li>Calories: {Math.round(parseFloat(props.recipe.nutrition.calories))} kcal</li>
                    </ul>

                </div>
            </Link>
        </div>
    )
}


/*
import React, {useState, useEffect} from 'react';
import '../styles/SearchResult.css';

export default function ShortRecipe({recipe}) {
    
    const [imageUrl, setImageUrl] = useState("");
    const API_KEY = "3b7e0256fa5446b997301abd6552d9ad";

    function handleImage(recipe) {
        setImageUrl(recipe.image);
    }

    useEffect(() => {
        handleImage(recipe);
    })
    
    return (
        <article>
            <h1>{recipe.title}</h1>
            <img src={imageUrl} alt="recipe" />
            <ul className="instructions">
                <li>Calories: </li>
            </ul>

        </article>
    )
}
*/