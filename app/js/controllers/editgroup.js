app.controller('EditGroupCtrl',['$rootScope','$scope','$routeParams', '$firebase', 'Group',
	function($rootScope, $scope, $routeParams, $firebase, Group){

		if(!$rootScope.userID){
			$location.path('/');
		}

		Group.setRefs();
		$rootScope.loading = 0;

      	//binding $scope.group to relevant group object in database, ensures all changes are immediately reflected in the db
      	Group.find($routeParams.groupId).$bind($scope, 'group');

      	$scope.submit = function(){
      		document.getElementById('group-name').blur();
      		$rootScope.slideView("view-slide-right","/groups");
      	}
    }])