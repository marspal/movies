import React, { Component } from 'react';
import { Spin } from 'antd'

import Test from '../views/home'
import Test1 from '../views/movie'
import Test2 from '../views/admin/index'
import Test3 from '../views/admin/login'
export default (loadComponent, placeholder='loading...') => {
  return class AsyncComponent extends Component {
    unmout = false
    state = {
      Child: null
    }
    constructor(props) {
      super(props)
    }
    componentWillUnmount(){
      this.unmout = true
    }
    async componentDidMount(){
      const {default: Child} = await loadComponent();
      if(this.unmout) return;
      this.setState({Child})
    }
    render(){
      let {Child} = this.state;
      return Child ? <Child {...this.props}/>: '加载中...'
    }
  }
}
