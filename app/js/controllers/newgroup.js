app.controller('NewGroupCtrl',['$rootScope','$scope','Group', '$location',
    function($rootScope, $scope, Group, $location){

    if(!$rootScope.userID){
      $location.path('/');
    }
    $rootScope.loading = 0;

      $scope.buttonClick = function(button){

        if(button === 'groups'){
          $rootScope.slideView("view-slide-right","/groups");
        }

      	if($scope.groupName){
           Group.create($scope.groupName).then(function(ref){

           	if(button === "next"){
              $rootScope.slideView("view-slide-left",ref.name()+"/new-exercise/1");
          	}
            
          });
        }
        
      }

    }])