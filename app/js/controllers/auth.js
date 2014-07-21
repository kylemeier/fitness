app.controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$timeout', 'Auth', 'User',
  function ($rootScope, $scope, $location, $routeParams, $timeout, Auth, User) {

    if($rootScope.userID){
      $rootScope.slideView('view-slide-left', '/groups');
    }

    $scope.user = {
      email: '',
      password: '',
      newPassword: ''
    }

    $rootScope.loading = 0;

    $scope.login = function(){
      $rootScope.loading = 1;
      Auth.login($scope.user).then(function(user){
         $rootScope.loading = 0;
         console.log($rootScope.loading);
         $rootScope.userID = user.uid;
         $rootScope.slideView('view-slide-left', '/groups');
         
      },function(error){
          $scope.passReset = 0;
          $rootScope.loading = 0;

          switch (error.code){

            case 'INVALID_EMAIL':
              $scope.message = 'Oops! Double-check that email address.';
              break;
            case 'INVALID_USER':
              $scope.message = 'Oops! We can\'t find that email in our system.';
              break;
            case 'INVALID_PASSWORD':
              $scope.passReset = 1;
              // $scope.message = 'Oops! Try clicking the link in your email again.'
              break;
            default:
              $scope.message = error.toString();
            }
      });
    };

    $scope.loginAnon = function(){
      Auth.loginAnon().then(function (user){
        $rootScope.userID = user.uid;
        $rootScope.slideView('view-slide-left', '/groups');

      }, function(error){
        $scope.message = error.toString();
      })
    }
 
    $scope.register = function () {

      Auth.register($scope.user).then(function (user) {
        User.create(user);
        $rootScope.userID = user.uid;
        $rootScope.slideView('view-slide-left', '/groups');
      }, function(error){
          $scope.message = error.toString();
      });
    }

    $scope.resetPassword = function(){
       $rootScope.loading = 1;
      Auth.resetPassword($scope.user.email).then(function(success){
        $rootScope.loading = 0;
        $scope.passReset = 0;
        $scope.message = 'Reset instructions emailed successfully.'

      }, function(error){
        $rootScope.loading = 0;
        $scope.passReset = 0;
        $scope.message = 'Oops! Something went wrong, please try re-entering your credentials.';
      });
    }

      $scope.update = function(){
    //confirm passwords match
    if($scope.user.newPassword === $scope.passConfirm){

      //pull temp password from URL
      $scope.user.password = $routeParams.temp;

      //authenticate user
      $scope.login();

      //update password
      $scope.changePassword();
      
    }else{
      $scope.message = 'Passwords don\'t match';
    }

  }

      $scope.changePassword = function(){
      Auth.changePassword($scope.user).then(function(success){
        $scope.message = 'Password updated successfully!'

        $timeout(function(){
          $rootScope.slideView('view-slide-left', '/groups');
        },1000);
        
      }, function(error){
        $scope.message = 'Oops! Try clicking the link in your email again.'
      })
    }

  }]);