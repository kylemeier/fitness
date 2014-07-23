app.controller('EditExerciseCtrl', ['$rootScope', '$scope', '$routeParams', '$timeout', '$firebase', 'Exercise', 
	function($rootScope, $scope, $routeParams, $timeout, $firebase, Exercise){
		
		if(!$rootScope.userID){
			$location.path('/');
		}
		
		Exercise.setRefs();
		$rootScope.loading = 0;
		$scope.submitted = false;

      //binding $scope.exercise to relevant exercise object in database, ensures all changes are immediately reflected in the db
      Exercise.find($routeParams.groupId, $routeParams.exerciseId).$bind($scope, 'exercise'); 

      $scope.submit = function(){
      	$scope.submitted = true;
      	$scope.message = '';
      	document.getElementById("focus").focus();
      	if ($scope.exercise.name && $scope.exercise.weight && $scope.exercise.sets && $scope.exercise.reps){
      		$rootScope.slideView("view-slide-right","/groups")		
      	}else{
      		$scope.message = 'Please fill out all fields.'
      		$timeout(function(){
      			$scope.submitted = false;
      		}, 2000)
      	}
      }
  }])