const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'application/json';
    ctx.response.body = 'Hello, yi';
});

// 在端口3000监听:
app.listen(8003);
console.log('app started at port 3000...');