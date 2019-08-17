import React from 'react';
import {Link} from 'react-router-dom';
import { 
  Form,
  Icon,
  Input,
  Button,
  Checkbox
} from 'antd';
import {request} from '../../lib';
import './login.sass'
const FormItem = Form.Item;

@Form.create()
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  _toggleLoading = (status = false) => {
    this.setState({
      loading: status
    })
  }
  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if(err) return err
      request(this._toggleLoading)({
        method: 'post',
        url: '/api/v0/user/login',
        data: {
          ...values
        }
      }).then(({success}) => {
        if(success){
          this.props.history.replace('/admin/index')
        }
      });
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return <div className="login-wrapper full">
      <Form className="login-form" onSubmit={this._handleSubmit}>
        <h3 className="login-title">高分预告片后台</h3>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    </div>
  }
} 