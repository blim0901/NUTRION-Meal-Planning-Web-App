import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {FaSearch} from 'react-icons/fa';
import Loading from '../pages/Loading';
import { generalContext } from '../contexts';
import FavouriteComponent from './FavouriteComponent';

export default function MealPlannerSearchList(props) {
    const general = useContext(generalContext);

    const [searchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);

    function handleChange(e) {
        setQuery(e.target.value);
    }

    useEffect(async () => {
        if (general.generalState.dishes.length == 0) {
            console.log("Fetching data from API for dish page!")
            let dishes = await axios.get('https://cz2006-nutrion.herokuapp.com' + '/dish', {
                params: {
                    number: 200
                }
            });
            general.setGeneralState({ ...general.generalState, dishes: dishes.data })
        }
    }, []);

    async function getRecipe(e) {
        console.log("Fetching search result...")
        setSearching(true);
        try{
            let dishes = await axios.get('https://cz2006-nutrion.herokuapp.com'+'/dish', {
                params:{
                    search: query
                }
            });
            setSearchResult(dishes.data);
            console.log(dishes.data)
        }
        catch(err){
            console.log(err.response)
        }
        setSearching(false);
    }

    return (
        <div>
            <div className="App search-main">
                    <div class="form-inline searchInput" >
                        <div class="input-group dish-searchbar">
                            <input
                                key="random1"
                                type="text"
                                placeholder="Search Dishes"
                                class="form-control search-form"
                                onChange={handleChange}
                            />

                            <span class="input-group-btn">
                                <button class="btn btn-primary search-btn" onClick={getRecipe}>
                                    <FaSearch />
                                </button>
                            </span>
                        </div>
                    </div>
                    {(general.generalState.dishes.length == 0 || searching) ? <Loading /> :
                        ((searchResult.length > 0) ? 
                        <div className="FavouriteList justify-content-center">
                            {searchResult.map((dish) => (
                            <FavouriteComponent recipe={dish} onClick={props.onChildClick(dish)}/>
                        ))} 
                        </div>:
                        <div className="FavouriteList justify-content-center">
                            {general.generalState.dishes.map((dish)=>(
                                <FavouriteComponent recipe={dish} onClick={props.onChildClick(dish)}/>
                            ))}
                        </div>)}
                </div>
        </div>
    )
}
