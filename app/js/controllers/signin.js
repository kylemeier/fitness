
  app.controller('SigninCtrl', ['$rootScope','$scope','loginService','$location', function($rootScope, $scope, loginService, $location) {
      $scope.url = $location.path();

      $scope.$on('angularFireAuth:login', function () {
        $rootScope.slideView('view-slide-left','/groups');
      })

      $scope.email = 'asdf';
      $scope.pass = null;
      $scope.name = null;

      $scope.login = function(callback) {
        console.log('inside login');
        $scope.err = null;
        loginService.login($scope.email, $scope.pass, '/groups', function(err, user) {
          $scope.passReset = 0;
          if(err !== null){
            switch (err.code){
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
                $scope.err = err.code;
            }
          }
          typeof(callback) === 'function' && callback(err, user);
        });
      };
      $scope.loginAnon = function(callback) {
        console.log('attempting to log in anon');
        loginService.loginAnon('/groups', function(err, user) {
          console.log('in controller call back');
          console.log(err);
          typeof(callback) === 'function' && callback(err, user);
        });
      };

      $scope.resetPassword = function(callback){
        console.log('resetting password');
        loginService.resetPassword($scope.email, function(err,success){
        });
        $scope.passReset = 0;
        $scope.err = 'Password reset email sent!';
      }
    }])
  