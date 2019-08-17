const {
  controller,
  get,
  post, 
  auth,
  admin,
  required
} = require("../lib/decorator")
const { 
  checkPassword
} = require("../service/user")

const { 
  getAllMovies
} = require("../service/movie")

@controller('/api/v0/user')
export class userController{
  @get("/movie/list")
  @auth
  @admin('admin')
  async getMovieList(ctx, next){
    var movies = await getAllMovies();
    ctx.body = {
      data: movies,
      success: true
    }
  }

  @post("/login")
  @required({
    body: ['email', 'password']
  })
  async login(ctx, next){
    const {email, password} = ctx.request.body;
    const matchData = await checkPassword(email, password);
    if(!matchData.user){
      return (ctx.body = {
        success: false,
        message: '用户不存在',
      });
    }
    if(matchData.match){
      ctx.session.user = {
        _id: matchData.user._id,
        email: matchData.user.email,
        role: matchData.user.role,
        username: matchData.user.username
      }
      return (ctx.body = {
        success: true
      });
    }
    return (ctx.body = {
      success: false,
      message: '密码不正确'
    });
  }
}