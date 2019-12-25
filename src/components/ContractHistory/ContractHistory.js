import React from "react";
import MHeader from "../../containers/Header/MHeader";
import MFooter from "../Footer/MFooter";
import { Layout,  Breadcrumb } from 'antd';
import {Redirect} from "react-router-dom";
import UserMenu from '../UserMenu/UserMenu';
import ContractList from './Sections/ContractList';
const { Content, Sider } = Layout;


export default class ContractHistory extends React.Component{
    render(){
        const {getUser, email, picture, name, role} = this.props;
        if (localStorage.getItem("usertoken") !== null && email === null)  { console.log("Thy");getUser();}
        if (localStorage.getItem("usertoken")=== null) return <Redirect to='/login'/>
        return(
            <Layout>
    <MHeader/>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <UserMenu picture={picture} name={name} activeKey="2"/>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Contract History</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <ContractList role={role}/>
        </Content>
      </Layout>
    </Layout>
    <MFooter/>
  </Layout>
        )
    }
}