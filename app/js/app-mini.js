//edit should inject name without using setGroup
//realign exericse delete/edit/confirm
//add workout page
//test group/exercise name length
//after three failures, show alert asking if user wants to set a reminder to change the exercise or reset the count
//reminder will be an exclamation point in place of the delete button
var app=angular.module("fitness",["fitness.config","fitness.controllers.header","fitness.controllers.signin","fitness.controllers.signup","fitness.controllers.groups","fitness.controllers.newGroup","fitness.controllers.newExercise",,"firebase","ngRoute","ngAnimate"]).controller("slideController",["$rootScope","$scope","$location","$route",function(e,t,n,r){t.slideView=function(t,r){console.log(r);e.slideDir=t;n.path(r)}}]).controller("mainController",function(e,t){t.clearDelete=function(){e.currentExercise={};e.currentGroup={}}}).controller("editGroupController",function(e,t){t.input={};t.input.groupNameEdit="";t.addGroup=function(){t.input.groupName}});