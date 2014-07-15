angular.module('fitness.controllers.newExercise',['fitness.services.exercises'])
  .controller('newExerciseCtrl',['$rootScope','$scope', '$routeParams','Exercises', '$timeout',
    function($rootScope, $scope, $routeParams, Exercises, $timeout){

      $scope.groupId = $routeParams.groupId;

      //number that appears after # in header
      $scope.headerNum = $routeParams.exerciseCount;

      $scope.addExercise = function(){
        if($scope.exerciseName && $scope.exerciseWeight && $scope.exerciseSets && $scope.exerciseReps){
          Exercises.create($scope.groupId, $scope.exerciseName, $scope.exerciseWeight, $scope.exerciseSets, $scope.exerciseReps);
        }
      }
      $scope.countExercises = function(){
        Exercises.count($scope.groupId).once('value', function(snapshot){
          $scope.exerciseCount = snapshot.numChildren()+1;
        })
      }      
    }])