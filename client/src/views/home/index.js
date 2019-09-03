import React, {Component} from 'react';
import Layout from '../../layouts/default';
import {Menu} from 'antd';
import {request} from '../../lib';
import {parseUrl} from '../../utils/index';
import Content from './content';
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      years: ['all','2016','2017','2018','2019', '2020', '2021', '2022'],
      type: this.props.match.params.type,
      year: this.props.match.params.year || 'all',
      movies: []
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.match.params.type,this.state.type)
    if(nextProps.match.params.type !== this.state.type){
      this.setState({type: nextProps.match.params.type},()=>{
        this._getAllMoives();
      })
    }
  }
  componentDidMount(){
    this._getAllMoives();
  }
  _getAllMoives(){
    request(window.__LOADING__)({
      method: 'get',
      url: parseUrl('/api/v0/movies', {type: this.state.type, year: this.state.year})
    }).then(({data}) => {
      this.setState({
        movies: data
      })
    }).catch(e => {
      this.setState({
        movies: []
      })
    });
  }
  _selectItem = ({key}) => {
    this.setState({year: key},()=>{
      this._getAllMoives()
    })
  }
  _renderContent(){
    const {movies} = this.state;
    return <Content movies={movies}/>
  }
  render(){
    let {years, year} = this.state
    return <Layout {...this.props}>
      <div className="flex-row full">
        <Menu
            mode="inline"
            defaultSelectedKeys={[year]}
            onSelect={this._selectItem}
            style={{
              width: "200px",
              height: "100%"
            }}
          >
            {
              years.map((year) => (
                <Menu.Item key={year}>
                  {year == 'all'? '全部': `${year} 年上映`}
                </Menu.Item>
              ))
            }
          </Menu>
        <div className="flex-1 align-self-start scroll-y">
          {this._renderContent()}
        </div>
      </div>
    </Layout>
  }
} 