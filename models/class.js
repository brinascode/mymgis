var mongoose  = require("mongoose")
var Schema = mongoose.Schema

var Class = new Schema({

teacherId:String,
teacherName:String, // takes the moreInfo name! Validation should make it unable to save if theres no moreInfo name
classType : String,
name:String,
year:Number,
students:[{
	studentId:String,
	name:String}],
joinRequests:[{
	id:String,name:String}],
assignments : [{
	postDate:String,
	text:String,
	dueDate:String //dates dont save well as actual dates :(
}],
lastSession:[{text:String}],
nextSession : [{text:String}]



})


module.exports = mongoose.model("Class",Class)

/* $http.post("/nouvelleCommande",commande).success(function(data){console.log(data)})

				}

				*/