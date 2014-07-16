app.controller('NewGroupCtrl',['$rootScope','$scope','Group',
    function($rootScope, $scope, Group){
      $scope.addGroup = function(){
        if($scope.groupName){
           Group.create($scope.groupName).then(function(ref){
          	$scope.groupId = ref.name();
          });
        }
      }
      $scope.buttonClick = function(button){
      	if($scope.groupName){
           Group.create($scope.groupName).then(function(ref){
           	var path = '',
           		dir = '';

           	if(button === "next"){
          		path = ref.name()+"/new-exercise/1";
          		dir = "left"
          	}else{
          		path = "/groups";
          		dir = "right"
          	}
          	console.log(path);
          		$rootScope.slideView("view-slide-"+dir,path);
          	});
        }
      }
    }])