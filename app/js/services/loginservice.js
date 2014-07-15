
'use strict';

/* Services */

angular.module('fitness.services.login', ['fitness.services.profileCreator'])
  .factory('loginService', ['angularFireAuth', 'profileCreator', '$location', '$rootScope', 'FBURL',
    function(angularFireAuth, profileCreator, $location, $rootScope, FBURL) {
        var loginRef = new Firebase(FBURL);
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
              $rootScope.slideView('view-slide-left',redirect);
            }
            callback && callback(null, user);
          }, callback);
        },
        login2: function(email, pass, redirect, callback){
          $rootScope.auth.login('password', {
            email: email,
            password: pass,
            rememberMe: true
          });

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
              console.log('redirecting');
              $location.path(redirect);
            }
            callback && callback(null, user);
          }, callback);
        },
        resetPassword: function(email, callback){
            var firebaseRef = new Firebase('https://fitnesskdm.firebaseIO.com');
            var auth = new FirebaseSimpleLogin(firebaseRef, function(error, user){    
 
          });
            var p = auth.sendPasswordResetEmail(email,callback);
            p.then
        },
        logout: function(redirect) {
          console.log('logging out to '+redirect);
          angularFireAuth.logout();
          $rootScope.slideView('view-slide-right',redirect);
          
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
