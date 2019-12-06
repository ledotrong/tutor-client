import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Modal, Steps, Tag, Tooltip, Icon, Radio } from 'antd';
import * as callApi from '../utils/apiCaller';
import bg01 from '../image/bg01.jpg';
const { Step } = Steps;
const callback = function() {};
const expiredCallback = function() {};
const steps = [
    {
      title: 'Register'
    },
    {
      title: 'Verify'
    },
    {
      title: 'Update'
    },
  ];
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      tags: [],
    inputVisible: false,
    inputValue: '',
    role: null
    };
  }
  registerRequest = e => {
    e.preventDefault();
    const {setCurrent} =this.props;
    const user = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      role: this.state.role
    };
      return callApi
        .callApiRegister(user)
        .then(() => {
          setCurrent(1);
        })
        .catch(err => {
          console.log(err);
          document.getElementById('msg').innerHTML = err.response.data;
        });
  
  };
   addInfoRequest = e => {
       e.preventDefault();
       const {id} = this.props;
       const user = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        skills: this.state.tags,
        id: id
      };
        return callApi
          .callApiAddInfo(user)
          .then(() => {
            this.success();
          })
          .catch(err => {
            console.log(err.response);
            document.getElementById('msg').innerHTML = err.response.data;
          });
   }
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
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

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  changeDirect() {
    if (localStorage.getItem('usertoken') === null)
      this.props.history.push('/login');
    else this.props.history.push('/');
  }

  success() {
    Modal.success({
      title: 'Create Account Success',
      content: 'Press OK to login',
      onOk: () => {
        this.changeDirect();
      }
    });
  }
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      role: e.target.value,
    });
  };
  saveInputRef = input => (this.input = input);
  render() {
    const { getFieldDecorator } = this.props.form;
    const { current} = this.props;
    const { tags, inputVisible, inputValue } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
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

    return (
      <div
        className="container-login100"
        style={{ backgroundImage: `url(${bg01})` }}
      >
        <div className="wrap-register100">
          <h1 className="login100-form-title">REGISTER</h1>
          <div className="register100-form">
          <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
        {current === 0 && (
             <Form {...formItemLayout}>
             <p id="msg" style={{ color: 'red' }} />
             <Form.Item label="Email">
               {getFieldDecorator('email', {
                 rules: [
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!'
                      },
                   { required: true, message: 'Please input your email!' }
                 ]
               })(<Input id="email" />)}
             </Form.Item>
             <Form.Item label="Password" hasFeedback>
               {getFieldDecorator('password', {
                 rules: [
                   {
                     required: true,
                     message: 'Please input your password!'
                   },
                   {
                     validator: this.validateToNextPassword
                   }
                 ]
               })(<Input.Password id="password" />)}
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
               })(<Input.Password onBlur={this.handleConfirmBlur} />)}
             </Form.Item>
             <Form.Item label="Role">
               {getFieldDecorator('role', {
                 rules: [
                  {
                    required: true,
                    message: 'Please choose your role!'
                  }
                 ]
               })(<Radio.Group onChange={this.onChange} value={this.state.role}>
                <Radio style={{marginRight:"50px"}} value={"tutor"}>Tutor</Radio>
                <Radio value={"student"}>Student</Radio>
              </Radio.Group>)}
             </Form.Item>
           </Form>
          )}
          {current === 1 && (
            <h2>Please check your email to verify your account.</h2>)}
             {current === 2 && (
                  <Form {...formItemLayout}>
                  <p id="msg" style={{ color: 'red' }} />
                  <Form.Item label="Name">
                    {getFieldDecorator('name', {
                      rules: [
                        { required: true, message: 'Please input your name!' }
                      ]
                    })(<Input id="name" />)}
                  </Form.Item>
                  <Form.Item label="Address">
                    {getFieldDecorator('address', {
                      rules: []
                    })(<Input id="address" />)}
                  </Form.Item>
                  <Form.Item label="Skills">
                    {getFieldDecorator('skills', {
                      rules: []
                    })(<div>
                        {tags.map((tag, index) => {
                          const isLongTag = tag.length > 20;
                          const tagElem = (
                            <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                          );
                          return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                              {tagElem}
                            </Tooltip>
                          ) : (
                            tagElem
                          );
                        })}
                        {inputVisible && (
                          <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                          />
                        )}
                        {!inputVisible && (
                          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                            <Icon type="plus" /> New Tag
                          </Tag>
                        )}
                      </div>)}
                  </Form.Item>
                </Form>
            )}
        </div>
        <div className="steps-action">
        {current === 0 && (
            <Button type="primary" onClick={this.registerRequest}>
              Next
            </Button>
          )}
          {current === 1 && (
            <Button type="primary" disabled>
              Next
            </Button>
          )}
          {current === 2 && (
            <Button type="primary" onClick={this.addInfoRequest}>
              Done
            </Button>
          )}
        </div>
          </div>
        </div>
      </div>
    );
  }
}
const RegisterForm = Form.create({})(Register);

export { RegisterForm };
export default withRouter(RegisterForm);
