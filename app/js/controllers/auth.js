app.controller('AuthCtrl', ['$rootScope', '$scope', '$location', 'Auth', 'User',
  function ($rootScope, $scope, $location, Auth, User) {
    console.log('hey!');
    if (Auth.signedIn()) {
      console.log('checking if signed in');
      $location.path('/groups');
    }

    $scope.$on('$firebaseSimpleLogin:login', function(user){
          console.log('in auth controller login');
              $rootScope.userID = user.uid;
              // $location.path('/groups');
      });

    $scope.login = function(){
      Auth.login($scope.user).then(function(auth){
        $rootScope.userID = auth.uid;
        console.log('userID'+$rootScope.userID);
        $rootScope.slideView('view-slide-left', '/groups');
      }, function(error){
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
 
    $scope.register = function () {
      Auth.register($scope.user).then(function (user) {
        User.create(user);
      }, function(error){
          $scope.error = error.toString();
      });
    }
  }]);