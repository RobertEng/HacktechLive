var express = require('express');
var router = express.Router();

var mysql = require('mysql');



/* GET home page. */
router.get('/', function(req, res) {
 	res.render('index', { title: 'Express' });
});

router.post('/update', function(req, res) {
	console.log("In update");
	/* This route is for getting the email from the GET UPDATES form. Get the email
	from the registerText input and validate then send to Google scripts to insert
	into google spreadsheet */

	var email = req.body.registerText;
	
	// regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	

	// if(re.test(email)) {
	// 	// res.redirect("https://script.google.com/macros/s/AKfycbwbcNO1oDKlNBeqovDL1UkDg3vC1zVSNQa4K5n3Jgrnwu92xYQ/exec?email="+email);
	// 	res.redirect("https://script.google.com/macros/s/AKfycbyMIkUEmUFQvnrmLtl8GgiET9ETqjrfemVounxiv-U/dev?email="+email);
	// 	console.log("Afterward");
	// } else { // Email did not pass validation

	// }


var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port 	   : process.env.RDS_PORT
});


	connection.connect(function(err) {
		if(err) {
			console.log(err);
			res.render('error', {error: err, message: "Something Broke"})
		}
  		//connected! (unless `err` is set)
	});

	console.log('connected as id ' + connection.threadId);

	// connection.query();


	connection.end(function(err) {

	});

	console.log("I could get here");
  	// res.redirect('/');
 	
});

module.exports = router;
