app.factory('Exercise', ['$rootScope', '$firebase', 'FBURL',
  function($rootScope, $firebase, FBURL) {
        var ref, exercises;

        //using setRefs inside object to ensure correct userID is being passed through. Setting refs/exercises outside the object caused a previous 
        //userID to populate in a specific situation
        var Exercise = {
          setRefs: function(){
            ref = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');
            exercises = $firebase(ref);
          },
          all: function(groupId){
            return exercises.$child(groupId+'/exercises')
          },
          create: function(groupId, exercise) {

         return exercises.$child(groupId+'/exercises').$add(
          {
            name: exercise.name,
            weight: exercise.weight,
            sets: exercise.sets,
            reps: exercise.reps,
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

