import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import async from 'async';
import axios from 'axios';

import { FaSearch } from 'react-icons/fa';

import '../styles/SearchResult.css';
import RecipeGrid from '../components/RecipeGrid';
import Loading from './Loading';

import { generalContext } from '../contexts';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SearchResult() {

    const general = useContext(generalContext);

    const [searchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);


    function handleChange(e) {
        setQuery(e.target.value);
    }

    useEffect(async () => {
        if(general.generalState.homePageSearch){
            console.log("Search for home page search result!")
            // let searchInputText =document.getElementsByClassName("searchInputText"); 
            // console.log(searchInputText);
            // searchInputText[0].innerText = general.generalState.homePageSearch;
            general.setGeneralState({
                ...general.generalState,
                homePageSearch: ""
            })
            //setQuery(general.generalState.homePageSearch);
            console.log(`Fetching search(${general.generalState.homePageSearch}) result...`)
            setSearching(true);
            try {
                let dishes = await axios.get('https://cz2006-nutrion.herokuapp.com' + '/dish', {
                    params: {
                        search: general.generalState.homePageSearch
                    }
                });
                setSearchResult(dishes.data);
                console.log(dishes.data)
            }
            catch (err) {
                console.log(err.response)
            }
            setSearching(false);
        }
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
        console.log(`Fetching search(${query}) result...`)
        setSearching(true);
        try {
            let dishes = await axios.get('https://cz2006-nutrion.herokuapp.com' + '/dish', {
                params: {
                    search: query
                }
            });
            setSearchResult(dishes.data);
            console.log(dishes.data)
        }
        catch (err) {
            console.log(err.response)
        }
        setSearching(false);
    }


    return (
        <div className="App search-main">
            <div className="form-inline searchInput" >
                <div className="input-group dish-searchbar">
                    <input
                        key="random1"
                        type="text"
                        className="form-control search-form searchInputText"
                        placeholder="Search Dishes"
                        onChange={handleChange}
                    />

                    <span className="input-group-btn">
                        <button className="btn btn-primary search-btn" onClick={getRecipe}>
                            <FaSearch />
                        </button>
                    </span>
                </div>
            </div>
            {(general.generalState.dishes.length == 0 || searching) ? <Loading /> :
                ((searchResult.length > 0) ? <RecipeGrid recipeData={searchResult} /> :
                    <RecipeGrid recipeData={general.generalState.dishes} />)}
        </div>
    );

}
