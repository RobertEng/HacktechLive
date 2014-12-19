var express = require('express');
var router = express.Router();

var mysql = require('mysql');



/* GET home page. */
router.get('/', function(req, res) {
 	res.render('index', { title: 'Express' });
});

router.post('/update', function(req, res) {
	console.log("In update");

	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var age = req.body.age;
	var grade = req.body.grade;
	var gradeother = req.body.gradeother;
	var school = req.body.school;
	var busride = req.body.busRide;
	var busorigin = req.body.busorigin;
	var personalweb = req.body.personalweb;
	var linkedinweb = req.body.linkedinweb;

	// Get rid of gradeother and busorigin if grade and busride aren't other

	
	// Check if email is undefined

	// console.log("YOU ENTERED THIS WEIRD EMAIL " + email);

	// // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	
	if(email != undefined && re.test(email)) {

		var connection = mysql.createConnection({
		  host     : process.env.RDS_HOSTNAME,
		  user     : process.env.RDS_USERNAME,
		  password : process.env.RDS_PASSWORD,
		  port 	   : process.env.RDS_PORT,
		  database : "ebdb"
		});

		var success = true; // flag for success. I'm sure theres a better way to do this.

		// Connect to the database
		connection.connect(function(err) {
			if(err) {
				console.log(err);
				success = false;
			}
			// console.log('connected as id ' + connection.threadId);
		});

		// Old one for posterity. No sql injection protection
		// var queryString = "INSERT INTO email_table (email_update, email_time) VALUES (";
		// queryString += "'" + email + "', ";
		// queryString += "'" + (new Date()).toUTCString() + "');";
		
		// This one protects against injections, I do hope.
		var queryString = "INSERT INTO info_table (time, first_name, last_name, email, age, grade, grade_other, school, bus_ride, bus_origin, personal_web, linkedin_web) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";

		// Execute the query
		connection.query(queryString, [(new Date()).toUTCString(), firstname, lastname, email, age, grade, gradeother, school, busride, busorigin, personalweb, linkedinweb], function(err, result) {
			if(err) {
				console.log(err);
				success = false;
			}
		});
		
		
		connection.end(function(err) {
			if(err) {
				console.log(err);
				success = false;
				res.end("borked1");
			} else {
				if(success) {
					// Successful junk
					res.end("success");
				} else {
					// We dun messed up
					res.end("borked2");
				}
			}
		});
	} else { // Email did not pass validation
		res.end("email");		

		// return back popup YOU DUN MESSED UP


	}
 	
});


router.get('/register', function(req, res) {
 	res.render('register');

});

module.exports = router;
