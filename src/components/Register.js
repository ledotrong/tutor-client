import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Modal, Steps, Select, Radio } from 'antd';
import * as callApi from '../utils/apiCaller';
import bg01 from '../image/bg01.jpg';
import data from '../core/data';
const { Step } = Steps;
const { Option } = Select;
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
    role: null,
    districts: [],
    provinces: [],
    children: [],
    province: null,
    district: null
    };
  }
  registerRequest = e => {
    e.preventDefault();
    console.log("helooooooo")
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
       const {id, role} = this.props;
       const {district, province, tags} = this.state;
       const user = {
        name: document.getElementById('name').value,
        address: {
          address: document.getElementById('address').value,
         district: district,
         province: province
      },
        skills: tags,
        id: id,
        role: role
      };console.log(user);
      if (user.name && user.address.address && user.address.district && user.address.province){
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
        else document.getElementById('msg').innerHTML = "Please fill in all fields";
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
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      role: e.target.value,
    });
  };
  handleChange = (value) =>{
    const {skills} = this.props;
      var kq = [];
      for (let i =0 ;i <value.length; i++)
      {
        kq.push(skills[value[i]]);
      } 
       this.setState({tags: kq});
  }
  handleChangeDistrict = value =>{
    const {districts} = this.state;
    this.setState({district: districts[value].props.children});
  }
  handleChangeProvince = e => {
    var temp =[];
    for (let j = 0 ; j<Object.keys(data[`${parseInt(e,10)+1}`].districts).length; j++)
    {
      temp.push(<Option key={j}>{data[`${parseInt(e,10)+1}`].districts[`${Object.keys(data[`${parseInt(e,10)+1}`].districts)[j]}`]}</Option>);
    }
    this.setState({districts: temp, province: data[`${parseInt(e,10)+1}`].name});
  }
  handleChangeDistrict = value =>{
    this.setState({district: value});
  }
  componentWillMount= ()=>{
    const {skills, getSkills} = this.props;
     getSkills();
    console.log("willmount", skills);
    var tempProvinces = [];
    for (let i =0 ; i< Object.keys(data).length; i++){
      tempProvinces.push(<Option key={i}>{data[`${i+1}`].name}</Option>);
    }
    this.setState({ provinces: tempProvinces});
  }
  componentDidUpdate(prevProps){
    const {skills} = this.props;
    if (prevProps.skills !== skills) {
    var temp = [];
    for (let i = 0; i < skills.length; i++) {
      temp.push(<Option key={i}>{skills[i]}</Option>);
    }
    this.setState({children: temp});
  }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { current, role} = this.props;
    const {districts, provinces, children} = this.state;
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
                      rules: [
                        { required: true, message: 'Please input your address!' }
                      ]
                    })(<Input id="address" />)}
                  </Form.Item>
                  <Form.Item label="Province">
                    {getFieldDecorator('province', {
                      rules: [
                        { required: true, message: 'Please input your province!' }
                      ]
                    })(<Select
                      placeholder="Please select your province"
                      onChange={this.handleChangeProvince}
                      style={{ width: '100%' }}
                      id="province"
                    >
                      {provinces}
                    </Select>)}
                  </Form.Item>
                  <Form.Item label="District">
                    {getFieldDecorator('district', {
                      rules: [{ required: true, message: 'Please input your district!' }]
                    })(<Select
                    onChange={this.handleChangeDistrict}
                      placeholder="Please select your district"
                      style={{ width: '100%' }}
                      id="district"
                    >
                      {districts}
                    </Select>)}
                  </Form.Item>
                  {role === "tutor"?
                   <Form.Item label="Skills">
                   {getFieldDecorator('skills', {
                     rules: []
                   })(<Select
                     mode="multiple"
                     size="default"
                     placeholder="Please select your skills"
                     onChange={this.handleChange}
                     style={{ width: '100%' }}
                   >
                     {children}
                   </Select>)}
                 </Form.Item> :
                 null}
                 
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
