$(document).ready(function(){
	$("form").submit(function(){
		var inputs = $("input");
		var allFilled = true;

		$.each(inputs, function(){
			if($(this).val() === ''){
				allFilled = false;
				return false;
			}
		});

		allFilled = allFilled && $("#category").val() !== '';

		if(allFilled) {
			return true;
		}
		alert('Please fill all fields');
		return false;
	});
});