/**
 * 爬取dobanid 对应得视频、视频封面图
 */
const puppeteer = require('puppeteer');

const base = `https://movie.douban.com/subject/`;
// console.log(process.argv[2])
const doubanId = process.argv[2];
const { sleep } = require("../utils/util")

;(async ()=>{
  console.log("start visit the subject page");
  const brower = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  });

  const page = await brower.newPage();
  await page.goto(base + doubanId,{
    waitUntil: 'networkidle2'
  });
  await sleep(1000)
  // 获取内容
  const result = await page.evaluate(()=>{
    var $ = window.$;
    var it = $(".related-pic-video");
    if(it && it.length > 0){
      var link = it.attr("href");
      var cover = it.css("background-image").replace("url(\"", "").replace(/\?.*/g, "")
      return {link, cover}
    }
    return {};
  });
  let video;
  if(result.link){
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    await sleep(2000)
    video = await page.evaluate(() => {
      var $ = window.$;
      var it = $("source")
      if(it && it.length > 0){
        return it.attr("src")
      }
      return "";
    });
  }
  const data = {
    video,
    doubanId,
    cover: result.cover
  }
  brower.close();
  process.send(data);
  process.exit(0)
})();