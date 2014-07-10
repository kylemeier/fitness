
//edit should inject name without using setGroup
//realign exericse delete/edit/confirm
//add workout page
//test group/exercise name length
//after three failures, show alert asking if user wants to set a reminder to change the exercise or reset the count
//reminder will be an exclamation point in place of the delete button


	var app = angular.module('fitness',
  [ 'fitness.config'
  , 'fitness.controllers.header'
  , 'fitness.controllers.signin'
  , 'fitness.controllers.signup',
    'fitness.controllers.groups',
    'fitness.services.groups',
  , 'firebase', 'ngRoute','ngAnimate']
  )
  

  .controller( 'slideController', ['$rootScope', '$scope', '$location', '$route', function($rootScope, $scope, $location, $route) {
    $scope.slideView = function (direction, url) {
        $rootScope.slideDir = direction; 
        $location.path(url);
    }  
  }])

  .controller( 'mainController',function($rootScope,$scope){
    //in mainController to track a click anywhere in the app
    $scope.clearDelete = function(){
      $rootScope.currentExercise = {};
      $rootScope.currentGroup = {};
    }  
  })

  .controller('newGroupController',['$rootScope','$scope','Groups',
    function($rootScope, $scope, Groups){
      console.log('in group controller');
      $scope.addGroup = function(){
        console.log('in group controller, before adding group');
        if($scope.groupName){
          console.log('in group controller, adding group');
          Groups.create($scope.groupName);
        }
      }
    }])

  .controller('editGroupController',function($rootScope, $scope){
      $scope.input = {};
      //find group name and insert it
      $scope.input.groupNameEdit = '';
      $scope.addGroup = function(){
        if($scope.input.groupName){
          //find and edit group name 
        }
      }
    });



  // auth.createUser(email, password, function(error, user) {
  //   if (!error) {
  //     console.log('User Id: ' + user.uid + ', Email: ' + user.email);
  //   }
  // });



  //   app.controller('newExerciseController',function(){

  //   });

  //   app.controller('editExerciseController',function(){

  //   });

  //   app.controller('workoutController',function(){

  //   });

  //   app.controller('homeController', function(){

  //   });
