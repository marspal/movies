import React from 'react';
import {Link} from 'react-router-dom';
import { 
  Tabs,
  Badge,
  Icon,
  Tag,
} from 'antd';
import moment from 'moment';
import {request} from '../../lib';
import { site } from '../../config/index.js';
import {parseUrl} from '../../utils'
import {tagColors} from '../../config'
const TabPane = Tabs.TabPane;
moment.locale('zh-cn')

export default class Moive extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movie: '',
      relativeMovies: [],
      _id: this.props.match.params.id
    }
  }
  componentDidMount(){
    this._getMovie()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname != this.props.location.pathname) {
      this.setState({_id: nextProps.match.params.id},()=>{
        this._getMovie();
      })
    } 
  }
  _getMovie = () => {
    request({
      method: 'get',
      url: parseUrl(`/api/v0/movies/${this.state._id}`)
    }).then(({data}) => {
      const movie = data.movie
      const relativeMovies = data.relativeMovies
      const video = site + movie.videoKey;
      const thumb = site + movie.coverKey;
      this.setState({
        movie,
        relativeMovies
      }, () => {
        this.player = new DPlayer({
          container: document.getElementById('videoPlayer'),
          screenshot: true,
          autoplay: true,
          video: {
            url: video,
            pic: thumb,
            thumbnails: thumb
          }
        })
      })
    }).catch((e)=>{
      this.setState({
        movie: {},
        relativeMovies: []
      })
      this.props.history.goBack()
    });
  }
  render(){
    const { movie, relativeMovies } = this.state;
    if(!movie) return null;
    return <div className="flex-row full page-shade">
      <div className="video-wrapper">
        <div 
          id="videoPlayer"
          data-src={site + movie.coverKey}
          data-video={site+ movie.videoKey}
        >
        </div>
      </div>
      <div className="video-sidebar">
        <Link className='home-link' to={'/'}>
          <Icon type="left" />回到首页
        </Link>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='关于本片' key={1}>
            <h3 style={{fontWeight: 'bolder'}}>{movie.title}</h3>
            <dl className="about-movie">
              <dt>豆瓣评分：<Badge count={movie.rate} style={{background: '#52c41a', marginBottom: '5px'}}/> 分</dt>
              <dt>电影分类：{movie.tags && movie.tags.map((tag, index) => (
                <Tag color={tagColors[index % tagColors.length]}>{tag}</Tag>
              ))}</dt>
              <dt>更新时间: {moment(movie.meta.createdAt).fromNow()}</dt>
              <dt>影片介绍：</dt>
              <dd style={{fontSize: '12px'}}>{movie.summary}</dd>
            </dl>
          </TabPane>
          <TabPane tab='同类电影' key={2}>
            {relativeMovies.map(movie => (
              <Link key={movie._id} className="media" to={`/detail/${movie._id}`}>
                <img width="60" src={site + movie.posterKey}/>
                <div className="media-body">
                  <div className='media-title'>{movie.title}</div>
                  <div className='media-update'>
                    {
                      movie.pubdate && movie.pubdate.map((it,i) => (
                        <div key={i}>{moment(it.date).format("YYYY.MM")} {it.country}</div>
                      ))
                    }
                  </div>
                </div>
              </Link>
            ))}
          </TabPane>
        </Tabs>
      </div>
    </div>
  }
} 