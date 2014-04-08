//***exercise group name screen ***
//
//******in picker: ********
//
//
//add cookies: run addExercse after every "add next" click
//add way to go back, pull from exercise object
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
function addGroup(e,t){allExercises["group"+t]={name:e,exerciseArray:[]};console.log("New group object added named: "+allExercises["group"+t].name);return!0}function addExercise(e,t,n,r){allExercises["group"+groupNum].exerciseArray[currentStep-1]={name:e,weight:t,sets:n,reps:r};return!0}function showing(){var e=0;return document.hidden||document.mozHidden||document.msHidden||document.webkitHidden?!1:e=Math.ceil((new Date).getTime()-startTime)/1e3}var movementDistance=$("#exercisehide").offset().top-$("#exerciseenter").offset().top,shiftReset=0,nextMove=movementDistance,currentStep=1,exercise1Name="",exercise2Weight="",exercise1Sets="",exercise1Reps="",exerciseArray=[],groupName="",groupNum=0,allExercises={},allGroups=[];console.log("Each screen should be this height: "+movementDistance);$("#exercisenumber").html(currentStep);var noRefresh=function(){return!1};$("#namerproceed").click(function(){groupName=$("#inputgroupname").val();$("#exercisenumber").html(currentStep);$(".groupname").html(groupName);groupNum++;addGroup(groupName,groupNum);$("#slidingcontent").animate({top:-movementDistance},{duration:"slow",queue:!1,complete:function(){shiftReset=$("#slidingcontent").offset().top;console.log("Sllidingcontent will get shifted back to this top offset "+shiftReset)}})});$("#nextexercisebutton").click(function(){$(".groupname").html(groupName);$("#nextexercisenumber").html(currentStep+1);exerciseName=$("#exercisename").val();exerciseWeight=$("#exerciseweight").val();exerciseSets=$("#exercisesets").val();exerciseReps=$("#exercisereps").val();addExercise(exerciseName,exerciseWeight,exerciseSets,exerciseReps);var e=$(this).parent().find("input").filter(function(){return this.value===""});if(currentStep==1){exercise1Name=$("#exercise1name").val();document.cookie="nameofcookie = "+exercise1Name+"; expires= 3 Aug 2015 20:47:11 UTC; path=/"}$("#slidingcontent").animate({top:-movementDistance*2},{duration:"slow",queue:!1,complete:function(){console.log("Top offset after next button clicked "+$("#slidingcontent").offset().top);console.log("Difference between top offset and shiftReset"+($("#slidingcontent").offset().top-shiftReset));$("#exercisename").val("");$("#exerciseweight").val("");$("#exercisesets").val("");$("#exercisereps").val("");$("#exercisenumber").html(currentStep);$("#slidingcontent").offset({top:shiftReset});console.log("top offset after shiftback "+$("#slidingcontent").offset().top);console.log()}});nextMove+=movementDistance;currentStep++;return!1});$("#nextexercisegroup").click(function(){$("#inputgroupname").val("");currentStep=1;$("#slidingcontent").animate({top:0},{duration:"slow",queue:!1})});$("#donebutton").click(function(){console.log(allExercises);$("#exercisehide").hide();var e=$(this).parent().find("input").filter(function(){return this.value===""});if(!e.length){var t=0;for(items in allExercises){t++;allGroups.push("<br>"+allExercises["group"+t].name)}$("#exercisegroups").html("Type which exercise group you'll be working on today:"+allGroups.join(""));exerciseName=$("#exercisename").val();$("#exerciseworkoutname").replaceWith('<span id="exerciseworkoutname">'+exerciseName+"</span>");exerciseWeight=$("#exerciseweight").val();$("#exerciseworkoutweight").replaceWith('<span id="exerciseworkoutweight">'+exerciseWeight+"</span>");exerciseSets=$("#exercisesets").val();$("#exerciseworkoutsets").replaceWith('<span id="exerciseworkoutsets">'+exerciseSets+"</span>");exerciseReps=$("#exercisereps").val();$("#exerciseworkoutreps").replaceWith('<span id="exerciseworkoutreps">'+exerciseReps+"</span>");$("#slidingcontent").animate({top:-movementDistance*2},{duration:"slow"});return!1}alert("Please ensure all fields are filled out correctly.")});var startTime=0,timeRunning=0;$("#timerbutton").click(function(){if(!timeRunning){timeRunning=1;$(this).removeClass("start");$(this).addClass("stop");var e=120;startTime=(new Date).getTime();$("#clock").html(timeFormat(e));var t=setInterval(function(){showing()&&(e=Math.ceil(120-showing()));if(e<=0){$("#timerbutton").removeClass("stop");$("#timerbutton").addClass("start");$("#clock").html("02:00");e=120;clearInterval(t);timeRunning=0;alert("Done")}$("#clock").html(timeFormat(e))},1e3)}});var timeFormat=function(e){var t=Math.floor(e/60),n=Math.round(e%60),r="",i="";t<10?r="0"+t:r=t;n<10?i="0"+n:i=n;return r+":"+i},eventName="visibilitychange";document.addEventListener(eventName,showing,!1);