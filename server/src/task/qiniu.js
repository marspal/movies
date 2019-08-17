const qiniu =  require("qiniu");
const path =require("path");
const nanoid = require("nanoid");
const config = require("../config");
const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

const bucket = config.qiniu.bucket;
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg =  new qiniu.conf.Config();

const client = new qiniu.rs.BucketManager(mac, cfg);

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve,reject) => {
    client.fetch(url, bucket, key, (err, res, info) => {
      if(err){
        reject(err)
      } else {
        if(info.statusCode == 200){
          resolve({key})
        }
      }
    });
  });
}
;(async () => {
  let movies = await Movie.find({
    $or: [
      {videoKey: {$exists: false}},
      {coverKey: {$exists: false}},
      {posterKey: {$exists: false}},
      {videoKey: ''},
      {coverKey: ''},
      {posterKey: ''},
    ]
  },"doubanId title video cover poster videoKey coverKey posterKey");
  movies.forEach(async movie => {
    if(movie.video && !movie.videoKey){
      console.log("开始上传video");
      try{
        let extname = path.extname(movie.video);
        let videoData = await uploadToQiniu(movie.video, nanoid() + extname);
        if(videoData.key){
          movie["videoKey"] = videoData.key
        }
      }catch(err){
        console.log("video: "+err)
      }
    }
    if(movie.cover && !movie.coverKey){
      console.log("开始上传cover");
      try{
        let extname = path.extname(movie.cover);
        let coverData = await uploadToQiniu(movie.cover, nanoid() + extname);
        if(coverData.key){
          movie["coverKey"] = coverData.key
        }
      }catch(err){
        console.log("cover: "+err)
      }
    }
    if(movie.poster && !movie.posterKey){
      console.log("开始上传poster");
      try{
        let extname = path.extname(movie.poster);
        let posterData = await uploadToQiniu(movie.poster, nanoid() + extname);
        if(posterData.key){
          movie["posterKey"] = posterData.key
        }
      }catch(err){
        console.log("poster: "+err)
      }
    }
    await movie.save()
  });
})()