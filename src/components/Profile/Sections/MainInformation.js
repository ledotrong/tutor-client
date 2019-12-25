import React from "react";
import {Input, Form, message, Select, Button} from "antd";
import { withRouter, Redirect } from 'react-router-dom';
import * as callApi from '../../../utils/apiCaller';
import data from '../../../core/data';
const { TextArea } = Input;
const { Option } = Select;

class MainInformation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tags: [],
            isChange: false,
            loading: false,
            children: [],
            provinces: [],
            districts: [],
            province: null,
            district: null,
        }
    }
    enterLoading = () => {
        this.setState({ loading: true });
      };
    updateInfoRequest = e => {
        const {updateInfo, logout, role} = this.props;
        const {district, province} = this.state;
        e.preventDefault();
        var user;
        if (role === "tutor")
         user = {
         name: document.getElementById('name').value,
         address: {
             address: document.getElementById('address').value,
            district: district,
            province: province
         },
         skills: this.state.tags,
         wages: parseInt(document.getElementById('wages').value),
         introduction: document.getElementById('introduction').value
       };
       else user = {
        name: document.getElementById('name').value,
        address: {
            address: document.getElementById('address').value,
           district: district,
           province: province
        }};
       console.log("user",user);
         callApi.callApiUpdateInfo(user)
           .then(() => {
             message.success("Update info successfully!");
             this.setState({isChange: false, loading: false});
             updateInfo(user);
           })
           .catch(err => {
            if (err.response.data === "Invalid token") {
              logout();
           return (<Redirect to='/login'/>)
          }
          else {
             console.log(err);
             this.setState({loading: false});
             message.error("Update info failed.");
          }
           });
    }
    handleChange = e => {
      if (e.target.value === "") this.setState({isChange: false});
      else this.setState({isChange: true});
    }
    handleChangeProvince = e => {
      var temp =[];
      for (let j = 0 ; j<Object.keys(data[`${parseInt(e,10)+1}`].districts).length; j++)
      {
        temp.push(<Option key={j}>{data[`${parseInt(e,10)+1}`].districts[`${Object.keys(data[`${parseInt(e,10)+1}`].districts)[j]}`]}</Option>);
      }
      this.setState({districts: temp, isChange: true, province: data[`${parseInt(e,10)+1}`].name});
    }
    handleChangeDistrict = value =>{
      const {districts} = this.state;
      this.setState({district: districts[value].props.children});
    }
    
    componentWillMount= ()=>{
      console.log("willmount");
      const {allskills, getSkills} = this.props;
      if (allskills.length === 0) getSkills();
      var tempProvinces = [];
      for (let i =0 ; i< Object.keys(data).length; i++){
        tempProvinces.push(<Option key={i}>{data[`${i+1}`].name}</Option>);
      }
      this.setState({ provinces: tempProvinces});
    }
    componentDidMount(){
      const {name, address, introduction, skills, wages, allskills} = this.props;
      console.log("didmount",allskills)
         this.props.form.setFieldsValue({
           name: name,
           address: address.address,
           ward: address.ward,
           district: address.district,
           province: address.province,
           introduction: introduction,
           skills: skills,
           wages: wages === 0 || wages === null? "Negotiate" : wages
         });
         var temp = [];
         for (let i = 0; i < allskills.length; i++) {
          temp.push(<Option key={i}>{allskills[i]}</Option>);
        }
         this.setState({tags: skills, children: temp});
    }
    componentDidUpdate(prevProps){
      const {name, address, introduction, skills, wages, allskills} = this.props;
      if (prevProps.name !== name && prevProps.name === null){
        console.log("didupdate", allskills)
         this.props.form.setFieldsValue({
           name: name,
           address: address.address,
           ward: address.ward,
           district: address.district,
           province: address.province,
           introduction: introduction,
           skills: skills,
           wages: wages === 0 || wages === null? "Negotiate" : wages
         });
         var temp = [];
         for (let i = 0; i < allskills.length; i++) {
          temp.push(<Option key={i}>{allskills[i]}</Option>);
        }
         this.setState({tags: skills, children: temp, province: address.province, district: address.district});
        }
    }
    handleChangeSkills = (value) =>{
      const {allskills} = this.props;
      const { tags} = this.state;
      var kq = [];

      for (let i =0 ;i <value.length; i++)
      {
        if (allskills[value[i]] !== undefined)
          kq.push(allskills[value[i]]);
        else kq.push(value[i])
      }
      console.log(kq)
      if (kq.length === 0) this.setState({tags: kq , isChange: false});   
      else this.setState({tags: kq , isChange: true});
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {role} = this.props;
        const {tags, isChange, loading, children, provinces, districts} = this.state;
        console.log(tags,isChange)
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
                <h2>Main user information</h2>
            <Form {...formItemLayout}  onSubmit={this.updateInfoRequest} onChange={this.handleChange}>
                  <p id="msg" style={{ color: 'red' }} />
                  <Form.Item label="Name">
                    {getFieldDecorator('name', {
                      rules: [
                        { required: true, message: 'Please input your name!' }
                      ]
                    })(<Input id="name"/>)}
                  </Form.Item>
                  <Form.Item label="Address">
                    {getFieldDecorator('address', {
                      rules: [
                        { required: true, message: 'Please input your address!' }
                      ]
                    })(<Input id="address"/>)}
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
                      placeholder="Please select your district"
                      style={{ width: '100%' }}
                      id="district"
                      onChange={this.handleChangeDistrict}
                    >
                      {districts}
                    </Select>)}
                  </Form.Item>
                  {role === "tutor"?<div>
                  <Form.Item label="Skills">
                    {getFieldDecorator('skills', {
                      rules: [
                        { required: true, message: 'Please input your skill!' }
                      ]
                    })(<Select
                      mode="multiple"
                      size="default"
                      placeholder="Please select your skills"
                      onChange={this.handleChangeSkills}
                      defaultValue={tags}
                      style={{ width: '100%' }}
                    >
                      {children}
                    </Select>)}
                  </Form.Item>
                  <Form.Item label="Minimum wages/hour">
                    {getFieldDecorator('wages', {
                      rules: [
                        { required: true, message: 'Please input your minimum wages!' }
                      ]
                    })(<Input id="wages"/>)}
                  </Form.Item>
                  <Form.Item label="Introduction">
                    {getFieldDecorator('introduction', {
                      rules: []
                    })(<TextArea rows={4} id="introduction"/>)}
                  </Form.Item></div>: null}
                  <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={loading} onClick={this.enterLoading} disabled={!(isChange)}>
                  Save Changes
                </Button>
              </Form.Item>
                </Form>
             </div>
        );
    }
}
const MainInformationForm = Form.create({})(MainInformation);

export { MainInformationForm };
export default withRouter(MainInformationForm);