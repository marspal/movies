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
      years: ['2025','2024','2023','2022', '2021', '2020', '2019'],
      type: this.props.match.params.type,
      year: this.props.match.params.year,
      movies: []
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
    this.setState({selectedKey: key})
  }
  _renderContent(){
    const {movies} = this.state;
    if(!movies.length) return null;
    return <Content movies={movies}/>
  }
  render(){
    let {years, selectedKey, type} = this.state
    console.log(type)
    selectedKey = selectedKey || years[0]
    return <Layout {...this.props}>
      <div className="flex-row full">
        <Menu
            mode="inline"
            defaultSelectedKeys={[selectedKey]}
            onSelect={this._selectItem}
            style={{
              width: "200px",
              height: "100%"
            }}
          >
            {
              years.map((year) => (
                <Menu.Item key={year}>
                  {year} 年上映
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