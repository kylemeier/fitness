//form is completely empty:
//done button proceeds, next button says 'Please fill out all fields before adding another exercise'
//
//form has some fields filled out:
//done button throws modal, next button says 'Please fill out all fields before adding another exercise'
//
//form has all fields filled out:
//proceed as normal
//
//number inputs are invalid:
//highlight field, throw error


app.controller('NewExerciseCtrl',['$rootScope','$scope', '$routeParams','Exercise', '$location', '$timeout',
    function($rootScope, $scope, $routeParams, Exercise, $location, $timeout){
    
      if(!$rootScope.userID){
        $location.path('/');
      }

      $rootScope.loading = 0;
      $scope.submitted = false;
      $scope.modal = false;
      $scope.groupId = $routeParams.groupId;

      //number that appears after '#' in header
      $scope.headerNum = $routeParams.exerciseCount;

      Exercise.setRefs();

      //next:
      //addExercise(); countExercises(); slideView("view-slide-left",groupId+"/new-exercise/"+exerciseCount)
      //
      //done:
      //addExercise(); slideView("view-slide-right","/groups")
      //
      //Be sure you're entering a number (and that it's not too outrageous).
      //

//

//errors:
//fill out all fields -- fields are partially filled out, 'next' is clicked
//modal - fields partially filled out, done is clicked
//outrageous - number fields filled out improperly
//
      $scope.submit =function(button){
        $scope.submitted = true;

        //form has all fields filled out, proceed as normal
        if($scope.exerciseName && $scope.exerciseWeight && $scope.exerciseSets && $scope.exerciseReps){
          Exercise.create($scope.groupId, $scope.exerciseName, $scope.exerciseWeight, $scope.exerciseSets, $scope.exerciseReps);

          if(button === 'done'){
            $rootScope.slideView("view-slide-right","/groups");
          }else{
            $scope.countExercises(); 
            $rootScope.slideView("view-slide-left",$scope.groupId+"/new-exercise/"+$scope.exerciseCount)
          }

        //form has some fields filled out:
        //done button throws modal, next button says 'Please fill out all fields before adding another exercise' 
        }else if($scope.exerciseName || $scope.exerciseWeight || $scope.exerciseSets || $scope.exerciseReps){

          if(button === 'next'){
            $scope.message = 'Please fill out all fields before adding another exercise.';
          }else{
            $scope.modal = true;
          }
          $timeout(function(){
            $scope.submitted = false;
          }, 2000)

        //form is completely empty:
        //done button proceeds, next button says 'Please fill out all fields before adding another exercise'
        }else{
          if(button === 'done'){
            $rootScope.slideView("view-slide-right","/groups");
          }else{
            $scope.message = 'Please fill out all fields before adding another exercise.';
          }
          $timeout(function(){
            $scope.submitted = false;
          }, 2000)
        }






      }

      $scope.addExercise = function(){
        $scope.submitted = 1;
        if($scope.exerciseName && $scope.exerciseWeight && $scope.exerciseSets && $scope.exerciseReps){
          Exercise.create($scope.groupId, $scope.exerciseName, $scope.exerciseWeight, $scope.exerciseSets, $scope.exerciseReps);
        }else if($scope.exerciseName || $scope.exerciseWeight || $scope.exerciseSets || $scope.exerciseReps){
          console.log('Because the fields are not complete, this exercise will not be saved. Do you wish to proceed?');
        }else{
          console.log('fields blank');
        }
      }
      $scope.countExercises = function(){
        Exercise.dataRef($scope.groupId).once('value', function(snapshot){
          $scope.exerciseCount = snapshot.numChildren()+1;
        })
      }      
    }])