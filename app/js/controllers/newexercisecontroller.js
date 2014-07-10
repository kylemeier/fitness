angular.module('fitness.controllers.newExercise',['fitness.services.exercises'])
  .controller('newExerciseCtrl',['$rootScope','$scope', '$routeParams','Exercises',
    function($rootScope, $scope, $routeParams, Exercises){

      $scope.groupId = $routeParams.groupId;
      console.log('$scope.groupdId = '+$scope.groupId);
      $scope.num = Math.random()*100;

      $scope.addExercise = function(){
        // if($scope.groupName){
          Exercises.create($scope.groupId, $scope.exerciseName, $scope.exerciseWeight, $scope.exerciseSets, $scope.exerciseReps);
        // }
      }
    }])