app.controller("NewGroupCtrl",["$rootScope","$scope","Group",function(e,t,n){t.addGroup=function(){t.groupName&&n.create(t.groupName).then(function(e){t.groupId=e.name()})};t.buttonClick=function(r){t.groupName&&n.create(t.groupName).then(function(t){var n="",i="";if(r==="next"){n=t.name()+"/new-exercise/1";i="left"}else{n="/groups";i="right"}console.log(n);e.slideView("view-slide-"+i,n)})}}]);