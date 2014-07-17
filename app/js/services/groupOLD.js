app.factory('Group', ['$rootScope', '$firebase', 'FBURL', 'User',
  function($rootScope, $firebase, FBURL, User) {

        var ref, groups;

        var Group = {
          setRefs: function(){
            ref = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');
            groups = $firebase(ref);
          },
          all: function(){
              return groups
          },
          dataRef: function(){
            console.log('inside data ref '+groups,ref);
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