app.factory('Exercise', ['$rootScope', '$firebase', 'FBURL',
  function($rootScope, $firebase, FBURL) {
        var ref = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');

        var exercises = $firebase(ref);

        var Exercise = {
          all: function(groupId){
            return exercises.$child(groupId+'/exercises')
          },
          create: function(groupId, exerciseName, exerciseWeight, exerciseSets, exerciseReps) {

         return exercises.$child(groupId+'/exercises').$add(
          {
            name: exerciseName,
            weight: exerciseWeight,
            sets: exerciseSets,
            reps: exerciseReps,
            maxWeight: 0,
            failures: 0,
            lastRecorded: ''
          })
        },
        dataRef: function(groupId){
          return ref.child(groupId+'/exercises');

      }, 
      find: function(groupId, exerciseId) {
          return exercises.$child(groupId+'/exercises/'+exerciseId);
      },
      remove: function(groupId, exerciseId){
         return exercises.$remove(groupId+'/exercises/'+exerciseId);
        }
      }
      return Exercise;
    }])

