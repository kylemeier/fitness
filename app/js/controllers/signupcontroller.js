'use strict';

angular.module('fitness.controllers.signup', [])
  .controller('SignupCtrl', ['$scope', 'loginService', '$location',
    function($scope, loginService, $location) {

      if(!!$scope.auth){
        $location.path('/groups');
      }

      $scope.$on('angularFireAuth:login', function () {
        $location.path('/groups');
      })

      $scope.err = null;

      $scope.login = function(callback) {
        $scope.err = null;
        loginService.login($scope.email, $scope.pass, '/groups', function(err, user) {
          $scope.err = err||null;
          typeof(callback) === 'function' && callback(err, user);
        });
      };

      $scope.createAccount = function() {
          console.log('controller saw it');
        if( !$scope.email ) {
          $scope.err = 'Please enter an email address';
        }
        else if( !$scope.pass ) {
          console.log('erroring');
          $scope.err = 'Please enter a password';
        }
        else {
          console.log('passing off to loginservice');
          loginService.createAccount($scope.email, $scope.pass, function(err, user) {
            if( err ) {
              $scope.err = err;
            }
            else {
              $scope.login(function(err) {
                if( !err ) {
                  loginService.createProfile(user.id, user.email);
                }
              });
            }
          });
        }
      };
    }]);