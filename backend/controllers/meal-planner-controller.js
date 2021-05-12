const mongoose = require('mongoose')
const MealPlannerModel = mongoose.model("MealPlanner")
const { v4: uuidv4 } = require('uuid');

module.exports['addMealPlanner'] = function (userId, callback) {
    let data = {
        userId: userId
    }
    MealPlannerModel.create([data]).then(result => {
        callback(null, result[0])
    }).catch(err => {
        console.log(err)
        callback(err)
    })
}

module.exports['updateMealPlanner'] = function(userId, updateMap, callback){
    MealPlannerModel.findOneAndUpdate(
        {userId: userId},
        updateMap,
        {new: true},
        (err, result) => {
            if(err){
                callback(err)
            }
            else{
                callback(null, result)
            }
        }
    )
}

module.exports['getMealPlanner'] = function(userId, callback){
    MealPlannerModel.find({userId: userId},(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            if(result.length == 0) callback("User not exist!")
            else callback(null,result[0])
        }
    })
}