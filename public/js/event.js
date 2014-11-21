$(document).ready(function(){
	// $("#registerButton").click(function() {
	// 	$("#registerModal").modal("toggle");
	// });


	$("#updateForm").submit(function(e) {
		e.preventDefault(); // Stop form submission and subsequent refresh

		console.log($("#registerText").val());

		$.ajax({
			type: "POST",
			url: "/update",
			data: $("#registerText").val(),
			success: function(data) {
				alert(data);
			}
		});

	});

});