app.factory('Auth', ['$firebaseSimpleLogin', 'FBURL', '$rootScope', '$location',
	function($firebaseSimpleLogin, FBURL, $rootScope, $location){

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
			loginAnon: function(){
				return auth.$login('anonymous', {
					rememberMe: true
				});
			},
			logout: function(){
				delete $rootScope.userID;
				$rootScope.slideView('view-slide-right', '/');
				return auth.$logout();
			}
		};

		$rootScope.signedIn = function(){
			return Auth.signedIn();
		}
		return Auth;
	}]);