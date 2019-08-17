const {
  controller,
  get
} = require("../lib/decorator")
const { 
  getAllMovies,
  getMovieDetail,
  getRelativeMovies
} = require("../service/movie")
@controller('/api/v0/movies')
export class movieController{
  @get("/")
  async getMovies(ctx, next){
    const {type, year} = ctx.query;
    var movies = await getAllMovies(type, year);
    ctx.body = {
      data: movies,
      success: true
    }
  }

  @get("/:id")
  async getMovieDetail(ctx, next){
    const id = ctx.params.id;
    const movie = await getMovieDetail(id);
    const relativeMovies = await getRelativeMovies(movie);
    ctx.body = {
      data: {
        movie: movie,
        relativeMovies: relativeMovies
      },
      success: true
    }
  }
}