# Koa2

## 基础知识

> 运算符 + 的implicit type conversion规则：

- 若任何一侧是 string, 则两边转换为 string 进行连接
- 若是obj，如下转换规则：
  ``` js
    const obj = {
      [Symbol.toPrimitive](hint) {
        console.log('hint', hint)
      }
    };
    console.log('12' + obj) // "12undefined"
    console.log(12 + obj) // NaN
  ```
  按照ES标准规则，hint为default则会依次调用valueOf和toString
  所以不一定是两边转换为string进行连接
  ```js
    var obj = {
      valueOf(){
        return 12;
      },
      toString(){
        return '21';
      }
    };
    console.log('12' + obj) // "1212"
    console.log(12 + obj) // 24
  ```

- 否则均转换为 number 并进行相加
- 注意symbol 相加会 throw TypeError

> __defineGetter__ & __defineSetter__ 改用get set
## 预备知识

> nvm node 版本控制工具  [nvm](https://github.com/nvm-sh/nvm)

> 初始化npm项目 npm init

> babel配置


## es6 - es7

> [生成器函数](http://es6.ruanyifeng.com/#docs/generator) 

[co](https://github.com/tj/co) 

安装npm i co


## 模板引擎

> ejs

> pug

> koa-views 组织tpl 模板

> dplayer 播放器

## 网络爬虫

- [puppeter](https://github.com/GoogleChrome/puppeteer)
  通过puppeter获取页面首页数据，包括id, title, rate, poster(封面图)，入库
  通过库里的数据, 调用数据的api, 获取详情数据， 对数据进行深加工，入库
  通过库里的数据静态静态资源 转存在qiniu, 返回的key 入库

- [node 子进程](https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html)

  开启子进程，把所有的获取数据的脏活、累活交给子进程, 不影响用户正常使用
  ```js
    child = child_process.fork(srcipt, [str...])
    // script 爬虫脚本、str传递给子进程的参数, str通过process.argv获取 
    // node process-args.js one two=three four
    // 0: /usr/local/bin/node
    // 1: /Users/mjr/work/node/process-args.js
    // 2: one
    // 3: two=three
    // 4: four
  ```


- [request-promise-native](https://github.com/request/request-promise-native)

  This module is installed via npm:

  ```
  npm install --save request
  npm install --save request-promise-native
  ```

  ``request`` is defined as a peer-dependency and thus has to be installed separately.

  通过request 获取第api数据

## mongo

> 卸载
>   ```
> 
>   ```
1. sudo service mongod stop
2. 卸载mongo sudo yum erase (rpm -qa | grep mongodb-org)
3. sudo rm -r /var/log/mongodb (日志文件)
4. sudo rm -r /var/lib/mongo （数据库）
    ```
    
    ```

> 安装
1. [网址](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)

> 配置远程连接

1. 创建用户
    db.createUser({user:"admin",pwd:"admin",roles:[{role:"root", db:"admin"}]})

2. 修改配置文件
    首先，将bind_ip改为0.0.0.0 
    然后找到 #security
    security：
    authorization: enabled

3. mongoose.connect(db,  { useNewUrlParser: true, authSource: "admin" } ) 

4. mongodb 、[mongoose](<https://github.com/Automattic/mongoose> ) (数据库驱动): [文档](<https://mongoosejs.com/docs/plugins.html> )

    ```
    mongdb：document、collection、database
    moogose: schema、model、entity
    ```
## 相关插件

> [glob](<https://github.com/isaacs/node-glob> )  module 加载所有的Schema

> [nanoid] 生成随机的文件名

> [七牛云](https://developer.qiniu.com/kodo/sdk/3828/node-js-v6#3)

​    ``注意:``  配置自己域名的时候，我在阿里买的域名，在腾讯云上做的解析，骑牛云cname 配置得在腾讯云上解析

> koa-router中间件


> 配置decorator修饰器实践
1. 安装基础插件

npm i babel-plugin-transform-decorators-legacy babel-register --save-dev

安装：
npm install --save-dev babel-preset-stage-0 babel-preset-react babel-preset-es2015 babel-polyfill babel-core

babel-plugin-transform-decorators-legacy 
babel-register

transform-decorators-legacy：
是第三方插件，用于支持decorators

babel-register：
用于接入node api

1. 本地安装
    $ npm install --save-dev babel-cli

2. 编译插件
ES2015转码规则
npm install --save-dev babel-preset-es2015

React ES2015转码规则

$ npm install --save-dev babel-preset-react


3. babel-polyfill插件
Babel默认只转换新的JavaScript句法（syntax
），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。Babel
默认不转码的API非常多，详细清单可以查看 definitions.js
为了完整使用 ES6的 API ，支持浏览器缺失API：

4. 为了避免babel在编译中输出重复，使用babel-runtime 
npm install --save-dev babel-plugin-transform-runtime

5. 
配置浏览器环境

Babel也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果你没有或不想使用构建工具，可以通过安装5.x版本的babel-core模块获取。
$ npm install babel-core@6

```js
require("babel-core/register")(); // 注册
require("babel-polyfill")
require("./test/dec")

```

6. parcel 打包

配置样式文件：
```js
module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnext")
  ]
}
// node-sass cssnext autoprefixer
```

在server配置parcel 
```js
// index.js
const env = process.env.NODE_ENV === 'production' ? 'prod': 'env';
module.exports =require(`./${env}.js`)

// dev.js
const Bundler = require("parcel-bundler");
const views = require("koa-views");
const serve = require("koa-static");
const {resolve} = require("path")

const r = path => resolve(__dirname, path);
const bundler = new Bundler(r("../../../src/index.html"),{
  publicUrl: "/",
  watch: true
});

export const dev = async app => {
  await bundler.bundle();
  app.use(serve(r("../../../dist")));
  app.use(views(r("../../../dist")),{
    extension: 'html'
  })

  app.use(async (ctx) => {
    await ctx.render("index.html");
  });
}
// prod.js
const views = require("koa-views");
const serve = require("koa-static");
const {resolve} = require("path")

const r = path => resolve(__dirname, path);

export const prod = async app => {
  app.use(serve(r("../../../dist")));
  app.use(views(r("../../../dist")),{
    extension: 'html'
  })

  app.use(async (ctx) => {
    await ctx.render("index.html");
  });
}
```

配置script
```json
"start": "NODE_ENV=development && nodemon ./start.js",
```

配置ant design

安装antd 相关
antd@3.0.0 react@16.1.1 react-dom@16.1.1 react-router-dom@4.2.2 -S


需要巩固的地方
react-router
koa-views
koa-static

查漏补缺
Array: 
find: 
The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.

```js
var array1 = [5, 12, 8, 130, 44];
var found = array1.find(function(element) {
  return element > 10;
});
console.log(found);
```


## 知识点

> node

  获取文件后缀名: path.extname(path) 

  ```js
    // example:
    path.extname('index.html'); // .html
    path.extname('index.coffee.md'); // md
    path.extname('index.'); // .
    path.extname('index'); // ""
    path.extname('.index'); // ""
  ```
##  视频播放

[DPlayer](<https://github.com/MoePlayer/DPlayer> )


## Koa专题

> Koa核心对象

Koa vs Express

========================

HTTP 接收 解析 响应(核心能力)

中间件(增强Koa的服务能力)  执行上下文(串联 托管请求、响应、中间件),方便他们之间相互访问;

提供能力: 
Application  Context
Request      Response
Middlewares
Session      Cookie

```js 
  // 简单示例
  const Koa = require('koa');
  const app = new Koa();
  app.use(ctx => {
    ctx.body = 'Hello Koa';
  });
  app.listen(3000);
```

> Koa Application类

```js
class Application extends Emitter {
  constructor() {}
  listen(...args) {}
  use(fn) {}
  callback(){}
}
```
- listen作用: 调用node http模块http.createServer创建一个web server实例，调用server的listen方法监听一个端口； this.callback()  形如(req,res)=>{}的函数

  ```js
  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  ```

- use作用: fn添加进middleware容器

  ```js
    use(fn) {
      if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
      if (isGeneratorFunction(fn)) {
        deprecate('Support for generators will be removed in v3. ' +
                  'See the documentation for examples of how to convert old middleware ' +
                  'https://github.com/koajs/koa/blob/master/docs/migration.md');
        fn = convert(fn);
      }
      debug('use %s', fn._name || fn.name || '-');
      this.middleware.push(fn);
      return this;
    }
  ```

- callback作用: 生成类似(req, res) => {} 的函数

  ```js
    callback() {
      const fn = compose(this.middleware);
      if (!this.listenerCount('error')) this.on('error', this.onerror);
      const handleRequest = (req, res) => {
        const ctx = this.createContext(req, res);
        return this.handleRequest(ctx, fn);
      };
      return handleRequest;
    }
  ```



画图工具: mindnode

> node http模块

- createServer()

  syntax:   http.createServer([options][, requestlistener])

  ```js
  const http = require("http");
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  });
  server.listen(3000)
  ```


  - req

  - res

> events

- listenerCount

> context

```js
const delegate = require('delegates');
const proto = module.exports = {}
delegate(proto, 'response').method().access().getter(); // 代理response方法、代理request方法、存储器属性
delegate(proto, 'request').method().access().getter(); 
```



> Request

`说明:` Request 是对http 服务中的req进行封装

```js
module.exports = {
   set header(){ return this.req.headers;}
   get header(val){ this.req.headers = val; }
}
```

> Response

`说明:` Response是对http服务中的res进行封装

```js
module.exports = {
  get socket() {
    return this.res.socket;
  }
}
```

> 中间件(middlewares)

- 成为中间件的条件

- koa-compose

  ```js
  function compose(middwares){
      return function(ctx, next){
          let index = -1;
          return dispatch(0);
          function dispatch(i) {
              fn = middwares[i];
              index = i;
              if(i === middwares.length ) fn = next；
              if(!fn) return Promise.resolve（）
              return Promise.resolve(fn(ctx, function next(){
                      return dispatch(i+1)}
          }
      }
  }
  ```

- 纯函数

  ```js
  function pure(x) {
      return x + 1;
  }
  pure(1); // 
  pure(1);
  ```

- 尾递归

  ```js
  function tail(i){
      if(i > 0) return;
      console.log("使用前: " + i);
      tail(i+1);
  	console.log("使用后: " + i);
  }
  tail(0)
  ```

  

- 可组合



> module

  - [debug模块](https://github.com/visionmedia/debug)

  - [deprecate](https://github.com/dougwilson/nodejs-depd)

  - [delegates](<https://github.com/tj/node-delegates> )




##### Koa VS Express

- 区别

  ```
  const app = new Koa();
  api: ctx 更容易底层深度定制
  
  const express = express();
  api: app Request Response 三大类 
  ```

  
## ramda组件



## 遇见问题

- user pre save在保存数据后才执行

- 安装nginx: sudo apt-get install nginx

  find / -name nginx.conf: 查找nginx安装位置

- 创建[rsa](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
  cat .ssh/id_rsa.pub

- pm2 deploy deploy.yaml production setup






