const mongoose = require('mongoose')
const FavouriteListModel = mongoose.model("FavouriteList")
const { v4: uuidv4 } = require('uuid');

module.exports['addFavouriteList'] = function (userId, callback) {
    let data = {
        userId: userId
    }
    FavouriteListModel.create([data]).then(result => {
        callback(null, result[0])
    }).catch(err => {
        console.log(err)
        callback(err)
    })
}

module.exports['updateFavouriteList'] = function(userId, updateMap, callback){
    FavouriteListModel.findOneAndUpdate(
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

module.exports['getFavouriteList'] = function(userId, callback){
    FavouriteListModel.find({userId: userId},(err,result)=>{
        if(err){
            callback(err)
        }
        else{
            if(result.length == 0) callback("User not exist!")
            else callback(null,result[0])
        }
    })
}