app.controller('EditGroupCtrl',['$rootScope','$scope','$routeParams', 'angularFire', 'Groups',
    function($rootScope, $scope, $routeParams, angularFire, Groups){
      console.log('in group controller');


      (function(){ 
        angularFire(Groups.find($routeParams.groupId), $scope, 'group'); 
      }())

    }])