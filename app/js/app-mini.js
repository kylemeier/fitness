//To fix:
//
//UI issues:
//
//
//
//iOS:
//login buttons look wonky in landscape
//
//To do:
//move resolve code into a service
//Add messaging to workout screen 'You're done for the day! You'll be able to perform this workout again tomorrow.'
//Add weight change notification to workout screen -- under name -- next weight: ##lbs (##lbs change) -- create variable for weight change
//store workouts
//
//Desktop view:
//only one error message on new exercise screen
//header color spans entire width, content is much smaller, need to determine max width
//maybe more pronounced borders on content?
//boxes on groups page need to be inset
//
//Additional Features:
//after two failures, decrease weight by 5lbs and increase reps by 2 per set
//after three failures, show alert asking if user wants to set a reminder to change the exercise or reset the count
//reminder will be an exclamation point in place of the delete button
//body weight support, doesn't mess with weights
var app=angular.module("fitness",["firebase","ngRoute","ngAnimate"]);app.config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/home.html",controller:"AuthCtrl",resolve:{user:function(e,t,n){if(!e.userID){var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=n(r);return i.$getCurrentUser()}return}}}).when("/signin",{templateUrl:"views/home.html",controller:"AuthCtrl",resolve:{user:function(e,t,n){if(!e.userID){var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=n(r);return i.$getCurrentUser()}return}}}).when("/signup",{templateUrl:"views/home.html",controller:"AuthCtrl",resolve:{user:function(e,t,n){if(!e.userID){var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=n(r);return i.$getCurrentUser()}return}}}).when("/reset/:temp",{templateUrl:"views/reset.html",controller:"AuthCtrl"}).when("/groups",{templateUrl:"views/groups.html",controller:"GroupsCtrl",resolve:{user:function(e,t,n){if(!e.userID){e.loading=1;var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=n(r);return i.$getCurrentUser()}return}}}).when("/new-group",{templateUrl:"views/new-group.html",controller:"NewGroupCtrl",resolve:{user:function(e,t,n){if(!e.userID){e.loading=1;var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=n(r);return i.$getCurrentUser()}return}}}).when("/:groupId/edit-group",{templateUrl:"views/edit-group.html",controller:"EditGroupCtrl",resolve:{user:function(e,t,n){if(!e.userID){e.loading=1;var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=n(r);return i.$getCurrentUser()}return}}}).when("/:groupId/new-exercise/:exerciseCount",{templateUrl:"views/new-exercise.html",controller:"NewExerciseCtrl",resolve:{user:function(e,t,n){if(!e.userID){e.loading=1;var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=n(r);return i.$getCurrentUser()}return}}}).when("/:groupId/edit-exercise/:exerciseId",{templateUrl:"views/edit-exercise.html",controller:"EditExerciseCtrl",resolve:{user:function(e,t,n){if(!e.userID){e.loading=1;var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=n(r);return i.$getCurrentUser()}return}}}).when("/:groupId/workout",{templateUrl:"views/workout.html",controller:"WorkoutCtrl",resolve:{user:function(e,t,n){if(!e.userID){e.loading=1;var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=n(r);return i.$getCurrentUser()}return}}}).otherwise({redirectTo:"/groups"})}]);app.run(["$rootScope","$route","$timeout","FBURL",function(e,t,n,r){e.userID=null;var i=new Firebase(r),s=new FirebaseSimpleLogin(i,function(t,n){n&&(e.userID=n.uid)})}]);app.constant("FBURL","fitnesskdm.firebaseIO.com");app.controller("slideController",["$rootScope","$scope","$location","$route",function(e,t,n,r){e.slideView=function(t,r){e.slideDir=t;n.path(r)}}]);app.controller("mainController",function(e,t){t.clearDelete=function(){e.currentExercise={};e.currentGroup={}}});