const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

export const getAllMovies = async (type, year) => {
  let query = {}
  if(type){
    query.movieTypes = {
      $in: [type]
    }
  }
  if(year && year !== 'all'){ // year 为all 查询所有 
    query.year = year;
  }

  const moives = await Movie.find(query);
  return moives;
}

export const getMovieDetail = async (id) => {
  const movie = await Movie.findOne({_id: id})
  return movie;
}

export const getRelativeMovies = async (movie) => {
  const movies = await Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })
  return movies;
}