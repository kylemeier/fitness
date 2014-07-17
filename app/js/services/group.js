app.factory('Group', ['$rootScope', '$firebase', 'FBURL', 'User',
  function($rootScope, $firebase, FBURL, User) {

    // $rootScope.$on('$firebaseSimpleLogin:login', function (e, user){

        // $rootScope.userID = user.uid;

        var ref = new Firebase(FBURL+'/users/'+$rootScope.userID+'/exercise groups');
        console.log('in group service');
        console.log($rootScope.userID);

        var groups = $firebase(ref);
        console.log('groups in group service' +groups);

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
        console.log('Group in group service'+Group);
        return Group
    // })

    }])