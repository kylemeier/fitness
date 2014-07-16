app.factory('Auth', ['$firebaseSimpleLogin', 'FBURL', '$rootScope', '$location',
	function($firebaseSimpleLogin, FBURL, $rootScope, $location){
		console.log('hey!');
		var ref = new Firebase(FBURL);

		var auth =  $firebaseSimpleLogin(ref);

		var Auth = {
			register: function(user){
				return auth.$createUser(user.email, user.pass);
			},
			signedIn: function(){
				return auth.user !== null;
			},
			login: function(user){
				return auth.$login('password', {
					email: user.email,
					password: user.password,
					rememberMe: true
				});
			},
			logout: function(){
				return auth.$logout();
			}
		};

		$rootScope.signedIn = function(){
			return Auth.signedIn();
		}
		return Auth;
	}]);