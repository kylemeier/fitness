//**general**
//see if creating a 'searchgroups' function that returns the requested group would be useful
//make 'exercise group select screen' the intro page
//create log page
//
//***exercise group name screen ***
//prevent duplicate group names
//remove name limit
//
//******exercise enter screen********
//
//add cookies
//
//******exercise group select screen********
//add 'add group' button in top right (a plus sign)
//add text explaining how to add new group for first time users
//add expand and start workout buttons
//expand shows the exercise group below the button with an edit and delete button next to each exercise item
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


var currentExerciseNum = 1,
    groupName = '',
    groupNum = 0,
    allExercises = {},
    // jshint multistr: true
    exercisePicker =
      '<div id=\'exercisepicker\'> \
        <header> \
          <h1>Groups</h1> \
          <button class =\'add-group\'>+</button> \
        </header> \
        <div class=\'intro-text\'> \
          <p>Looks like you don\'t have any exercise groups set up!</p> \
          <p>In each group you\'ll be entering all the exercises you do in a day (Leg Day, Thursday Workout, etc).</p> \
          <p>Click on the \'+\' in the top right to get started.</p> \
        </div> \
      <ul class=\'group-list\'> \
      </ul> \
      </div>',
    exerciseGroupNamer =
      '<div id=\'exercisegroupnamer\'> \
        <header> \
          <h1>New Group</h1> \
          <button class=\'groups-back\'> &lsaquo; Groups</button> \
          </header> \
          <input type=\'text\' name=\'inputgroupname\' id=\'inputgroupname\' placeholder=\'Enter group name\' maxlength=\'26\'> \
        <span><button class=\'namerproceed toggledisable\'>&rsaquo;</button></span> \
        </div> \
      </div>',
    exerciseEnter =
      '<div id=\'exerciseenter\' class=\'inview\'> \
      <header>Group: <span class=\'groupname\'></span></header> \
      <h1>#<span class=\'exercisenumber\'></span></h1> \
      <label for=\'exercisename\'>Exercise Name</label> \
      <input type=\'text\' name=\'exercisename\' id=\'exercisename\'> \
      <label for=\'exerciseweight\'>Weight lifted (in lbs)</label> \
      <input type=\'number\' name=\'exerciseweight\' id=\'exerciseweight\'> \
      <label for=\'exercisesets\'>Sets</label> \
      <input type=\'number\' name=\'exercisesets\' id=\'exercisesets\'> \
      <label for=\'exercisereps\'>Reps per set</label> \
      <input type=\'number\' name=\'exercisereps\' id=\'exercisereps\'> \
      <ul> \
        <li> \
      <button class=\'nextexercisegroupbutton\'>Next Group</button> \
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
      </div>',
    modalConfirm =
      '<div class=\'modalconfirm invisible\'> \
        <div class= \'confirmbox\'> \
          <p>Because the fields are not complete, changes made on this screen will not be saved. Do you wish to proceed?</p> \
          <button class=\'modalbutton confirm\'>Yes</button> \
          <button class=\'modalbutton deny\'>No</button> \
        </div> \
      </div>',
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
      </div> ';


$(window).resize(resetScroll);

function resetScroll(){
  $(document).scrollTop(0);
}
$('#exercisenumber').html(currentExerciseNum);

function addGroup(groupName, groupNum){
  /**
   * Add group object to exercise array
   * @param {text} groupName: user entered
   * @param {integer} groupNum: current group number
   */
  allExercises['group'+groupNum] = {name: groupName, exerciseArray: []};
}

function isObjEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}


function emptyFields(div){
  /**
   * Count # of empty input fields in the given div
   * @param {DOM element} div: div to look at
   * @return {# of empty input fields}
   */
  var empty = $(div).find('input').filter(function() {
    return this.value === '';
  });
  return empty.length;
}

function exerciseNumAdjust(clickedButton, slideInDiv){
  /**
   * Increment/decrement the current exercise number
   * @param {DOM element} clickedButton: button that was clicked to initiate function
   * @param {DOM element} slideInDiv: class name of div that will be sliding into the screen
   * 
   */

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
  /**
   * Slide new div in, current div out, and remove current div when it's out of view
   * @param {var} appendDiv: js var containing HTML elements of new div
   * @param {DOM element} slideInDiv: class name of new div
   * @param {text} slideInDir: text specifying direction new div should slide
   * @param {text} slideOutDiv: class name of current div
   * @param {text} slideOutClasses: classes added to current div to allow it to slide and disappear
   */
  $('.container').append(appendDiv);
  $(slideInDiv).addClass(slideInDir);
  setTimeout(function(){
    $(slideOutDiv).attr('class',slideOutClasses);
    $(slideInDiv).addClass('slideIn');
    setTimeout(function(){
      $('.remove').remove();
    },500);
  },1);
}

