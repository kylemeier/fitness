app.controller('EditGroupCtrl',['$rootScope','$scope','$routeParams', '$firebase', 'Group',
	function($rootScope, $scope, $routeParams, $firebase, Group){

		if(!$rootScope.userID){
			$location.path('/');
		}

      	//binding $scope.group to relevant group object in database, ensures all changes are immediately reflected in the db
      	Group.find($routeParams.groupId).$bind($scope, 'group');


    }])