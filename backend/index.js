const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const {port, mongoConnectionString} = require("./config.js");

const app = express();
app.use(bodyParser.json({limit: '150mb'}))
app.use(cors());

const UserModel = require('./models/user-model')
const MealPlannerModel = require('./models/meal-planner-model')
const MealPlanModel = require('./models/meal-plan-model')
const FavouriteListModel = require('./models/favourite-list-model')
const DishModel = require('./models/dish-model')

const User = require('./routes/user');
const Dish = require('./routes/dish');
const MealPlanner = require('./routes/meal-planner');
const MealPlan = require('./routes/meal-plan');
const FavouriteList = require('./routes/favourite-list');
app.use('/user', User);
app.use('/dish', Dish)
app.use('/mealPlanner', MealPlanner);
app.use('/mealPlan', MealPlan);
app.use('/favouriteList', FavouriteList);

mongoose.connect(mongoConnectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex: true
},(err)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        app.listen(port, () => {
            console.log(`Connected to database. Server Running on Port: ${port}`);
            console.log(`http://localhost:${port}`);
        });
    }
})

const Sponnacular = require("./controllers/spoonacular-controller")
//Sponnacular.getDishes(100, "Chicken", (a,b)=>console.log("ok"));