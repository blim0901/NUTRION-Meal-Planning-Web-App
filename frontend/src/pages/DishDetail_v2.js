import React, { useState, useContext, useParams, useReducer, useEffect } from 'react';
import '../styles/DishDetail.css';
import { FaShoppingCart, FaClock, FaUsers } from 'react-icons/fa';
import Chip from '@material-ui/core/Chip';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { grey } from "@material-ui/core/colors";
import { withStyles } from '@material-ui/core/styles';
import DirectionsAccordian from '../components/DirectionsAccordian'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import VisibilitySensor from "react-visibility-sensor";
import { userContext, generalContext } from '../contexts';
import { useLocation } from 'react-router';
import async from 'async';
import axios from 'axios';

const score = 66;

const BlackCheckbox = withStyles({
    root: {
        color: grey[900],
        '&$checked': {
            color: grey[900],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const StyledFormControlLabel = withStyles({
    label: {
        fontFamily: "Abhaya Libre",
    },
})(FormControlLabel)


export default function DishDetail_v2(props) {

    const general = useContext(generalContext);
    const user = useContext(userContext);

    const {path} = useLocation();
    useEffect(() => {
        console.log("ok")
        document.querySelector('body').scrollTo({
            top:0
        })
    }, [path]);

    const [inFav, setInFav] = useState(false);

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    useEffect(async () => {
        if(user.userId){
            console.log("Fetching favourite list of user!")
            let favouriteList = await axios.get('https://cz2006-nutrion.herokuapp.com'+'/favouriteList/'+user.userId);
            general.setGeneralState({
                ...general.generalState, 
                favouriteList: favouriteList.data.dish
            })
            
            favouriteList.data.dish.forEach((data) => {
                if(data.dishId == general.generalState.selectedDish.dishId){
                    setInFav(true);
                    forceUpdate();
                    console.log("istrue");
                }
            })
        }
    }, [inFav]);

    const toggleFav = async (e) => {
        if(user.userId){
            if(inFav == false){
                await axios.put('https://cz2006-nutrion.herokuapp.com'+'/favouriteList/'+user.userId + '/addDish', {
                    dishId: general.generalState.selectedDish.dishId
                });
                setInFav(true);
                forceUpdate();
                console.log("False to true")
            }
            else{
                const res = await axios.put('https://cz2006-nutrion.herokuapp.com'+'/favouriteList/'+user.userId + '/removeDish', {
                    dishId: general.generalState.selectedDish.dishId
                });
                console.log(res)
                setInFav(false);
                forceUpdate();
                console.log("True to false")
            }
        }
    };

    const [state, setState] = React.useState({
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
        checked6: false,
        checked7: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <div>
            <div className="row first-dish-container">
                <div className="col-sm-1 col-md-2"></div>
                <div className="col-sm-10 col-md-8">
                    <div className="row">
                        <div className="col-md-8">
                            <img className="DishDetailImg" src={general.generalState.selectedDish.image.replace("312x231", "636x393")} alt="nthg" />

                            <div className="DishDetail">
                                <p>{general.generalState.selectedDish.summary.replace(/(<([^>]+)>)/gi, "")}</p>

                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="DishDetail">
                                <h2>{general.generalState.selectedDish.title}
                                    <FormControlLabel
                                    
                                        control={<Checkbox checked={inFav} icon={<FavoriteBorder /> } onClick={toggleFav}
                                            checkedIcon={<Favorite />}
                                            name="checkedH"
                                            style={{ margin: "10px" }} />} />
                                </h2>
                                <h5>by {general.generalState.selectedDish.sourceName}</h5>
                                <div style={{ width: "60%" }}>
                                    <VisibilitySensor>
                                        {({ isVisible }) => {
                                            const percentage = isVisible ? general.generalState.selectedDish.healthScore : 0;
                                            return (
                                                <CircularProgressbarWithChildren
                                                    value={percentage}
                                                    styles={buildStyles({ pathColor: '#ffc46c' })}>
                                                    <h4>{percentage}%</h4>
                                                    <h4>Health Score</h4>
                                                </CircularProgressbarWithChildren>

                                            );
                                        }}
                                    </VisibilitySensor>

                                </div>
                                <ul className="fa-ul DishTimePaxIngList">
                                    <li><FaClock /> {general.generalState.selectedDish.readyInMinutes} minutes</li>
                                    <li><FaShoppingCart /> {general.generalState.selectedDish.ingredients.length} ingredients</li>
                                    <li><FaUsers /> {general.generalState.selectedDish.servings} pax </li>
                                </ul>

                                <div className="row DishNutritionList">
                                    <div className="DishNutritionItem col-md-3"><div className="nutrition-data d-flex justify-content-center">{Math.round(parseFloat(general.generalState.selectedDish.nutrition.calories))}</div><div className="nutrition-title d-flex justify-content-center">CALORIES</div></div>
                                    <div className="DishNutritionItem col-md-3"><div className="nutrition-data d-flex justify-content-center">{Math.round(parseFloat(general.generalState.selectedDish.nutrition.carbohydrates))}g</div><div className="nutrition-title d-flex justify-content-center">CARBS</div></div>
                                    <div className="DishNutritionItem col-md-3"><div className="nutrition-data d-flex justify-content-center">{Math.round(parseFloat(general.generalState.selectedDish.nutrition.protein))}g</div><div className="nutrition-title d-flex justify-content-center">PROTEIN</div></div>
                                    <div className="DishNutritionItem col-md-3"><div className="nutrition-data d-flex justify-content-center">{Math.round(parseFloat(general.generalState.selectedDish.nutrition.fat))}g</div><div className="nutrition-title d-flex justify-content-center">FATS</div></div>
                                </div>
                                <div className="dishTags">
                                    <h5>Tags</h5>
                                    <div className="d-flex justify-content-left">
                                        {
                                            general.generalState.selectedDish.tags.map(tag => (
                                                <Chip style={{ backgroundColor: "black", color: "white", 
                                                        fontFamily: 'Abhaya Libre', marginRight: "5px" }} label={tag}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Ingredient">
                            <h2 style={{ fontWeight: "800px", margin: "10px" }}>Ingredients</h2>
                            <div className="ingredientList  d-flex flex-wrap justify-content-between">
                                {
                                    general.generalState.selectedDish.ingredients.map((ingredient) =>
                                    (
                                        <StyledFormControlLabel
                                            control={<BlackCheckbox style={{ fontFamily: 'Abhaya Libre' }} />}
                                            label={ingredient.amount + " " + ingredient.name} />
                                    )

                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <h2 style={{ fontWeight: "800px", marginTop: "20px" }}>Directions</h2>
                        </div>
                        {
                            general.generalState.selectedDish.instructions.map((instruction) =>
                            (
                                <DirectionsAccordian instruction={instruction} />
                            ))
                        }
                    </div>
                </div>
            </div >
        </div>
    );
}
