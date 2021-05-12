const express = require('express');

const router = express.Router();

const DishController = require('../controllers/dish-controller')
const MealPlannerController = require('../controllers/meal-planner-controller')

router.get('/:userId', (req, res) => {
    const {userId} = req.params;
    MealPlannerController.getMealPlanner(
        userId, 
        async (err, result) => {
            if(err){
                return res.status(500).send({ message: `${err}`})
            }
            else{
                const mealplan = result.toObject();
                mealplan.totalNutrition = {
                    "calories": 0,
                    "fat": 0,
                    "carbohydrates": 0,
                    "protein": 0
                }
                for(let i = 0; i < mealplan.dish.length; i++){
                    await DishController.getDishes({
                        "dishId": mealplan.dish[i].dishId
                    }, (err, data) =>{
                        data = data[0]
                        if(err) return res.status(500).send({ message: `${err}`})
                        mealplan.dish[i].dish = data;
                        mealplan.totalNutrition.calories += parseFloat(data.nutrition.calories.split(' ')[0])
                        mealplan.totalNutrition.fat += parseFloat(data.nutrition.fat.split(' ')[0])
                        mealplan.totalNutrition.carbohydrates += parseFloat(data.nutrition.carbohydrates.split(' ')[0])
                        mealplan.totalNutrition.protein += parseFloat(data.nutrition.protein.split(' ')[0])
                    })
                }
                return res.status(200).send(mealplan)
            }
        }
    )
})

router.put('/:userId', (req, res) => {
    const {dish} = req.body;
    const {userId} = req.params;

    let updateMap = {}
    if(dish) updateMap = {$set: {dish: dish}}

    MealPlannerController.updateMealPlanner(
        userId,
        updateMap,
        (err, result) => {
        if(err){
            return res.status(500).send({ message: `${err}`})
        }
        else{
            return res.status(200).send(result)
        }
    })
})

module.exports = router