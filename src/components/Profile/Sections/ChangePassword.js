import React from "react";
import {withRouter, Redirect} from "react-router-dom";
import {Button, Form, Input, message} from 'antd';
import * as callApi from '../../../utils/apiCaller';
class ChangePassword extends React.Component{
    state={
        loading: false,
        isChange: false,
        confirm: false
    }
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
    
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('newpassword')) {
           this.state.confirm = false;
          callback('Two passwords that you enter is inconsistent!');
        } else {
          this.state.confirm = true;
          callback();
          
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
      enterLoading = ()=>{
        this.setState({ loading: true });
      }
      handleChange = () => {
        const value = this.props.form.getFieldsValue();
        if (value.currentpassword === undefined || value.newpassword === undefined || value.confirm === undefined ||
            value.currentpassword === "" || value.newpassword === "" || value.confirm === "" || this.state.confirm === false)
            this.setState({isChange: false});
        else this.setState({isChange: true});
      }
      changePasswordRequest =(e)=>{
        e.preventDefault();
          const {logout} = this.props;
        var data = {
            currentPassword : document.getElementById('currentpassword').value,
            newPassword: document.getElementById('newpassword').value
        }
         callApi.callApiChangePassword(data)
       .then(() => {
         message.success("Change password successfully!");
         this.props.form.setFieldsValue({
            currentpassword: "",
            newpassword: "",
            confirm: ""
          });
         this.setState({isChange: false, loading: false});
       })
       .catch(err => {
           if (err.response.data === "Invalid token") {
               logout();
            return (<Redirect to='/login'/>)
           }
           else{
         this.setState({loading: false});
         message.error(err.response.data.message? err.response.data.message:"Change password failed.");
           }
       });
      }
    render(){
        const {loading, isChange} = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 22 },
              sm: { span: 6 }
            },
            wrapperCol: {
              xs: { span: 22 },
              sm: { span: 16 }
            }
          };
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
            <div className="update-profile-section">
                <h2>Change password</h2>
            <Form onSubmit={this.changePasswordRequest} {...formItemLayout} onChange={this.handleChange}>
            <Form.Item label="Current Password">
              {getFieldDecorator('currentpassword', {
                rules: [
                  { required: true, message: 'Please input your current password!' }
                ]
              })(<Input.Password id="currentpassword" />)}
            </Form.Item>
            <Form.Item label="New Password" hasFeedback>
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
              })(<Input.Password id="newpassword" />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
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
              })(<Input.Password onBlur={this.handleConfirmBlur} id="confirm"/>)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={loading} onClick={this.enterLoading} disabled={!(isChange)}>
                  Change Password
                </Button>
              </Form.Item>
          </Form>
          </div>
        )
    }
}
const ChangePasswordForm = Form.create({})(ChangePassword);

export { ChangePasswordForm };
export default withRouter(ChangePasswordForm);