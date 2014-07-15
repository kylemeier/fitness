app.controller("GroupsCtrl",["$rootScope","$scope","$location","loginService","angularFire","FBURL","$timeout","Groups","Exercises",function(e,t,n,r,i,s,o,u,a){t.countGroups=function(){u.count().once("value",function(e){t.groupCount=e.numChildren();console.log(t.groupCount)})};t.countGroups();t.collectExercises=function(e){return a.collect(e)};var f=function(){t.allGroups=u.collect()};f();var l={};t.editMode=!1;t.removeGroup=function(e){u.remove(e);t.countGroups();t.groupCount||(t.editMode=!1)};t.removeExercise=function(t,n){e.currentExercise={};o(function(){a.remove(t,n);o(function(){e.currentGroup=t},500)},300)};t.countExercises=function(e){a.count(e).once("value",function(e){t.exerciseCount=e.numChildren()+1})};t.autofill=function(){var e=u.create("Thursday Workout"),n=u.create("Tuesday Workout");a.create(e,"Dumbbell Bench Press",65,3,6);a.create(e,"Dumbbell Incline Bench Press",40,2,10);a.create(e,"Dumbbell Military Press",35,3,6);a.create(e,"Barbell Lying Tricep Extensions",22.5,3,10);a.create(n,"Pullups",5,3,10);a.create(n,"Bentover Rows",85,3,8);a.create(n,"Dumbbell Hammercurls",30,2,10);a.create(n,"Situps",20,3,10);t.countGroups()};t.setGroup=function(t){console.log(t);if(e.currentGroup===t){e.currentGroup={};e.currentExercise={}}else e.currentGroup=t};t.isGroupClicked=function(t){e.currentGroup===t&&console.log(t);return e.currentGroup===t};t.setExercise=function(t){e.currentExercise===t?e.currentExercise={}:e.currentExercise=t};t.isExerciseClicked=function(t){return e.currentExercise===t};t.showEdit=function(){return t.groupCount>0&&t.editMode===!1?!0:!1};t.logout=function(){r.logout("/")}}]);