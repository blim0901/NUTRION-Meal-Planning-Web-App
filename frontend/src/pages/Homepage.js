import React, { useState, useEffect, useContext } from 'react';
import async from 'async';
import axios from 'axios';

import HomeSearch from '../components/HomeSearch';
import HomeRecipe from '../components/HomeRecipe';
import '../styles/Homepage.css';

import { generalContext } from '../contexts';

function Homepage() {

    const general = useContext(generalContext);

    useEffect(async () => {
       
        if(general.generalState.homePageDishes.length == 0){
            console.log("Fetching data from API for home page!")
            let dishes = await axios.get('https://cz2006-nutrion.herokuapp.com'+'/dish', {
                params:{
                    number: 4
                }
            });
            
            let mealPlans = await axios.get('https://cz2006-nutrion.herokuapp.com'+'/mealPlan', {
                params:{
                    number: 2
                }
            });
            general.setGeneralState({...general.generalState, homePageDishes: dishes.data, homePageMealPlans: mealPlans.data})
        }
    }, []);

    return (
        <div className="Homepage-container">
            <HomeSearch />
            {/* Recipe recommendation section */}
            <div className="row">
                <div className="col-2 col-sm-2 col-md-1"></div>
                <div className="col-8 col-sm-8 col-md-10">
                    <div className="recipeRecTitle d-flex justify-content-center">
                        Today's Recipes Recommendation
                    </div>
                    <div className="recipeRecDesc d-flex justify-content-center">
                        We will recommend food based on your diet preference.
                    </div>
                    <div className=" d-flex flex-wrap justify-content-center">
                        {general.generalState.homePageDishes.map((dish) => <HomeRecipe recipe={dish}/>)}
                    </div>
                </div>
                <div className="col-2 col-sm-2 col-md-1"></div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="line"></div>
            </div>


            {/* Mealplan recommendation section */}
            <div className="row">
                <div className="col-2 col-sm-2 col-md-1"></div>
                <div className="col-8 col-sm-8 col-md-10">
                    <div className="recipeRecTitle d-flex justify-content-center">
                        Today's Mealplan Recommendation
                    </div>
                    <div className="recipeRecDesc d-flex justify-content-center">
                        We will recommend meal plan based on your diet preference.
                    </div>
                    <div>
                        {
                            general.generalState.homePageMealPlans.map((mealplan) =>
                            (
                                <div className="mealplan-container">
                                    <div className=" d-flex flex-wrap justify-content-center">
                                        { mealplan.dish.map((dish) => (<HomeRecipe recipe={dish}/>)) }
                                    </div>
                                </div>
                            )
                            )
                        }
                    </div>
                </div>
                <div className="col-2 col-sm-2 col-md-1"></div>
            </div>
        </div>
    );
}

export default Homepage;