function disableButtons(slideInDiv){
  /**
   * Disable buttons upon entry of new div
   * @param {DOM element} slideInDiv: class name of new div
   */
  
  // Set a timeout to ensure new div has been added to dom before proceeding
setTimeout(function(){
  var $nextExerciseGroupButton = $(slideInDiv).find('.nextexercisegroupbutton'),
      $nextExerciseButton = $(slideInDiv).find('.nextexercisebutton'),
      $doneButton = $(slideInDiv).find('.donebutton'),
      $prevExerciseButton = $(slideInDiv).find('.prevexercisebutton');

    //Set state for first exercise in a group
    if(currentExerciseNum===1){
      $nextExerciseGroupButton.addClass('toggledisable');
      $nextExerciseButton.addClass('toggledisable');
      $doneButton.addClass('toggledisable');
      $prevExerciseButton.attr('disabled', true);
    }else{

    //Set state for any exercise that isn't the first in a group
      $nextExerciseButton.addClass('toggledisable');
    }

    //Only disable buttons upon entry if the new div hasn't already been filled out
    if(emptyFields(slideInDiv)){
      $(slideInDiv).find('.toggledisable').attr('disabled', true);
    }

    //Update button states on each key press
    $(document).find('input').keyup(function(){
      console.log('in here', slideInDiv);
      if(!emptyFields(slideInDiv)){
        console.log('in here2');
        $(slideInDiv).find('.toggledisable').attr('disabled', false);
      }else{
        console.log('in here3');
        $(slideInDiv).find('.toggledisable').attr('disabled', true);
      }
    });
  },50);
}

function addExercise(){
  /**
   * Add exercise input by user to current exercise group
   */
  var name = $('#exercisename').val();
      weight = $('#exerciseweight').val();
      sets = $('#exercisesets').val();
      reps = $('#exercisereps').val();
  allExercises['group'+groupNum]['exerciseArray'][currentExerciseNum-1]=({name: name, weight: weight, sets: sets, reps: reps});
}

function confirmation(div, action){
  /**
   * Generates a modal confirm box if user partially fills out text fields, confirm box
   *   informs user information will not be saved if they proceed
   * @param {text} div: class name of current div
   * @param {function} action: callback function that fires if user wants to continue
   */
  
  //Fade out modal, remove modal, and prevent click events from stacking after user clicks a modal button
  function cleanUp(){
      $('.modalconfirm').removeClass('visible');
      $('.modalconfirm').addClass('invisible');
      setTimeout(function(){
        $('.modalconfirm').remove();
      },500);
      $(document).off('click','.confirm');
      $(document).off('click','.deny');
  };
  
  //Check if fields are completely full/empty
  if(emptyFields(div) === 0){
    action('fields full');

  }else if(emptyFields(div) === 4){
    action('fields empty');
  }else{

    //Create modal if fields are partially filled in
    $('.container').append(modalConfirm);

    //Fade in modal
    setTimeout(function(){
      $('.modalconfirm').removeClass('invisible');
      $('.modalconfirm').addClass('visible');
    },1);

    $(document).on('click','.confirm',function(){

      //Send confirmation to the callback function
      action(1);

      cleanUp();
    });
    $(document).on('click','.deny',function(){

      //Send denial to the callback function
      action(0);

      cleanUp();
    });
  }
}

function displaySaved(){
  console.log('Expand object to see all information currently stored:');
  console.log(allExercises);
}

function addExerciseGroups(){
  /**
   * Create buttons for each exercise group and add their respective exercises into a list below each button
   * 
   */
    var exerciseList = [];
    //Iterate through all exercise groups
    for (var i=1; i<=groupNum; i++){

      //Empty array that fills with current group's exercises 
      exerciseList = [];

      //Iterate through all exercises in each group
      for(var e=0; e<allExercises['group'+i]['exerciseArray'].length; e++){

        //Add each exercise name into the array with line item markup
        exerciseList.push('<li><button>-</button>'+allExercises['group'+i]['exerciseArray'][e]['name']+'<button>edit</button></li>');
      }

      //Find the unordered list element in the DOM and add the current exercise group name as a button
      // with its exercise names flattened into a viewable unordered list below it
      $('#exercisepicker').find('.group-list').append('<li id='+allExercises['group'+i]['name']+'><button class=\'groupbutton\'>'+allExercises['group'+i]['name']+'</button></button><ul>'+exerciseList.join('')+'</ul><button class=\'startworkout\'>Start Workout</button></li>');
    }
}

