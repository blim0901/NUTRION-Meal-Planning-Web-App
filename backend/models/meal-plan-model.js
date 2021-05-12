const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const mealPlanSchema = mongoose.Schema({
    mealPlanId: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    dish:{
        type: [{
            dishId: String
        }],
        default: []
    },
    nutrition: {
        calories: {
            type: String,
            default: 0
        },
        fat:{
            type: String,
            default: 0
        },
        carbohydrates:{
            type: String,
            default: 0
        },
        protein:{
            type: String,
            default: 0
        },
    },
})

mealPlanSchema.plugin(uniqueValidator)
mongoose.model("MealPlan", mealPlanSchema)
