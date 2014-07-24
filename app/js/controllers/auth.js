app.controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$timeout', 'Auth', 'User',
  function ($rootScope, $scope, $location, $routeParams, $timeout, Auth, User) {

    if($rootScope.userID){
      $rootScope.slideView('view-slide-left', '/groups');
    }

    $scope.user = {
      email: '',
      oldPassword: '',
      passwordConfirm: '',
      password: ''
    }

    $rootScope.loading = 0;
    $scope.signUpMode = false;

    $scope.login = function(){
      $rootScope.loading = 1;
      Auth.login($scope.user).then(function(user){
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
              break;
            default:
              $scope.message = error.toString();
            }
      });
    };

    $scope.loginAnon = function(){
      $rootScope.loading = 1;
      Auth.loginAnon().then(function (user){
        $rootScope.userID = user.uid;
        $rootScope.slideView('view-slide-left', '/groups');

      }, function(error){
        $rootScope.loading = 0;
        $scope.message = error.toString();
      })
    }
 
    $scope.register = function () {
      console.log($scope.user.passwordConfirm, $scope.user.password);
      if($scope.user.passwordConfirm === $scope.user.password){

        Auth.register($scope.user).then(function (user) {
          User.create(user);
          $rootScope.userID = user.uid;
          $rootScope.slideView('view-slide-left', '/groups');
        }, function(error){
            switch (error.code){

            case 'INVALID_EMAIL':
              $scope.message = 'Oops! Double-check that email address.';
              break;
            case 'INVALID_USER':
              $scope.message = 'Oops! We can\'t find that email in our system.';
              break;
            case 'INVALID_PASSWORD':
              $scope.message = 'Be sure to enter a password.';
              break;
            default:
              $scope.message = error.toString();
            }
        });
      }else{
        $scope.message = 'Passwords don\'t match.';
      }
    }

    $scope.submit = function(button){
      if($scope.signUpMode === false){
        if(button === 'logincreate'){
          $scope.login();
        }else{
          console.log('logging in as guest');
          $scope.loginAnon();
        }
      }else{
        if(button === 'logincreate'){
          $scope.register();  
        }else{
          console.log('cancelling');
          $scope.signUpMode = false;
        }  
      }
      
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
        $scope.message = 'Oops! Try re-entering your credentials.';
      });
    }

      $scope.update = function(){
        $rootScope.loading = 1;

        //confirm passwords on form match
        if($scope.user.password === $scope.passConfirm){

        //pull temp password from URL
        $scope.user.oldPassword = $routeParams.temp;

        //update password and login if successful
        $scope.changePassword();
      
      }else{
        $rootScope.loading = 0;
        $scope.message = 'Passwords don\'t match';
      }
    }

      $scope.changePassword = function(){
      Auth.changePassword($scope.user).then(function(success){
        $rootScope.loading = 0;
        $scope.message = 'Password updated successfully!'
        $scope.login();

      }, function(error){
        $rootScope.loading = 0;
        $scope.message = 'Oops! Try clicking the link in your email again.'
      })
    }

  }]);