const axios = require("axios")

const SPOONACULAR_BASE_URL = "https://api.spoonacular.com"
const API_KEY = "f69d4926689b42aebe94b4de56b446fb" 

const DishController = require('./dish-controller');
const MealPlanController = require('./meal-plan-controller');

module.exports['getDishes'] = async function(number, searchKeyWord, callback){
    try {
        const response = await axios.get(SPOONACULAR_BASE_URL+'/recipes/complexSearch', {
            params:{
                apiKey: API_KEY,
                addRecipeInformation: true,
                addRecipeNutrition: true,
                instructionsRequired: true,
                number: number,
                query: searchKeyWord
            }
        });
        
        const ret = []
        if(response.data.results){
            response.data.results.forEach(data => {
                const processedData = addDishToDatabase(data);
                ret.push(processedData);
            })
        }
        callback(null, ret);
    } catch (error) {
        console.error(error);
        callback(error, null);
    }
}

module.exports['getDishByIds'] = async function(ids, callback){
    try {
        const response = await axios.get(SPOONACULAR_BASE_URL+ `/recipes/informationBulk`, {
            params:{
                apiKey: API_KEY,
                includeNutrition: true,
                ids: ids.join()
            }
        });
        
        const ret = []
        if(response.data){
            response.data.forEach(data => {
                const processedData = addDishToDatabase(data);
                ret.push(processedData);
            })
        }
        callback(null, ret);
    } catch (error) {
        console.error(error);
        callback(error, null);
    }
}

module.exports['getMealPlansForWeek'] = async function(callback){
    try {
        const response = await axios.get(SPOONACULAR_BASE_URL+'/mealplanner/generate', {
            params:{
                apiKey: API_KEY,
                timeFrame: "week"
            }
        });
        const ret = []
        for(let key in response.data.week){
            const processedData = addMealPlanToDatabase(response.data.week[key]);
            ret.push(processedData);
            
        }
        console.log("get meal plan done");
        callback(null, ret);
    } catch (error) {
        console.error(error);
        callback(error, null);
    }
}


const addMealPlanToDatabase = (rawMealPlan) => {
    const mealPlan = {}
    mealPlan.dish = []
    rawMealPlan.meals.forEach(data => mealPlan.dish.push({dishId: data.id}));
    mealPlan.nutrition = rawMealPlan.nutrients

    MealPlanController.addMealPlan(mealPlan, (err, data) => {
        if(err){
            console.log(err);
        }
    })

    return mealPlan;
}

const addDishToDatabase = (rawDish) => {
    const dish = {}

    if(rawDish.id != null) dish.dishId = rawDish.id
    if(rawDish.title != null) dish.title = rawDish.title
    if(rawDish.sourceName != null) dish.sourceName = rawDish.sourceName;
    if(rawDish.image != null) dish.image = rawDish.image;
    if(rawDish.summary != null) dish.summary = rawDish.summary;
    if(rawDish.readyInMinutes != null) dish.readyInMinutes = rawDish.readyInMinutes;
    if(rawDish.servings != null) dish.servings = rawDish.servings;
    dish.nutrition = {}
    if(rawDish.nutrition.nutrients != null){
        rawDish.nutrition.nutrients.forEach(data => {
            if(data.name.toLowerCase() == "calories") dish.nutrition.calories =  `${data.amount} ${data.unit}` ;
            if(data.name.toLowerCase() == "fat") dish.nutrition.fat =  `${data.amount} ${data.unit}` ;
            if(data.name.toLowerCase() == "carbohydrates") dish.nutrition.carbohydrates =  `${data.amount} ${data.unit}` ;
            if(data.name.toLowerCase() == "protein") dish.nutrition.protein =  `${data.amount} ${data.unit}` ;
        })
    }
    dish.ingredients = []
    if(rawDish.nutrition.ingredients != null){
        rawDish.nutrition.ingredients.forEach(data => {
            dish.ingredients.push({
                name: data.name,
                amount: `${data.amount} ${data.unit}`
            })
        })
    }
    dish.instructions = []
    if(rawDish.analyzedInstructions != null && rawDish.analyzedInstructions[0] != null && 
        rawDish.analyzedInstructions[0].steps != null){
        rawDish.analyzedInstructions[0].steps.forEach(data =>{
            
            let instruction = {}
            instruction.step = data.step
            instruction.ingredients = []
            if(data.ingredients != null){
                data.ingredients.forEach((ing) => {
                    instruction.ingredients.push(ing.name);
                })
            }
            dish.instructions.push(instruction)
        })
    }
    if(rawDish.healthScore) dish.healthScore = rawDish.healthScore;
    if(rawDish.sourceUrl) dish.sourceUrl = rawDish.sourceUrl;
    if(rawDish.diets) dish.tags = rawDish.diets;

    DishController.addDish(dish, (err, data) => {
        if(err){
            console.log(err);
        }
    })

    return dish;
}