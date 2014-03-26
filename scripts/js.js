var slider = function(slidingitems){

		$('#nextexercisebutton').click(function(){
		slidingitems.slideToggle(300);
	});


}


slider($'#exercise1');