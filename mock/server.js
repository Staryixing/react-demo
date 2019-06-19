let express = require("express");
let app = express();

app.get('/login', function(req, res){
  res.send('hello world')
});

app.listen(3002)