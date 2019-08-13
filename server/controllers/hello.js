var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    let data = {
      code: 200,
      massage: 'ok',
      data:{
        rows: [
          {
            code: '12',
            status: '1',
            createTime: '2019-01-2'
          }
        ],
        total: 11
      }
    }
    // console.log(ctx.response.type, '222')
    ctx.response.body = data;
};

module.exports = {
    'GET /hello/:name': fn_hello
};