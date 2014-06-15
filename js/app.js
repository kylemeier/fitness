(function(){
	var app = angular.module('fitness', ['ngAnimate', 'ngRoute']);


    app.config(function($routeProvider){
      $routeProvider

      //groups page
      .when('/', {
        templateUrl: 'pages/page-groups.html',
        controller: 'groupsController'
      })

      .when('/new-group',{
        templateUrl: 'pages/page-new-group.html',
        controller: 'newGroupController'
      });

    });

    app.controller('groupsController',function($scope){
      $scope.pageClass = 'page-groups';
    });

    app.controller('newGroupController',function($scope){
      $scope.pageClass = 'page-new-group';
    });

    app.controller('slideController',['$scope','$location', function($scope, $location){
      $scope.goNext = function (hash){
        $location.path(hash);
      };
    }]);

})();