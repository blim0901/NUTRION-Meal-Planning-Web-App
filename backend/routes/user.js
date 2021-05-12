const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const async = require('async');

const {check, validationResult} = require("express-validator/check");

const UserController = require('../controllers/user-controller')
const FavouriteListController = require('../controllers/favourite-list-controller')
const MealPlannerController = require('../controllers/meal-planner-controller')


router.get('/', (req, res) => {
    UserController.getAllUsers((err, result) => {
        if(err){
            return res.status(500).send({ message: `${err}`})
        }
        else{
            return res.status(200).send(result)
        }
    })
})

router.get('/:userId', (req, res) => {
    const {userId} = req.params;
    UserController.getUser(userId, (err, result) => {
        if(err){
            return res.status(500).send({ message: `${err}`})
        }
        else{
            return res.status(200).send(result)
        }
    })
})

router.post('/login', [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(`${errors.array()[0].msg}`)
            return res.status(500).send({ message: `${errors.array()[0].msg}` });
        }

        const {password, email} = req.body;

        UserController.login(
            {password, email},
            (err, result) => {
            if(err){
                return res.status(500).send({ message: `${err}`})
            }
            else{
                return res.status(200).send(result)
            }
        })
    }
)

router.post('/register', 
    [
        check('firstName', 'Please include first name').not().isEmpty(),
        check('lastName', 'Please include last name').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must have 8 or more characters').isLength({min: 8}),
        check(
            'confirmPassword',
            'confirm password should be same as password',
        ).exists().custom((value, { req }) => value === req.body.password)
    ],
    (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).send({ message: `${errors.array()[0].msg}` });
        }
        
        const {email, password, firstName, lastName} = req.body;
        const user = {email, password, firstName, lastName};

        mongoose.startSession({}, (err, session) => {
            session.startTransaction()
            async.waterfall([
                function(callback){
                    UserController.register(
                        user, 
                        (err, result) => {
                        if(err){
                            callback(err, null)
                        }
                        else{
                            callback(null, result.userId)
                        }
                    })
                },
                function(userId, callback){
                    MealPlannerController.addMealPlanner(
                        userId, 
                        (err, result) => {
                            if(err){
                                callback(err, null)
                            }
                            else{
                                callback(null, userId)
                            }
                        }
                    )
                },
                function(userId, callback){
                    FavouriteListController.addFavouriteList(
                        userId, 
                        (err, result) => {
                            if(err){
                                callback(err, null)
                            }
                            else{
                                callback(null, result.userId)
                            }
                        }
                    )
                }
            ],(err,result)=>{
                if(err)
                {
                    session.abortTransaction().then(() => {
                        session.endSession()
                        return res.status(500).send({ message: `${err}`})
                    })
                }
                else 
                {
                    session.commitTransaction().then(() => {
                        session.endSession()
                        return res.status(200).send({"userId":result})
                        
                    })
                }
            })
        })
    }
)

router.put('/:userId', (req, res) => {
    const {userId} = req.params;
    UserController.updateUser(
        userId,
        req.body, 
        (err, result) => {
        if(err){
            return res.status(500).send({ message: `${err}`})
        }
        else{
            return res.status(200).send(result)
        }
    })
})

module.exports = router