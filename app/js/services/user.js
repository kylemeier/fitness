app.factory('User', ['$rootScope', '$firebase','FBURL','Auth',
	function ($rootScope, $firebase, FBURL, Auth){
		var ref = new Firebase(FBURL + '/users');

		var users = $firebase(ref);

		$rootScope.$on('$firebaseSimpleLogin:login', function (e, user){
			setUserID (user.uid)
		});

		function setUserID (id){
			$rootScope.userID = id;
		}

		var User = {
			create: function(user){
				users[user.uid] = {
					'email': user.email,
					'first workout': true
				};
				users.$save(user.uid).then(function(){
					setUserID(user.uid);
					$rootScope.slideView('view-slide-left', '/groups');
				});
			}
		};

		return User;


}])