angular.module('fitness.controllers.newGroup',['fitness.services.groups'])
  .controller('newGroupCtrl',['$rootScope','$scope','Groups',
    function($rootScope, $scope, Groups){
      $scope.addGroup = function(){
        if($scope.groupName){
          $scope.groupId = Groups.create($scope.groupName);
        }
      }
    }])