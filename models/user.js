var mongoose = require("mongoose")
var bcrypt = require("bcrypt-nodejs")
var Schema = mongoose.Schema
//Make distinction btw email and username
var userSchema = new Schema({
    local            : {
        username     : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    moreInfo         : { 
        userType:Boolean, //Everyone is a student by default == false. Teacher = true
        admin: Boolean,  
        numerosDeTelephone:Array,
        fullName :String,
        profilePic:String


    },
    myClasses    :[String], //Ids
    votedFor        : [String],
    goals         :[{goal:String,accomplishBy:String}],
    tickedGoals   :[{goal:String,accomplishBy:String}]

})


userSchema.methods.generateHash = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User",userSchema) 