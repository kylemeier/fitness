
'use strict';

/* Services */

angular.module('fitness.services.login', ['fitness.services.profileCreator'])
  .factory('loginService', ['angularFireAuth', 'profileCreator', '$location', '$rootScope',
    function(angularFireAuth, profileCreator, $location, $rootScope) {
      return {
        login: function(email, pass, redirect, callback) {
          var p = angularFireAuth.login('password', {
            email: email,
            password: pass,
            rememberMe: true
          });
          p.then(function(user) {
            if( redirect ) {
              console.log('officially logged in');
              $location.path(redirect);
            }
            callback && callback(null, user);
          }, callback);
        },
        loginAnon: function(redirect, callback) {

          var firebaseRef = new Firebase('https://fitnesskdm.firebaseIO.com');
          var auth = new FirebaseSimpleLogin(firebaseRef, function(error, user){
            
          });
          
          var p = auth.login('anonymous', {
            rememberMe: true
          });
          p.then(function(user) {
            console.log('inside promise callback');
            if( redirect ) {
              console.log('officially logged in as anon');
              $location.path(redirect);
            }
            callback && callback(null, user);
          }, callback);
        },
        logout: function(redirectPath) {
          console.log('logging out to '+'/');
          $location.path('/');
          angularFireAuth.logout();
          
        },
        createAccount: function(email, pass, callback) {
          console.log(email, pass);
          angularFireAuth._authClient.createUser(email, pass, function(err, user) {
            if(callback) {
              callback(err, user);
              $rootScope.$apply();
            }
          });
        },
        createProfile: profileCreator
      }
    }])
