//******in picker: ********
//
//ask user to name the exercise group and ask them what days they do that exercise
//
//make exercises into objects, put a method addExercise into the exercise obejct
//
//add cookies: run addExercse after every "add next" click
//add way to go back
//
//allow user to click 'finish' at any time, but create a prompt letting them know 
//any information on that page will not be saved if they didn't fill out every section
//
//
//*****in exercise section:**********
//
//upon initialization -- check day of week to see which workout to show
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
//
//shift to next exercise
function addExercise(e,t,n,r){i++;exerciseArray["exercise"+i]={name:e,weight:t,sets:n,reps:r}}function showing(){var e=0;return document.hidden||document.mozHidden||document.msHidden||document.webkitHidden?!1:e=Math.ceil((new Date).getTime()-startTime)/1e3}var movementDistance=507,nextMove=movementDistance,currentStep=1,doneShift=$("#workout").offset().top-50,exercise1Name="",exercise2Weight="",exercise1Sets="",exercise1Reps="",exerciseArray=[],i=0,noRefresh=function(){return!1};$(".nextexercisebutton").click(function(){console.log(currentStep);if(currentStep==1){exerciseName=$("#exercise1name").val();exerciseWeight=$("#exercise1weight").val();exerciseSets=$("#exercise1sets").val();exerciseReps=$("#exercise1reps").val();addExercise(exerciseName,exerciseWeight,exerciseSets,exerciseReps)}if(currentStep==2){exerciseName=$("#exercise2name").val();exerciseWeight=$("#exercise2weight").val();addExercise(exerciseName,exerciseWeight,exerciseSets,exerciseReps)}console.log(exerciseArray);var e=$(this).parent().find("input").filter(function(){return this.value===""});if(!e.length){if(currentStep==1){exercise1Name=$("#exercise1name").val();document.cookie="nameofcookie = "+exercise1Name+"; expires= 3 Aug 2015 20:47:11 UTC; path=/"}$("#slidingcontent").animate({bottom:nextMove},{duration:"slow",queue:!1});nextMove+=movementDistance;currentStep++;return!1}alert("Please ensure all fields are filled out correctly.")});$(".donebutton").click(function(){var e=$(this).parent().find("input").filter(function(){return this.value===""});if(!e.length){exercise1Name=$("#exercise1name").val();$("#exercise1workoutname").replaceWith('<span id="exercise1workoutname">'+exercise1Name+"</span>");exercise1Weight=$("#exercise1weight").val();$("#exercise1workoutweight").replaceWith('<span id="exercise1workoutweight">'+exercise1Weight+"</span>");exercise1Sets=$("#exercise1sets").val();$("#exercise1workoutsets").replaceWith('<span id="exercise1workoutsets">'+exercise1Sets+"</span>");exercise1Reps=$("#exercise1reps").val();$("#exercise1workoutreps").replaceWith('<span id="exercise1workoutreps">'+exercise1Reps+"</span>");$("#slidingcontent").animate({bottom:doneShift},{duration:"slow",queue:!1});return!1}alert("Please ensure all fields are filled out correctly.")});var startTime=0,timeRunning=0;$("#timerbutton").click(function(){if(!timeRunning){timeRunning=1;$(this).removeClass("start");$(this).addClass("stop");var e=120;startTime=(new Date).getTime();$("#clock").html(timeFormat(e));var t=setInterval(function(){showing()&&(e=Math.ceil(120-showing()));if(e<=0){$("#timerbutton").removeClass("stop");$("#timerbutton").addClass("start");$("#clock").html("02:00");e=120;clearInterval(t);timeRunning=0;alert("Done")}$("#clock").html(timeFormat(e))},1e3)}});var timeFormat=function(e){var t=Math.floor(e/60),n=Math.round(e%60),r="",i="";t<10?r="0"+t:r=t;n<10?i="0"+n:i=n;return r+":"+i},eventName="visibilitychange";document.addEventListener(eventName,showing,!1);