disableButtons('#exercisegroupnamer');


$(document).on('click', '.autofill', function(){
  /**
   * Autofill with test values to skip exercise enter screens
   */
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
  addExerciseGroups();
  $('.intro-text').hide();
  displaySaved();
});

/**
* '+' button on #exercisepicker screen
*/
$(document).on('click', '.add-group', function(event){
  event.preventDefault();
  screenSlide(exerciseGroupNamer,'#exercisegroupnamer','right','#exercisepicker','remove left');
  disableButtons('#exercisegroupnamer');
});

/**
* '< Groups' button on e#xercisegroupnamer screen
*/
$(document).on('click', '.groups-back', function(event){
  event.preventDefault();
  groupName = $('#inputgroupname').val();
  screenSlide(exercisePicker,'#exercisepicker','left','#exercisegroupnamer','remove right');
  if(groupName){
    groupNum++;
    addGroup(groupName, groupNum);
  }
  if(!isObjEmpty(allExercises)){
    $('.intro-text').hide();
  }
  addExerciseGroups();
  displaySaved();
  });

$(document).on('click', '.namerproceed', function(){
  /**
   * Button on group namer screen
   */
  event.preventDefault();
  currentExerciseNum = 1;
  groupName = $('#inputgroupname').val();
  screenSlide(exerciseEnter,'#exerciseenter','right','#exercisegroupnamer','remove left');
  disableButtons('.inview');
  $('.exercisenumber').html(currentExerciseNum);
  $('.groupname').html(groupName);
  groupNum++;
  addGroup(groupName, groupNum);
  displaySaved();
});

$(document).on('click','.nextexercisegroupbutton', function(){
  /**
   * 'Next Group' button
   */
  event.preventDefault();
  confirmation('#exerciseenter', function(c){

    //exit function if user clicks 'No' on confirm modal
    if (!c){
      return false;
    }

    screenSlide(exerciseGroupNamer,'#exercisegroupnamer','left','#exerciseenter','remove right');
    disableButtons('#exercisegroupnamer');

    //Only add user entered data if the fields are full
    if(c === 'fields full'){
      addExercise();
    }
      displaySaved();
    });
});

$(document).on('click','.prevexercisebutton', function(){
  /**
   * 'Prev Exercise' button
   */
  event.preventDefault();
  confirmation('#exerciseenter', function(c){
    if (!c){
      return false;
    }
    if(c === 'fields full'){
      addExercise();
    }

    //Find and display exercise information for previous exercise in current exercise group
    for (var i=1; i<=groupNum; i++){
      if(groupName === allExercises['group'+i]['name']){
        screenSlide(exerciseEnter, '.inview', 'left', '#exerciseenter', 'remove right');
        exerciseNumAdjust('.prevexercisebutton','.inview');

        //Set timeout to ensure new div has been generated before populating it
        setTimeout(function(){
          $('.inview').find('#exercisename').val((allExercises['group'+i]['exerciseArray'][currentExerciseNum-1]['name']));
          $('.inview').find('#exerciseweight').val((allExercises['group'+i]['exerciseArray'][currentExerciseNum-1]['weight']));
          $('.inview').find('#exercisesets').val((allExercises['group'+i]['exerciseArray'][currentExerciseNum-1]['sets']));
          $('.inview').find('#exercisereps').val((allExercises['group'+i]['exerciseArray'][currentExerciseNum-1]['reps']));
          disableButtons('.inview');
        },1);

        //Leave loop after correct group has been found and all actions have been taken
        break;
      }
    }

    $('.groupname').html(groupName);
    displaySaved();
  });
});

