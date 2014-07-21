app.controller('EditExerciseCtrl', ['$rootScope', '$scope', '$routeParams', '$firebase', 'Exercise',
	function($rootScope, $scope, $routeParams, $firebase, Exercise){
		
		if(!$rootScope.userID){
			$location.path('/');
		}
		
		Exercise.setRefs();
		$rootScope.loading = 0;

      //binding $scope.exercise to relevant exercise object in database, ensures all changes are immediately reflected in the db
      Exercise.find($routeParams.groupId, $routeParams.exerciseId).$bind($scope, 'exercise'); 

  }])