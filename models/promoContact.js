var mongoose = require("mongoose")
var Schema = mongoose.Schema


var Class = new Schema ({
type:String,  //form class
year:String, //Year 13 ...
formTeacherId:String
})

module.exports = mongoose.model("class",Class)

