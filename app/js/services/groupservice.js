angular.module('fitness.services.groups', [])
  .factory('Groups', ['$rootScope','angularFireCollection', 'FBURL',
    function($rootScope, angularFireCollection, FBURL) {
      console.log('groupservice userID '+$rootScope.userID);
        var groupRef = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');
  
      return {

        collect: function() {
          return angularFireCollection(groupRef);
        }

      , count: function(){
          var countRef = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');
          countRef.once('value', function(dataSnapshot){
          $rootScope.numGroups = dataSnapshot.numChildren();
        })
      }

      , find: function(groupId) {
          return groupRef.child(groupId);
        }

      , create: function(groupName) {

         return groupRef.push({
            name: groupName
          }).name();
        }

      , remove: function(groupId){
          groupRef.child(groupId).remove();
        }
      }
    }])