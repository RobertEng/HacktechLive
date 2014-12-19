$(document).ready(function(){
	
	$("form").change(function(event) {

		// Toggle busRide radio button
		if(event.target.name == 'busRide') {
			if(event.target.value == "yes") {
				$("#formSelectBus").css("visibility", "visible");
				$("#formHeadBus").css("visibility", "visible");

			} else {
				$("#formSelectBus").css("visibility", "hidden");
				$("#formHeadBus").css("visibility", "hidden");
			}
		} else if(event.target.name == 'grade') {
			if(event.target.value == 'other') {
				$("#formTextGrade").css("visibility", "visible");
				$("#formHeadGrade").css("visibility", "visible");
			} else {
				$("#formTextGrade").css("visibility", "hidden");
				$("#formHeadGrade").css("visibility", "hidden");
			}
		}

	});

	$("form").submit(function(e) {

		// Validate the information in the form
		$(".required").each(function(index) {
			if(!$(this).val()) {
				$(this).css("border-color","red");
			}

		});

		// Check everything has a value.
		// CHeck age is a number
		// Check if grade other, input is filled
		// Check if taking the bus, bus is selected

		e.preventDefault(); // Stop form submission and subsequent refresh

		$.ajax({
			type: "POST",
			url: "/update",
			data: { firstname: 	$("input[name=firstname]").val(),
					lastname: 	$("input[name=lastname]").val(),
					email: 		$("input[name=email]").val(),
					age: 		$("input[name=age]").val(),
					grade: 		$("select[name='grade']").val(),
					gradeother: $("input[name=gradeother]").val(),
					school: 	$("input[name=school]").val(),
					busRide: 	$("input[name=busRide]").val(),
					busorigin: 	$("select[name=busorigin]").val(),
					personalweb: $("input[name=personalweb]").val(),
					linkedinweb: $("input[name=linkedinweb]").val()

					},
			success: function(data) {

				$("#notifyModal").modal('toggle');

				if(data == "success") { // Successful submission
					$(".modal-body").html("<p>Nice! Keep listening for updates!</p>");

				} else if(data == "email") { // Email not email.
					// Stop doing database injections pls.
					$(".modal-body").html("<p>Please enter a valid email.</p>");

				} else { // We borked it
					$(".modal-body").html("<p>Oh noes! Something went wrong!</p>");

				}

			}
		});

	});
});