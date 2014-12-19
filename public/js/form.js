$(document).ready(function(){
	
	// Regex for email
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



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


		// Entered something after being blank
		if($(event.target).hasClass("blank") && $(event.target).val()) { 
			$(event.target).removeClass("blank");
		}

		// Fixed a broken email
		if($(event.target).hasClass("wrong-email") && re.test($(event.target).val())) {
			$(event.target).removeClass("wrong-email");
		}
		

	});

	$("form").submit(function(e) {

		// Validate the information in the form
		var pass = true;
		// Check all required inputs have something in them
		$(".required").each(function(index) {
			if(!$(this).val()) {
				$(this).addClass("blank");
				pass = false;
			}
		});

		// Check the oddball entries like Grade and Bus
		var current = $("select[name='grade']");
		
		if(!current.val()) { // No grade selected
			current.addClass("blank");
			pass = false;
		} else if(current.val() == "other" && !$("input[name='gradeother']").val()) {
			// Nothing in Other Grade text input
			$("input[name='gradeother']").addClass("blank");
			pass = false;
		}

		current = $("input[name='busRide']:checked");

		if(!current.val()) { // No option on bus ride selected
			current.addClass("blank");
			pass = false;
		} else if(current.val() == "yes" && !$("#formSelectBus").val()) {
			// Yes to taking the bus, but no bus selected
			$("#formSelectBus").addClass("blank");
			pass = false;
		}

		// Check the email is an email
		current = $("input[name='email']");

		if(!re.test(current.val())) {
			current.addClass("wrong-email");
			pass = false;
		}

		// Check everything has a value.
		// CHeck age is a number
		// Check if grade other, input is filled
		// Check if taking the bus, bus is selected

		e.preventDefault(); // Stop form submission and subsequent refresh

		if(pass) {
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
						busRide: 	$("input[name=busRide]:checked").val(),
						busorigin: 	$("select[name=busorigin]").val(),
						personalweb: $("input[name=personalweb]").val(),
						linkedinweb: $("input[name=linkedinweb]").val()

						},
				success: function(data) {

					$("#registerModal").modal('toggle');

					if(data == "success") { // Successful submission
						$(".modal-body").html("<p>Nice! Keep listening for updates!</p>");

						$('#registerModal').on('hidden.bs.modal', function() {
							window.location.href = '/';
						});

					} else if(data == "userborked") { // Email not email.
						// Stop doing database injections pls.
						$(".modal-body").html("<p>Something you entered was not valid. :/</p>");

					} else { // We borked it
						$(".modal-body").html("<p>Oh noes! Something went wrong, most likely you don't have internet.</p>");

					}

				}
			});
		}


	});
});