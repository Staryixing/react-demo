var express = require("express");
var app = express();

var router = express.Router();

app.get("/", function(req, res) {
  res.send("hello world");
});

app.post("/api", function(req, res){
  res.send("POST request to homepage")
});

router.use("/test", require("./user"));

app.use("/api", router);

app.listen(8080);
