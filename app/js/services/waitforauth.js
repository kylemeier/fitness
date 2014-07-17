app.factory('waitForAuth', ['$rootScope','$q','$timeout',function($rootScope, $q, $timeout) {
    function fn(err) {
      if($rootScope.auth) {
        $rootScope.auth.error = err instanceof Error? err.toString() : null;
      }
      for(var i=0; i < subs.length; i++) { subs[i](); }
      $timeout(function() {
        // force $scope.$apply to be re-run after login resolves
        def.resolve();
      });
    }

    var def = $q.defer(), subs = [];
    subs.push($rootScope.$on('$firebaseSimpleLogin:login', fn));
    subs.push($rootScope.$on('$firebaseSimpleLogin:logout', fn));
    subs.push($rootScope.$on('$firebaseSimpleLogin:error', fn));
    return def.promise;
  }])