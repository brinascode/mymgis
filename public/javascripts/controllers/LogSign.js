
app.controller("LogSign",
	["$scope","$http","$location","$window",
	function($scope,$http,$location,$window,$route)
{

$scope.logg 
$scope.sign 
$scope.message ="Sign up or login to use the app"
$scope.user2 = {}

//If connected, go to profile. Block access to this page! -- Not done!



//Makeshift page Anchor
	var el = document.getElementById("scrollHere1");
    el.scrollIntoView(true);


setTimeout(function(){
	var objectLength = JSON.stringify($scope.$parent.user.local)
	var user = $scope.$parent.user.local
	

	if(sessionStorage.signUpAttempt == "1" && user !== undefined){
		alert("Successful sign up")
		$scope.showM2=true
		$scope.message2 ="Successful sign up. You can now access your personal page"
		sessionStorage.signUpAttempt = "0"
	}
	else if(sessionStorage.signUpAttempt == "1" && user == undefined){
		alert("Please choose another username, this one is already taken.")
		$scope.showM2=true
		$scope.message2 ="Please choose another username, this one is already taken."
		//2 types of not workingm!!
		sessionStorage.signUpAttempt = "0"
	}


	if(sessionStorage.loginAttempt == "1" && user !== undefined){
		alert("Successful login")
		$scope.showM2=true
		$scope.message2 ="Successful login"
		sessionStorage.loginAttempt = "0"
	}
	else if(sessionStorage.loginAttempt == "1" && user == undefined){
		alert("Login failed. Check that you've written your username and password correctly")
		//2 types of not workingm!!)
		$scope.showM2=true
		$scope.message2 ="Login failed. Check that you've written your username and password correctly"
		//2 types of not workingm!!
		//En cas d'oublie 
		sessionStorage.loginAttempt = "0"
	}


},1000)




//Now the redirecting is done server side
$scope.signup =function(){
		$http.post("/signup",$scope.sign)

		var myF = function(){
				sessionStorage.setItem("loginMessage","hey")
				sessionStorage.signUpAttempt = "1"
				location.reload()
		}
		myF()
		
}

$scope.login = function(){
	$http.post("/login",$scope.sign)

	var myF= function(){
				sessionStorage.setItem("loginMessage","hey")
				sessionStorage.loginAttempt = "1"
				location.reload() 
	}
	myF()
		

}

$scope.facebookAuthen=function(){
	 $window.location.href="/auth/facebook"
}
 

$scope.googleAuthen = function(){

	 $window.location.href="/auth/google"
}


}])




