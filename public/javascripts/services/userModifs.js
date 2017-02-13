app.factory("userModifs",["$http","$window",function($http,$window){


return {

	newFullName : function($scope,fullNameNew){

			var postObject = {fullName:fullNameNew}
			$http.post("/newFullName",postObject).success(function(data){
				$scope.user = data
				$window.location.href = "/userInfo"
			}) 


	},

	newUserTelephone: function($scope){

			$http.post("/newUserTelephone",$scope.moreInfoNew).success(function(data){
				$scope.user = data
			//Cant modify parent from child!!
					$window.location.href = "/userInfo"
			}) 
			
	},
	removeUserTelephone: function($scope,$index){
		
			$http.post("/removeUserTelephone",{indice:$index}).success(function(data){
				$scope.user = data
					$window.location.href = "/userInfo"
				
			})
	},
	changeAvatar : function($scope,postObject){

		$http.post("/changeAvatar",postObject).success(function(data){
			$scope.user = data
				$window.location.href = "/userInfo"
		})
	},
	setUserType : function($scope){
		var postObject =  {}
		postObject.userType = true

		$http.post("/setUserType",postObject).success(function(data){
			$scope.user = data
				$window.location.href = "/userInfo"
		})
	}
	/*setAccType : function($scope){
		var postObject = {}
		
		if($scope.accType == "Student"){
			postObject.student = true
		}else if($scope.accType == "Teacher"){
			postObject.student = false
		}


		$http.post("/setAccType",postObject).success(function(data){
			$scope.user = data
				$window.location.href = "/userInfo"
		})

	} */


}


}])

//Will be functions of main controller then! 