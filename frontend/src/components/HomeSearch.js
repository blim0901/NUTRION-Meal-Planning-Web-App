import React, { useContext, useState } from 'react'
import {Link} from "react-router-dom";
import first from "../assets/images/slider/1.jpg";
import sec from "../assets/images/slider/2.jpg";
import '../styles/HomeSearch.css';
import { FaSearch } from 'react-icons/fa';

import { generalContext } from '../contexts';

const HomeSearch = () => {

    const general = useContext(generalContext);
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        console.log(query);

        general.setGeneralState({
            ...general.generalState,
            homePageSearch: query
        })
        setQuery("");
    }

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <div className="search-container">
            <img className="searchImg" src={first} alt={sec} />
            <div class="searchBanner row">
                <div class=" col-sm-3 col-md-3"></div>
                <div class="col-12 col-sm-9 col-md-6">
                    <div className="d-flex flex-wrap justify-content-center search-title">
                        Healthy&Easy
                </div>
                    <div className="d-flex flex-wrap justify-content-center">
                        <div class="input-group searchInput">
                            <input
                                key="random1"
                                placeholder={"Search Recipes"}
                                class="form-control search-form"
                                onChange={handleChange}
                            />
                            <span class="input-group-btn">
                                <Link to={{ pathname: '/dish' }} className="dish-anchor">
                                    <button class="btn btn-primary search-btn" onClick={handleSearch}>
                                        <FaSearch />
                                    </button>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSearch;