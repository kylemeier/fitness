//To fix:
//creating a user doesn't retain state on refresh
//
//UI issues:
//change look of workout messaging
//loading icon on create user
//
//iOS:
//login buttons look wonky in landscape
//
//To do:
//move resolve code into a service
//Add weight change notification to workout screen -- under name -- next weight: ##lbs (##lbs change) -- create variable for weight change
//store workouts
//add modal giving instructions on workout screen
//
//Desktop view:
//header color spans entire width, content is much smaller, need to determine max width
//maybe more pronounced borders on content?
//boxes on groups page need to be inset
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

      .when('/reset/:temp', {
        templateUrl: 'views/reset.html',
        controller: 'AuthCtrl'
      })

      .when('/groups', {
        templateUrl: 'views/groups.html',
        controller: 'GroupsCtrl',
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


