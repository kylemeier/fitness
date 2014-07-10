angular.module('fitness.controllers.newGroup',['fitness.services.groups'])
  .controller('newGroupCtrl',['$rootScope','$scope','Groups',
    function($rootScope, $scope, Groups){
      console.log('in group controller');
      $scope.addGroup = function(){
        console.log('in group controller, before adding group');
        if($scope.groupName){
          console.log('in group controller, adding group');
          Groups.create($scope.groupName);
        }
      }
    }])