import React from 'react';
import {
  Form,
  Layout,
  Breadcrumb,
} from 'antd';
import { withRouter } from 'react-router-dom';
import * as callApi from '../../utils/apiCaller';
import MHeader from "../../containers/Header/MHeader";
import MFooter from "../Footer/MFooter";

const { Content,Sider } = Layout;

class TutorDetail extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            address: {
                address: null,
                district: null,
                province: null
            },
            email: null,
            name: null,
            picture: null,
            wages: 0,
            introduction: null,
            skills: []
        }
    }
    skills(skills){
        var kq = "";
        for (let i = 0; i<skills.length-1; i++)
            kq += skills[i]+", ";
        kq += skills[skills.length-1];
        return kq;
    }
  componentDidMount() {
    const {_id } = this.props.match.params;
    callApi.callApiGetTutorDetail(_id).then((data)=>{
        this.setState({
            address: {address: data.data.address.address, district: data.data.address.district, province: data.data.address.province},
            email: data.data.email,
            name: data.data.name,
            picture: data.data.picture,
            wages: data.data.wages,
            introduction: data.data.introduction,
            skills: data.data.skills
        })
    }).catch(err=>{
        console.log(err);
    })
  }
  render() {
    const {address, email, name,picture,wages,introduction,skills} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 50 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 50 },
        sm: { span: 20 }
      }
    };
      return (
        <Layout className="layout">
          <MHeader/>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Tutor List</Breadcrumb.Item>
              <Breadcrumb.Item>Tutor Detail</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 50px', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                  <img className="avatar" src={picture} alt="Avatar" />
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Form
                  {...formItemLayout}
                  onSubmit={this.updateInfo}
                  style={{ float: 'left', width: '60%' }}
                >
                  <Form.Item
                    label="Name"
                    style={{ display: 'flex', fontWeight: 'bold' }}
                  >
                    <p id="username" style={{ marginLeft: '40px' }}>
                      {name}
                    </p>
                  </Form.Item>
                  <Form.Item
                    label="E-mail"
                    style={{ display: 'flex', fontWeight: 'bold' }}
                  >
                    <p id="email" style={{ marginLeft: '40px' }}>
                      {email}
                    </p>
                  </Form.Item>
                  <Form.Item
                    label="Address"
                    style={{ display: 'flex', fontWeight: 'bold' }}
                  >
                    <p id="address" style={{ marginLeft: '40px' }}>
                      {address.address}, {address.district}, {address.province}
                    </p>
                  </Form.Item>
                  <Form.Item
                    label="Minimum wages per hour"
                    style={{ display: 'flex', fontWeight: 'bold' }}
                  >
                    <p id="wages" style={{ marginLeft: '40px' }}>
                      {wages}
                    </p>
                  </Form.Item>
                  <Form.Item
                    label="Skills"
                    style={{ display: 'flex', fontWeight: 'bold' }}
                  >
                    <p id="skills" style={{ marginLeft: '40px' }}>
                      {this.skills(skills)}
                    </p>
                  </Form.Item>
                  <Form.Item
                    label="Introduction"
                    style={{ display: 'flex', fontWeight: 'bold' }}
                  >
                    <p id="introduction" style={{ marginLeft: '40px' }}>
                      {introduction}
                    </p>
                  </Form.Item>
                </Form>
              </Content>
            </Layout>
          </Content>
         <MFooter/>
        </Layout>
      );
  
  }
}
const TutorDetailForm = Form.create({})(TutorDetail);

export { TutorDetailForm };
export default withRouter(TutorDetailForm);