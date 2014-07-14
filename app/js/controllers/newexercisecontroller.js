angular.module('fitness.controllers.newExercise',['fitness.services.exercises'])
  .controller('newExerciseCtrl',['$rootScope','$scope', '$routeParams','Exercises',
    function($rootScope, $scope, $routeParams, Exercises){

      $scope.groupId = $routeParams.groupId;
      console.log('$scope.groupdId = '+$scope.groupId);
      (function(){

      })()

      $scope.addExercise = function(){
        if($scope.exerciseName && $scope.exerciseWeight && $scope.exerciseSets && $scope.exerciseReps){
          Exercises.create($scope.groupId, $scope.exerciseName, $scope.exerciseWeight, $scope.exerciseSets, $scope.exerciseReps);
        }
      }
      $scope.countExercises = function(){
        Exercises.count($scope.groupId).once('value', function(snapshot){

          $scope.exerciseCount = snapshot.numChildren() +1;
          console.log('exercise count '+$scope.exerciseCount)
        })
      }
    }])