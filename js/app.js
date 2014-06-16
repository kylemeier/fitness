(function(){
	var app = angular.module('fitness', ['ngAnimate', 'ngRoute']);
  

  app.run(function($rootScope) {
   $rootScope.allExercises = [];
  });

    app.config(function($routeProvider){
      $routeProvider

      .when('/', {
        templateUrl: 'pages/page-groups.html',
        controller: 'groupsController'
      })

      .when('/new-group',{
        templateUrl: 'pages/page-new-group.html',
        controller: 'newGroupController'
      });

    });

    app.controller('groupsController',function($rootScope, $scope){
        $scope.autofill = function(){ 
          $rootScope.allExercises = [
            {name:'Tuesday', exerciseArray:
             [{name:'DB Bench Press', weight: 65, sets:3, reps:6},
              {name:'DB Incline Bench Press', weight: 40, sets:2, reps:10},
              {name:'DB Military Press', weight: 35, sets:3, reps:6},
              {name:'BB Lying Tricep Extensions', weight: 22.5, sets:3, reps:10}]},                                              
              {name:'Thursday', exerciseArray:
             [{name:'Pullups', weight: 5, sets:3, reps:10},
              {name:'Bentover Rows', weight: 85, sets:3, reps:8},
              {name:'DB Hammercurls', weight: 30, sets:2, reps:10},
              {name:'Situps', weight: 20, sets:3, reps:10}]}
          ]
        }      
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

  app.controller( 'mainController',function($scope){

  });

})();