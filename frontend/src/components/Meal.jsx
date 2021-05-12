import React, {useState, useEffect} from 'react';
import '../styles/Meal.css';

export default function Meal({meal}) {
    
    const [imageUrl, setImageUrl] = useState("");
    const API_KEY = "07bdfcda764443ffbcf11862a56f70f5";

    useEffect(() => {
        fetch(
            'https://api.spoonacular.com/recipes/' + meal.id + '/information?apiKey=' + API_KEY + '&includeNutrition=false'
        )
        .then((response) => response.json())
        .then((data) => {
            setImageUrl(data.image);
        })
        .catch(() => {
            console.log("error");
        })
    }, [meal.id])
    
    return (
        <div className="meal-container">
            <div className="recipeBox">
                <img className="recipeImg" src={imageUrl} alt="recipe" />
                <h2>{meal.title}</h2>
                <ul className="instructions">
                    <li>Preparation time: {meal.readyInMinutes} minutes</li>
                    <li>Number of servings: {meal.servings}</li>
                </ul>
                <a href={meal.sourceUrl}>Go to Recipe</a>
            </div>
        </div>
    )
}

/*
import React, {useState, useEffect} from 'react';
import '../styles/Meal.css';

export default function Meal({meal}) {
    
    const [imageUrl, setImageUrl] = useState("");
    const API_KEY = "3b7e0256fa5446b997301abd6552d9ad";

    useEffect(() => {
        fetch(
            'https://api.spoonacular.com/recipes/' + meal.id + '/information?apiKey=' + API_KEY + '&includeNutrition=false'
        )
        .then((response) => response.json())
        .then((data) => {
            setImageUrl(data.image);
        })
        .catch(() => {
            console.log("error");
        })
    }, [meal.id])
    
    return (
        <div>
            <h1>{meal.title}</h1>
            <img src={imageUrl} alt="recipe" />
            <ul className="instructions">
                <li>Preparation time: {meal.readyInMinutes} minutes</li>
                <li>Number of servings: {meal.servings}</li>
            </ul>

            <a href={meal.sourceUrl}>Go to Recipe</a>
        </div>
        
        
    )
}
*/