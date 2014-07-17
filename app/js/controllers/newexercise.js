app.controller('NewExerciseCtrl',['$rootScope','$scope', '$routeParams','Exercise', '$timeout',
    function($rootScope, $scope, $routeParams, Exercise, $timeout){
      if(!$rootScope.userID){
        $location.path('/');
      }
      $scope.groupId = $routeParams.groupId;
      console.log($scope.groupId);

      //number that appears after # in header
      $scope.headerNum = $routeParams.exerciseCount;

      $scope.addExercise = function(){
        if($scope.exerciseName && $scope.exerciseWeight && $scope.exerciseSets && $scope.exerciseReps){
          Exercise.create($scope.groupId, $scope.exerciseName, $scope.exerciseWeight, $scope.exerciseSets, $scope.exerciseReps);
        }
      }
      $scope.countExercises = function(){
        Exercise.dataRef($scope.groupId).once('value', function(snapshot){
          $scope.exerciseCount = snapshot.numChildren()+1;
        })
      }      
    }])