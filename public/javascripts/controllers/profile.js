app.controller("Profile",["$scope","$http","$location","$window","teacherFunctions",
	function($scope,$http,$location,$window,teacherFunctions){ //we need a students functions too!

//User info
//Loading screen as info loads

$scope.user = $scope.$parent.user
$scope.Classes = []

//Get your classes, if you are a teacher, your getMyclasses function will be different
if($scope.user.moreInfo.userType === true){
	teacherFunctions.getMyTClasses($scope) 
}
else{
	teacherFunctions.getMySClasses($scope) 
}


//everybody -teachers and students-  is using teacherFunctions!! Later rename it!!




//Teacher stuff 
//only teachers can create classes and add students.Students can only see their classes!!
	//Create and erase class
$scope.showNewClass = false
$scope.newClass={}
$scope.showNewClassF = function(){
		$scope.showNewClass = !$scope.showNewClass
}
$scope.createClass = function(){
	teacherFunctions.createClass($scope)
}
$scope.eraseClass = function($index){
	if(confirm("Are you sure you want to erase this class? This action is irreversible!")){
		teacherFunctions.eraseClass($scope,$index)
	}
}
	//Modify class
$scope.showModClass = false
$scope.modClass = function($index){
    $scope.modifying = $scope.Classes[$index]
	$scope.showModClass = !$scope.showModClass
}
$scope.saveClassMod = function(){
	teacherFunctions.saveClassMod($scope)
}
$scope.ansJoinReq = function(bool,$index){
	//The open class is stored in $scope.modifying
	teacherFunctions.ansJoinReq($scope,bool,$index)
}
$scope.removeStudent = function($index){
	teacherFunctions.removeStudent($scope,$index)
}




//Students --find class
$scope.allClasses = []
$scope.findAllClasses = function(){
	//$scope.allClasses
	teacherFunctions.findAllClasses($scope)
}

$scope.joinAClass = function($index){ //TD: allow user to cancel req! 
	if($scope.user.moreInfo.fullName){
			var classToJoin = $scope.allClasses[$index]
	
			teacherFunctions.joinAClass($scope,classToJoin)
	}else{
		alert("Please add your full name in Personal Info before joining a class.")
	}


}

//Showing Assignments
$scope.showASect = false
$scope.showASectF = function(){
	$scope.showASect = !$scope.showASect
}
$scope.getMyA = function(){
	teacherFunctions.getMyA($scope)
}
$scope.getMyA()

//Adding goals
$scope.showGoalSect = false
$scope.newGoal = {}
$scope.showGoalSectF = function(){
	$scope.showGoalSect = !$scope.showGoalSect
}
$scope.addNewGoal = function(){
	teacherFunctions.addNewGoal($scope)
}
$scope.tickGoal = function($index){
	teacherFunctions.tickGoal($scope,$index)
}
$scope.deleteGoal = function($index){
	teacherFunctions.deleteGoal($scope,$index)
}

}])