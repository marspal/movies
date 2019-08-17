// const Koa = require("koa");
// const app = new Koa();

// const mid1 = async (ctx, next) => {
//   ctx.type = "text/html;charset=utf-8";
// }

// const mid2 = async (ctx, next) => {
//   ctx.body = 'Hi';
// }

// const mid3 = async (ctx, next) => {
//   ctx.body = ctx.body + 'Luke';
// }
// app.use(mid1)
// app.use(mid2)
// app.use(mid3)

// app.listen(2333)

function tail(i){
  if(i > 3) return;
  console.log("使用前: " + i);
  tail(i+1);
  console.log("使用后: " + i);
}
tail(0)