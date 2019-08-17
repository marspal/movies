const Koa = require("koa");
const {resolve} = require("path");
const {connect, initSchemas, initAdmin} = require("./database/init");
const R = require("ramda");

const MIDDLEWARES = ['common','router'];
// const MIDDLEWARES = ['router'];
const useMiddlewares = async (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () => {
  // 1. 连接数据库 初始化schema文件
  await connect();
  initSchemas();
  // 初始化管理员信息
  await initAdmin()

  // 1. 爬取movies 入库 初加工数据
  // require("./task/movie");

  // 2. 通过api 完善爬取信息
  // require("./task/api");

  // 2.1 更新视频图片封面
  // require("./task/trailer.js");
  // 2.2 视频、封面、海报转存图床
  // require("./task/qiniu.js")
  const app = new Koa();
  await useMiddlewares(app)
  app.listen(8080)
})();