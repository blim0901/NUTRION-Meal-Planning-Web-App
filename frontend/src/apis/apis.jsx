
//RECIPE SEARCH PAGE -------------------------------------------------------------------------------------------
/*GET API for getting information of dishes using the user's search keyword.
  Parameters provided: API KEY, query (e.g. pasta)
  response data needed: title of dish, image link, calories in dish
*/
function getRecipe() {
    fetch(
        'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + API_KEY + '&query=' + query
    )
    .then((response) => response.json())
    .then((data) => {
        setRecipe(data);
    })
    .catch(() => {
        console.log("error");
    });
}


/*POST API for saving the selected dish into user's favourite list
    Parameters provided: not sure
    Data posted: title of dish, dish id, dish image calories in dish
*/
//insert code here



//MEAL PLAN SEARCH PAGE -------------------------------------------------------------------------------------------
/*GET API for getting information of meal plans using the user's search keyword.
  Parameters provided: API KEY, calories (e.g. 2000)
  response data needed: 3 dishes needed -> title of dish, image link, preparation time in minutes, number of servings
*/
function getMealData() {
    fetch(
        'https://api.spoonacular.com/mealplanner/generate?apiKey=' + API_KEY + '&timeFrame=day&targetCalories=' + calories
    )
    .then((response) => response.json())
    .then((data) => {
        setMealData(data);
    })
    .catch(() => {
        console.log("error");
    });
}

/*GET API for getting dish image in the meal plan
  Parameters provided: API KEY, meal id
  response data needed: image links of each dish in the meal plan
*/
useEffect(() => {
    fetch(
        'https://api.spoonacular.com/recipes/' + meal.id + '/information?apiKey=' + API_KEY + '&includeNutrition=false'
    )
    .then((response) => response.json())
    .then((data) => {
        setImageUrl(data.image);
    })
    .catch(() => {
        console.log("error");
    })
}, [meal.id])


//DISH DETAIL PAGE -------------------------------------------------------------------------------------------
/*GET API for getting information of a dish
  Parameters provided: API KEY, dish id
  response data needed: dish title, dish creator name, dish description, dish preparation time, dish ingredients, dish no. of pax, 
                        dish nutrients (calories, carbs, protein, fats), tags, direction steps to make dish
*/
//insert code here


/*POST API for saving the selected dish into user's favourite list
    Parameters provided: not sure
    Data posted: title of dish, dish id, dish image calories in dish
*/
//insert code here



/*USER PROFILE PAGE -------------------------------------------------------------------------------------------
/*GET API for getting user's information
  Parameters provided: user id
  response data needed: user name, user height, user weight, user health conditions, user lacking nutrients
*/
//insert code here



/*HOME PAGE -------------------------------------------------------------------------------------------
/*GET API for getting recipes for recipe recommendation
  Parameters provided: none
  response data needed: 4 dishes needed -> title of dish, image link, calories in dish
//insert code here


/*GET API for getting meal plans for meal plan recommendation
  Parameters provided: none
  response data needed: 2 meal plans needed, 3 dishes in each meal plan -> title of dish, image link, calories in dish
//insert code here

