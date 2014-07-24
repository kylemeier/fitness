app.controller('GroupsCtrl',['$rootScope', '$scope', '$location', '$firebase', 'FBURL', '$timeout', 'Exercise', 'Auth', 'User', 'Group',
    function($rootScope, $scope, $location, $firebase, FBURL, $timeout, Exercise, Auth, User, Group) {

      //prevent user from accessing page if they aren't logged in
      if(!$rootScope.userID){
        $location.path('/');
      }

      $rootScope.loading = 0;
      Group.setRefs();
      Exercise.setRefs();
      $scope.allGroups = Group.all();

      $scope.countGroups = function(){
          Group.dataRef().once('value', function(snapshot){
            $scope.groupCount = snapshot.numChildren();
          })
      }

      $scope.countGroups();

      $scope.allExercises = function(groupId){
        return Exercise.all(groupId);
      }

      var currentGroup = {};
      $scope.editMode = false;

      $scope.removeGroup = function(id){
        Group.remove(id);
        $scope.countGroups()

        //leave edit mode if there are no groups
        if(!$scope.groupCount){
          $scope.editMode = false;
        }
      }

      $scope.removeExercise = function(groupId, exerciseId){
        $rootScope.currentExercise = {};
        
        $timeout(function(){
          Exercise.remove(groupId, exerciseId);
          
          $timeout(function(){
            $rootScope.currentGroup = groupId;
          },500);
        },300);
      }

      $scope.countExercises = function(groupId){
        Exercise.dataRef(groupId).once('value', function(snapshot){
          $scope.exerciseCount = snapshot.numChildren() +1;
        })
      }

      $scope.autofill = function(){ 
        Group.create('Tuesday Workout').then(function(ref){
          var groupId = ref.name();

          var exercise1 = {
            name: 'Dumbbell Bench Press',
            weight: 65,
            sets: 3,
            reps: 6
          }

          var exercise2 = {
            name: 'Dumbbell Incline Bench Press',
            weight: 40,
            sets: 2,
            reps: 10
          }

          var exercise3 = {
            name: 'Dumbbell Military Press',
            weight: 35,
            sets: 3,
            reps: 6
          }

          var exercise4 = {
            name: 'Barbell Lying Tricep Extensions',
            weight: 22.5,
            sets: 3,
            reps: 10
          }

          Exercise.create(groupId, exercise1);
          Exercise.create(groupId, exercise2);
          Exercise.create(groupId, exercise3);
          Exercise.create(groupId, exercise4);
        })

        Group.create('Thursday Workout').then(function(ref){
          var groupId = ref.name();

          var exercise1 = {
            name: 'Pullups',
            weight: 5,
            sets: 3,
            reps: 10
          }

          var exercise2 = {
            name: 'Bentover Rows',
            weight: 85,
            sets: 3,
            reps: 8
          }

          var exercise3 = {
            name: 'Dumbbell Hammercurls',
            weight: 30,
            sets: 2,
            reps: 10
          }

          var exercise4 = {
            name: 'Situps',
            weight: 20,
            sets: 3,
            reps: 10
          }

          Exercise.create(groupId, exercise1);
          Exercise.create(groupId, exercise2);
          Exercise.create(groupId, exercise3);
          Exercise.create(groupId, exercise4);
        })



        $scope.countGroups();
  
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
        if($scope.groupCount > 0 && $scope.editMode === false){
          return true
        }else{
          return false
        }
      }

      $scope.logout = function() {
         Auth.logout()
      };

    $scope.$on('$firebaseSimpleLogin:logout', function(){
      delete $rootScope.userID;
      // $rootScope.slideView('view-slide-right', '/');
    });
    }])
