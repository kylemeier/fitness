app.factory("Group",["$rootScope","$firebase","FBURL","User",function(e,t,n,r){var i=new Firebase(n+"/users/"+e.userID+"/exercise groups");console.log("in group service");console.log(e.userID);var s=t(i);console.log("groups in group service"+s);var o={all:s,dataRef:function(){return i},find:function(e){return s.$child(e)},create:function(e){return s.$add({name:e})},remove:function(e){return s.$remove(e)}};console.log("Group in group service"+o);return o}]);