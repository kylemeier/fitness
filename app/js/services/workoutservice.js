angular.module('fitness.services.workout', [])
  .factory('Workout', ['$rootScope','$routeParams','angularFireCollection', 'FBURL',
    function($rootScope, $routeParams, angularFireCollection, FBURL) {
        var ref = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups/'+$routeParams.groupId+'/exercises/');
      return {
        //get failures
        //get weight
        //get maxweight
        //set weight
        //set maxweight
        getFailures: function(exerciseId){
          return ref.child(exerciseId+'/failures');
        }

        , getWeight: function(exerciseId){
            return ref.child(exerciseId+'/weight');
        }

        , getMaxWeight: function(exerciseId){
            return ref.child(exerciseId+'/maxWeight');
        }

        , setFailures: function(exerciseId, failures){
          ref.child(exerciseId+'/failures').set(failures);
        }

        , setWeight: function(exerciseId, weight){
          ref.child(exerciseId+'/weight').set(weight);
        }

        , setMaxWeight: function(exerciseId, weight){
          ref.child(exerciseId+'/maxWeight').set(weight);
        }
      }
    }])

