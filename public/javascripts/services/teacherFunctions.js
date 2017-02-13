app.factory("teacherFunctions",["$http","$window","$location",function($http,$window,$location){


return {
	
	createClass: function($scope){
				if(!$scope.user.moreInfo.fullName){
					alert("Please add your full name in the Personal Info tab before continuing")
				}else{
					$scope.newClass.teacherId = $scope.user._id
					$scope.newClass.teacherName = $scope.user.moreInfo.fullName

					$http.post("/createClass",$scope.newClass).success(function(data){
					$scope.Classes = data
					$window.location.href = "/profile"
					}) 
				}
				

	},
	eraseClass: function($scope,$index){
				var postObject = {}
				postObject.id = $scope.Classes[$index]._id

				$http.post("/eraseClass",postObject).success(function(data){
				$scope.Classes = data
				$window.location.href = "/profile"
				}) 

	},
	getMyTClasses: function($scope){
				

				$http.get("/getMyTClasses").success(function(data){
				$scope.Classes = data
				
				
				
				}) 

	},getMySClasses: function($scope){
				
				for(var i=0;i<$scope.user.myClasses.length;i++){
					var postObject = {}
					postObject.id = $scope.user.myClasses[i]
					
					$http.post("/getMySClasses",postObject).success(function(data){
						$scope.Classes.push(data[0])
				
				
					}) 
				}

				

	},
	saveClassMod : function($scope){
				$http.post("/saveClassMod",$scope.modifying).success(function(data){
				$scope.Classes = data
				$window.location.href = "/profile"
				
				
				}) 

	},
	findAllClasses : function($scope){
					$http.get("/findAllClasses").success(function(data){
						$scope.allClasses = data
						//To show if you've already sent a req :)
						//Go through all the classes
						for (var i=0;i<=data.length-1;i++){

							if(data[i].joinRequests[i].id == $scope.user._id)
							{
								data[i].sentReq = true
							}							
							
						}
				
				
					}) 
	},
	joinAClass     : function($scope,classToJoin){
					var postObject = {}
					postObject.id = classToJoin._id
					postObject.userName = $scope.user.moreInfo.fullName
					$http.post("/joinAClass",postObject).success(function(data){
						$scope.allClasses = data
						$window.location.href="/profile"
				
					}) 
	},
	ansJoinReq     : function($scope,bool,$index){
		//The open class is stored in $scope.modifying , bool=true means accepted req
		//students gets added to class and then req is deleted,
		$scope.modifying.joinReq = true
		$scope.modifying.index = $index
		var req = $scope.modifying.joinRequests[$index]
			if(bool === true){

				$scope.modifying.studentName = req.name
				$scope.modifying.studentId = req.id
			
				$http.post("/saveClassMod",$scope.modifying).success(function(data){
					$scope.Classes = data
					$window.location.href = "/profile"
				}) 

			}else if(bool === false){
				
				
				$http.post("/saveClassMod",$scope.modifying).success(function(data){
					$scope.Classes = data
					$window.location.href = "/profile"
				}) 
			}
	},
	removeStudent: function($scope,$index){
		$scope.modifying.removeStudent = true
		$scope.modifying.removeIndex = $index

		$http.post("/saveClassMod",$scope.modifying).success(function(data){
					$scope.Classes = data
					$window.location.href = "/profile"
				}) 

	},
	createA   : function($scope){
		 	var postDate = new Date()
			var arr = []
			arr.push(postDate)

			var arr2 = []
			arr2.push($scope.newA.dueDate)
			
			$scope.newA.postDate = arr.toString()
			$scope.newA.dueDate = arr2.toString()
			//$scope.newA.dueDate = $scope.newA.dueDate.JSON.stringify()

			$http.post("/createA",$scope.newA).success(function(data){
					$scope.Class = data
					$scope.Class.assignments.reverse()
					//ajax no reload :)
			}) 

			$scope.showNewASect = !$scope.showNewASect

	},
	deleteA  : function($scope,$index){

			var postObject={
				id:$scope.Class[0]._id,
				index:$index
			}
			$http.post("/deleteA",postObject).success(function(data){
					$scope.Class = data
					$scope.Class.assignments.reverse()
					//ajax no reload :)
			}) 
	},
	editA   : function($scope,$index){

			var arr2 = []
			arr2.push($scope.newA.dueDate)
			
			$scope.newA.classId = $route.id			
			$scope.newA.dueDate = arr2.toString()
			$scope.newA.index = $index
			$http.post("/editA",postObject).success(function(data){
					$scope.Class = data
					$scope.Class.assignments.reverse()
					//ajax no reload :)
			})

	},
	newLastSession : function($scope,bool){
			var postObject = {}
			postObject.id = $scope.newA.classId
			postObject.text =  $scope.newLastSessionO.session
	
			$http.post("/newLastSession",postObject).success(function(data){
					$scope.Class = data

			})
		
	},
	newNextSession : function($scope,bool){
			var postObject = {}
			postObject.id = $scope.newA.classId
			postObject.text = $scope.newNextSessionO.session
	
			$http.post("/newNextSession",postObject).success(function(data){
					$scope.Class = data

			})
		
	},
	getComments : function($scope,id){	
				
				//Is http post the only way to pass dataN
				var postObject = {discussionId:$scope.newA.classId}

				$http.post("/comments",postObject).success(function(data){
					
					$scope.comments = data
					$scope.comments.reverse()
				})
	},

	postComment : function($scope,comment){


				if(comment.body != ""){ 

					comment.author = $scope.user.local.username
			
					comment.date = new Date().toString() //to string dsnt do anything
					comment.profilePic = $scope.user.moreInfo.profilePic
					comment.discussionId = $scope.newA.classId


					$http.post("/postComment",comment).success(function(data){
						$scope.comments = data
						$scope.comments.reverse()
						$scope.newComment = {}
					})

				}


	},
	addNewGoal : function($scope){
				var dateA = []
				var date = new Date()
				dateA.push(date)
				$scope.newGoal.accomplishBy = dateA.toString()


				$http.post("/addNewGoal",$scope.newGoal).success(function(data){
					$scope.user = data[0]
				})
	},
	tickGoal : function($scope,$index){


			 var postObject = {index:$index}
			 $http.post("/tickGoal",postObject).success(function(data){
					$scope.user = data[0]
				})
	},
	deleteGoal : function($scope,$index){
		var postObject = {index:$index}
		 $http.post("/deleteGoal",postObject).success(function(data){
					$scope.user = data[0]
		 })		
	},
	getMyA : function($scope){
			$scope.user.assignments = []
			for (var i=0;i<=$scope.user.myClasses.length-1;i++){
				
				var postObject = {id:$scope.user.myClasses[i]}

				
				$http.post("/getMyA",postObject).success(function(data){
					for(var c = 0;c<=data.length-1;c++){
						$scope.user.assignments.push(data[c])
						
					}
					
				})
				
			}
	}



	


}


}])







