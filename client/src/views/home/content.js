import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Badge,
  Icon,
  Modal,
  Spin
} from 'antd';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import {site} from '../../config/index.js';
moment.locale('zh-cn')

const {Meta} = Card;
export default class Content extends Component{
  state = {
    visible: false
  }
  constructor(props) {
    super(props);
  }
  _showModal = (movie) => {
    this.setState({
      visible : true
    });
    const video = site + movie.videoKey;
    const thumb = site + movie.coverKey;
    if(!this.player){
      setTimeout(() => {
        this.player = new DPlayer({
          container: document.getElementsByClassName('videoModal')[0],
          screenshot: true,
          autoplay: true,
          video: {
            url: video,
            pic: thumb,
            thumbnails: thumb
          }
        })
      },500);
    } else {
      if(this.player.video.currentSrc !== video){
        this.player.switchVideo({
          url: video,
          autoplay: true,
          pic: thumb,
          thumbnails: thumb,
          type: 'auto'
        })
        this.player.play()
      }
    }
  }
  _onCancel = (e) => {
    this.setState({
      visible: false
    })
  }
  _afterClose = () => {
    if(this.player && this.player.pause){
      this.player.pause()
    }
  }
  _jumpToDetail = () => {

  }
  _renderContent = () => {
    const { movies } = this.props;
    if(!movies.length){
      return <div 
        style={{
          textAlign: 'center', 
          fontWeight: 'bolder', 
          marginTop: '100px'
        }}>
          暂无电影信息
        </div>
    }
    return <div>
      <Row gutter={8} justify="space-around">
        { movies.map((it, i) => (
          <Col
            key={i}
            span={6}
            style={{marginBottom: '10px'}}
          > <LazyLoad>
              <Card 
                bordered={true}
                hoverable
                style={{width: '100%'}}
                actions={[
                  <Badge>
                    <Icon style={{marginRight: '2px'}} type="clock-circle"/>
                    {moment(it.meta.createdAt).fromNow(true)}
                    前更新
                  </Badge>,
                  <Badge>
                    <Icon style={{marginRight: '2px'}} type='star'/>
                    {it.rate} 分
                  </Badge>
                ]}
                cover={
                  <img 
                    onClick={() => this._showModal(it)}
                    src={
                      site + 
                      it.posterKey +
                      '?imageMogr2/thumbnail/x1680/crop/1080x1680'
                    }
                  />
                }
              >
                <Meta
                  className="movie-description"
                  title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                  onClick={this._jumpToDetail}
                  description={
                    <Link to={`/detail/${it._id}`}>{it.summary}</Link>
                  }
                />
              </Card>
            </LazyLoad>
          </Col>
        ))}
      </Row>
      <Modal
        className="videoModal"
        key="videoModal"
        footer={null}
        visible={this.state.visible}
        onCancel={this._onCancel}
        afterClose={this._afterClose}
      >
        <Spin size="large" />
      </Modal>
    </div>
  }
  render(){
    return <div>
      {this._renderContent()}
    </div>
  }
}