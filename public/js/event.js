$(document).ready(function(){
	// $("#registerButton").click(function() {
	// 	$("#registerModal").modal("toggle");
	// });


	$("#updateForm").submit(function(e) {
		e.preventDefault(); // Stop form submission and subsequent refresh

		console.log("AJAX CALL ALMOST");

		$.ajax({
			type: "POST",
			url: "/update",
			data: $("registerText").value,
			success: function(data) {
				alert(data);
			}
		});

	});

});