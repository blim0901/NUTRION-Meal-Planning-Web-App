const mongoose = require('mongoose')
const DishModel = mongoose.model("Dish")
const { v4: uuidv4 } = require('uuid');
const SpoonacularController = require('../controllers/spoonacular-controller')

module.exports['getDishes'] = async function(filterMap, callback){
    let number = 200;
    if(filterMap.number && filterMap.number < number) number = filterMap.number
    delete filterMap.number;
    
    try{
        const res = await DishModel.find(filterMap, null, {limit: number});
        callback(null, res)
    }catch(err){
        callback(err)
    }
}

module.exports['getDishesForMealPlans'] = async function(mealPlan, callback){
    try{
        for(let j = 0; j < mealPlan.length; j++){
            for(let i = 0; i < mealPlan[j].dish.length; i++){
                let dishId = mealPlan[j].dish[i].dishId;
                //console.log(dishId)
                
                const res = await DishModel.find({dishId: dishId});

                if(res.length > 0) mealPlan[j].dish[i] = res[0];
                    
                else{
                    console.log("Fetching api from Spoonacular, dishId =", dishId);
                    await SpoonacularController.getDishByIds(
                        [dishId], 
                        (err, data) => {
                            if(err){
                                callback(err);
                                return
                            }
                            mealPlan[j].dish[i] = data[0];
                        }
                    )
                }
                
            }
        }

        callback(null, mealPlan);
    }catch(err){
        callback(err)
    }
}

module.exports['addDish'] = function (dish, callback) {
    DishModel.find({dishId: dish.dishId},(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            if(result.length > 0){
                callback({"error": "This dish already exist in database"}, null)
                return
            }
            DishModel.create([dish]).then(result => {
                callback(null, result[0])
            }).catch(err => {
                console.log(err)
                callback(err)
            })
        }
    })
}
