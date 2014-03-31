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
function addExercise(e,t,n,r){i++;exerciseArray["exercise"+i]={name:e,weight:t,sets:n,reps:r}}function showing(){var e=0;return document.hidden||document.mozHidden||document.msHidden||document.webkitHidden?!1:e=Math.ceil((new Date).getTime()-startTime)/1e3}var movementDistance=$("#nextexercisenumber").offset().top-$("#exercisenumber").offset().top,shiftReset=$("#slidingcontent").offset().top,nextMove=movementDistance,currentStep=1,doneShift=$("#workout").offset().top-50,exercise1Name="",exercise2Weight="",exercise1Sets="",exercise1Reps="",exerciseArray=[],i=0;$("#exercisenumber").html(currentStep);var noRefresh=function(){return!1};$("#nextexercisebutton").click(function(){console.log($("#slidingcontent").offset().top);$("#nextexercisenumber").html(currentStep+1);exerciseName=$("#exercisename").val();exerciseWeight=$("#exerciseweight").val();exerciseSets=$("#exercisesets").val();exerciseReps=$("#exercisereps").val();console.log(exerciseName,exerciseWeight,exerciseSets,exerciseReps);addExercise(exerciseName,exerciseWeight,exerciseSets,exerciseReps);console.log(exerciseArray);var e=$(this).parent().find("input").filter(function(){return this.value===""});if(currentStep==1){exercise1Name=$("#exercise1name").val();document.cookie="nameofcookie = "+exercise1Name+"; expires= 3 Aug 2015 20:47:11 UTC; path=/"}$("#slidingcontent").animate({top:-movementDistance},{duration:"slow",queue:!1,complete:function(){$("#exercisename").val("");$("#exerciseweight").val("");$("#exercisesets").val("");$("#exercisereps").val("");$("#exercisenumber").html(currentStep);console.log($("#slidingcontent").offset().top);$("#slidingcontent").offset({top:shiftReset});console.log($("#slidingcontent").offset().top)}});nextMove+=movementDistance;currentStep++;console.log($("#slidingcontent").offset().top,$("#slidingcontent").offset().bottom);return!1});$(".donebutton").click(function(){var e=$(this).parent().find("input").filter(function(){return this.value===""});if(!e.length){exerciseName=$("#exercisename").val();$("#exerciseworkoutname").replaceWith('<span id="exerciseworkoutname">'+exerciseName+"</span>");exerciseWeight=$("#exerciseweight").val();$("#exerciseworkoutweight").replaceWith('<span id="exerciseworkoutweight">'+exerciseWeight+"</span>");exerciseSets=$("#exercisesets").val();$("#exerciseworkoutsets").replaceWith('<span id="exerciseworkoutsets">'+exerciseSets+"</span>");exerciseReps=$("#exercisereps").val();$("#exerciseworkoutreps").replaceWith('<span id="exerciseworkoutreps">'+exerciseReps+"</span>");$("#slidingcontent").animate({bottom:doneShift},{duration:"slow"});return!1}alert("Please ensure all fields are filled out correctly.")});var startTime=0,timeRunning=0;$("#timerbutton").click(function(){if(!timeRunning){timeRunning=1;$(this).removeClass("start");$(this).addClass("stop");var e=120;startTime=(new Date).getTime();$("#clock").html(timeFormat(e));var t=setInterval(function(){showing()&&(e=Math.ceil(120-showing()));if(e<=0){$("#timerbutton").removeClass("stop");$("#timerbutton").addClass("start");$("#clock").html("02:00");e=120;clearInterval(t);timeRunning=0;alert("Done")}$("#clock").html(timeFormat(e))},1e3)}});var timeFormat=function(e){var t=Math.floor(e/60),n=Math.round(e%60),r="",i="";t<10?r="0"+t:r=t;n<10?i="0"+n:i=n;return r+":"+i},eventName="visibilitychange";document.addEventListener(eventName,showing,!1);