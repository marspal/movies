// 创建Schema moogoose.model()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Mixed,ObjectId} = Schema.Types
const movieSchema = new Schema({
  doubanId: {
    type: String,
    required: true,
    unique: true
  },
  category: [{
    type: ObjectId,
    ref: 'Category'
  }],
  title: String,
  poster: String,
  rate: Number,

  summary: String,
  tags: [String],
  year: Number,
  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  
  video: String,
  cover: String,

  videoKey: String,
  posterKey: String,
  coverKey: String,

  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});


movieSchema.pre('save', function(next){
  console.log(this.isNew, '===');
  if(this.isNew){
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  }else {
    this.meta.updatedAt = Date.now()
  }
  next();
});

mongoose.model("Movie", movieSchema)