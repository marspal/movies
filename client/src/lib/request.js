import axios from 'axios';
import { message } from 'antd';

const defaultAxiosConf = {
  timeout:5000
};

const _request = (params={}, fn = () => {}) => {
  return axios({
    ...defaultAxiosConf,
    ...params
  }).then(res => {
    const { success, message, code} = res.data
    if(code === 401){
      window.location.href = "/admin";
      return;
    }
    if(success){
      fn(false)
      return res.data
    }
    throw message;
  }).catch(err => {
    fn(false)
    message.error(String(err || '网络错误'));
  });
};

export default (param) => {
  const type = typeof param;
  if(type === 'function'){
    param(true);
    return (obj) => _request(obj, param)
  }
  if(type === 'object' && param !== null){
    return _request(param)
  }
}