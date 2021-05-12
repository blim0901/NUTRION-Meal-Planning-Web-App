const express = require('express');

const router = express.Router();

const DishController = require('../controllers/dish-controller')
const SpoonacularController = require('../controllers/spoonacular-controller')
const MealPlanController = require('../controllers/meal-plan-controller')

router.get('/', async (req, res) => {
    const queryMap = {}

    const {calories, number} = req.query;

    if(calories) queryMap["nutrition.calories"] = {$lt: parseInt(calories)};
    if(number) queryMap['number'] = parseInt(number)

    MealPlanController.getMealPlans(
        queryMap,
        (err, result) => {
            if(err){
                return res.status(500).send({ message: `${err}`})
            }
            else{
                DishController.getDishesForMealPlans(result, (err, data) => {
                    if(err) return res.status(500).send({message: `${err}`})
                    else return res.status(200).send(data)
                })
               
            }
        }
    )
})

router.get('/:mealPlanId', (req, res) => {
    const {mealPlanId} = req.params;
    const queryMap = {mealPlanId: mealPlanId}
    MealPlanController.getMealPlans(
        queryMap, 
        (err, result) => {
            if(err){
                return res.status(500).send({ message: `${err}`})
            }
            else{
                return res.status(200).send(result[0])
            }
        }
    )
})

router.post('/', (req, res) => {
    const {dish} = req.body; //without id
    MealPlanController.addMealPlan(
        {dish: dish}, 
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