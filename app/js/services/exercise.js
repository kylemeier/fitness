app.factory('Exercises', ['$rootScope', 'angularFireCollection', 'FBURL',
  function($rootScope, angularFireCollection, FBURL) {
        var exerciseRef = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');
      return {

        collect: function(groupId) {
          return angularFireCollection(exerciseRef.child(groupId+'/exercises'));
        }

      , count: function(groupId){
          return exerciseRef.child(groupId+'/exercises');

      }
      , find: function(groupId, exerciseId) {
          return exerciseRef.child(groupId+'/exercises/'+exerciseId);
        }

      , create: function(groupId, exerciseName, exerciseWeight, exerciseSets, exerciseReps) {

         return exerciseRef.child(groupId+'/exercises').push(
          {
            name: exerciseName,
            weight: exerciseWeight,
            sets: exerciseSets,
            reps: exerciseReps,
            maxWeight: 0,
            failures: 0,
            lastRecorded: ''
          }).name();
        }

      , remove: function(groupId, exerciseId){
          exerciseRef.child(groupId+'/exercises/'+exerciseId).remove();
        }
      }
    }])

