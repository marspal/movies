const mongoose = require('mongoose');
const db = "mongodb://admin:admin@212.129.146.21:27017/movies";
const {resolve} = require("path")
const glob = require("glob");
mongoose.Promise = global.Promise;


// 初始化所有的schema文件
exports.initSchemas = () => {
  // 引入文件执行里面的代码
  glob.sync(resolve(__dirname, "./schema",'**/*.js')).forEach(require)
};

// 初始化管理员账号
exports.initAdmin = async () => {
  const User = mongoose.model("User");
  let user = await User.findOne({
    username: 'andyxu'
  });
  if(!user){
    const user = new User({
      username: 'andyxu',
      email: 'andyxu@qq.com',
      password: '123abc',
      role: 'admin'
    });
    await user.save()
  }
}

// 连接数据库(连接池)
exports.connect = () => {
  var maxConnectTimes = 1;
  const options = { useNewUrlParser: true, authSource: "admin" };
  return new Promise((resolve, reject) => {
    if(process.env.NODE_ENV!=='production'){
      mongoose.set('debug',true)
    }
    mongoose.connect(db, options)
    mongoose.connection.once("open", () => {
      console.log("mongo连接成功")
      resolve();
    });
    mongoose.connection.on("error", err => {
      maxConnectTimes++;
      if(maxConnectTimes < 5) {
        mongoose.connect(db, options)
      } else{
        reject();
        throw new Error("数据库挂了,快去修复吧")
      }
    })
    mongoose.connection.on("disconnected", err => {
      maxConnectTimes++;
      if(maxConnectTimes < 5) {
        mongoose.connect(db,  { useNewUrlParser: true , authSource: "admin"} )
      } else{
        throw new Error("数据库挂了,快去修复吧！")
      }
    })
  });
}
