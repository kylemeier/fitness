angular.module('fitness.controllers.editGroup',['fitness.services.groups'])
  .controller('editGroupCtrl',['$rootScope','$scope','$routeParams', 'angularFire', 'Groups',
    function($rootScope, $scope, $routeParams, angularFire, Groups){
      console.log('in group controller');


      (function(){ 
        angularFire(Groups.find($routeParams.groupId), $scope, 'group'); 
      }())

    }])