var exercise2 = $('#exercise2').offset().top-65;
var nextMove = exercise2;

$('.nextexercisebutton').click(function(){
    $('#exercises').animate({
    	bottom:nextMove}, {duration:'slow', queue:false}); 
    	nextMove += exercise2;   	
    	return false;
});
