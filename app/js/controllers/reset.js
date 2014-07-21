app.controller('ResetCtrl', ['$rootScope', '$scope', '$routeParams', 'Auth',
	function($rootScope, $scope, $routeParams, Auth){

		$scope.user = {
      		email: '',
      		newPassword: ''
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

	$scope.login = function(){
      Auth.login($scope.user).then(function(user){
         $rootScope.userID = user.uid;
         
      },function(error){
          $scope.passReset = 0;

          switch (error.code){

            case 'INVALID_EMAIL':
              $scope.message = 'Oops! Double-check that email address.';
              break;
            case 'INVALID_USER':
              $scope.message = 'Oops! We can\'t find that email in our system.';
              break;
            case 'INVALID_PASSWORD':
              $scope.passReset = 1;
              $scope.message = 'We couldn\'t verify your information. Try clicking the link in your email again.'
              break;
            default:
                $scope.message = error.toString();
            }
      });
    };

    $scope.changePassword = function(){
    	Auth.changePassword($scope.user).then(function(success){
    		$rootScope.slideView('view-slide-left', '/groups');
    	}, function(error){
    		$scope.message = error.toString();
    	})
    }
}])