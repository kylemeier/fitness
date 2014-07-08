'use strict';

angular.module('fitness.controllers.signin', ['fitness.services.login'])
  .controller('SigninCtrl', ['$scope', 'loginService', '$location',
    function($scope, loginService, $location) {

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
          $scope.err = err||null;
          typeof(callback) === 'function' && callback(err, user);
        });
      };
    }])
  