const express = require('express');

const router = express.Router();

const DishController = require('../controllers/dish-controller')
const FavouriteListController = require('../controllers/favourite-list-controller')

router.get('/:userId', (req, res) => {
    const {userId} = req.params;
    FavouriteListController.getFavouriteList(
        userId, 
        (err, result) => {
            if(err){
                return res.status(500).send({ message: `${err}`})
            }
            else{
                DishController.getDishes({
                    "dishId": {$in: result.dish}
                }, (err, data) =>{
                    if(err) return res.status(500).send({ message: `${err}`})
                    
                    result = {...result._doc, dish: data}
                    return res.status(200).send(result)
                })
            }
        }
    )
})

router.put('/:userId', (req, res) => {
    const {dish, mealPlan} = req.body;
    const {userId} = req.params;

    const updateMap = {}
    if(dish != null) updateMap.dish = dish;
    if(mealPlan != null) updateMap.mealPlan = mealPlan;

    FavouriteListController.updateFavouriteList(
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

router.put('/:userId/addDish', (req, res) => {
    const {dishId} = req.body;
    const {userId} = req.params;

    if(!dishId) return res.status(500).send({ message: `dishId is required`})

    const updateMap = {$addToSet: { dish: dishId } }

    FavouriteListController.updateFavouriteList(
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


router.put('/:userId/removeDish', (req, res) => {
    const {dishId} = req.body;
    const {userId} = req.params;

    if(!dishId) return res.status(500).send({ message: `dishId is required`})

    const updateMap = {$pull: { dish: dishId } }

    FavouriteListController.updateFavouriteList(
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