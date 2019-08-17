const Koa = require("koa");
const app = new Koa();
const { normal } = require("./tpl");
app.use(async (ctx, next) => {
  ctx.body = normal
});

app.listen(4455);