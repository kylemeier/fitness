//To fix:
//Refreshing windows causes strange behavior, need to hide/don't load contents until auth has finished
//Intro text appear/disappear functionality
//login screen redirect if logged in
//
//UI issues:
//change screens only after login has completed
//create truncate function that adds an ellipses to long group/exericse names
//group line items need their own height, currently relying on group name. can't set it directly due to height expanding when clicked
//
//To do:
//style workout page
//code workout page
//test group/exercise name length
//password resets
//
//reminder will be an exclamation point in place of the delete button
//form checking for new exercise
//combine login/signup screens
//
//Additional Features:
//after three failures, show alert asking if user wants to set a reminder to change the exercise or reset the count
//body weight support, doesn't mess with weights
//animate deletions
var app=angular.module("fitness",["fitness.config","fitness.controllers.header","fitness.controllers.signin","fitness.controllers.signup","fitness.controllers.groups","fitness.controllers.newGroup","fitness.controllers.editGroup","fitness.controllers.newExercise","fitness.controllers.editExercise","fitness.controllers.workout",,"firebase","ngRoute","ngAnimate"]).controller("slideController",["$rootScope","$scope","$location","$route",function(e,t,n,r){t.slideView=function(t,r){console.log(r);e.slideDir=t;n.path(r)}}]).controller("mainController",function(e,t){t.clearDelete=function(){e.currentExercise={};e.currentGroup={}}});