//edit > delete icon > done: exercise group will expand
(function(){
	var app = angular.module('fitness', ['ngAnimate', 'ngRoute']);
  

  app.run(function($rootScope) {
   $rootScope.allGroups = [],
   $rootScope.currentExercise = {};
   $rootScope.currentGroup = {};
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

        var currentGroup = {};
            $scope.editMode = false;
        $scope.autofill = function(){ 
          $rootScope.allGroups = [
            {name:'Tuesday Workout', exerciseArray:
             [{name:'DB Bench Press', weight: 65, sets:3, reps:6},
              {name:'DB Incline Bench Press', weight: 40, sets:2, reps:10},
              {name:'DB Military Press', weight: 35, sets:3, reps:6},
              {name:'BB Lying Tricep Extensions', weight: 22.5, sets:3, reps:10}]},                                              
              {name:'Thursday Workout', exerciseArray:
             [{name:'Pullups', weight: 5, sets:3, reps:10},
              {name:'Bentover Rows', weight: 85, sets:3, reps:8},
              {name:'DB Hammercurls', weight: 30, sets:2, reps:10},
              {name:'Situps', weight: 20, sets:3, reps:10}]}
          ]
        }

        $scope.setGroup = function(clickedGroup){
          //Check if group is already expanded and clear currentGroup if so to allow for collapse on click
          //also clears currentExercise to hide any viewable delete confirm buttons
          if($rootScope.currentGroup === clickedGroup){
            $rootScope.currentGroup = {};
            $rootScope.currentExercise = {};
          }else{
            $rootScope.currentGroup = clickedGroup;
          }
        }

        $scope.isGroupClicked = function(checkGroup){
            return $rootScope.currentGroup === checkGroup;
        }

        $scope.setExercise = function(clickedExercise){
          //Check if exercise is already clicked
          if($rootScope.currentExercise === clickedExercise){
            $rootScope.currentExercise = {};
          }else{
            $rootScope.currentExercise = clickedExercise;
          }

        } 
        $scope.isExerciseClicked = function(checkExercise){
          return $rootScope.currentExercise === checkExercise;
        }
      

        $scope.showEdit = function(){
          if($rootScope.allGroups.length > 0 && $scope.editMode === false){
            return true
          }else{
            return false
          }
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

  app.controller( 'mainController',function($rootScope,$scope){
    //in mainController to track a click anywhere in the app
    $scope.clearDelete = function(){
      $rootScope.currentExercise = {};
      $rootScope.currentGroup = {};
    }  
  });

})();