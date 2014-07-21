app.factory('Group', ['$rootScope', '$firebase', 'FBURL', 'User',
  function($rootScope, $firebase, FBURL, User) {

        var ref, groups;

        //using setRefs inside object to ensure correct userID is being passed through. Setting refs/groups outside the object caused a previous 
        //userID to populate in a specific situation
        var Group = {
          setRefs: function(){
            ref = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');
            groups = $firebase(ref);
          },
          all: function(){
              return groups
          },
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