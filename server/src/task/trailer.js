const cp = require('child_process');
const {resolve} = require("path");
const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

;(async () => {
  const movies = await Movie.find({
    $or: [
      {cover: {$exists: false}},
      {cover: ''},
      {video: {$exists: false}},
      {video: ''}
    ]
  });
  console.log(movies, '================')
  for(let i = 0; i < movies.length; ++i){
    const script = resolve(__dirname, "../crawler/video.js");
    const movie = movies[i];
    const child = cp.fork(script, [movie["doubanId"]]);
    let inverked = false;
    
    child.on("error", err => {
      if(inverked) return;
      inverked = true;
      console.error(err)
    })
    child.on("exit", code => {
      if(inverked) return;
      inverked = true;
      let err = code === 0 ? null : new Error("exit code" + code)
      console.log(err); 
    })
    child.on("message",async data => {
      if(data && (data.video || data.cover)){
        movie.video = data["video"];
        movie.cover = data["cover"] || ''
        await movie.save()
      }     
    });
  
    child.on("close", code => {
      console.log("colse", code)
    });
    await new Promise((resolve => {
      console.log('等4秒开始...');
      setTimeout(() => {
          console.log('等4秒结束...');
          resolve()
      }, 4000);
    }))
  }
})();