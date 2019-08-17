// http://api.douban.com/v2/movie/subject/27098632
const rp = require("request-promise-native");
const mongoose = require('mongoose');
const Movie = mongoose.model("Movie")
const Category = mongoose.model("Category")

async function fetchMovie(item) { // 从接口拿回数据
  const url = `https://douban.uieee.com/v2/movie/subject/${item.doubanId}`
  let body = null;
  try {
    const res = await rp(url)
    body = JSON.parse(res)
  } catch(err){
    // console.log(err)
  }
  return body;
}

(async ()=>{
  // 获取mongodb 中所有(只有doubanid, title, poster, rate)movie数据，
  const movies = await Movie.find({
    $or: [
      {summary: {$exists: false}},
      {summary: null},
      {title: ''},
      {summary: ''}
    ]
  });
  for(let i = 0; i < movies.length; ++i){
    let movie = movies[i];
    // 获取movie的详细数据
    let movieData = await fetchMovie(movie)
    if(movieData){
      try {
        movie.summary = movieData.summary || "";
        movie.tags = movieData.tags || [];
        movie.year = movieData.year  || '';
        movie.rawTitle = movieData.original_title || '';
        movie.movieTypes = movieData.genres || [];
        
        // 处理movieTypes
        for(let i = 0; i < movie.movieTypes.length; ++i){
          let item = movie.movieTypes[i];
          let category = await Category.findOne({
            name: item
          })
          if(!category){
            category = new Category({
              name: item,
              movies: [movie._id]
            })
          } else {
            if(category.movies.indexOf(movie._id) === -1){
              category.movies.push(movie._id)
            }
          }
          category.save()
          if(!movie.category){
            movie.category.push(category._id)
          }else {
            if(movie.category.indexOf(category._id) === -1){
              movie.category.push(category._id)
            }
          }
        }
        // 处理pubdates
        let dates = movieData.pubdates || [];
        let pubdates = dates.map(item => {
          if(item && item.split("(").length > 0){
            let parts = item.split("(");
            let date = parts[0];
            let country = "未知";
            if(parts[1]){
              country = parts[1].replace(")","")
            }
            return {
              date: new Date(date),
              country: country
            }
          }
        }) || [];
        movie.pubdate = pubdates;
        await movie.save();
      }catch(err) {
        console.log(err, '详细数据解析错误')
      }
    }
  }
})();