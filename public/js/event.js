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


	// Some nice script to convert all svg classes into the svg code
	jQuery('img.svg').each(function(){
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    jQuery.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');
	});

});