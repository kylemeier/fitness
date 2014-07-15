app.controller('GroupsCtrl',['$rootScope', '$scope', '$location', 'loginService', 'angularFire', 'FBURL', '$timeout', 'Groups', 'Exercises',
    function($rootScope, $scope, $location, loginService, angularFire, FBURL, $timeout, Groups, Exercises) {
      
      $scope.countGroups = function(){
          Groups.count().once('value', function(snapshot){
            $scope.groupCount = snapshot.numChildren();
            console.log($scope.groupCount);
          })
      }

      $scope.countGroups();

      $scope.collectExercises = function(groupId){
        return Exercises.collect(groupId);
      }

      var collectGroups = function(){
        $scope.allGroups = Groups.collect();
      }

      collectGroups();

      var currentGroup = {};
      $scope.editMode = false;

      $scope.removeGroup = function(id){
        Groups.remove(id);
        $scope.countGroups()

        //leave edit mode if there are no groups
        if(!$scope.groupCount){
          $scope.editMode = false;
        }
      }

      $scope.removeExercise = function(groupId, exerciseId){
        $rootScope.currentExercise = {};
        
        $timeout(function(){
          Exercises.remove(groupId, exerciseId);
          
          $timeout(function(){
            $rootScope.currentGroup = groupId;
          },500);
        },300);
      }

      $scope.countExercises = function(groupId){
        Exercises.count(groupId).once('value', function(snapshot){
          $scope.exerciseCount = snapshot.numChildren() +1;
        })
      }

      $scope.autofill = function(){ 
        var group1 = Groups.create('Thursday Workout');
        var group2 = Groups.create('Tuesday Workout');

        Exercises.create(group1, 'Dumbbell Bench Press', 65, 3, 6);
        Exercises.create(group1, 'Dumbbell Incline Bench Press', 40, 2, 10);
        Exercises.create(group1, 'Dumbbell Military Press', 35, 3, 6);
        Exercises.create(group1, 'Barbell Lying Tricep Extensions', 22.5, 3, 10);

        Exercises.create(group2, 'Pullups', 5, 3, 10);
        Exercises.create(group2, 'Bentover Rows', 85, 3, 8);
        Exercises.create(group2, 'Dumbbell Hammercurls', 30, 2, 10);
        Exercises.create(group2, 'Situps', 20, 3, 10);

        $scope.countGroups();
  
    }



      $scope.setGroup = function(clickedGroup){
        //Check if group is already expanded and clear currentGroup if so to allow for collapse on click
        //also clears currentExercise to hide any viewable delete confirm buttons
        console.log(clickedGroup);
        if($rootScope.currentGroup === clickedGroup){
          $rootScope.currentGroup = {};
          $rootScope.currentExercise = {};
        }else{
          $rootScope.currentGroup = clickedGroup;
        }
      }

      $scope.isGroupClicked = function(checkGroup){
          if($rootScope.currentGroup === checkGroup){
            console.log(checkGroup);
          }
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
        if($scope.groupCount > 0 && $scope.editMode === false){
          return true
        }else{
          return false
        }
      }

      $scope.logout = function() {
         loginService.logout('/');
      };
    }])
