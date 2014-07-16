app.factory('Workout', ['$rootScope','$routeParams','$firebase', 'FBURL',
    function($rootScope, $routeParams, $firebase, FBURL) {
        var getRef = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups/'+$routeParams.groupId+'/exercises/'),
            setRef = $firebase(getRef),
            Workout = {
              getFailures: function(exerciseId){
            return getRef.child(exerciseId+'/failures');
          }

          , getWeight: function(exerciseId){
              return getRef.child(exerciseId+'/weight');
          }

          , getMaxWeight: function(exerciseId){
              return getRef.child(exerciseId+'/maxWeight');
          }

          , setFailures: function(exerciseId, failures){
            setRef.$child(exerciseId+'/failures').$set(failures);
          }

          , setWeight: function(exerciseId, weight){
            if(weight > 0){
              setRef.$child(exerciseId+'/weight').$set(weight);
            }
          }

          , setMaxWeight: function(exerciseId, weight){
            setRef.$child(exerciseId+'/maxWeight').$set(weight);
          }
          , setLastRecorded: function(exerciseId, date){
            setRef.$child(exerciseId+'/lastRecorded').$set(date);
          }

        }
        return Workout;
    }])

