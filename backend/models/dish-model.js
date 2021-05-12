const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const dishSchema = mongoose.Schema({
    dishId: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    title: {
        type: String,
        required: true,
    },
    sourceName: {
        type: String,
        default: "Unknown"
    },
    sourceUrl: {
        type: String,
    },
    image: {
        type: String,
        default: "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
    },
    summary:{
        type: String,
        default: "No summary available."
    },
    readyInMinutes:{
        type: Number,
        default: 0
    },
    servings: {
        type: Number,
        default: 1
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
    ingredients: {
        type: [{
            name: String,
            amount: String
        }],
        default: []
    },
    instructions:{
        type:[{
            step: String,
            ingredients: {
                type: [String],
                default: []
            },
        }],
        default: []
    },
    tags:{
        type:[String],
        default:[]
    },
    healthScore:{
        type: Number
    }

    
})

dishSchema.plugin(uniqueValidator)
mongoose.model("Dish", dishSchema)
