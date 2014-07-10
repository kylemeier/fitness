angular.module("fitness.services.exercises",[]).factory("Exercises",["$rootScope","angularFireCollection","FBURL",function(e,t,n){var r=new Firebase(n+"/users/"+e.userID+"/exercise groups");return{collect:function(e){return t(r.child(e+"/exercises"))},count:function(t){console.log("attempting to count ex for group"+t);var r=new Firebase(n+"/users/"+e.userID+"/exercise groups/"+t+"/exercises");r.once("value",function(t){e.numExercises=t.numChildren();console.log("numEx "+e.numExercises)})},find:function(e,t){return r.child(e+"/exercises"+t)},create:function(e,t,n,i,s){return r.child(e+"/exercises").push({name:t,weight:n,sets:i,reps:s,failures:0}).name()},remove:function(e,t){console.log("inside exercise service");r.child(e+"/exercises/"+t).remove()}}}]);