var fn_info = async (ctx, next) => {
  var id = ctx.params.id;
  let data = {
    code: 200,
    massage: "ok",
    data: {
      id: `${id}`,
      name: '小猪'
    }
  };
  ctx.response.body = data;
};

module.exports = {
  "GET /info/:id": fn_info
};
