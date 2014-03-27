//WIP:
//split sets/reps
//only let users click the Start button once
//add cookies



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
//console.log($('#exercise2pick').offset().top - $('#exercise1pick').offset().top);

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