$(document).on('click','.nextexercisebutton', function(){
  /**
   * 'Next Exercise'
   */
  event.preventDefault();
  screenSlide(exerciseEnter, '.inview', 'right', '#exerciseenter', 'remove left');
  $('.groupname').html(groupName);
  addExercise();
  exerciseNumAdjust('.nextexercisebutton', '.inview');

  //Find and display exercise information for next exercise in current exercise group (if any exists)
  for (var i=1; i<=groupNum; i++){
    if(groupName === allExercises['group'+i]['name']){

      //Check if the current exercise group has exercises after the current exercise
      var currentGroup = allExercises['group'+i]['exerciseArray'];
      if(currentGroup.length >= currentExerciseNum){
        //If current exercise group does have exercises after the current exercise, add the next one to the
        // incoming div
        setTimeout(function(){
          $('.inview').find('#exercisename').val((currentGroup[currentExerciseNum-1]['name']));
          $('.inview').find('#exerciseweight').val((currentGroup[currentExerciseNum-1]['weight']));
          $('.inview').find('#exercisesets').val((currentGroup[currentExerciseNum-1]['sets']));
          $('.inview').find('#exercisereps').val((currentGroup[currentExerciseNum-1]['reps']));
        },1);
        break;
      }
    }
  }
  disableButtons('.inview');
  displaySaved();
});

$(document).on('click', '.donebutton', function(){
  /**
   * 'Finished' button
   */
  event.preventDefault();
  confirmation('#exerciseenter', function(c){
  if (!c){
    return false;
  }
  if(c === 'fields full'){
    addExercise();
  }
  screenSlide(exercisePicker,'#exercisepicker','right','#exerciseenter','remove left');
  exerciseNumAdjust('.donebutton', '#exercisepicker');
  displaySaved();
  addExerciseGroups();
  });
});

$(document).on('click', '.startworkout', function(){
  /**
   * 'Start workout' button
   */
  
  //Array to be populated with selected group's exercises
  var currentExercises = [];

  event.preventDefault();
      
  //Get the name ofthe group the user clicked on
  var groupClicked = $(this).closest('li').attr('id');

  //Find that name in the master array
  for (var i=1; i<=groupNum; i++){
    if(groupClicked === allExercises['group'+i]['name']){

      //Populate new array
      currentExercises = allExercises['group'+i]['exerciseArray'];

      displaySaved();
      break;
    }
  }
  screenSlide(workout, '#workout', 'right', '#exercisepicker', 'remove left');
  $('#workoutname').html('Name: '+currentExercises[0]['name']);
  $('#workoutweight').html('Weight: '+currentExercises[0]['weight']+'lbs');
  $('#workoutsets').html('Sets: '+currentExercises[0]['sets']);
  $('#workoutreps').html('Reps: '+currentExercises[0]['reps']);
});

$(document).on('click', '.groupbutton', function(){
  /**
   * Buttons with the names of the user's exercise groups
   */
  event.preventDefault();

  //Slide list of exercise names for the selected group
  $(this).next('ul').slideToggle();
});



// var startTime = 0;
// var timeRunning = 0;



// $(document).on('click', '#timerbutton', function(){
//   if(!timeRunning){
//     timeRunning = 1;
//       $( this ).removeClass('start');
//       $( this ).addClass('stop');

//     var totalTime = 120;
//     startTime = new Date().getTime();
  
    
    
//     $('#clock').html(timeFormat(totalTime));
  
//       var countDown = setInterval(function(){
  
//       //only subtract time when tab is showing
//         if(showing()){
//           totalTime=Math.ceil(120 - showing()); 
//         }
        
//         if(totalTime <= 0){
//           $( '#timerbutton' ).removeClass('stop');
//           $( '#timerbutton' ).addClass('start');
//           $('#clock').html('02:00');
//           totalTime=120;
//           clearInterval(countDown);
//           timeRunning = 0;
//           alert('Done');
//         }
  
//           $('#clock').html(timeFormat(totalTime));
   
//        },1000);

//   }    
// });

//     var timeFormat = function(totalTime){
    
    
//       var minutes = Math.floor(totalTime/60);
//       var seconds = Math.round(totalTime % 60);
//       var minutesStr='';
//       var secondsStr='';
    
//       if(minutes<10){
//         minutesStr='0'+minutes;
//       }else{
//         minutesStr = minutes;
//       }
//       if(seconds<10){
//         secondsStr='0'+seconds;
//       }else{
//         secondsStr = seconds;
//       }
    
//       return(minutesStr+':'+secondsStr);
    
//     };
    
//     function showing() {
//       var timeDiff = 0;
//         if (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden) {
//           return false;
        
//         } else  {
//             return timeDiff = (Math.ceil(new Date().getTime() - startTime)/1000);
    
//         }
//         return false;
//     }
//     document.addEventListener('visibilitychange', showing);