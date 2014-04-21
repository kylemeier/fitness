//
//***exercise group name screen ***
//prevent duplicate group names
//
//******exercise enter screen********
//
//add cookies
//nextexercisegroup button always resets exercise num to 1, need to fix to account for user clicking 'cancel' on confirm box
//see if timeouts can be grouped together
//activate 'nextexercise' if fields are full
//create a save function ('previous exercise' doesn't save the current screen)
//
//******exercise group select screen********
//
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


var currentExerciseNum = 1;
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
      '<div id=\'exercisegroupnamer\'> \
      <header>Please enter an exercise group name. This group will contain all exercises you \
      perform on a given day. You will be creating a group for each day of exercises you perform.</header> \
      <label for=\'inputgroupname\'>Group:</label> \
      <input type=\'text\' maxlength = 20 name=\'inputgroupname\' id=\'inputgroupname\'> \
      <button class=\'namerproceed\' disabled>Proceed</button> \
      </div>'
    exerciseEnter =       
      '<div id=\'exerciseenter\' class=\'inview\'> \
      <header>Group: <span class=\'groupname\'></span></header> \
      <h1>#<span class=\'exercisenumber\'></span></h1> \
      <label for=\'exercisename\'>Exercise Name</label> \
      <input type=\'text\' name=\'exercisename\' id=\'exercisename\'> \
      <label for=\'exerciseweight\'>Weight lifted (in lbs) *only numbers accepted</label> \
      <input type=\'number\' name=\'exerciseweight\' id=\'exerciseweight\'> \
      <label for=\'exercisesets\'>Sets *only numbers accepted</label> \
      <input type=\'number\' name=\'exercisesets\' id=\'exercisesets\'> \
      <label for=\'exercisereps\'>Reps per set *only numbers accepted</label> \
      <input type=\'number\' name=\'exercisereps\' id=\'exercisereps\'> \
      <ul> \
        <li> \
      <button class=\'nextexercisegroup\'>Next Group</button> \
      </li> \
      <li> \
      <button class=\'prevexercisebutton\'>Prev Exercise</button> \
      </li> \
      <li> \
      <button class=\'nextexercisebutton\'>Next Exercise</button> \
      </li> \
      <li> \
      <button class=\'donebutton\'>Finished</button> \
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
          <button class=\'success\'></button> \
          <button class=\'fail\'></button> \
        </div> \
        <div id=\'timer\'> \
          <h1 id=\'clock\'>02:00</h1> \
          <button id=\'timerbutton\' class=\'start\'>Start</button> \
          </div> \
        </div> \
      </div> '



$('#exercisenumber').html(currentExerciseNum);

function addGroup(groupName, groupNum){
  allExercises['group'+groupNum] = {name: groupName, exerciseArray: []};
  return true;
}

function addExercise(name,weight,sets,reps){
  allExercises['group'+groupNum]['exerciseArray'][currentExerciseNum-1]=({name: name, weight: weight, sets: sets, reps:reps});
  return true;
}

function fieldValidation(div){
  var empty = $(div).find('input').filter(function() {
    return this.value === '';
  });
  return empty.length;
}
//refactor this function into multiple functions
function nextScreen(clickedButton, appendDiv, slideInDiv, slideInDir, slideOutDiv, slideOutClasses){
  var $nextgroup = $(slideInDiv).find('.nextexercisegroup');
      $nextexercise = $(slideInDiv).find('.nextexercisebutton');
      $done = $(slideInDiv).find('.donebutton');
      $prevexercise = $('.prevexercisebutton');

  if(fieldValidation(slideOutDiv)){
    var c = confirm("Because the fields are not complete, information from this screen will not be saved. Do you wish to proceed?");
    if(!c){
      return false;
    }
  }

    screenSlide(appendDiv,slideInDiv,slideInDir,slideOutDiv,slideOutClasses);
    
      
    $('.groupname').html(groupName);

    exerciseName = $('#exercisename').val();
    exerciseWeight = $('#exerciseweight').val();
    exerciseSets = $('#exercisesets').val();
    exerciseReps = $('#exercisereps').val();
    addExercise(exerciseName, exerciseWeight, exerciseSets, exerciseReps);
  
  disableButtons(slideInDiv, slideOutDiv);
  exerciseNumAdjust(clickedButton, slideInDiv);
};

