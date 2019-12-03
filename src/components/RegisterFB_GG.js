import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Input, Button, Modal, Tag, Tooltip, Icon, Radio } from 'antd';
import * as callApi from '../utils/apiCaller';
import bg01 from '../image/bg01.jpg';

const callback = function() {};
const expiredCallback = function() {};

class RegisterFbGg extends React.Component {
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
    const {logintype, getUser, id} = this.props;
    
    var user = {
      role: this.state.role,
      address: document.getElementById('address').value,
      skills: this.state.tags,
      fbid: null
    };
    if (logintype === 'facebook') {
        callApi.callApiGetFacebookId(id).then((data) => {
            user.fbid = data.data.facebookId;
            return callApi
            .callApiRegisterFb(user)
            .then(() => {
                getUser();
              this.success();
            })
            .catch(err => {
              console.log(err);
              document.getElementById('msg').innerHTML = err.response.data;
            });
          })
          .catch(err => {
            console.log(err);
            return err;
          });
    }
    else return callApi.callApiGetGoogleId(id).then((data) => {
        user.fbid = data.data.googleId;
        return callApi
        .callApiRegisterGg(user)
        .then(() => {
            getUser();
          this.success();
        })
        .catch(err => {
          console.log(err);
          document.getElementById('msg').innerHTML = err.response.data;
        });
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };

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
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      role: e.target.value,
    });
  };
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
  saveInputRef = input => (this.input = input);
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
    console.log(this.props);
    this.props.history.push('/');
  }

  success() {
    Modal.success({
      title: 'Success',
      content: 'Create Account Success',
      onOk: () => {
        this.changeDirect();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tags, inputVisible, inputValue } = this.state;
    const {name, email, logintype, getUser} = this.props;
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
    getUser();
    if (email === null || logintype === null) {
        return <Redirect to="/login" />;
      }
    return (
      <div
        className="container-login100"
        style={{ backgroundImage: `url(${bg01})` }}
      >
        <div className="wrap-register100">
          <h1 className="login100-form-title">REGISTER</h1>
          <div className="register100-form">
            <Form {...formItemLayout} onSubmit={this.registerRequest}>
              <p id="msg" style={{ color: 'red' }} />
              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  rules: [
                  ]
                })(<span>{name}</span>)}
              </Form.Item>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  rules: [
                  ]
                })(<span>{email}</span>)}
              </Form.Item>
              <Form.Item label="Role">
               {getFieldDecorator('role', {
                 rules: []
               })(<Radio.Group onChange={this.onChange} value={this.state.role}>
                <Radio value={"tutor"}>Tutor</Radio>
                <Radio value={"student"}>Student</Radio>
              </Radio.Group>)}
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
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Done
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
const RegisterFbGgForm = Form.create({})(RegisterFbGg);

export { RegisterFbGgForm };
export default withRouter(RegisterFbGgForm);
