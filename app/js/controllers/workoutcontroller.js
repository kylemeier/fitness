angular.module('fitness.controllers.workout',['fitness.services.groups', 'fitness.services.exercises', 'fitness.services.workout'])

  .controller('workoutCtrl',['$rootScope','$scope', '$routeParams', 'angularFire', 'Groups', 'Exercises', 'Workout', 'FBURL', '$timeout',
    function($rootScope, $scope, $routeParams, angularFire, Groups, Exercises, Workout, FBURL, $timeout){

      (function(){ 
        angularFire(Groups.find($routeParams.groupId), $scope, 'group'); 
      }())

      var d = new Date();

        $scope.today = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
        console.log($scope.date);

      $rootScope.allExercises = Exercises.collect($routeParams.groupId);


      //every success click:
//increment stored weight
//shift to next exercise
//
//every failure click:
//increment failure counter and check current stored weight
//if none stored:
//  store current weight, keep weight at same level
//
//if current weight is below stored weight:
//  store current weight, keep weight at same level, reset counter
// 
//if current weight equals stored weight:
//  if failure counter = 1:
//    keep weight at the same level
//  if failure counter = 2:
//    drop weight
//  if faiure counter = 3:
//    switch exercise, reset counter
//  
//if current weight is above stored weight:
//  store current weight, keep weight at same level
//  
      $scope.success = function(exerciseId){

        //set recording date to today
        Workout.setLastRecorded(exerciseId, $scope.today);

        //get current weight
        Workout.getWeight(exerciseId).once('value',function(snapshot){
          weight = snapshot.val(); 
        })

        //increase weight by 5lbs, reset failure count
        $timeout(function(){
          Workout.setWeight(exerciseId, weight+5);
          Workout.setFailures(exerciseId,0);
        },2001);
      }

      var failureLogic = function(exerciseId, failures, currentWeight, maxWeight){

        if(currentWeight > maxWeight) {
          //set max weight to current weight
          Workout.setMaxWeight(exerciseId, currentWeight);

        }else if(currentWeight < maxWeight){
          //set max weight to current weight, failures = 0
          Workout.setMaxWeight(exerciseId, currentWeight);
          Workout.setFailures(exerciseId,0);
          return;

        }else if(currentWeight === maxWeight && failures === 2){
            //decrease weight by 5lbs if user has failed to surpass maxweight twice, reset count
            Workout.setWeight(exerciseId, currentWeight-5);
            Workout.setMaxWeight(exerciseId, currentWeight-5);
            Workout.setFailures(exerciseId,0);
            return;
          }
          Workout.setFailures(exerciseId, failures);
      }
        
      $scope.failed = function(exerciseId){
        //need failures, weight, maxweight
        var failures, weight, maxWeight;        

        //getting values for each variable from DB
        Workout.getFailures(exerciseId).once('value',function(snapshot){

          //increment failure count and store it
          failures = snapshot.val() + 1; 
        })
        Workout.getWeight(exerciseId).once('value',function(snapshot){
          weight = snapshot.val(); 
        })
        Workout.getMaxWeight(exerciseId).once('value',function(snapshot){
          maxWeight = snapshot.val(); 
        })

        failureLogic(exerciseId, failures, weight, maxWeight);
      };

    }])