function exerciseNumAdjust(clickedButton, slideInDiv){

  if(clickedButton === '.prevexercisebutton'){
        currentExerciseNum--;
      }
      if(clickedButton === '.nextexercisebutton'){
        currentExerciseNum++;
      }
      setTimeout(function(){
      $(slideInDiv).find('.exercisenumber').html(currentExerciseNum);
    },1);
}

function screenSlide(appendDiv, slideInDiv, slideInDir, slideOutDiv, slideOutClasses){
      $('.container').append(appendDiv);
    $(slideInDiv).addClass(slideInDir);
    setTimeout(function(){
      $(slideOutDiv).attr('class',slideOutClasses);
      $(slideInDiv).addClass('slideIn');
      setTimeout(function(){
        $('.remove').remove();
      },1000);
    },1);
}

function disableButtons(slideInDiv,slideOutDiv){
  $(slideOutDiv).find('.toggledisable').removeClass('toggledisable');
setTimeout(function(){
  if(currentExerciseNum===1){
    $(slideInDiv).find('.nextexercisegroup').addClass('toggledisable');
    $(slideInDiv).find('.nextexercisebutton').addClass('toggledisable');
    $(slideInDiv).find('.donebutton').addClass('toggledisable');
    $(slideInDiv).find('.prevexercisebutton').attr('disabled', true);
    if(fieldValidation(slideInDiv)){
      $('.toggledisable').attr('disabled', true);
    }
  }else{
    $(slideInDiv).find('.nextexercisebutton').addClass('toggledisable');
    $(slideInDiv).find('.nextexercisebutton').attr('disabled',true);
  }

  $(document).find('input').keyup(function(){
    if(!fieldValidation(slideInDiv)){
      $('.toggledisable').attr('disabled', false);
    }else{
      $('.toggledisable').attr('disabled', true);
    }
  });
},1);
}
disableButtons('#exercisegroupnamer','');

function displaySaved(){
  console.log('Expand object to see all information currently stored:');
  console.log(allExercises); 
}

$(document).on('click', '.autofill', function(){
  screenSlide(exercisePicker, '#exercisepicker', 'right', '#exercisegroupnamer', 'remove slideOutLeft'); 
  allExercises = {group1: {name:'Tuesday', exerciseArray:
                          [{name:'DB Bench Press', weight: 65, sets:3, reps:6}, 
                           {name:'DB Incline Bench Press', weight: 40, sets:2, reps:10},
                           {name:'DB Military Press', weight: 35, sets:3, reps:6},
                           {name:'BB Lying Tricep Extensions', weight: 22.5, sets:3, reps:10}]},                                                          
                  group2: {name:'Thursday', exerciseArray:
                          [{name:'Pullups', weight: 5, sets:3, reps:10}, 
                           {name:'Bentover Rows', weight: 85, sets:3, reps:8},
                           {name:'DB Hammercurls', weight: 30, sets:2, reps:10},
                           {name:'Situps', weight: 20, sets:3, reps:10}]}  
                  };
  groupNum = 2;
  for (var i=1; i<=groupNum; i++){
      $('#exercisepicker').append('<button class=\'groupbutton\' id='+allExercises['group'+i]['name']+'>'+allExercises['group'+i]['name']+'</button>');
    }
});

$(document).on('click', '.namerproceed', function(){
  event.preventDefault();
  groupName = $('#inputgroupname').val();
  screenSlide(exerciseEnter,'#exerciseenter','right','#exercisegroupnamer','remove slideOutLeft');
  disableButtons('.inview','#exercisegroupnamer');
  $('.exercisenumber').html(currentExerciseNum);
  $('.groupname').html(groupName);
  groupNum++;
  addGroup(groupName, groupNum);
  displaySaved();
});

