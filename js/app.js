(function(){
	var app = angular.module('fitness', ['ngAnimate', 'ngRoute']);


    app.config(function($routeProvider){
      $routeProvider

      //groups page
      .when('/', {
        templateUrl: 'pages/page-groups.html',
        controller: 'groupsController',
        controllerAs: 'groupsCtrl'
      })

      .when('/new-group',{
        templateUrl: 'pages/page-new-group.html',
        controller: 'newGroupController',
        controllerAs: 'newGroupCtrl'
      });

    });

    app.controller('groupsController',function(){
      // this.pageClass = 'page-groups';
    });

    app.controller('newGroupController',function(){
      // this.pageClass = 'page-new-group';
    });

  app.controller( 'slideController', function($rootScope, $scope, $location) {
    $scope.slideView = function (direction, url) {
        $rootScope.slideDir = direction; 
        $location.path(url);
    }  
  });

})();