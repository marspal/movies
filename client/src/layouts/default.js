import  React, {Component} from 'react';
import {
  Menu,
  Spin
} from 'antd';
import navRoutes from  '../navRoutes';
import {Link} from 'react-router-dom';

const getMenuContent = ({name,path}) => (
  <Link to={path?path : '/'}>{name}</Link>
);
export default class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      tip: 'loading...'
    }
  }
  componentDidMount(){
    window.__LOADING__ = this.toggleLoading
  }
  componentWillUnmount(){
    window.__LOADING__ = null;
  }

  matchRouteName = this.props.match? 
    navRoutes.find(e => e.name === this.props.match.params.type) ?
      navRoutes.find(e => e.name === this.props.match.params.type).name
      : '全部'
    :navRoutes[0].name

  toggleLoading = (status = false, tip='加载中...请稍后') => {
    this.setState({
      tip,
      loading: status
    })
  }
  render(){
    const {children} = this.props;
    console.log(this.props.match, this.matchRouteName,'===')
    const {loading, tip} = this.state;
    return (
      <div className="flex-column full">
        <Menu
          mode="horizontal"
          className="nav-wrapper"
          defaultSelectedKeys={[this.matchRouteName]}
        > 
          <Menu.Item
            style={{
              marginLeft: 24,
              marginRight: 30,
              fontSize: 18,
              textAlign: 'center',
              float: 'left'
            }}
          >
            <a href="/" className="hover-scale log">
              高分预告片
            </a>
          </Menu.Item>
          {
            navRoutes.map((e,i) => {
              return <Menu.Item key={i}>
                {getMenuContent({...e})}
              </Menu.Item>
            })
          }
          <Menu.Item style={{float: 'right'}}>
            <Link to={'/admin/login'}>登录</Link>
          </Menu.Item>
        </Menu>
        <Spin 
          spinning={loading}
          tip={tip}
          wrapperClassName="content-spin full"
        > 
          {children}
        </Spin>
      </div>
    );
  }
}