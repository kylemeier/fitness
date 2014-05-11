//**general**
//see if creating a 'searchgroups' function that returns the requested group would be useful
//
//***exercise group name screen ***
//prevent duplicate group names
//
//******exercise enter screen********
//
//add cookies
//
//******exercise group select screen********
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
function addGroup(e,t){allExercises["group"+t]={name:e,exerciseArray:[]}}function emptyFields(e){var t=$(e).find("input").filter(function(){return this.value===""});return t.length}function exerciseNumAdjust(e,t){e===".prevexercisebutton"&&currentExerciseNum--;e===".nextexercisebutton"&&currentExerciseNum++;setTimeout(function(){$(t).find(".exercisenumber").html(currentExerciseNum)},1)}function screenSlide(e,t,n,r,i){$(".container").append(e);$(t).addClass(n);setTimeout(function(){$(r).attr("class",i);$(t).addClass("slideIn");setTimeout(function(){$(".remove").remove()},1e3)},1)}function disableButtons(e){setTimeout(function(){var t=$(e).find(".nextexercisegroupbutton"),n=$(e).find(".nextexercisebutton"),r=$(e).find(".donebutton"),i=$(e).find(".prevexercisebutton");if(currentExerciseNum===1){t.addClass("toggledisable");n.addClass("toggledisable");r.addClass("toggledisable");i.attr("disabled",!0)}else n.addClass("toggledisable");emptyFields(e)&&$(e).find(".toggledisable").attr("disabled",!0);$(document).find("input").keyup(function(){emptyFields(e)?$(e).find(".toggledisable").attr("disabled",!0):$(e).find(".toggledisable").attr("disabled",!1)})},50)}function addExercise(){var e=$("#exercisename").val();weight=$("#exerciseweight").val();sets=$("#exercisesets").val();reps=$("#exercisereps").val();allExercises["group"+groupNum].exerciseArray[currentExerciseNum-1]={name:e,weight:weight,sets:sets,reps:reps}}function confirmation(e,t){function n(){$(".modalconfirm").removeClass("visible");$(".modalconfirm").addClass("invisible");setTimeout(function(){$(".modalconfirm").remove()},500);$(document).off("click",".confirm");$(document).off("click",".deny")}if(emptyFields(e)===0)t("fields full");else if(emptyFields(e)===4)t("fields empty");else{$(".container").append(modalConfirm);setTimeout(function(){$(".modalconfirm").removeClass("invisible");$(".modalconfirm").addClass("visible")},1);$(document).on("click",".confirm",function(){t(1);n()});$(document).on("click",".deny",function(){t(0);n()})}}function displaySaved(){console.log("Expand object to see all information currently stored:");console.log(allExercises)}function addExerciseGroups(){for(var e=1;e<=groupNum;e++){var t=[];for(var n=0;n<allExercises["group"+e].exerciseArray.length;n++)t.push("<li>"+allExercises["group"+e].exerciseArray[n].name+"</li>");$("#exercisepicker").find("ul").append("<li id="+allExercises["group"+e].name+"><button class='groupbutton'>"+allExercises["group"+e].name+"</button></button><ol>"+t.join("")+"</ol><button class='startworkout'>Start Workout</button></li>")}}var currentExerciseNum=1,groupName="",groupNum=0,allExercises={},exerciseGroupNamer="<div id='exercisegroupnamer'>       <header>Please enter an exercise group name. This group will contain all exercises you       perform on a given day. You will be creating a group for each day of exercises you perform.</header>       <label for='inputgroupname'>Group:</label>       <input type='text' maxlength = 20 name='inputgroupname' id='inputgroupname'>       <button class='namerproceed toggledisable' disabled>Proceed</button>       </div>",exerciseEnter="<div id='exerciseenter' class='inview'>       <header>Group: <span class='groupname'></span></header>       <h1>#<span class='exercisenumber'></span></h1>       <label for='exercisename'>Exercise Name</label>       <input type='text' name='exercisename' id='exercisename'>       <label for='exerciseweight'>Weight lifted (in lbs) *only numbers accepted</label>       <input type='number' name='exerciseweight' id='exerciseweight'>       <label for='exercisesets'>Sets *only numbers accepted</label>       <input type='number' name='exercisesets' id='exercisesets'>       <label for='exercisereps'>Reps per set *only numbers accepted</label>       <input type='number' name='exercisereps' id='exercisereps'>       <ul>         <li>       <button class='nextexercisegroupbutton'>Next Group</button>       </li>       <li>       <button class='prevexercisebutton'>Prev Exercise</button>       </li>       <li>       <button class='nextexercisebutton'>Next Exercise</button>       </li>       <li>       <button class='donebutton'>Finished</button>       </li>       </ul>       </div>",modalConfirm="<div class='modalconfirm invisible'>         <div class= 'confirmbox'>           <p>Because the fields are not complete, your information will not be saved. Do you wish to proceed?</p>           <button class='modalbutton confirm'>Yes</button>           <button class='modalbutton deny'>No</button>         </div>       </div>",exercisePicker="<div id='exercisepicker'>       <header>Your exercise groups:</header>       <h1>(click a group name to view its exercises)</h1>       <ul>       </ul>       </div>",workout="<div id='workout'>         <header id='workoutname'></header>         <h1 id='workoutweight'></h1>         <h1 id='workoutsets'></h1>         <h1 id='workoutreps'></h1>         <div id='resultbuttons'>           <button class='success'></button>           <button class='fail'></button>         </div>         <div id='timer'>           <h1 id='clock'>02:00</h1>           <button id='timerbutton' class='start'>Start</button>           </div>         </div>       </div> ";$("#exercisenumber").html(currentExerciseNum);disableButtons("#exercisegroupnamer");$(document).on("click",".autofill",function(){screenSlide(exercisePicker,"#exercisepicker","right","#exercisegroupnamer","remove left");allExercises={group1:{name:"Tuesday",exerciseArray:[{name:"DB Bench Press",weight:65,sets:3,reps:6},{name:"DB Incline Bench Press",weight:40,sets:2,reps:10},{name:"DB Military Press",weight:35,sets:3,reps:6},{name:"BB Lying Tricep Extensions",weight:22.5,sets:3,reps:10}]},group2:{name:"Thursday",exerciseArray:[{name:"Pullups",weight:5,sets:3,reps:10},{name:"Bentover Rows",weight:85,sets:3,reps:8},{name:"DB Hammercurls",weight:30,sets:2,reps:10},{name:"Situps",weight:20,sets:3,reps:10}]}};groupNum=2;addExerciseGroups();displaySaved()});$(document).on("click",".namerproceed",function(){event.preventDefault();currentExerciseNum=1;groupName=$("#inputgroupname").val();screenSlide(exerciseEnter,"#exerciseenter","right","#exercisegroupnamer","remove left");disableButtons(".inview");$(".exercisenumber").html(currentExerciseNum);$(".groupname").html(groupName);groupNum++;addGroup(groupName,groupNum);displaySaved()});$(document).on("click",".nextexercisegroupbutton",function(){event.preventDefault();confirmation("#exerciseenter",function(e){if(!e)return!1;screenSlide(exerciseGroupNamer,"#exercisegroupnamer","left","#exerciseenter","remove right");disableButtons("#exercisegroupnamer");e==="fields full"&&addExercise();displaySaved()})});$(document).on("click",".prevexercisebutton",function(){event.preventDefault();confirmation("#exerciseenter",function(e){if(!e)return!1;e==="fields full"&&addExercise();for(var t=1;t<=groupNum;t++)if(groupName===allExercises["group"+t].name){screenSlide(exerciseEnter,".inview","left","#exerciseenter","remove right");exerciseNumAdjust(".prevexercisebutton",".inview");setTimeout(function(){$(".inview").find("#exercisename").val(allExercises["group"+t].exerciseArray[currentExerciseNum-1].name);$(".inview").find("#exerciseweight").val(allExercises["group"+t].exerciseArray[currentExerciseNum-1].weight);$(".inview").find("#exercisesets").val(allExercises["group"+t].exerciseArray[currentExerciseNum-1].sets);$(".inview").find("#exercisereps").val(allExercises["group"+t].exerciseArray[currentExerciseNum-1].reps);disableButtons(".inview")},1);break}$(".groupname").html(groupName);displaySaved()})});$(document).on("click",".nextexercisebutton",function(){event.preventDefault();screenSlide(exerciseEnter,".inview","right","#exerciseenter","remove left");$(".groupname").html(groupName);addExercise();exerciseNumAdjust(".nextexercisebutton",".inview");for(var e=1;e<=groupNum;e++)if(groupName===allExercises["group"+e].name){var t=allExercises["group"+e].exerciseArray;if(t.length>=currentExerciseNum){setTimeout(function(){$(".inview").find("#exercisename").val(t[currentExerciseNum-1].name);$(".inview").find("#exerciseweight").val(t[currentExerciseNum-1].weight);$(".inview").find("#exercisesets").val(t[currentExerciseNum-1].sets);$(".inview").find("#exercisereps").val(t[currentExerciseNum-1].reps)},1);break}}disableButtons(".inview");displaySaved()});$(document).on("click",".donebutton",function(){event.preventDefault();confirmation("#exerciseenter",function(e){if(!e)return!1;e==="fields full"&&addExercise();screenSlide(exercisePicker,"#exercisepicker","right","#exerciseenter","remove left");exerciseNumAdjust(".donebutton","#exercisepicker");displaySaved();addExerciseGroups()})});$(document).on("click",".startworkout",function(){var e=[];event.preventDefault();var t=$(this).closest("li").attr("id");for(var n=1;n<=groupNum;n++)if(t===allExercises["group"+n].name){e=allExercises["group"+n].exerciseArray;displaySaved();break}screenSlide(workout,"#workout","right","#exercisepicker","remove left");$("#workoutname").html("Name: "+e[0].name);$("#workoutweight").html("Weight: "+e[0].weight+"lbs");$("#workoutsets").html("Sets: "+e[0].sets);$("#workoutreps").html("Reps: "+e[0].reps)});$(document).on("click",".groupbutton",function(){event.preventDefault();$(this).next("ol").slideToggle()});