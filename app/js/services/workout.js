app.factory('Workout', ['$rootScope','$routeParams','$firebase', 'FBURL',
    function($rootScope, $routeParams, $firebase, FBURL) {

        var getRef, setRef, userRef; 

            Workout = {
              setRefs: function(){
                getRef = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups/'+$routeParams.groupId+'/exercises/');
                setRef = $firebase(getRef);
                user = new Firebase(FBURL+'/users/'+$rootScope.userID);
                userRef = $firebase(user);
              }

          ,  getFirstWorkout: function(){
              return userRef.$child('first workout');
            }

           ,   getFailures: function(exerciseId){
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

          , setLastResult: function(exerciseId, result){
            setRef.$child(exerciseId+'/lastResult').$set(result);
          }

        }
        return Workout;
    }])

