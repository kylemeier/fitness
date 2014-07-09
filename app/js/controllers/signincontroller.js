'use strict';

angular.module('fitness.controllers.signin', ['fitness.services.login'])
  .controller('SigninCtrl', ['$scope', 'loginService', '$location',
    function($scope, loginService, $location) {
      $scope.url = $location.path();
      if(!!$scope.auth){
        $location.path('/groups');
      }

      $scope.$on('angularFireAuth:login', function () {
        console.log('logged in as:'+$scope.email);
        $location.path('/groups');
      })

      $scope.email = null;
      $scope.pass = null;
      $scope.name = null;

      $scope.login = function(callback) {
        $scope.err = null;
        loginService.login($scope.email, $scope.pass, '/groups', function(err, user) {
          $scope.passReset = 0;
          if(err !== null){
            switch (err['code']){
              case 'INVALID_EMAIL':
              $scope.err = 'Oops! Double-check that email address.';
              break;
              case 'INVALID_USER':
              $scope.err = 'Oops! We can\'t find that email in our system.';
              break;
              case 'INVALID_PASSWORD':
              $scope.passReset = 1;
              break;
              default:
                $scope.err = err['code'];
            }
          }
          typeof(callback) === 'function' && callback(err, user);
        });
      };
      $scope.loginAnon = function(callback) {
        console.log('attempting to log in anon');
        loginService.loginAnon('/groups', function(err, user) {

          console.log(err);
          typeof(callback) === 'function' && callback(err, user);
        });
      };
    }])
  