import React from 'react';
import Meal from "./Meal"
import '../styles/MealList.css';
import HomeRecipe from '../components/HomeRecipe';

export default function MealList({ mealPlans }) {
    const mealPlan = mealPlans[0];
    return (
        <main>
            <div className=" d-flex justify-content-center">
                <h2>Here are the meal plans based on your calorie requirement!</h2>
            </div>

            {mealPlans.map(mealPlan => (
                <div className="mealplan-container">
                    <div className="nutrients-container">
                        <p>Calories: {Math.round(mealPlan.nutrition.calories)} kcal<span> | </span>Carbohydrates: {Math.round(mealPlan.nutrition.carbohydrates)} g<span> | </span> Fat: {Math.round(mealPlan.nutrition.fat)} g<span> | </span>Protein: {Math.round(mealPlan.nutrition.protein)} g</p>
                    </div>
                    <div className=" d-flex flex-wrap justify-content-center">
                        {mealPlan.dish.map((dish) => (<HomeRecipe recipe={dish}/>))}
                    </div>
                </div>
            ))}

        </main>
    );
}



/*
import React from 'react';
import Meal from "./Meal"
import '../styles/MealPlanResult.css';

export default function MealList({mealData}) {

    const nutrients = mealData.nutrients;

    return (
        <main>
            <section className="nutrients">
                <h1>Recommended Meal Plan</h1>
                <ul>
                    <li>Calories: {nutrients.calories}</li>
                    <li>Fat: {nutrients.fat}</li>
                    <li>Carbohydrates: {nutrients.carbohydrates}</li>
                    <li>Protein: {nutrients.protein}</li>
                </ul>
            </section>

            <section className="meals">
                {mealData.meals.map((meal) => {
                    return <Meal key={meal.id} meal={meal} />;
                })}
            </section>

        </main>
    );
}

*/