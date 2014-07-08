'use strict';

angular.module('fitness.services.profileCreator', [])
  .factory('profileCreator', ['Firebase', 'FBURL', '$rootScope', function(Firebase, FBURL, $rootScope) {
    return function(id, email, callback) {
        console.log('adding to db');
      new Firebase(FBURL).child('users/'+id).set({email: email}, function(err) {
        if( callback ) {
          callback(err);
          $rootScope.$apply();
        }
      });
    }
  }]);