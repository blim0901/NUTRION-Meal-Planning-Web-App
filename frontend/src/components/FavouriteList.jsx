import React from 'react';
import FavouriteComponent from './FavouriteComponent';

export default function FavouriteList(props) {
    const favList = props.favouriteList;
    return (
        <div>
            <div className="FavouriteList justify-content-center">
                {favList.map((dish) => (
                    <FavouriteComponent recipe={dish} onClick={props.onChildClick(dish)}/>
                ))}
            </div>
        </div>
    )
}