$(document).on('click','.nextexercisegroup', function(){
  event.preventDefault();
  //always resets exercise num to 1, need to fix to account for user clicking 'cancel' on confirm box
  currentExerciseNum = 1;
  nextScreen('.nextexercisegroup', exerciseGroupNamer, '#exercisegroupnamer','left','#exerciseenter', 'remove slideOutRight');
  $('.namerproceed').addClass('toggledisable');
  displaySaved();
});

$(document).on('click','.prevexercisebutton', function(){
  event.preventDefault();
  if(currentExerciseNum===1){
    alert("No previous exercises found for this group.");
    return false;
  }
   for (var i=1; i<=groupNum; i++){
    if(groupName === allExercises['group'+i]['name']){
      screenSlide(exerciseEnter, '.inview', 'left', '#exerciseenter', 'remove slideOutRight');

      exerciseNumAdjust('.prevexercisebutton','.inview');
      setTimeout(function(){
      $('.inview').find('#exercisename').val((allExercises['group'+i]['exerciseArray'][currentExerciseNum-1]['name']));
      $('.inview').find('#exerciseweight').val((allExercises['group'+i]['exerciseArray'][currentExerciseNum-1]['weight']));
      $('.inview').find('#exercisesets').val((allExercises['group'+i]['exerciseArray'][currentExerciseNum-1]['sets']));
      $('.inview').find('#exercisereps').val((allExercises['group'+i]['exerciseArray'][currentExerciseNum-1]['reps']));
      disableButtons('.inview','.remove');
      },1);
      
      break;
    }
  }

  $('.groupname').html(groupName);
  displaySaved();
});

$(document).on('click','.nextexercisebutton', function(){
  event.preventDefault();
  nextScreen('.nextexercisebutton', exerciseEnter, '.inview','right', '#exerciseenter','remove slideOutLeft');
  for (var i=1; i<=groupNum; i++){
    if(groupName === allExercises['group'+i]['name']){
      var currentGroup = allExercises['group'+i]['exerciseArray'];
      if(currentGroup.length >= currentExerciseNum){
        setTimeout(function(){
          $('.inview').find('#exercisename').val((currentGroup[currentExerciseNum-1]['name']));
          $('.inview').find('#exerciseweight').val((currentGroup[currentExerciseNum-1]['weight']));
          $('.inview').find('#exercisesets').val((currentGroup[currentExerciseNum-1]['sets']));
          $('.inview').find('#exercisereps').val((currentGroup[currentExerciseNum-1]['reps']));
        },1);
      }
    }
  }
  displaySaved()
});

$(document).on('click', '.donebutton', function(){
  event.preventDefault();
  nextScreen('.donebutton', exercisePicker, '#exercisepicker','right', '#exerciseenter','remove slideOutLeft');
  displaySaved();
    for (var i=1; i<=groupNum; i++){
      $('#exercisepicker').append('<button class=\'groupbutton\' id='+allExercises['group'+i]['name']+'>'+allExercises['group'+i]['name']+'</button>');
    }
});

$(document).on('click', '.groupbutton', function(){
  event.preventDefault();
  var groupClicked = this.id;
   for (var i=1; i<=groupNum; i++){
    if(groupClicked === allExercises['group'+i]['name']){
      currentExercises = allExercises['group'+i]['exerciseArray'];
      displaySaved()
      break;

    }
  }
  screenSlide(workout, '#workout', 'right', '#exercisepicker', 'remove slideOutLeft'); 
  $('#workoutname').html('Name: '+currentExercises[0]['name']);
  $('#workoutweight').html('Weight: '+currentExercises[0]['weight']+'lbs');
  $('#workoutsets').html('Sets: '+currentExercises[0]['sets']);
  $('#workoutreps').html('Reps: '+currentExercises[0]['reps']);
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
    
    function showing() {
      var timeDiff = 0;
        if (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden) {
          return false;
        
        } else  {
            return timeDiff = (Math.ceil(new Date().getTime() - startTime)/1000);
    
        }
        return false;
    }
    document.addEventListener('visibilitychange', showing);


