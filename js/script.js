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




var movementDistance = $('#nextexercisenumber').offset().top - $('#exercisenumber').offset().top;
var shiftReset = $('#slidingcontent').offset().top;
var nextMove = movementDistance;
var currentStep = 1;
var doneShift = $('#workout').offset().top-50;
var exercise1Name = '';
var exercise2Weight = '';
var exercise1Sets = '';
var exercise1Reps = '';
var exerciseArray = [];
var i = 0;

$('#exercisenumber').html(currentStep);

function addExercise(name,weight,sets,reps){
  i++;
  exerciseArray["exercise"+i] = {name: name, weight: weight, sets: sets, reps:reps};
}

var noRefresh = function(){
	return false;
}

$('#nextexercisebutton').click(function(){
  console.log( $('#slidingcontent').offset().top);
  $('#nextexercisenumber').html(currentStep+1);


  

  exerciseName = $("#exercisename").val();
  exerciseWeight = $("#exerciseweight").val();
  exerciseSets = $("#exercisesets").val();
  exerciseReps = $("#exercisereps").val();

  console.log(exerciseName, exerciseWeight, exerciseSets, exerciseReps);

  addExercise(exerciseName, exerciseWeight, exerciseSets, exerciseReps);

    console.log(exerciseArray);
  

  

	var empty = $(this).parent().find("input").filter(function() {
    
       	return this.value === "";
   		});
   		// if(empty.length) {
  
     //    alert("Please ensure all fields are filled out correctly.")
   		// }else{
        if(currentStep == 1){
          exercise1Name = $("#exercise1name").val();
          document.cookie = 'nameofcookie = '+exercise1Name+'; expires= 3 Aug 2015 20:47:11 UTC; path=/'
      
        }
    		$('#slidingcontent').animate({
         
          top:-movementDistance
        }, {
          duration:'slow', 
          queue:false,
          complete: function(){
              $("#exercisename").val("");
              $("#exerciseweight").val("");
              $("#exercisesets").val("");
              $("#exercisereps").val("");
              $('#exercisenumber').html(currentStep);
              console.log( $('#slidingcontent').offset().top);
              $( '#slidingcontent' ).offset({ top:shiftReset});
              console.log( $('#slidingcontent').offset().top);
          }
        }); 
   			nextMove += movementDistance;
   			currentStep++;  	
        console.log( $('#slidingcontent').offset().top, $('#slidingcontent').offset().bottom);
   			return false;
   		// }
});

$('.donebutton').click(function(){
  var empty = $(this).parent().find("input").filter(function() {
    return this.value === "";
  });
  if(empty.length) {
    alert("Please ensure all fields are filled out correctly.");
  }else{
	 exerciseName = $("#exercisename").val();
   	$("#exerciseworkoutname").replaceWith( "<span id=\"exerciseworkoutname\">"+exerciseName+"</span>");
	 exerciseWeight = $("#exerciseweight").val();
   	$("#exerciseworkoutweight").replaceWith( "<span id=\"exerciseworkoutweight\">"+exerciseWeight+"</span>");   	
	 exerciseSets = $("#exercisesets").val();
   	$("#exerciseworkoutsets").replaceWith( "<span id=\"exerciseworkoutsets\">"+exerciseSets+"</span>");
    exerciseReps = $("#exercisereps").val();
    $("#exerciseworkoutreps").replaceWith( "<span id=\"exerciseworkoutreps\">"+exerciseReps+"</span>");

    $('#slidingcontent').animate({
      bottom:doneShift
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




