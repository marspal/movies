const Router = require('koa-router');
const { resolve } = require("path");
const glob = require("glob");
const _ = require("lodash");
const R = require("ramda")
const symbolPrefix = Symbol("prefix");
const routerMap = new Map();
const isArray = c => _.isArray(c) ? c : [c];

export class Route {
  constructor(app, apiPath){
    this.app = app;
    this.apiPath = apiPath;
    this.router = new Router();
  }
  init(){
    // 加载路有文件，同时初始化每一个路由控制器
    glob.sync(resolve(this.apiPath, "./**/*.js")).forEach(require)
    for(let [conf, controller] of routerMap){
      const controllers = isArray(controller);
      let prefixPath = conf.target[symbolPrefix];
      if(prefixPath) prefixPath = normalizePath(prefixPath);
      const routerPath = prefixPath + conf.path;
      if(!conf["method"]){
        conf["method"] = "GET";
      }
      this.router[conf.method.toLowerCase()](routerPath, ...controllers)
    }
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

const normalizePath = path => path.startsWith("/") ? path: `/${path}`
const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)
  // 创建集合管理有所的路径、配置等 map 对象可以作key
  routerMap.set({
    target: target,
    ...conf
  }, target[key])
}

export const controller = path => (target) => (target.prototype[symbolPrefix]=path);

export const get = path => router({
  method: 'GET',
  path: path
});

export const post = path => router({
  method: 'POST',
  path: path
});

export const put = path => router({
  method: 'PUT',
  path: path
});

export const del = path => router({
  method: 'DEL',
  path: path
});

export const use = path => router({
  method: 'USE',
  path: path
});

export const all = path => router({
  method: 'ALL',
  path: path
});

const decorate = (args, middleware) => {
  let [target, key, descriptor] = args;
  target[key] = isArray(target[key]);
  target[key].unshift(middleware)
  return descriptor;
}
const convert = middware => (...args) => decorate(args, middware);
export const auth = convert(async (ctx, next) => {
  console.log(ctx.session.user, '====')
  if(!ctx.session.user){
    return (
      ctx.body = {
        succss: false,
        code: 401,
        err: '登录信息失效'
      }
    );
  }
  await next();
});

export const admin = roleExpected => convert(async (ctx, next) => {
  const { role } = ctx.session.user;
  console.log(role , '===')
  // 匹配规则
  // const rules = { 
  //   admin: [1,2,3],
  //   superAdmin: [1,2,3,4]
  // },
  if(!role || role !== roleExpected){
    return (
      ctx.body = {
        succss: false,
        code: 403,
        err: '没有权限, 来错地方了'
      }
    );
  }
  await next();
});

export const required = rules => convert(async (ctx, next) => {
  let errors = [];
  const checkRules = R.forEachObjIndexed(
    (value,key) => {
      errors = R.filter(i => !R.has(i, ctx, ctx.request[key]))(value)
    }
  );
  checkRules(rules);
  if(errors.length) {
    ctx.body = {
      status: false,
      code: 412,
      err: `${errors.join(',')} is required`
    }
  } 
  await next();
});