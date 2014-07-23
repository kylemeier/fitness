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

    $scope.submit =function(button){
      $scope.submitted = true;
      $scope.buttonClicked = button;
      $scope.message = '';

      //form has all fields filled out, proceed as normal
      if($scope.exerciseName && $scope.exerciseWeight && $scope.exerciseSets && $scope.exerciseReps){
        Exercise.create($scope.groupId, $scope.exerciseName, $scope.exerciseWeight, $scope.exerciseSets, $scope.exerciseReps);
        document.getElementById("focus").focus();

        if(button === 'done'){
          $rootScope.slideView("view-slide-right","/groups");
        }else{
          $scope.countExercises();
          $rootScope.slideView("view-slide-left",$scope.groupId+"/new-exercise/"+$scope.exerciseCount)
        }

      //form has some fields filled out:
      //done button throws modal, next button says 'Please fill out all fields before adding another exercise' 
    }else if($scope.exerciseName || $scope.exerciseWeight || $scope.exerciseSets || $scope.exerciseReps){

      if(button === 'done'){
        $scope.modal = true;
      }else{
        document.getElementById("focus").focus();
        $scope.message = 'Please fill out all fields before advancing or click \'Done\' in the top left to go back.'
        $timeout(function(){
          $scope.submitted = false;
        }, 5000)
      }



      //form is completely empty:
      //done button proceeds, next button says 'Please fill out all fields before adding another exercise'
    }else{
      document.getElementById("focus").focus();
      if(button === 'done'){
        $rootScope.slideView("view-slide-right","/groups");
      }else{
        $scope.message = 'Please fill out all fields before advancing or click \'Done\' in the top left to go back.'
        $timeout(function(){
          $scope.submitted = false;
        }, 5000)
      }


    }

  }
  $scope.modalClick = function(button){
    $scope.modal = false;
    if(button == 'yes'){
      $rootScope.slideView("view-slide-right","/groups");
    }
  }

  $scope.countExercises = function(){
    Exercise.dataRef($scope.groupId).once('value', function(snapshot){
      $scope.exerciseCount = snapshot.numChildren()+1;
    })
  }      
  }])