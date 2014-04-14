
//make field validation its own function
//
//***exercise group name screen ***
//
//******exercise enter screen********
//
//add cookies: run addExercse after every 'add next' click
//add way to go back, pull from exercise object
//
//allow user to click 'finish' at any time, but create a prompt letting them know 
//any information on that page will not be saved if they didn't fill out every section
//
//******exercise group select screen********
//
//dynamically create buttons for each exercise group
//
//*****exercise section**********
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





var currentStep = 1;
    exercise1Name = '';
    exercise2Weight = '';
    exercise1Sets = '';
    exercise1Reps = '';
    exerciseArray = [];
    groupName = '';
    groupNum = 0;
    allExercises = {};
    allGroups = [];
    exerciseGroupNamer =
      '<div id=\'exercisegroupnamer\' class=\'slideOutLeft\'> \
      <header>Please enter an exercise group name. This group will contain all exercises you \
      perform on a given day. You will be creating a group for each day of exercises you perform.</header> \
      <label for=\'inputgroupname\'>Group:</label> \
      <input type=\'text\' maxlength = 20 name=\'inputgroupname\' id=\'inputgroupname\' required> \
      <a href=\'#\' class=\'button namerproceed\'>Proceed</a> \
      </div>'
    exerciseEnter =       
      '<div id=\'exerciseenter\' class=\'inview\'> \
      <header>Group: <span class=\'groupname\'></span></header> \
      <h1>#<span class=\'exercisenumber\'></span></h1> \
      <label for=\'exercisename\'>Exercise Name</label> \
      <input type=\'text\' name=\'exercisename\' id=\'exercisename\' required> \
      <label for=\'exerciseweight\'>Weight lifted (in lbs)</label> \
      <input type=\'number\' name=\'exerciseweight\' id=\'exerciseweight\' required> \
      <label for=\'exercisesets\'>Sets</label> \
      <input type=\'number\' name=\'exercisesets\' id=\'exercisesets\' required> \
      <label for=\'exercisereps\'>Reps per set</label> \
      <input type=\'number\' name=\'exercisereps\' id=\'exercisereps\' required> \
      <ul> \
        <li> \
      <a href=\'#\' class=\'button nextexercisegroup\'>Next Group</a> \
      </li> \
      <li> \
      <a href=\'#\' class=\'button nextexercisebutton\'>Next Exercise</a> \
      </li> \
      <li> \
      <a href=\'#\' class=\'button donebutton\'>Finished</a> \
      </li> \
      </ul> \
      </div>'
    exercisePicker =
    '<div id=\'exercisepicker\'> \
    <header>Your exercise groups:</header> \
    </div>'


$('#exercisenumber').html(currentStep);

function addGroup(groupName, groupNum){
  allExercises['group'+groupNum] = {name: groupName, exerciseArray: []};
  return true;
}

function addExercise(name,weight,sets,reps){
  allExercises['group'+groupNum]['exerciseArray'][currentStep-1] = {name: name, weight: weight, sets: sets, reps:reps};
  return true;
}

function fieldValidation(currentDiv){
  var empty = $(currentDiv).find('input').filter(function() {
    return this.value === '';
  });
  if(empty.length) {
    return false
  }
  return true
}

$(document).on('click', '.autofill', function(){
  setTimeout(function(){
    $('#exercisegroupnamer').attr('class','slideOutLeft');
    $('#exercisepicker').addClass('slideIn');
    setTimeout(function(){
      $('#exercisegroupnamer').remove();
    },1000);
  },1);
  $('.container').append(exercisePicker);
  groupNum = 2;
  allExercises = {group1: {name:"Tuesday", exerciseArray:
                          [{name:'DB Bench Press', weight: 65, set:3, reps:6}, 
                           {name:'DB Incline Bench Press', weight: 40, set:2, reps:10},
                           {name:'DB Military Press', weight: 35, set:3, reps:6},
                           {name:'BB Lying Tricep Extensions', weight: 22.5, set:3, reps:10}]},                                                          
                  group2: {name:"Thursday", exerciseArray:
                          [{name:'Pullups', weight: 5, set:3, reps:10}, 
                           {name:'Bentover Rows', weight: 85, set:3, reps:8},
                           {name:'DB Hammercurls', weight: 30, set:2, reps:10},
                           {name:'Situps', weight: 20, set:3, reps:10}]}  
                  };

  for (var i=1; i<=groupNum; i++){
      $('#exercisepicker').append('<a href=\'#\' class=\'groupbutton\' id='+allExercises['group'+i]['name']+'>'+allExercises['group'+i]['name']+'</a>');
    }

  console.log(allExercises['group'+1]['name']);
  console.log(allExercises['group1']);
  console.log('Expand object to see all information currently stored:');
  console.log(allExercises); 
});

