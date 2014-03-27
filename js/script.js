//WIP:
//time adjustment to account for iOS' js freeze when the window is hidden
//look into running app in background
//only let users click the Start button once



var movementDistance = 507;
var nextMove = movementDistance;
var currentStep = 1;
var doneShift = $('#workout').offset().top-50;
var exercise1Name = '';
var exercise2Weight = '';
var exercise1SetsxReps = '';


var noRefresh = function(){
	return false;
}
//if shift is off, change above nubmer to the number shown here:
console.log($('#exercise2pick').offset().top - $('#exercise1pick').offset().top);

$('.nextexercisebutton').click(function(){
	var empty = $(this).parent().find("input").filter(function() {
       	return this.value === "";
   		});
   		if(empty.length) {
        alert("finish entering your shit!");
       		console.log("No good!");
   		}else{
   			console.log("Good to go!");
    		$('#slidingcontent').animate({bottom:nextMove}, {duration:'slow', queue:false}); 
   			nextMove += movementDistance;
   			currenteStep++;  	
   			return false;
   		}
});

$('.donebutton').click(function(){
			var empty = $(this).parent().find("input").filter(function() {
        	return this.value === "";
    		});
    		if(empty.length) {
          alert("finish entering your shit!");
        		console.log("No good!");
    		}else{
    			console.log("Good to go!");
	exercise1Name = $("#exercise1name").val();
   	$("#exercise1workoutname").replaceWith( "<span id=\"exercise1workoutname\">"+exercise1Name+"</span>");
	exercise1Weight = $("#exercise1weight").val();
   	$("#exercise1workoutweight").replaceWith( "<span id=\"exercise1workoutname\">"+exercise1Weight+"</span>");   	
	exercise1SetsxReps = $("#exercise1setsxreps").val();
   	$("#exercise1workoutsetsxreps").replaceWith( "<span id=\"exercise1workoutsetsxreps\">"+exercise1SetsxReps+"</span>");

    $('#slidingcontent').animate({bottom:doneShift}, {duration:'slow', queue:false});   	
    	return false;
    	}
});


var startTime = 0;

$('.starttimer').click(function(){
  var totalTime = 120;
  startTime = new Date().getTime();

  
  
  $('#clock').html(timeCalc(totalTime));

  var countDown = setInterval(function(){
    totalTime--;
    
    $('#clock').html(timeCalc(totalTime));

    if(totalTime == 0){
      alert("Done");
      clearInterval(countDown);
    }
  },1000);

  
});

var timeCalc = function(totalTime){


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

function visibilityChanged() {
    if (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden) {
      console.log("hiding!");
    
    } else  {
        console.log(Math.round((new Date().getTime() - startTime)/1000));    
    }
}
document.addEventListener(eventName, visibilityChanged, false);


