app.controller('NewGroupCtrl',['$rootScope','$scope','Group', '$location',
    function($rootScope, $scope, Group, $location){

    if(!$rootScope.userID){
      $location.path('/');
    }
    $rootScope.loading = 0;
    $scope.group = {};
    Group.setRefs();

      $scope.buttonClick = function(button){

        document.getElementById('group-name').blur();

        if(button === 'groups'){
          $rootScope.slideView("view-slide-right","/groups");
        }

      	if($scope.group.name){
           Group.create($scope.group).then(function(ref){

           	if(button === "next"){
              $rootScope.slideView("view-slide-left",ref.name()+"/new-exercise/1");
          	}
            
          });
        }
        
      }

    }])