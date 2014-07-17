app.factory('Group', ['$firebase', 'FBURL', 'User',
  function($firebase, FBURL, User) {
        console.log('up here');
        var ref = new Firebase(FBURL+'/users');

        var groups = $firebase(ref);

        //injecting userId for each call to ensure the correct user's data is being retrieved. Defining it in ref caused incorrect user data to show
        //if one user logged out and another logged in as the service wouldn't redefine the variable until a refresh.
        var Group = {
          all: function(userId){
            console.log('in all');
            return groups.$child(userId+'/exercise groups')
          }
          , dataRef: function(userId){
            return ref.$child(userId+'/exercise groups')
          }
        
          ,find: function(userId, groupId) {
            return groups.$child(userId+'/exercise groups/'+groupId);
        }

      , create: function(userId, groupName) {

         return groups.$child(userId+'/exercise groups').$add({
            name: groupName
          })
        }

      , remove: function(userId, groupId){
          return groups.$child(userId+'/exercise groups').$remove(groupId);
        }

        }
                var ref = new Firebase(FBURL+'/users');

        var groups = $firebase(ref);

        console.log('down here');

        return Group

    }])