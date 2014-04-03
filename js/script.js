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





var movementDistance = $('#exercisehide').offset().top - $('#exerciseenter').offset().top;
var shiftReset = 0;
var nextMove = movementDistance;
var currentStep = 1;
var doneShift = $('#workout').offset().top-50;
var exercise1Name = '';
var exercise2Weight = '';
var exercise1Sets = '';
var exercise1Reps = '';
var exerciseArray = [];
var groupName = '';
var groupNum = 0;
var allExercises = {};
var allGroups = [];

console.log("Each screen should be this height: "+movementDistance);

$('#exercisenumber').html(currentStep);

function addGroup(groupName, groupNum){
  allExercises["group"+groupNum] = {name: groupName, exerciseArray: []};
  return true;
}

function addExercise(name,weight,sets,reps){
   allExercises["group"+groupNum]["exerciseArray"][currentStep-1] = {name: name, weight: weight, sets: sets, reps:reps};
  return true;
}

var noRefresh = function(){
	return false;
}

$('#namerproceed').click(function(){
  groupName = $('#inputgroupname').val();
  $('#exercisenumber').html(currentStep);
  $('.groupname').html(groupName);
  groupNum++;
  addGroup(groupName, groupNum);


  $('#slidingcontent').animate({
    top:-movementDistance
  }, {
      duration:'slow', 
      queue:false,
      complete: function(){
        shiftReset = $("#slidingcontent").offset().top;
      }
    });
});



$('#nextexercisebutton').click(function(){


  $('.groupname').html(groupName);
 
  $('#nextexercisenumber').html(currentStep+1);
  exerciseName = $("#exercisename").val();
  exerciseWeight = $("#exerciseweight").val();
  exerciseSets = $("#exercisesets").val();
  exerciseReps = $("#exercisereps").val();

  addExercise(exerciseName, exerciseWeight, exerciseSets, exerciseReps);

	var empty = $(this).parent().find("input").filter(function() {
    return this.value === "";
  });

  // if(empty.length) {
    // alert("Please ensure all fields are filled out correctly.")
  // }else{

    if(currentStep == 1){
      exercise1Name = $("#exercise1name").val();
      document.cookie = 'nameofcookie = '+exercise1Name+'; expires= 3 Aug 2015 20:47:11 UTC; path=/'
    }
    $('#slidingcontent').animate({
      top:-movementDistance*2
    }, {
      duration:'slow', 
      queue:false,
      complete: function(){
        $("#exercisename").val("");
        $("#exerciseweight").val("");
        $("#exercisesets").val("");
        $("#exercisereps").val("");
        $('#exercisenumber').html(currentStep);
        $( '#slidingcontent' ).offset({ top:shiftReset});
      }
    }); 
   		nextMove += movementDistance;
   		currentStep++;  	
   		return false;
  // }
});

$('#nextexercisegroup').click(function(){
  $("#inputgroupname").val("");
  currentStep=1;
  $('#slidingcontent').animate({
    top:0
  }, {
      duration:'slow', 
      queue:false,
    });
});

$('#donebutton').click(function(){
  $('#exercisehide').hide();
  // number of exercises in a given group console.log(allExercises["group1"]["exerciseArray"].length);
  // names of exercise groups

  var empty = $(this).parent().find("input").filter(function() {
    return this.value === "";
  });
  if(empty.length) {
    alert("Please ensure all fields are filled out correctly.");
  }else{
    
    var counter = 0;

    for (items in allExercises){
      counter++;
      allGroups.push("<br>"+allExercises["group"+counter]["name"]);
    }
    $("#exercisegroups").html("Type which exercise group you'll be working on today:"+allGroups.join(""));

	 exerciseName = $("#exercisename").val();
   	$("#exerciseworkoutname").replaceWith( "<span id=\"exerciseworkoutname\">"+exerciseName+"</span>");
	 exerciseWeight = $("#exerciseweight").val();
   	$("#exerciseworkoutweight").replaceWith( "<span id=\"exerciseworkoutweight\">"+exerciseWeight+"</span>");   	
	 exerciseSets = $("#exercisesets").val();
   	$("#exerciseworkoutsets").replaceWith( "<span id=\"exerciseworkoutsets\">"+exerciseSets+"</span>");
    exerciseReps = $("#exercisereps").val();
    $("#exerciseworkoutreps").replaceWith( "<span id=\"exerciseworkoutreps\">"+exerciseReps+"</span>");

    $('#slidingcontent').animate({
      top:-movementDistance*2
      }, {
      duration: 'slow', 
      
  });   	
    	return false;
    	}
});


var startTime = 0;
var timeRunning = 0;



$('#timerbutton').click(function(){
  if(!timeRunning){
    timeRunning = 1;
      $( this ).removeClass("start");
      $( this ).addClass("stop");

    var totalTime = 120;
    startTime = new Date().getTime();
  
    
    
    $('#clock').html(timeFormat(totalTime));
  
      var countDown = setInterval(function(){
  
      //only subtract time when tab is showing
        if(showing()){
          totalTime=Math.ceil(120 - showing()); 
        }
        
        if(totalTime <= 0){
          $( '#timerbutton' ).removeClass("stop");
          $( '#timerbutton' ).addClass("start");
          $('#clock').html('02:00');
          totalTime=120;
          clearInterval(countDown);
          timeRunning = 0;
          alert("Done");
        }
  
          $('#clock').html(timeFormat(totalTime));
   
       },1000);

        }

      

});

    var timeFormat = function(totalTime){
    
    
      var minutes = Math.floor(totalTime/60);
      var seconds = Math.round(totalTime % 60);
      var minutesStr='';
      var secondsStr='';
    
      if(minutes<10){
        minutesStr='0'+minutes;
      }else{
        minutesStr = minutes;
      }
      if(seconds<10){
        secondsStr='0'+seconds;
      }else{
        secondsStr = seconds;
      }
    
      return(minutesStr+":"+secondsStr);
    
    };

    var eventName = "visibilitychange";
    
    function showing() {
      var timeDiff = 0;
        if (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden) {
          return false;
        
        } else  {
            return timeDiff = (Math.ceil(new Date().getTime() - startTime)/1000);
    
        }
        return false;
    }
    document.addEventListener(eventName, showing, false);




