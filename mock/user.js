var Mock = require("mockjs");
var express = require("express");
var router = express.Router();

router.use('/profile', function(req, res) {
    console.log(req.body, 'body');
    var data = {
      code: 200,
      message: "操作成功",
      data: {
        rows: [
          {
            code: "001",
            status: 1,
            createTime: "20190101"
          },
          {
            code: "002",
            status: 2,
            createTime: "20190102"
          },
          {
            code: "003",
            status: 2,
            createTime: "20190103"
          }
        ],
        total: 3
      }
    };
    return res.json(data);
})

module.exports = router;