app.controller('WorkoutCtrl',['$rootScope','$scope', '$routeParams', '$firebase', 'Group', 'Exercise', 'Workout', 'FBURL', '$timeout', '$location',
    function($rootScope, $scope, $routeParams, $firebase, Group, Exercise, Workout, FBURL, $timeout, $location){

      if(!$rootScope.userID){
        $location.path('/');
      }

      $rootScope.loading = 0;
      
      var d = new Date();

      Group.setRefs();
      Exercise.setRefs();
      Workout.setRefs();
    
      Group.find($routeParams.groupId).$bind($scope, 'group');

      //Wait a little before checking if modal should appear
      $timeout(function(){

              //Tie 'first workout' in DB to $scope.firstWorkout
              Workout.getFirstWorkout().$bind($scope, 'firstWorkout').then(function(){

                //If 'first workout' doesn't exist, set it equal to True
                if($scope.firstWorkout === null){
                  $scope.firstWorkout = true;
                }
              })
      },500);

      Exercise.dataRef($routeParams.groupId).once('value', function(snapshot){
          $scope.exerciseCount = snapshot.numChildren();
          console.log($scope.exerciseCount);
        })

      $scope.today = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();

      $scope.allExercises = Exercise.all($routeParams.groupId);

      $scope.exercisesCompleted = 0;

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



        //add to completed count
        $scope.exercisesCompleted++;

        //set result as success
        Workout.setLastResult(exerciseId, 'success');

        //get current weight
        Workout.getWeight(exerciseId).once('value',function(snapshot){
          weight = snapshot.val(); 

          //increase weight by 5lbs, reset failure count
        $timeout(function(){
          Workout.setWeight(exerciseId, weight+5);
        },500);
          Workout.setFailures(exerciseId,0);
        })

        
   

      }
//check:
//current weight > max weight -- set max weight to current weight ++
//current weight less than max weight -- set max weight to current weight, failures = 0 ++
//current weight equals max weight -- leave weights alone, increment failure count 
//current weight equals max weight and failures = 2 -- decrease weight by 5lbs if user has failed to surpass maxweight twice, reset count
//
      var failureLogic = function(exerciseId, failures, currentWeight, maxWeight){
        var weightChange = 0;
        
        if(currentWeight < maxWeight){
          //set max weight to current weight, failures = 0
          failures = 0;

        }else if(currentWeight === maxWeight && failures >= 2){
            //decrease weight by 5lbs if user has failed to surpass maxweight twice, reset count
            failures = 0;
            weightChange = -5;
        }

          Workout.setWeight(exerciseId, currentWeight+weightChange);
          Workout.setMaxWeight(exerciseId, currentWeight+weightChange);
          Workout.setFailures(exerciseId, failures);
      }
        
      $scope.failed = function(exerciseId){
        //need failures, weight, maxweight
        var failures, weight, maxWeight;

        //set recording date to today
        Workout.setLastRecorded(exerciseId, $scope.today); 

        //add to completed count
        $scope.exercisesCompleted++;

        //set result as failure
        Workout.setLastResult(exerciseId, 'failure');
               
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

        $timeout(function(){
          failureLogic(exerciseId, failures, weight, maxWeight);
        },500);
      };

      $scope.getLastRecorded = function(exercise){
        if (exercise.lastRecorded === $scope.today){
          $scope.exercisesCompleted++;
        }
      }

      $scope.modalClick = function(){
        $scope.firstWorkout = false;
      }

    }])


