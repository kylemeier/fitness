(function(){
	var app = angular.module('fitness', ['ngAnimate', 'ngRoute']);


    app.config(function($routeProvider){
      $routeProvider

      //groups page
      .when('/', {
        templateUrl: 'pages/page-groups.html',
        controller: 'groupsController'
      })

      .when('/group-namer',{
        templateUrl: 'pages/page-group-namer.html',
        controller: 'groupsNamerController'
      });

    });

    app.controller('groupsController',function($scope){
      $scope.pageClass = 'page-groups';
    });

    app.controller('groupsNamerController',function($scope){
      $scope.pageClass = 'page-group-namer';
    });

    app.controller('slideController',['$scope','$location', function($scope, $location){
      $scope.goNext = function (hash){
        $location.path(hash);
      };
    }]);

})();