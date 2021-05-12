const mongoose = require('mongoose')
const UserModel = mongoose.model("User")
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

module.exports['getAllUsers'] = function(callback){
    UserModel.find({},(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            callback(null,result)
        }
    })
}

module.exports['getUser'] = function(userId, callback){
    UserModel.find({userId: userId},(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            callback(null,result)
        }
    })
}

module.exports['login'] = async function(user, callback){
    UserModel.find({email: user.email}, async (err,result)=>{
        if(err){
            callback(err)
        }
        else{
            if(result.length == 0){
                callback("Invalid credentials!", null);
            }
            else{
                const valid = await bcrypt.compare(user.password, result[0].password)

                if(!valid){
                    callback("Invalid credentials!", null);
                    return;
                }

                callback(null, result[0]);
            }
        }
    })
}

module.exports['register'] = async function (user, callback) {
    user['userId'] =uuidv4()
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    UserModel.create([user]).then(result => {
        callback(null, result[0])
    }).catch(err => {
        console.log(err)
        callback(err)
    })
}

module.exports['updateUser'] = function(userId, updateMap, callback){
    UserModel.findOneAndUpdate(
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