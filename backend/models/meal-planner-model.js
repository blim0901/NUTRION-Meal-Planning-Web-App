const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const mealPlannerSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    dish:{
        type: [{
            dishId: String,
            day: String, //"Monday", "Tuesday", ...
            mealtype: String, //"Breakfast", "Lunch", "Dinner"
        }],
        default: []
    },
})

mealPlannerSchema.plugin(uniqueValidator)
mongoose.model("MealPlanner", mealPlannerSchema)
