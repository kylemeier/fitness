'use strict';

// Declare app level module which depends on filters, and services
angular.module('fitness.config', [])

app.config(['$routeProvider', 
    function($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'views/signin.html'
      })

      .when('/signin', {
        templateUrl: 'views/signin.html'
      })

      .when('/signup', {
        templateUrl: 'views/signup.html'
      })

      .when('/groups', {
        templateUrl: 'views/groups.html'
      })

      .when('/new-group',{
        templateUrl: 'views/new-group.html'
      })

      .when('/edit-group',{
        templateUrl: 'views/edit-group.html'
      })

      .when('/new-exercise',{
        templateUrl: 'views/new-exercise.html'
      })

      .when('/new-exercise2',{
        templateUrl: 'views/new-exercise.html'
      })

      .when('/edit-exercise',{
        templateUrl: 'views/edit-exercise.html'
      })

      .when('/workout',{
        templateUrl: 'views/workout.html'
      })

      .otherwise(       { redirectTo: '/' });
    }])
  
  // establish authentication
  .run(['angularFireAuth', 'FBURL', '$rootScope', 
    function(angularFireAuth, FBURL, $rootScope) {
      angularFireAuth.initialize(new Firebase(FBURL), {scope: $rootScope, name: 'auth', path: '/signin'});
      $rootScope.FBURL = FBURL;
      $rootScope.allGroups = [],
      $rootScope.currentExercise = {};
      $rootScope.currentGroup = {};
    }])

  // your Firebase URL goes here
  // should look something like: https://blahblahblah.firebaseio.com
  .constant('FBURL', 'fitnesskdm.firebaseIO.com')


