import React, { useState, useContext, useEffect, useReducer } from 'react'
import { GiPieChart, GiHotMeal } from "react-icons/gi";
import async from 'async';
import axios from 'axios';
import ProgressButton from 'react-progress-button'
import FavouriteList from './FavouriteList';
import MealPlannerSearchList from './MealPlannerSearchList';

import '../styles/MealPlanner.css';
import '../../node_modules/react-progress-button/react-progress-button.css'
import '../styles/CustomProgressButton.css';

import MealPlannerBoard from './MealPlannerBoard'
import Button from './Button'
import MealPlannerChart from './MealPlannerChart'
import { userContext, generalContext } from '../contexts';


const meals = ["Breakfast", "Lunch", "Dinner"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const daysToInt = { "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4, "Saturday": 5, "Sunday": 6 };
const mealsToInt = { "Breakfast": 0, "Lunch": 1, "Dinner": 2 };



function MealPlanner() {
    const [selected, setSelected] = useState("mealplan");
    const [selectedSide, setSelectedSide] = useState("favourite");
    const general = useContext(generalContext);
    const user = useContext(userContext);


    const [buttonState, setButtonState] = React.useState({
        buttonState: '',
    });

    //Meal planner board state
    const [state, setState] = useState([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
    const [nutrition, setNutrition] = useState({
        calories: 0,
        fat: 0,
        carbohydrates: 0,
        protein: 0
    })

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(async () => {
        if (general.generalState.favouriteList.length == 0) {
            console.log("Fetching favourite list of user!")
            let favouriteList = await axios.get('https://cz2006-nutrion.herokuapp.com' + '/favouriteList/' + user.userId);
            let mealPlanner = await axios.get('https://cz2006-nutrion.herokuapp.com' + '/mealPlanner/' + user.userId);
            general.setGeneralState({
                ...general.generalState,
                favouriteList: favouriteList.data.dish,
                mealPlanner: mealPlanner.data.dish
            })
            console.log(mealPlanner.data.dish);
            const newState = state;
            mealPlanner.data.dish.forEach((data) => {
                let idx = mealsToInt[data.mealtype] * 7 + daysToInt[data.day];
                newState[idx].push({
                    id: `${Math.random()}`,
                    content: {
                        ...data.dish
                    }
                })
            })
            setState(newState);
            //console.log(newState);
            forceUpdate();
        }
        else {
            const newState = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            general.generalState.mealPlanner.forEach((data) => {
                let idx = mealsToInt[data.mealtype] * 7 + daysToInt[data.day];
                newState[idx].push({
                    id: `${Math.random()}`,
                    content: {
                        ...data.dish
                    }
                })
            })
            setState(newState);
            forceUpdate();
        }
    }, []);

    const saveMealPlanToDatabase = async (e) => {
        console.log("Saving meal planner to database...");
        const newDish = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 7; j++) {
                state[i * 7 + j].forEach((dish) => {
                    newDish.push({
                        dishId: dish.content.dishId,
                        mealtype: meals[i],
                        day: days[j],
                        dish: dish.content
                    })
                })
            }
        }
        try {
            setButtonState({ buttonState: 'loading' })
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com' + '/mealPlanner/' + user.userId, { "dish": newDish });
            general.setGeneralState({
                ...general.generalState,
                mealPlanner: newDish
            })
            console.log("Meal planner saved to database");
            setButtonState({ buttonState: 'success' })
        } catch (err) {
            console.log(err);
            setButtonState({ buttonState: 'error' })
        }
    }

    //Toggle for planning board - meal plan and nutrient
    const toggleToMealPlan = (e) => {
        setSelected("mealplan");
    }

    const toggleToNutrient = (e) => {
        calculateNutrition(state);
        setSelected("nutrient");
    }

    //Toggle for sidebar-fav or search
    const toggleToFavourite = (e) => {
        setSelectedSide("favourite");
    }

    const toggleToSearch = (e) => {
        setSelectedSide("search");
    }

    const calculateNutrition = (stateData) => {
        const newNutrition = {
            calories: 0,
            fat: 0,
            carbohydrates: 0,
            protein: 0
        }
        stateData.forEach((list) => {
            list.forEach((dish) => {
                if (dish.content.nutrition.calories) newNutrition.calories += parseFloat(dish.content.nutrition.calories.split(' ')[0])
                if (dish.content.nutrition.fat) newNutrition.fat += parseFloat(dish.content.nutrition.fat.split(' ')[0])
                if (dish.content.nutrition.carbohydrates) newNutrition.carbohydrates += parseFloat(dish.content.nutrition.carbohydrates.split(' ')[0])
                if (dish.content.nutrition.protein) newNutrition.protein += parseFloat(dish.content.nutrition.protein.split(' ')[0])
            })
        })
        setNutrition(newNutrition);
        forceUpdate();
    }

    const insertToPlannerBoard = (dish) => {
        return (e) => {
            if (selected == "mealplan") {
                const newState = state;
                newState[0].push({
                    id: `${Math.random()}`,
                    content: {
                        ...dish
                    }
                });
                setState(newState);
                forceUpdate();
            }

        }
    }

    return (
        <div class="wrapMP">
            <div class="left">
                <div className="d-flex justify-content-center">
                    <h4 className={selectedSide == "favourite" ? "active" : ""}><a href="#three" onClick={toggleToFavourite}>Favourite</a></h4>
                    <h4 className={selectedSide == "search"?"active":""}><a href="#four" onClick={toggleToSearch}>Search</a></h4>
                </div>
                <div>
                    {selectedSide=="favourite"?
                    <FavouriteList favouriteList={general.generalState.favouriteList} onChildClick={insertToPlannerBoard} />:
                    <MealPlannerSearchList onChildClick={insertToPlannerBoard}/>
                }
                </div>
                {/* <FavouriteList favouriteList={general.generalState.favouriteList} onChildClick={insertToPlannerBoard} /> */}
            </div>

            <div class="right">
                <div class="button-row justify-content-end">
                    <div class="d-flex flex-row-reverse">
                        <ProgressButton onClick={saveMealPlanToDatabase} state={buttonState.buttonState}>Save</ProgressButton>
                        <Button text="Print" onClick={()=>window.print()}/>
                    </div>
                </div>

                <ul className="tabs group">
                    <li className={selected == "mealplan" ? "active" : ""}> <a href="#one" onClick={toggleToMealPlan}> <GiHotMeal /> Meal Plan </a></li>
                    <li className={selected == "nutrient" ? "active" : ""}> <a href="#two" onClick={toggleToNutrient}> <GiPieChart /> Nutrient </a></li>
                </ul>

                <div id="content">
                    {selected == "mealplan" ?
                        <MealPlannerBoard state={state} setState={setState} /> :
                        <MealPlannerChart nutrition={nutrition} />}
                </div>
            </div>
        </div>

    );


}

export default MealPlanner;