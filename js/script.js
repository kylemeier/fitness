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




var movementDistance = 507;
var nextMove = movementDistance;
var currentStep = 1;
var doneShift = $('#workout').offset().top-50;
var exercise1Name = '';
var exercise2Weight = '';
var exercise1Sets = '';
var exercise1Reps = '';
var exerciseArray = [];
var i = 0;

function addExercise(name,weight,sets,reps){
  i++;
  exerciseArray["exercise"+i] = {name: name, weight: weight, sets: sets, reps:reps};
}

var noRefresh = function(){
	return false;
}
//if the shift is off, change movementDistance to the number shown here:
//console.log($('#exercise2pick').offset().top - $('#exercise1pick').offset().top);

$('.nextexercisebutton').click(function(){
  console.log(currentStep);

  //add currentStep checker to each step:
  if (currentStep == 1){
  
  exerciseName = $("#exercise1name").val();
  exerciseWeight = $("#exercise1weight").val();
  exerciseSets = $("#exercise1sets").val();
  exerciseReps = $("#exercise1reps").val();
  addExercise(exerciseName, exerciseWeight, exerciseSets, exerciseReps);
  }
    if (currentStep == 2){
  
  exerciseName = $("#exercise2name").val();
  exerciseWeight = $("#exercise2weight").val();
  // exerciseSets = $("#exercise1sets").val();
  // exerciseReps = $("#exercise1reps").val();
  addExercise(exerciseName, exerciseWeight, exerciseSets, exerciseReps);
  }

    console.log(exerciseArray);

  

	var empty = $(this).parent().find("input").filter(function() {
       	return this.value === "";
   		});
   		if(empty.length) {
        alert("Please ensure all fields are filled out correctly.")
   		}else{
        if(currentStep == 1){
          exercise1Name = $("#exercise1name").val();
          document.cookie = 'nameofcookie = '+exercise1Name+'; expires= 3 Aug 2015 20:47:11 UTC; path=/'
      
        }
    		$('#slidingcontent').animate({bottom:nextMove}, {duration:'slow', queue:false}); 
   			nextMove += movementDistance;
   			currentStep++;  	
   			return false;
   		}
});

$('.donebutton').click(function(){
			var empty = $(this).parent().find("input").filter(function() {
        	return this.value === "";
    		});
    		if(empty.length) {
          alert("Please ensure all fields are filled out correctly.");
    		}else{
  
	exercise1Name = $("#exercise1name").val();
   	$("#exercise1workoutname").replaceWith( "<span id=\"exercise1workoutname\">"+exercise1Name+"</span>");
	exercise1Weight = $("#exercise1weight").val();
   	$("#exercise1workoutweight").replaceWith( "<span id=\"exercise1workoutweight\">"+exercise1Weight+"</span>");   	
	exercise1Sets = $("#exercise1sets").val();
   	$("#exercise1workoutsets").replaceWith( "<span id=\"exercise1workoutsets\">"+exercise1Sets+"</span>");
  exercise1Reps = $("#exercise1reps").val();
    $("#exercise1workoutreps").replaceWith( "<span id=\"exercise1workoutreps\">"+exercise1Reps+"</span>");


    $('#slidingcontent').animate({bottom:doneShift}, {duration:'slow', queue:false});   	
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
    
    }

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




