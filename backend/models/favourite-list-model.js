const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const favouriteListSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    dish:{
        type: [String],
        default: []
    },
    mealPlan:{
        type: [String],
        default: []
    }
})

favouriteListSchema.plugin(uniqueValidator)
mongoose.model("FavouriteList", favouriteListSchema)
