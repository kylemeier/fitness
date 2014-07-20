//To fix:
//
//UI issues:
//create truncate function that adds an ellipses to long group/exericse names
//group line items need their own height, currently relying on group name. can't set it directly due to height expanding when clicked
//deleting exercises causes list to flash while it rebuilds, auto close then reopen? works, but look into using a callback to speed it up
//
//To do:
//style workout page
//max group name length = 12
//exercise name length = 12
//better form checking on edit/new exercise screen
//form checking for new exercise
//combine login/signup screens
//some sort of action if group has no exercises and 'start workout' is clicked
//move resolve code into a service
//
//Additional Features:
//after two failures, decrease weight by 5lbs and increase reps by 2 per set
//after three failures, show alert asking if user wants to set a reminder to change the exercise or reset the count
//reminder will be an exclamation point in place of the delete button
//body weight support, doesn't mess with weights
  
    var app = angular.module('fitness',
  [ 'firebase', 'ngRoute','ngAnimate']
  )

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function($rootScope, $firebase, $firebaseSimpleLogin){
            if(!$rootScope.userID){
            var ref = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = $firebaseSimpleLogin(ref);
            return auth.$getCurrentUser()
          }else{
            return;
          }
        }

        }
      })

      .when('/signin', {
        templateUrl: 'views/home.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function($rootScope, $firebase, $firebaseSimpleLogin){
            
            if(!$rootScope.userID){
            var ref = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = $firebaseSimpleLogin(ref);
            return auth.$getCurrentUser()
          }else{
            return;
          }
        }

        }
      })

      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function($rootScope, $firebase, $firebaseSimpleLogin){
            if(!$rootScope.userID){
            var ref = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = $firebaseSimpleLogin(ref);
            return auth.$getCurrentUser()
          }else{
            return;
          }
        }

        }
      })

      .when('/reset/:temp', {
        templateUrl: 'views/reset.html',
        controller: 'AuthCtrl'
      })

      .when('/groups', {
        templateUrl: 'views/groups.html',
        controller: 'GroupsCtrl',
        resolve: {
          user: function($rootScope, $firebase, $firebaseSimpleLogin){
            console.log('loading '+$rootScope.loading);
            if(!$rootScope.userID){
              $rootScope.loading = 1;
              console.log('looking for user');
            var ref = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = $firebaseSimpleLogin(ref);
            
            return auth.$getCurrentUser()
          }else{
            console.log('already have user '+$rootScope.userID);
            return;
          }
        }

        }
      })

      .when('/new-group',{
        templateUrl: 'views/new-group.html',
        controller: 'NewGroupCtrl',
        resolve: {
          user: function($rootScope, $firebase, $firebaseSimpleLogin){
            if(!$rootScope.userID){
            $rootScope.loading = 1;
            var ref = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = $firebaseSimpleLogin(ref);
            return auth.$getCurrentUser()
          }else{
            return;
          }
        }

        }
      })

      .when('/:groupId/edit-group',{
        templateUrl: 'views/edit-group.html',
        controller:'EditGroupCtrl',
        resolve: {
          user: function($rootScope, $firebase, $firebaseSimpleLogin){
            if(!$rootScope.userID){
              $rootScope.loading = 1;
            var ref = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = $firebaseSimpleLogin(ref);
            return auth.$getCurrentUser()
          }else{
            return;
          }
        }

        }
      })

      .when('/:groupId/new-exercise/:exerciseCount',{
        templateUrl: 'views/new-exercise.html',
        controller: 'NewExerciseCtrl',
        resolve: {
          user: function($rootScope, $firebase, $firebaseSimpleLogin){
            if(!$rootScope.userID){
              $rootScope.loading = 1;
            var ref = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = $firebaseSimpleLogin(ref);
            return auth.$getCurrentUser()
          }else{
            return;
          }
        }

        }
      })

      .when('/:groupId/edit-exercise/:exerciseId',{
        templateUrl: 'views/edit-exercise.html',
        controller: 'EditExerciseCtrl',
        resolve: {
          user: function($rootScope, $firebase, $firebaseSimpleLogin){
            if(!$rootScope.userID){
              $rootScope.loading = 1;
            var ref = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = $firebaseSimpleLogin(ref);
            return auth.$getCurrentUser()
          }else{
            return;
          }
        }

        }
      })

      .when('/:groupId/workout',{
        templateUrl: 'views/workout.html',
        controller: 'WorkoutCtrl',
        resolve: {
          user: function($rootScope, $firebase, $firebaseSimpleLogin){
            if(!$rootScope.userID){
              $rootScope.loading = 1;
            var ref = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = $firebaseSimpleLogin(ref);
            return auth.$getCurrentUser()
          }else{
            return;
          }
        }

        }
      })

      .otherwise({ redirectTo: '/groups' });
    }])
  
  // establish authentication
  // app.run(['angularFireAuth', 'FBURL', '$rootScope', 
  //   function(angularFireAuth, FBURL, $rootScope) {
  //     angularFireAuth.initialize(new Firebase(FBURL), {scope: $rootScope, name: 'auth', path: '/signin'});
  //     // $rootScope.auth = new FirebaseSimpleLogin(new Firebase(FBURL), function( error, user){

  //     // })
  //     $rootScope.FBURL = FBURL;
  //     $rootScope.currentExercise = {};
  //     $rootScope.currentGroup = {};
  //   }])
  app.run(['$rootScope', '$route', '$timeout', 'FBURL',
    function($rootScope, $route, $timeout, FBURL){
      $rootScope.userID = null;
      var ref = new Firebase(FBURL);
      var auth = new FirebaseSimpleLogin(ref, function(error,user){
        if(user){
          $rootScope.userID = user.uid;
        }
      })
    }])

  app.constant('FBURL', 'fitnesskdm.firebaseIO.com')
  
  app.controller( 'slideController', ['$rootScope', '$scope', '$location', '$route', function($rootScope, $scope, $location, $route) {
    $rootScope.slideView = function (direction, url) {
      console.log(url);
        $rootScope.slideDir = direction; 
        $location.path(url);
    }  
  }])

  app.controller( 'mainController',function($rootScope,$scope){
    //in mainController to track a click anywhere in the app
    $scope.clearDelete = function(){
      $rootScope.currentExercise = {};
      $rootScope.currentGroup = {};
    }  
  })


