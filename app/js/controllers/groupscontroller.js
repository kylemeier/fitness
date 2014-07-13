angular.module('fitness.controllers.groups',['fitness.services.login', 'fitness.services.groups', 'fitness.services.exercises'])
  .controller('groupsCtrl',['$rootScope', '$scope', '$location', 'loginService', 'angularFire', 'FBURL', '$timeout', 'Groups', 'Exercises',
    function($rootScope, $scope, $location, loginService, angularFire, FBURL, $timeout, Groups, Exercises) {
      

      $scope.collectExercises = function(groupId){
        return Exercises.collect(groupId);
      }

      $rootScope.numGroups = 1;


      var collectGroups = function(){
        $scope.allGroups = Groups.collect();
      }
      //have intro-text show up after a set time if no groups exist
      $timeout(function(){
        // Groups.count();
      },1000);

      collectGroups();

      var currentGroup = {};
      $scope.editMode = false;

      $scope.removeGroup = function(id){
        Groups.remove(id);
      }

      $scope.removeExercise = function(groupId, exerciseId){
        console.log('removing '+exerciseId+' from '+groupId);
        Exercises.remove(groupId, exerciseId);
      }


      $scope.autofill = function(){ 
        var group1 = Groups.create('Thursday Workout');
        var group2 = Groups.create('Tuesday Workout');

        Exercises.create(group1, 'Dumbbell Bench Press', 65, 3, 6);
        Exercises.create(group1, 'Dumbbell Incline Bench Press', 40, 2, 10);
        Exercises.create(group1, 'Dumbbell Military Press', 35, 3, 6);
        Exercises.create(group1, 'Barbell Lying Tricep Extensions', 22.5, 3, 10);

        // var count = Exercises.count(group1);
        // console.log('this is count '+count);

        Exercises.create(group2, 'Pullups', 5, 3, 10);
        Exercises.create(group2, 'Bentover Rows', 85, 3, 8);
        Exercises.create(group2, 'Dumbbell Hammercurls', 30, 2, 10);
        Exercises.create(group2, 'Situps', 20, 3, 10);

        $rootScope.numGroups = 2;

        Groups.count();
        // var firebaseRef = new Firebase(FBURL+'/users/'+$scope.auth.uid+'/Exercise Groups');
        // var groupName = firebaseRef.push({'name':'Tuesday Workout'}).name();

        // firebaseRef.child(groupName+'/Exercises').push({name:'Dumbbell Bench Press', weight: 65, sets:3, reps:6});
        // firebaseRef.child(groupName+'/Exercises').push({name:'Dumbbell Incline Bench Press', weight: 40, sets:2, reps:10});
        // firebaseRef.child(groupName+'/Exercises').push({name:'Dumbbell Military Press', weight: 35, sets:3, reps:6});
        // firebaseRef.child(groupName+'/Exercises').push({name:'Barbell Lying Tricep Extensions', weight: 22.5, sets:3, reps:10});

        // var groupName = firebaseRef.push({'name':'Thursday Workout'}).name();

        // firebaseRef.child(groupName+'/Exercises').push({name:'Pullups', weight: 5, sets:3, reps:10});
        // firebaseRef.child(groupName+'/Exercises').push({name:'Bentover Rows', weight: 85, sets:3, reps:8});
        // firebaseRef.child(groupName+'/Exercises').push({name:'Dumbbell Hammercurls', weight: 30, sets:2, reps:10});
        // firebaseRef.child(groupName+'/Exercises').push({name:'Situps', weight: 20, sets:3, reps:10});

        // $scope.findGroups();

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
        if($rootScope.numGroups > 0 && $scope.editMode === false){
          return true
        }else{
          return false
        }
      }

      $scope.logout = function() {
         loginService.logout('/');
      };
    }])
