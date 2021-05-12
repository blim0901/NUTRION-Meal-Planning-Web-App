const mongoose = require('mongoose')
const MealPlanModel = mongoose.model("MealPlan")
const { v4: uuidv4 } = require('uuid');

module.exports['getMealPlans'] = function(filterMap, callback){

    let number = 30;
    if(filterMap.number && filterMap.number < number) number = filterMap.number
    delete filterMap.number;

    MealPlanModel.find(filterMap, null, {limit: number}, (err,result)=>{
        if(err){
            callback(err)
        }
        else{
            callback(null,result)
        }
    })
}

module.exports['addMealPlan'] = function (mealPlan, callback) {
    mealPlan['mealPlanId'] = uuidv4()
    MealPlanModel.create([mealPlan]).then(result => {
        callback(null, result[0])
    }).catch(err => {
        console.log(err)
        callback(err)
    })
}
