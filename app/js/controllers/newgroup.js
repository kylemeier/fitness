app.controller('NewGroupCtrl',['$rootScope','$scope','Group',
    function($rootScope, $scope, Group){

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