import React,{ Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
import style from './loginLayout.less'
import LoginServices from '@services/login'

class LoginLayout extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getMsg()
        this.props.loginJump()       
      }
    });
  }

  componentDidMount(){
    
  }

  async getMsg(){
    const res = await LoginServices.getDevices({userinfo: true});
  }

  async handleAdd(){
    let params = {
      name: 'yx'
    }
    const res = await LoginServices.addDevices({params: params, userinfo: true});
  }


  render(){
   const { getFieldDecorator } = this.props.form;

    return <div>
      <div className={style.mainContent}>
        <div className={style.loginContent} >
          <section className={style.loginFrom}>
            <div className={style.loginFromContent}>
              <div className={style.loginTitle} onClick={this.jump}>后台管理系统</div>
              <Form onSubmit={this.handleSubmit} className={style.loginForm}>
                <Form.Item>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入你的用户名' }],
                  })(
                    <Input style={{height:'40px'}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}}  />} placeholder="账户"/>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入你的密码' }],
                  })(
                    <Input  style={{height:'40px'}} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                  )}
                </Form.Item>
                <div  className={style.forgetPwd} onClick={this.handelForgetPassword}>忘记密码</div>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className={style.loginFormButton}>
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </section>
          <Button onClick={this.handleAdd.bind(this)}>增加</Button>
          <footer className={style.footer}>
              copyright &copy; 2019 
          </footer>
        </div>
      </div>
    </div>
  }
}

export default Form.create({})(LoginLayout);
