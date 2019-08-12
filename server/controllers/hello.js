var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    let data = {
      name: 'yx'
    }
    // console.log(ctx.response.type, '222')
    ctx.response.body = data;
};

module.exports = {
    'GET /hello/:name': fn_hello
};