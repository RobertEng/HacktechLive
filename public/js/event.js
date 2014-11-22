$(document).ready(function(){

	$("#updateForm").submit(function(e) {
		e.preventDefault(); // Stop form submission and subsequent refresh

		$.ajax({
			type: "POST",
			url: "/update",
			data: {registerText: $("#registerText").val()},
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