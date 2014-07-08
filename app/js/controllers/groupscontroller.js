angular.module('fitness.controllers.groups',['fitness.services.login'])
  .controller('groupsCtrl',['$rootScope', '$scope', '$location', 'loginService', 'angularFire', 'FBURL', 
    function($rootScope, $scope, $location, loginService, angularFire, FBURL) {

      $scope.$on('angularFireAuth:login', function() {
        console.log('groupsCtrl login');
        angularFire(new Firebase(FBURL+'/users/'+$scope.auth.id), $rootScope, 'user');
      });
 
      var currentGroup = {};
          $scope.editMode = false;
      $scope.autofill = function(){ 
        var firebaseRef = new Firebase(FBURL+'/users/'+$scope.auth.id);
        firebaseRef.child('group').set('Tuesday Workout');
        // $rootScope.allGroups = [
        //   {groupID: 'g1', name:'Tuesday Workout', exerciseArray:
        //    [{name:'Dumbbell Bench Press', weight: 65, sets:3, reps:6},
        //     {name:'Dumbbell Incline Bench Press', weight: 40, sets:2, reps:10},
        //     {name:'Dumbbell Military Press', weight: 35, sets:3, reps:6},
        //     {name:'Barbell Lying Tricep Extensions', weight: 22.5, sets:3, reps:10}]},                                              
        //   {groupID: 'g2', name:'Thursday Workout', exerciseArray:
        //    [{name:'Pullups', weight: 5, sets:3, reps:10},
        //     {name:'Bentover Rows', weight: 85, sets:3, reps:8},
        //     {name:'Dumbbell Hammercurls', weight: 30, sets:2, reps:10},
        //     {name:'Situps', weight: 20, sets:3, reps:10}]}
        // ]
        
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

      //Logic for showing/hiding the Edit button in the top right
      $scope.showEdit = function(){
        if($rootScope.allGroups.length > 0 && $scope.editMode === false){
          return true
        }else{
          return false
        }
      }

      $scope.logout = function() {
         loginService.logout();
      };
    }])
