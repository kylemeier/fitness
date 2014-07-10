angular.module('fitness.services.groups', [])
  .factory('Groups', ['$rootScope','angularFireCollection', 'FBURL',
    function($rootScope, angularFireCollection, FBURL) {
      console.log('groupservice userID '+$rootScope.userID);
        var groupRef = new Firebase(FBURL+'/users/'+$rootScope.userID+'/Exercise Groups');
      return {
        // collection: function(cb) {
        //   return angularFireCollection(FireRef.leagues(),cb);
        // }
        collect: function() {
          return angularFireCollection(groupRef);
        }
      , count: function(){
          var test = new Firebase(FBURL+'/users/'+$rootScope.userID+'/Exercise Groups');
          test.once('value', function(dataSnapshot){
          $rootScope.numGroups = dataSnapshot.numChildren();
        })
      }
      // , find: function(leagueId) {
      //     return FireRef.leagues().child('/'+leagueId);
      //   }
      , find: function(groupId) {
      	console.log(groupId);
          return groupRef.child(groupId);
        }

      // , create: function(league, commissioner) {
      //    return FireRef.leagues().push({
      //       name: league.name,
      //       commissionerId: commissioner.id,
      //       fantasyTeams: []
      //     }).name();
      //   }
      , create: function(groupName) {
        console.log('group service adding group'+ groupName);
         return groupRef.push({
            name: groupName,
            exercises: []
          }).name();
        }
      , remove: function(groupId){
          groupRef.child(groupId).remove();
        }
      }
    }])