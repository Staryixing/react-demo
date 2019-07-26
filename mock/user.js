var Mock = require("mockjs");
var express = require("express");
var router = express.Router();

router.use('/profile', function(req, res) {
    console.log(req.body, 'body');
    var data = {
      code: 200,
      message: '操作成功',
      data: [{id: 1}, {id : 2}]
    }
    return res.json(data);
})

module.exports = router;