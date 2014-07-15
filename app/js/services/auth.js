app.factory('Auth', ['$firebaseSimpleLogin', 'FBURL', '$rootScope',
	function($firebaseSimpleLogin, FBURL, $rootScope){
		var ref = new Firebase(FBURL);

		var auth =  $firebaseSimpleLogin(ref);

		var Auth = {
			register: function(user){
				return auth.$createUser(user.email, user.password);
			},
			signedIn: function(){
				return auth.user !== null;
			},
			logout: function(){
				auth.$logout();
			}
		};

		$rootScope.signedIn = function(){
			return Auth.signedIn();
		}
		return Auth;
	}]);