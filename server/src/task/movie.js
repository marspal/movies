/* 爬取豆瓣分类页数据(doubanId, title, rate, poster)
   初始数据入库
*/
const cp = require('child_process');
const { resolve } = require("path");
const mongoose = require('mongoose');
const Movie = mongoose.model("Movie")
;(async () => {
  const script = resolve(__dirname, "../crawler/trailer-list.js");
  const child = cp.fork(script, []);

  let inverked = false;
  child.on("error", err => {
    if(inverked) return;
    inverked = true;
    console.error(err)
  })

  child.on("exit", code => {
    if(inverked) return;
    inverked = false;
    let err = code === 0 ? null : new Error("exit code" + code)
    console.log(err); 
  })
  
  child.on("message",async data => {
    let result = data.result;
    result.forEach(async item => {
      let movie = await Movie.findOne({
        doubanId: item["doubanId"]
      }, "doubanId title"); // 读取两个字段
      if(!movie){
        movie = new Movie(item)
        await movie.save()
      }
    })
  });

  child.on("close", code => {
    console.log("colse", code)
  })
})();