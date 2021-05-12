import React from 'react'
import '../styles/ProfileOverview.css'

export default function ProfileOverview(props) {
    return (
        <div className="overview-container">

            <h1>Overview</h1>
            <h3>Health Conditions</h3>
            <div className="condition-container">
                <ul>
                    {props.user.healthCondition.map((condition) => (
                                    <li>{condition}</li>
                                ))}
                </ul>
            </div>

            <h3>Lacking Nutrients</h3>
            <div className="lack-container">
                <ul>
                    {props.user.lackingNutrient.map((nutrient) => (
                                        <li>{nutrient}</li>
                                    ))}
                </ul>
            </div>
        </div>
    )
}
