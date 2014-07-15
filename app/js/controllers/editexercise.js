app.controller('EditExerciseCtrl', ['$rootScope', '$scope', '$routeParams', 'angularFire', 'Exercises',
 function($rootScope, $scope, $routeParams, angularFire, Exercises){

      (function(){ 
        console.log('group: '+$routeParams.groupId+' exercise: '+$routeParams.exerciseId);
        angularFire(Exercises.find($routeParams.groupId, $routeParams.exerciseId), $scope, 'exercise');  
      }())

    }])