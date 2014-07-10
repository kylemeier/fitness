angular.module('fitness.services.exercises', [])
  .factory('Exercises', ['$rootScope','angularFireCollection', 'FBURL',
    function($rootScope, angularFireCollection, FBURL) {
        var exerciseRef = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');
      return {

        collect: function(groupId) {
          return angularFireCollection(exerciseRef.child(groupId+'/exercises'));
        }

      , count: function(groupId){
          console.log('attempting to count ex for group'+ groupId);
          var countRef = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups/'+groupId+'/exercises');
          countRef.once('value', function(dataSnapshot){
          $rootScope.numExercises = dataSnapshot.numChildren();
          console.log('numEx '+$rootScope.numExercises);
        })
      }
      , find: function(groupId, exerciseId) {
          return exerciseRef.child(groupId+'/exercises'+exerciseId);
        }

      , create: function(groupId, exerciseName, exerciseWeight, exerciseSets, exerciseReps) {

         return exerciseRef.child(groupId+'/exercises').push(
          {
            name: exerciseName,
            weight: exerciseWeight,
            sets: exerciseSets,
            reps: exerciseReps,
            failures: 0
          }).name();
        }

      , remove: function(groupId, exerciseId){
          console.log('inside exercise service');
          exerciseRef.child(groupId+'/exercises/'+exerciseId).remove();
        }
      }
    }])

