angular.module("fitness.services.exercises",[]).factory("Exercises",["$rootScope","angularFireCollection","FBURL",function(e,t,n){var r=new Firebase(n+"/users/"+e.userID+"/exercise groups");return{collect:function(e){return t(r.child(e+"/exercises"))},count:function(e){return r.child(e+"/exercises")},find:function(e,t){console.log("inside service");return r.child(e+"/exercises/"+t)},create:function(e,t,n,i,s){return r.child(e+"/exercises").push({name:t,weight:n,sets:i,reps:s,maxWeight:0,failures:0,lastRecorded:""}).name()},remove:function(e,t){console.log("inside exercise service");r.child(e+"/exercises/"+t).remove()}}}]);