$(document).on('click', '.namerproceed', function(){
  event.preventDefault();
    if(!fieldValidation('#exercisegroupnamer')) {
    alert('Be sure to enter an exercise group name.')
  }else{
    setTimeout(function(){
      $('#exercisegroupnamer').attr('class','slideOutLeft');
      $('#exerciseenter').addClass('slideIn');
        setTimeout(function(){
          $('#exercisegroupnamer').remove();
      },1000);
    },1);
  $('.container').append(exerciseEnter);

  groupName = $('#inputgroupname').val();
  currentStep=1;
  $('.exercisenumber').html(currentStep);
  $('.groupname').html(groupName);
  groupNum++;
  addGroup(groupName, groupNum);
  console.log('Expand object to see all information currently stored:');
  console.log(allExercises); 
  }
});

$(document).on('click','.nextexercisebutton', function(){
  event.preventDefault();
  if(!fieldValidation('#exerciseenter')) {
    alert('Please ensure all fields are filled out correctly.')
  }else{
    setTimeout(function(){
      $('#exerciseenter').attr('class','remove slideOutLeft');
      $('.inview').addClass('slideIn');
        setTimeout(function(){
          $('.remove').remove();
      },1000);
    },1);
  $('.container').append(exerciseEnter);
    setTimeout(function(){
    currentStep++;
    $('.exercisenumber').html(currentStep);

  },550);
  
  $('.groupname').html(groupName);

  exerciseName = $('#exercisename').val();
  exerciseWeight = $('#exerciseweight').val();
  exerciseSets = $('#exercisesets').val();
  exerciseReps = $('#exercisereps').val();

  addExercise(exerciseName, exerciseWeight, exerciseSets, exerciseReps);
  console.log('Expand object to see all information currently stored:');
  console.log(allExercises); 
  }
});

$(document).on('click','.nextexercisegroup', function(){
  event.preventDefault();
  if(!fieldValidation('#exerciseenter')) {
    alert('Please ensure all fields are filled out correctly.')
  }else{
  $('#exerciseenter').attr('class','exerciseremove slideOutRight');
  $('.container').append(exerciseGroupNamer);
  setTimeout(function(){
    $('#exercisegroupnamer').attr('class', 'slideIn');

  },1);
  setTimeout(function(){
    $('.exerciseremove').remove();
  },1000);

  exerciseName = $('#exercisename').val();
  exerciseWeight = $('#exerciseweight').val();
  exerciseSets = $('#exercisesets').val();
  exerciseReps = $('#exercisereps').val();

  addExercise(exerciseName, exerciseWeight, exerciseSets, exerciseReps);
  console.log('Expand object to see all information currently stored:');
  console.log(allExercises); 
    }
  });

$(document).on('click', '.donebutton', function(){
  event.preventDefault();
  if(!fieldValidation('#exerciseenter')) {
    alert('Please ensure all fields are filled out correctly.')
  }else{
  $('#exerciseenter').attr('class','remove slideOutLeft');
  $('.container').append(exercisePicker);

  setTimeout(function(){
    $('#exercisepicker').attr('class', 'slideIn');
  },1);

  setTimeout(function(){
    $('.remove').remove();
  },1000);

    for (var i=1; i<=groupNum; i++){
      $('#exercisepicker').append('<a href=\'#\' class=\'groupbutton\' id='+allExercises['group'+i]['name']+'>'+allExercises['group'+i]['name']+'</a>');
    }

  exerciseName = $('#exercisename').val();
  exerciseWeight = $('#exerciseweight').val();
  exerciseSets = $('#exercisesets').val();
  exerciseReps = $('#exercisereps').val();

  addExercise(exerciseName, exerciseWeight, exerciseSets, exerciseReps);

  console.log('Expand object to see all information currently stored:');
  console.log(allExercises); 
  }
});

$(document).on('click', '.groupbutton', function(){
  console.log("hey");
});


var startTime = 0;
var timeRunning = 0;



$('#timerbutton').click(function(){
  if(!timeRunning){
    timeRunning = 1;
      $( this ).removeClass('start');
      $( this ).addClass('stop');

    var totalTime = 120;
    startTime = new Date().getTime();
  
    
    
    $('#clock').html(timeFormat(totalTime));
  
      var countDown = setInterval(function(){
  
      //only subtract time when tab is showing
        if(showing()){
          totalTime=Math.ceil(120 - showing()); 
        }
        
        if(totalTime <= 0){
          $( '#timerbutton' ).removeClass('stop');
          $( '#timerbutton' ).addClass('start');
          $('#clock').html('02:00');
          totalTime=120;
          clearInterval(countDown);
          timeRunning = 0;
          alert('Done');
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
    
      return(minutesStr+':'+secondsStr);
    
    };

    var eventName = 'visibilitychange';
    
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




