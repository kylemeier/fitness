
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
              $location.path(redirect);
            }
            callback && callback(null, user);
          }, callback);
        },
        logout: function(redirectPath) {
          console.log('logging out');
          $location.path('/');
          angularFireAuth.logout();
          if(redirectPath) {
            $location.path('/');
          }
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
