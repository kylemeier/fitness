
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
    exerciseName = '';
    exerciseWeight = '';
    exerciseSets = '';
    exerciseReps = '';
    exerciseArray = [];
    groupName = '';
    groupNum = 0;
    allExercises = {};
    currentExercises = [];
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
    workout = 
      '<div id=\'workout\'> \
        <header id=\'workoutname\'></header> \
        <h1 id=\'workoutweight\'></h1> \
        <h1 id=\'workoutsets\'></h1> \
        <h1 id=\'workoutreps\'></h1> \
        <div id=\'resultbuttons\'> \
          <a href=\'#\' class=\'success\'></a> \
          <a href=\'#\' class=\'fail\'></a> \
        </div> \
        <div id=\'timer\'> \
          <h1 id=\'clock\'>02:00</h1> \
          <a href=\'#\' id=\'timerbutton\' class=\'start\'>Start</a> \
          </div> \
        </div> \
      </div> '



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
  allExercises = {group1: {name:"Tuesday", exerciseArray:
                          [{name:'DB Bench Press', weight: 65, sets:3, reps:6}, 
                           {name:'DB Incline Bench Press', weight: 40, sets:2, reps:10},
                           {name:'DB Military Press', weight: 35, sets:3, reps:6},
                           {name:'BB Lying Tricep Extensions', weight: 22.5, sets:3, reps:10}]},                                                          
                  group2: {name:"Thursday", exerciseArray:
                          [{name:'Pullups', weight: 5, sets:3, reps:10}, 
                           {name:'Bentover Rows', weight: 85, sets:3, reps:8},
                           {name:'DB Hammercurls', weight: 30, sets:2, reps:10},
                           {name:'Situps', weight: 20, sets:3, reps:10}]}  
                  };
  groupNum = 2;
  for (var i=1; i<=groupNum; i++){
      $('#exercisepicker').append('<a href=\'#\' class=\'groupbutton\' id='+allExercises['group'+i]['name']+'>'+allExercises['group'+i]['name']+'</a>');
    }

  console.log('Expand object to see all information currently stored:');
  console.log(allExercises); 
});

$(document).on('click', '.namerproceed', function(){
  event.preventDefault();
    if(!fieldValidation('#exercisegroupnamer')) {
    alert('Be sure to enter an exercise group name.')
  }else{
    $('.container').append(exerciseEnter);
    setTimeout(function(){
      $('#exercisegroupnamer').attr('class','slideOutLeft');
      $('#exerciseenter').addClass('slideIn');
        setTimeout(function(){
          $('#exercisegroupnamer').remove();
      },1000);
    },1);

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

$(document).on('click','.nextexercisegroup', function(){
  event.preventDefault();
  if(!fieldValidation('#exerciseenter')) {
    alert('Please ensure all fields are filled out correctly.')
  }else{
  $('.container').append(exerciseGroupNamer);
  setTimeout(function(){
    $('#exerciseenter').attr('class','exerciseremove slideOutRight');
    $('#exercisegroupnamer').attr('class', 'slideIn');
    setTimeout(function(){
      $('.exerciseremove').remove();
    },1000);
  },1);

  exerciseName = $('#exercisename').val();
  exerciseWeight = $('#exerciseweight').val();
  exerciseSets = $('#exercisesets').val();
  exerciseReps = $('#exercisereps').val();

  addExercise(exerciseName, exerciseWeight, exerciseSets, exerciseReps);
  console.log('Expand object to see all information currently stored:');
  console.log(allExercises); 
    }
});

$(document).on('click','.nextexercisebutton', function(){
  event.preventDefault();
  if(!fieldValidation('#exerciseenter')) {
    alert('Please ensure all fields are filled out correctly.')
  }else{
    $('.container').append(exerciseEnter);
    setTimeout(function(){
      $('#exerciseenter').attr('class','remove slideOutLeft');
      $('.inview').addClass('slideIn');
      setTimeout(function(){
        $('.remove').remove();
      },1000);
    },1);

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



$(document).on('click', '.donebutton', function(){
  event.preventDefault();
  if(!fieldValidation('#exerciseenter')) {
    alert('Please ensure all fields are filled out correctly.')
  }else{
  $('.container').append(exercisePicker);
  setTimeout(function(){
    $('#exerciseenter').attr('class','remove slideOutLeft');
    $('#exercisepicker').attr('class', 'slideIn');
    setTimeout(function(){
      $('.remove').remove();
    },1000);
  },1);

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
  event.preventDefault();
  var groupClicked = this.id;
   for (var i=1; i<=groupNum; i++){
    if(groupClicked === allExercises['group'+i]['name']){
      currentExercises = allExercises['group'+i]['exerciseArray'];

    }
  }
  $('.container').append(workout);
  $('#workoutname').html(currentExercises[0]["name"]);
  $('#workoutweight').html(currentExercises[0]["weight"]);
  $('#workoutsets').html(currentExercises[0]["sets"]);
  $('#workoutreps').html(currentExercises[0]["reps"]);
  setTimeout(function(){
    $('#exercisepicker').attr('class','slideOutLeft');
    $('#workout').addClass('slideIn');
    setTimeout(function(){
      $('#exercisepicker').remove();
    },1000);  
  },1);

  
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




