import React from 'react';
import {request} from '../../lib';
import Layout from '../../layouts/default';
import {site} from '../../config/index.js';
import {Table} from 'antd';
export default class AdminList extends React.Component {
  columns = [{
    title: '海报',
    dataIndex: 'posterKey',
    key: 'posterKey',
    render: (text,record) => (<img width="150" src={site + record.posterKey}/>)
  },{
    title: '名字',
    dataIndex: 'title',
    key: 'title',
    render(val, row) {
      return <a href={`/detail/${row._id}`}> {val} </a>
    }
  },{
    title: '上映时间',
    dataIndex: 'year',
    key: 'year',
  },{
    title: '评分',
    dataIndex: 'rate',
    key: 'rate'
  }]

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      dataSource: []
    }
  }

  componentDidMount(){
    this._getAllMoives()
  }
  
  _getAllMoives = () => {
    request(this._toggleLoading)({
      method: 'get',
      url: `/api/v0/user/movie/list`
    }).then(({data, success}) => {
      if(success){
        this.setState({
          dataSource: data
        })
      }
    }).catch((e)=>{
      this.setState({
        dataSource: []
      })
    });
  }
  _toggleLoading = (status = false) => {
    this.setState({
      loading: status
    })
  }
  render(){
    let { dataSource, loading } = this.state;
    if(!dataSource || !dataSource.length) return null;
    dataSource = dataSource.map((item,i)=> {
      item.key = i;
      return item;
    })
    return <Layout>
      <div className="flex-1 scroll-y align-self-start">
        <Table 
          dataSource={dataSource} 
          columns={this.columns}
          loading={loading}
        />
      </div>
    </Layout>
  }
} 