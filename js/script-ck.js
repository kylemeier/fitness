//make field validation its own function
//
//***exercise group name screen ***
//
//******in picker: ********
//
//change exercise # incrementer to show different numbers on slideout/slidein
//add cookies: run addExercse after every 'add next' click
//add way to go back, pull from exercise object
//
//allow user to click 'finish' at any time, but create a prompt letting them know 
//any information on that page will not be saved if they didn't fill out every section
//
//
//*****in exercise section:**********
//
//
//every success click:
//increment stored weight
//shift to next exercise
//
//every failure click:
//increment failure counter and check current stored weight
//if none stored:
//  store current weight, keep weight at same level
//
//if current weight is below stored weight:
//  store current weight, keep weight at same level, reset counter
// 
//if current weight equals stored weight:
//  if failure counter = 1:
//    keep weight at the same level
//  if failure counter = 2:
//    drop weight
//  if faiure counter = 3:
//    switch exercise, reset counter
//  
//if current weight is above stored weight:
//  store current weight, keep weight at same level
// number of exercises in a given group console.log(allExercises['group1']['exerciseArray'].length);
// grab group name given a groupNum console.log(allExercises['group'+groupNum]['name']);
function addGroup(e,t){allExercises["group"+t]={name:e,exerciseArray:[]};return!0}function addExercise(e,t,n,r){allExercises["group"+groupNum].exerciseArray[currentStep-1]={name:e,weight:t,sets:n,reps:r};return!0}function fieldValidation(e){return!0}function showing(){var e=0;return document.hidden||document.mozHidden||document.msHidden||document.webkitHidden?!1:e=Math.ceil((new Date).getTime()-startTime)/1e3}var currentStep=1;exercise1Name="";exercise2Weight="";exercise1Sets="";exercise1Reps="";exerciseArray=[];groupName="";groupNum=0;allExercises={};allGroups=[];exerciseEnter="<div id='exerciseenter' class='inview'><header>Group: <span class='groupname'></span></header><h1>#<span class='exercisenumber'></span></h1><label for='exercisename'>Exercise Name</label><input type='text' name='exercisename' id='exercisename' required><label for='exerciseweight'>Weight lifted (in lbs)</label><input type='number' name='exerciseweight' id='exerciseweight' required><label for='exercisesets'>Sets</label><input type='number' name='exercisesets' id='exercisesets' required><label for='exercisereps'>Reps per set</label><input type='number' name='exercisereps' id='exercisereps' required><ul>  <li><a href='#' class='button nextexercisebutton'>Next Exercise</a></li><li><a href='#' class='button nextexercisegroup'>Next Group</a></li><li><a href='#' class='button donebutton'>Finished</a></li></ul></div>";exerciseGroupNamer="<div id='exercisegroupnamer' class='slideOutLeft'><header>Please enter an exercise group name. This group will contain all exercises you        perform on a given day. You will be creating a group for each day of exercises you perform.</header><label for='inputgroupname'>Group:</label><input type='text' name='inputgroupname' id='inputgroupname' required><a href='#' class='button namerproceed'>Proceed</a></div>";exercisePicker="<div id='exercisepicker'><span id='exercisegroups'></span><input type='text' name='exercisechoseninput' id='exercisechoseninput' required><a href='#' class='button' id='exercisechosenbutton'>Submit</a></div>";$("#exercisenumber").html(currentStep);$(document).on("click",".namerproceed",function(){event.preventDefault();if(!fieldValidation("#exercisegroupnamer"))alert("Be sure to enter an exercise group name.");else{setTimeout(function(){$("#exercisegroupnamer").attr("class","slideOutLeft");$("#exerciseenter").addClass("slideIn");setTimeout(function(){$("#exercisegroupnamer").remove()},1e3)},1);$(".container").append(exerciseEnter);groupName=$("#inputgroupname").val();currentStep=1;$(".exercisenumber").html(currentStep);$(".groupname").html(groupName);groupNum++;addGroup(groupName,groupNum);console.log("Expand object to see all information currently stored:");console.log(allExercises)}});$(document).on("click",".nextexercisebutton",function(){event.preventDefault();if(!fieldValidation("#exerciseenter"))alert("Please ensure all fields are filled out correctly.");else{setTimeout(function(){$("#exerciseenter").attr("class","remove slideOutLeft");$(".inview").addClass("slideIn");setTimeout(function(){$(".remove").remove()},1e3)},1);$(".container").append(exerciseEnter);setTimeout(function(){currentStep++;$(".exercisenumber").html(currentStep)},550);$(".groupname").html(groupName);exerciseName=$("#exercisename").val();exerciseWeight=$("#exerciseweight").val();exerciseSets=$("#exercisesets").val();exerciseReps=$("#exercisereps").val();addExercise(exerciseName,exerciseWeight,exerciseSets,exerciseReps);console.log("Expand object to see all information currently stored:");console.log(allExercises)}});$(document).on("click",".nextexercisegroup",function(){event.preventDefault();if(!fieldValidation("#exerciseenter"))alert("Please ensure all fields are filled out correctly.");else{$("#exerciseenter").attr("class","exerciseremove slideOutRight");$(".container").append(exerciseGroupNamer);setTimeout(function(){$("#exercisegroupnamer").attr("class","slideIn")},1);setTimeout(function(){$(".exerciseremove").remove()},1e3);exerciseName=$("#exercisename").val();exerciseWeight=$("#exerciseweight").val();exerciseSets=$("#exercisesets").val();exerciseReps=$("#exercisereps").val();addExercise(exerciseName,exerciseWeight,exerciseSets,exerciseReps);console.log("Expand object to see all information currently stored:");console.log(allExercises)}});$(document).on("click",".donebutton",function(){event.preventDefault();if(!fieldValidation("#exerciseenter"))alert("Please ensure all fields are filled out correctly.");else{$("#exerciseenter").attr("class","remove slideOutLeft");$(".container").append(exercisePicker);setTimeout(function(){$("#exercisepicker").attr("class","slideIn")},1);setTimeout(function(){$(".remove").remove()},1e3);var e=0;for(items in allExercises){e++;allGroups.push("<br>"+allExercises["group"+e].name)}$("#exercisegroups").html("Type which exercise group you'll be working on today:"+allGroups.join(""));exerciseName=$("#exercisename").val();exerciseWeight=$("#exerciseweight").val();exerciseSets=$("#exercisesets").val();exerciseReps=$("#exercisereps").val();addExercise(exerciseName,exerciseWeight,exerciseSets,exerciseReps);console.log("Expand object to see all information currently stored:");console.log(allExercises)}});var startTime=0,timeRunning=0;$("#timerbutton").click(function(){if(!timeRunning){timeRunning=1;$(this).removeClass("start");$(this).addClass("stop");var e=120;startTime=(new Date).getTime();$("#clock").html(timeFormat(e));var t=setInterval(function(){showing()&&(e=Math.ceil(120-showing()));if(e<=0){$("#timerbutton").removeClass("stop");$("#timerbutton").addClass("start");$("#clock").html("02:00");e=120;clearInterval(t);timeRunning=0;alert("Done")}$("#clock").html(timeFormat(e))},1e3)}});var timeFormat=function(e){var t=Math.floor(e/60),n=Math.round(e%60),r="",i="";t<10?r="0"+t:r=t;n<10?i="0"+n:i=n;return r+":"+i},eventName="visibilitychange";document.addEventListener(eventName,showing,!1);