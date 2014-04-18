//
//***exercise group name screen ***
//prevent duplicate group names
//
//******exercise enter screen********
//
//add cookies
//add way to go back, pull from exercise object
//
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
// number of exercises in a given group console.log(allExercises['group1']['exerciseArray'].length);
// grab group name given a groupNum console.log(allExercises['group'+groupNum]['name']);
function addGroup(e,t){allExercises["group"+t]={name:e,exerciseArray:[]};return!0}function addExercise(e,t,n,r){console.log(groupNum);allExercises["group"+groupNum].exerciseArray.push({name:e,weight:t,sets:n,reps:r});return!0}function fieldValidation(){var e=$(document).find("input").filter(function(){return this.value===""});return e.length}function nextScreen(e,t,n,r,i,s){if(fieldValidation()){var o=confirm("Because the fields are not complete, information from this screen will not be saved. Do you wish to proceed?");if(!o)return!1}screenSlide(t,n,r,i,s);setTimeout(function(){e===".prevexercisebutton"&&currentExerciseNum--;e===".nextexercisebutton"&&currentExerciseNum++;$(".exercisenumber").html(currentExerciseNum)},550);$(".groupname").html(groupName);exerciseName=$("#exercisename").val();exerciseWeight=$("#exerciseweight").val();exerciseSets=$("#exercisesets").val();exerciseReps=$("#exercisereps").val();addExercise(exerciseName,exerciseWeight,exerciseSets,exerciseReps);console.log("currentexercise"+currentExerciseNum);if(currentExerciseNum===2){$(n).find(".nextexercisegroup").addClass("toggledisable");$(n).find(".nextexercisebutton").addClass("toggledisable");$(n).find(".donebutton").addClass("toggledisable");$(".prevexercisebutton").attr("disabled",!0);$(".toggledisable").attr("disabled",!0)}else{$(n).find(".nextexercisebutton").addClass("toggledisable");$(n).find(".nextexercisebutton").attr("disabled",!0)}$(document).find("input").keyup(function(){console.log(fieldValidation());fieldValidation()?$(".toggledisable").attr("disabled",!0):$(".toggledisable").attr("disabled",!1)})}function screenSlide(e,t,n,r,i){$(".container").append(e);$(t).addClass(n);setTimeout(function(){$(r).attr("class",i);$(t).addClass("slideIn");setTimeout(function(){$(".remove").remove()},1e3)},1)}function displaySaved(){console.log("Expand object to see all information currently stored:");console.log(allExercises)}function showing(){var e=0;return document.hidden||document.mozHidden||document.msHidden||document.webkitHidden?!1:e=Math.ceil((new Date).getTime()-startTime)/1e3}var currentExerciseNum=1;exerciseName="";exerciseWeight="";exerciseSets="";exerciseReps="";exerciseArray=[];groupName="";groupNum=0;allExercises={};currentExercises=[];exerciseGroupNamer="<div id='exercisegroupnamer'>       <header>Please enter an exercise group name. This group will contain all exercises you       perform on a given day. You will be creating a group for each day of exercises you perform.</header>       <label for='inputgroupname'>Group:</label>       <input type='text' maxlength = 20 name='inputgroupname' id='inputgroupname'>       <button class='namerproceed' disabled>Proceed</button>       </div>";exerciseEnter="<div id='exerciseenter' class='inview'>       <header>Group: <span class='groupname'></span></header>       <h1>#<span class='exercisenumber'></span></h1>       <label for='exercisename'>Exercise Name</label>       <input type='text' name='exercisename' id='exercisename'>       <label for='exerciseweight'>Weight lifted (in lbs) *only numbers accepted</label>       <input type='number' name='exerciseweight' id='exerciseweight'>       <label for='exercisesets'>Sets *only numbers accepted</label>       <input type='number' name='exercisesets' id='exercisesets'>       <label for='exercisereps'>Reps per set *only numbers accepted</label>       <input type='number' name='exercisereps' id='exercisereps'>       <ul>         <li>       <button class='nextexercisegroup'>Next Group</button>       </li>       <li>       <button class='prevexercisebutton'>Prev Exercise</button>       </li>       <li>       <button class='nextexercisebutton'>Next Exercise</button>       </li>       <li>       <button class='donebutton'>Finished</button>       </li>       </ul>       </div>";exercisePicker="<div id='exercisepicker'>       <header>Your exercise groups:</header>       </div>";workout="<div id='workout'>         <header id='workoutname'></header>         <h1 id='workoutweight'></h1>         <h1 id='workoutsets'></h1>         <h1 id='workoutreps'></h1>         <div id='resultbuttons'>           <button class='success'></button>           <button class='fail'></button>         </div>         <div id='timer'>           <h1 id='clock'>02:00</h1>           <button id='timerbutton' class='start'>Start</button>           </div>         </div>       </div> ";$("#exercisenumber").html(currentExerciseNum);$(document).on("click",".autofill",function(){screenSlide(exercisePicker,"#exercisepicker","right","#exercisegroupnamer","remove slideOutLeft");allExercises={group1:{name:"Tuesday",exerciseArray:[{name:"DB Bench Press",weight:65,sets:3,reps:6},{name:"DB Incline Bench Press",weight:40,sets:2,reps:10},{name:"DB Military Press",weight:35,sets:3,reps:6},{name:"BB Lying Tricep Extensions",weight:22.5,sets:3,reps:10}]},group2:{name:"Thursday",exerciseArray:[{name:"Pullups",weight:5,sets:3,reps:10},{name:"Bentover Rows",weight:85,sets:3,reps:8},{name:"DB Hammercurls",weight:30,sets:2,reps:10},{name:"Situps",weight:20,sets:3,reps:10}]}};groupNum=2;for(var e=1;e<=groupNum;e++)$("#exercisepicker").append("<button class='groupbutton' id="+allExercises["group"+e].name+">"+allExercises["group"+e].name+"</button>")});$(document).find("input").keyup(function(){console.log(fieldValidation());fieldValidation()?$(".toggledisable").attr("disabled",!0):$(".toggledisable").attr("disabled",!1)});$(document).on("click",".namerproceed",function(){event.preventDefault();groupName=$("#inputgroupname").val();screenSlide(exerciseEnter,"#exerciseenter","right","#exercisegroupnamer","remove slideOutLeft");$(".nextexercisegroup").addClass("toggledisable");$(".nextexercisebutton").addClass("toggledisable");$(".donebutton").addClass("toggledisable");$(".prevexercisebutton").attr("disabled",!0);$(".toggledisable").attr("disabled",!0);$(document).find("input").keyup(function(){fieldValidation()?$(".toggledisable").attr("disabled",!0):$(".toggledisable").attr("disabled",!1)});$(".exercisenumber").html(currentExerciseNum);$(".groupname").html(groupName);groupNum++;addGroup(groupName,groupNum);displaySaved()});$(document).on("click",".nextexercisegroup",function(){event.preventDefault();currentExerciseNum=1;nextScreen(".nextexercisegroup",exerciseGroupNamer,"#exercisegroupnamer","left","#exerciseenter","remove slideOutRight");$(".namerproceed").addClass("toggledisable");displaySaved()});$(document).on("click",".prevexercisebutton",function(){event.preventDefault();if(currentExerciseNum===1){alert("No previous exercises found for this group.");return!1}nextScreen(".prevexercisebutton",exerciseEnter,".inview","left","#exerciseenter","remove slideOutRight");displaySaved()});$(document).on("click",".nextexercisebutton",function(){event.preventDefault();nextScreen(".nextexercisebutton",exerciseEnter,".inview","right","#exerciseenter","remove slideOutLeft");displaySaved()});$(document).on("click",".donebutton",function(){event.preventDefault();nextScreen(".donebutton",exercisePicker,"#exercisepicker","right","#exerciseenter","remove slideOutLeft");displaySaved();for(var e=1;e<=groupNum;e++)$("#exercisepicker").append("<button class='groupbutton' id="+allExercises["group"+e].name+">"+allExercises["group"+e].name+"</button>")});$(document).on("click",".groupbutton",function(){event.preventDefault();var e=this.id;for(var t=1;t<=groupNum;t++)if(e===allExercises["group"+t].name){currentExercises=allExercises["group"+t].exerciseArray;console.log("Expand objects below to view currently selected exercises: ");console.log(currentExercises)}screenSlide(workout,"#workout","right","#exercisepicker","remove slideOutLeft");$("#workoutname").html("Name: "+currentExercises[0].name);$("#workoutweight").html("Weight: "+currentExercises[0].weight+"lbs");$("#workoutsets").html("Sets: "+currentExercises[0].sets);$("#workoutreps").html("Reps: "+currentExercises[0].reps)});var startTime=0,timeRunning=0;$("#timerbutton").click(function(){if(!timeRunning){timeRunning=1;$(this).removeClass("start");$(this).addClass("stop");var e=120;startTime=(new Date).getTime();$("#clock").html(timeFormat(e));var t=setInterval(function(){showing()&&(e=Math.ceil(120-showing()));if(e<=0){$("#timerbutton").removeClass("stop");$("#timerbutton").addClass("start");$("#clock").html("02:00");e=120;clearInterval(t);timeRunning=0;alert("Done")}$("#clock").html(timeFormat(e))},1e3)}});var timeFormat=function(e){var t=Math.floor(e/60),n=Math.round(e%60),r="",i="";t<10?r="0"+t:r=t;n<10?i="0"+n:i=n;return r+":"+i};document.addEventListener("visibilitychange",showing);