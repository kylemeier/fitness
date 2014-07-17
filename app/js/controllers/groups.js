app.controller('GroupsCtrl',['$rootScope', '$scope', '$location', '$firebase', 'FBURL', '$timeout', 'Group', 'Exercise', 'Auth', 'User',
    function($rootScope, $scope, $location, $firebase, FBURL, $timeout, Group, Exercise, Auth, User) {
      console.log('group controller!');
      
      $scope.allGroups = Group.all;


      $scope.countGroups = function(){
          Group.dataRef().once('value', function(snapshot){
            $scope.groupCount = snapshot.numChildren();
            console.log($scope.groupCount);
          })
      }

      $scope.countGroups();

      $scope.allExercises = function(groupId){
        console.log('calling allexercises on '+groupId);
        console.log(Exercise.all(groupId));
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
        console.log('groupId '+groupId+' exerciseId '+ exerciseId)
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
        Group.create('Thursday Workout').then(function(ref){
          var groupId = ref.name();

          Exercise.create(groupId, 'Dumbbell Bench Press', 65, 3, 6);
          Exercise.create(groupId, 'Dumbbell Incline Bench Press', 40, 2, 10);
          Exercise.create(groupId, 'Dumbbell Military Press', 35, 3, 6);
          Exercise.create(groupId, 'Barbell Lying Tricep Extensions', 22.5, 3, 10);
        })

        Group.create('Tuesday Workout').then(function(ref){
          var groupId = ref.name();

          Exercise.create(groupId, 'Pullups', 5, 3, 10);
          Exercise.create(groupId, 'Bentover Rows', 85, 3, 8);
          Exercise.create(groupId, 'Dumbbell Hammercurls', 30, 2, 10);
          Exercise.create(groupId, 'Situps', 20, 3, 10);
        })



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
      $rootScope.slideView('view-slide-right', '/');
    });
    }])
