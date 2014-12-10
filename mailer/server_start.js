var express=require('express');
var nodemailer = require("nodemailer");
var app=express();

// put your information  by your information

var smtp = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: "Your  account",
        pass: "your account password"
    }
});

app.get('/',function(req,res){
	res.sendfile('index.html');
});

app.get('/send',function(req,res){
	var mailOptions={
		to : req.query.to,
		subject : req.query.subject,
		text : req.query.text
	}

	console.log(mailOptions);
	smtp.sendMail(mailOptions, function(error, response){
   		if(error){
        	console.log(error);
			res.end("error");
		}else{
        	console.log("Message sent: " + response.message);
			res.end("sent");
    	}
	});
});


app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});
