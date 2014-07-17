//To fix:
//Refreshing windows causes strange behavior, need to hide/don't load contents until auth has finished
//login screen redirect if logged in
//intro info only shows up after click
//done/edit acting funky sometimes on iOS
//
//UI issues:
//create truncate function that adds an ellipses to long group/exericse names
//group line items need their own height, currently relying on group name. can't set it directly due to height expanding when clicked
//login animation
//deleting exercises causes list to flash while it rebuilds, auto close then reopen? works, but look into using a callback to speed it up
//
//To do:
//style workout page
//test group/exercise name length
//password resets
//better form checking on edit/new exercise screen
//form checking for new exercise
//combine login/signup screens
//update all login code to new code
//some sort of action if group has no exercises and 'start workout' is clicked
//
//Additional Features:
//after three failures, show alert asking if user wants to set a reminder to change the exercise or reset the count
//reminder will be an exclamation point in place of the delete button
//body weight support, doesn't mess with weights
//animate deletions
var app=angular.module("fitness",["firebase","ngRoute","ngAnimate"]);app.config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/home.html",controller:"AuthCtrl"}).when("/signin",{templateUrl:"views/home.html",controller:"AuthCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"AuthCtrl"}).when("/groups",{templateUrl:"views/groups.html",controller:"GroupsCtrl",authRequired:!0}).when("/new-group",{templateUrl:"views/new-group.html",controller:"NewGroupCtrl",authRequired:!0}).when("/:groupId/edit-group",{templateUrl:"views/edit-group.html",controller:"EditGroupCtrl",authRequired:!0}).when("/:groupId/new-exercise/:exerciseCount",{templateUrl:"views/new-exercise.html",controller:"NewExerciseCtrl",authRequired:!0}).when("/:groupId/edit-exercise/:exerciseId",{templateUrl:"views/edit-exercise.html",controller:"EditExerciseCtrl",authRequired:!0}).when("/:groupId/workout",{templateUrl:"views/workout.html",controller:"WorkoutCtrl",authRequired:!0}).otherwise({redirectTo:"/"})}]);app.run(["$rootScope","$route","$timeout","FBURL",function(e,t,n,r){console.log("hey!");var i=new Firebase(r),s=new FirebaseSimpleLogin(i,function(t,r){if(r){e.userID=r.uid;console.log("in run "+e.userID);n(function(){console.log("in timeout")})}})}]);app.constant("FBURL","fitnesskdm.firebaseIO.com");app.controller("slideController",["$rootScope","$scope","$location","$route",function(e,t,n,r){e.slideView=function(t,r){console.log(r);e.slideDir=t;n.path(r)}}]);app.controller("mainController",function(e,t){t.clearDelete=function(){e.currentExercise={};e.currentGroup={}}});