import '../styles/MealPlanResult.css';
import React, {useEffect, useState, useContext} from 'react';
import MealList from "../components/MealList";
import async from 'async';
import axios from 'axios';
import {FaSearch} from 'react-icons/fa';

import Loading from './Loading';

import { generalContext } from '../contexts';

export default function MealPlanResult() {
    const general = useContext(generalContext);

    const [searchResult, setSearchResult] = useState([]);
    const [calories, setCalories] = useState(2000);
    const [searching, setSearching] = useState(false);

    function handleChange(e) {
        setCalories(e.target.value);
    }
    
    useEffect(async () => {
        if(general.generalState.mealPlans.length == 0){
            console.log("Fetching data from API for mealplan page!")
            let mealPlans = await axios.get('https://cz2006-nutrion.herokuapp.com'+'/mealPlan', {
                params:{
                    number: 15
                }
            });
            general.setGeneralState({...general.generalState, mealPlans: mealPlans.data})
            console.log(mealPlans.data)
        }
        
    }, []);

    const getMealData = async (e) => {
        setSearching(true);
        console.log("Fetching search result...")
        try{
            let mealPlans = await axios.get('https://cz2006-nutrion.herokuapp.com'+'/mealPlan', {
                params:{
                    number: 10,
                    calories: calories
                }
            });
            setSearchResult(mealPlans.data);
        }
        catch(err){
            console.log(err.response)
        }
        setSearching(false);
    }

    
    return (
        <div className="App meal-plan-main">
            <div class="form-inline searchInput" >
                <div class="input-group meal-plan-input">
                <input
                    type = "number"
                    key="random1"
                    placeholder="Calories (e.g. 2000)"
                    class="form-control search-form"
                    onChange = {handleChange}
                />
                <span class="input-group-btn">
                    <button class="btn btn-primary search-btn"  onClick={getMealData}>
                    <FaSearch /> 
                    </button>
                </span>
                </div>
            </div>
            {(general.generalState.mealPlans.length == 0 || searching)?<Loading/>:
            ((searchResult.length > 0)?<MealList mealPlans={searchResult} />:
                            <MealList mealPlans={general.generalState.mealPlans} />)}

        </div>
    );

}






/*
import '../styles/MealPlanResult.css';
import React, {useEffect, useState} from 'react';
import MealList from "../components/MealList";
//import logo from '../images/nutrion-black.png'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';




export default function MealPlanResult() {
    
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2000);
    const API_KEY = "3b7e0256fa5446b997301abd6552d9ad";

    function handleChange(e) {
        setCalories(e.target.value);
    }

    function getMealData() {
        fetch(
            'https://api.spoonacular.com/mealplanner/generate?apiKey=' + API_KEY + '&timeFrame=day&targetCalories=' + calories
        )
        .then((response) => response.json())
        .then((data) => {
            setMealData(data);
        })
        .catch(() => {
            console.log("error");
        });
    }

    
    return (
        <div className="App">
            <section className="controls">
                <input type = "number" placeholder = "Calories (e.g. 2000)" onChange = {handleChange}/>
            </section>
            <button onClick={getMealData}>Get Daily Meal Plan</button>
            {mealData && <MealList mealData={mealData} />}
        </div>
    );

}
*/