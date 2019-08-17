const puppeteer = require('puppeteer');
const url = `https://movie.douban.com/tag/#/?sort=U&range=6,10&tags=`; 
const { sleep } = require("../utils/util")

;(async ()=>{
  console.log("start visit the target page");
  const brower = await puppeteer.launch({
    args: ['--no-sandbox']
  });

  const page = await brower.newPage();
  await page.goto(url,{
    waitUntil: 'networkidle2'
  });
  await sleep(3000)
  await page.waitForSelector(".more")
  for(var i = 0; i < 1 ; ++i){
    await sleep(3000);
    await page.click(".more")
  }
  await sleep(3000)
  // 获取内容
  const result = await page.evaluate(()=>{
    var $ = window.$;
    var links = [];
    var items = $(".list-wp a");
    if(items.length > 0){
      items.each((idx, item) => {
        var it = $(item);
        var doubanId = it.find('div').data('id');
        var title = it.find('.title').text();
        var rate = Number(it.find('.rate').text());
        var poster = it.find('img').attr("src").replace("s_ratio","l_ratio");
        links.push({
          doubanId, 
          title,
          rate,
          poster
        });
      })
    }
    return links;
  });
  brower.close();
  process.send({result: result});
  process.exit(0)
})();