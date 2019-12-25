import React from "react";
import {Input, Form, Modal, Icon, Button} from "antd";
import * as callApi from '../utils/apiCaller';
import {withRouter, Redirect} from 'react-router-dom';
import bg01 from '../image/bg01.jpg';
const { confirm } = Modal;

class ForgotPassword extends React.Component{
    state={
        checked: false,
        email: null
    }
    createCodeRequest=(e)=>{
        e.preventDefault();
        if (this.state.email === null) {
        this.setState({email: this.props.form.getFieldValue("email")});
        if (this.props.form.getFieldValue("email")) 
            return callApi.callApiForgotPassword({email: this.props.form.getFieldValue("email")}).then((res)=>{
              this.props.form.resetFields();
              console.log(res.response.data.message)
                this.showConfirm(res.response.data.message);
            }).catch(err=>{
                this.error(err.response.data.message);
            })
          }
    }
    checkCodeRequest=(e)=>{
        e.preventDefault();
        const {email, checked} = this.state;
        if (email !== null && checked === false) {
          console.log("checkcode", email, checked)
        const data ={
            email: email,
            code: this.props.form.getFieldValue("code")
        }
            return callApi.callApiCheckCode(data).then((res)=>{
              this.props.form.resetFields();
                this.setState({checked: true});
                this.showConfirm(res.response.data.message);
            }).catch(err=>{
                if (err.response) this.error(err.response.data.message);
            })
          }
    }
    changePasswordRequest =(e)=>{
        e.preventDefault();
        if (this.state.checked === true){
        var data={
         newPassword : this.props.form.getFieldValue("newpassword"),
         email: this.state.email
        }
         callApi.callApiChangeForgotPassword(data)
       .then(() => {
        this.props.form.resetFields();
          Modal.success({
            content: 'Change password successfully! Press Ok to login.',
            onOk: ()=>this.props.history.push('/login')
          });
       })
       .catch(err => {
        this.error(err.response.data.message);
       });
      }
      }
      inputCode=()=>{
        const { getFieldDecorator } = this.props.form;
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0
              },
              sm: {
                span: 16,
                offset: 8
              }
            }
          };
        return (<Form  className="login100-form">
              <p style={{ color: '#fff' }} id="err"></p>
            <Form.Item>
              {getFieldDecorator('code', {
                rules: [
                  { required: true, message: 'Please input your code!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Enter your code"
                  id="code"
                />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" onClick={this.checkCodeRequest} >
                  Check code
                </Button>
              </Form.Item>
              </Form>)
      }
      inputNewPassword=()=>{
        const { getFieldDecorator } = this.props.form;
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0
              },
              sm: {
                span: 16,
                offset: 8
              }
            }
          };
        return(
          <Form >
          <Form.Item hasFeedback>
            {getFieldDecorator('newpassword', {
              rules: [
                {
                  required: true,
                  message: 'Please input your new password!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password prefix={
              <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="Enter your new password"  id="newpassword" />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password prefix={
              <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="Confirm your new password" onBlur={this.handleConfirmBlur} id="confirm"/>)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" onClick={this.changePasswordRequest}>
                Change Password
              </Button>
            </Form.Item>
        </Form>
        )
      }
    inputEmail=()=>{
      const { getFieldDecorator } = this.props.form;
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0
              },
              sm: {
                span: 16,
                offset: 8
              }
            }
          };
        return (
            <Form  className="login100-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!'
                      },
                  { required: true, message: 'Please input your email!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Enter your email"
                  id="email"
                />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" onClick={this.createCodeRequest}>
                  Send
                </Button>
              </Form.Item>
              </Form>
        )
    }
     showConfirm(message) {
        confirm({
          title: "Email was sent",
          content: `${message}`
        });
      }
       error(message) {
        Modal.error({
          title: 'Error',
          content: `${message}`,
        });
      }
    render(){
      const {checked, email} =this.state;
        return(
            <div
            className="container-login100"
            style={{ backgroundImage: `url(${bg01})` }}
          >
            <div className="wrap-login100">
              <h1 className="login100-form-title">FORGOT PASSWORD</h1>
              {checked === false && email === null? this.inputEmail() : checked === true ? this.inputNewPassword() : this.inputCode()}
              </div>
              </div>
        )
    }
}
const ForgotPasswordForm = Form.create({})(ForgotPassword);

export { ForgotPasswordForm };
export default withRouter(ForgotPasswordForm);