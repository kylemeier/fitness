app.factory('Group', ['$rootScope', '$firebase', 'FBURL', 'User',
  function($rootScope, $firebase, FBURL, User) {

        var ref = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');

        var groups = $firebase(ref);

        var Group = {
          all: groups,
          dataRef: function(){
            return ref
          }
        
          ,find: function(groupId) {
            return groups.$child(groupId);
        }

      , create: function(groupName) {

         return groups.$add({
            name: groupName
          })
        }

      , remove: function(groupId){
          return groups.$remove(groupId);
        }

        }

        return Group

    }])