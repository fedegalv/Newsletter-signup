//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
  var name = req.body.userName;
  var lastname = req.body.userLastName;
  var email = req.body.userEmail;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: lastname
        }
      }
    ]
  };
  var jsonData= JSON.stringify(data);

  var options = {
     url: "https://us5.api.mailchimp.com/3.0/lists/1dc8f52110",
     method: "POST",
     headers: {
       "Authorization": "fedegv 779f7a65bd8411a156a8ebb0732acf66-us5"
     },
     body: jsonData
  };
  request(options, function(error, response, body){
    if (error) {
      console.log(error);
      // res.send("An error has ocurred");
      res.sendFile(__dirname +"/failure.html");
    }
    else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});







app.listen(process.env.PORT || 3000 , function(){
  console.log("Server is running.");
});



// API KEY
// 779f7a65bd8411a156a8ebb0732acf66-us5

// 1dc8f52110
// https://us5.admin.mailchimp.com/lists/members?id=217013
