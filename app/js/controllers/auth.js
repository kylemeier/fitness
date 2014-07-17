app.controller('AuthCtrl', ['$rootScope', '$scope', '$location', 'Auth', 'User',
  function ($rootScope, $scope, $location, Auth, User) {
    $scope.user = {
      email: '',
      password: ''
    }

    $scope.$on('$firebaseSimpleLogin:login', function(user){
      $rootScope.slideView('view-slide-left', '/groups');
    });

    $scope.login = function(){
      Auth.login($scope.user).then(function(user){

      },function(error){
        console.log(error);
          $scope.passReset = 0;

          switch (error.code){

            case 'INVALID_EMAIL':
              $scope.error = 'Oops! Double-check that email address.';
              break;
            case 'INVALID_USER':
              $scope.error = 'Oops! We can\'t find that email in our system.';
              break;
            case 'INVALID_PASSWORD':
              $scope.passReset = 1;
              break;
            default:
                $scope.error = error.toString();
            }
      });
    };

    $scope.loginAnon = function(){
      Auth.loginAnon().then(function (user){
        $rootScope.userID = user.uid;

      }, function(error){
        $scope.error = error.toString();
      })
    }
 
    $scope.register = function () {

      Auth.register($scope.user).then(function (user) {
        $rootScope.userID = user.uid;
        $rootScope.slideView('view-slide-left', '/groups');
        User.create(user);
      }, function(error){
          $scope.error = error.toString();
      });
    }
  }]);