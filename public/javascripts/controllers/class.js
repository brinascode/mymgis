app.controller("Class",
	["$scope","$http","$location","$window","$routeParams","customerToProduct","teacherFunctions",
	function($scope,$http,$location,$window,$routeParams,customerToProduct,teacherFunctions)
{

//Fix refresh, caused by angular giving :id

//Maybe put all this into service? To share common euhhh...
$scope.panier = $scope.$parent.panier
$scope.user = $scope.$parent.user
$scope.isAuthen = $scope.$parent.isAuthen

//Get produit of particular type (from route id)
$scope.Class = [] //only one item in but still Array
customerToProduct.getClass($scope,$routeParams)


//Teacher functions for the class :)
$scope.showNewASect = false
$scope.newA = {
	classId:$routeParams.id
}

$scope.startNewA = function(){
	$scope.showNewASect = !$scope.showNewASect
}
$scope.createA  = function(){
	if(!$scope.newA.dueDate && !$scope.newA.text){
		//empty dates can still save :(
		alert("Please add some text and a due date for the assignment.")
	}else{
		teacherFunctions.createA($scope)
	}
}
$scope.deleteA  = function($index){
	teacherFunctions.deleteA($scope,$index)
}
$scope.startEditA = function($index){
	$scope.showNewASect = !$scope.showNewASect
	$scope.editButton = true
	$scope.newA = $scope.Class[0].assignments[$index]
}
$scope.editA  = function($index){
	teacherFunctions.editA($scope,$index)
}	
$scope.newLastSessionO = {}
$scope.newNextSessionO ={}

$scope.newLastSessionF = function(bool){//true means old session, false means next
	teacherFunctions.newLastSession($scope)
} 

$scope.newNextSessionF = function(bool){//true means old session, false means next
	teacherFunctions.newNextSession($scope)
} 

//Comments
$scope.getComments = function(){
	teacherFunctions.getComments($scope)
}

$scope.comments = []
$scope.getComments()

$scope.newComment = {}
$scope.postComment = function(){
	teacherFunctions.postComment($scope,$scope.newComment)
}
//next: teachers should be able to erase comments
//and ans to comments? As in threads??
//setting goals: longterm midterm shorterm ??
//teachers should be able to broadcast stuff

//denying students from class isnt working









}])