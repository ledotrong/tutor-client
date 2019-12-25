import React from "react";
import { Redirect } from 'react-router-dom';
import MHeader from "../../containers/Header/MHeader";
import MFooter from "../Footer/MFooter";
import UserAvatar from "../../containers/Profile/UserAvatar";
import MainInformation from "../../containers/Profile/MainInformation";
import ChangePassword from "../../containers/Profile/ChangePassword";
import { Layout, Breadcrumb } from "antd";
import Chat from "../../containers/Chat/Chat";
import UserMenu from '../UserMenu/UserMenu';

const { Content, Sider} = Layout;

export default class Profile extends React.Component{
    render(){
        const {getUser, email, picture, name} = this.props;
        if (localStorage.getItem("usertoken") !== null && email === null)  getUser();
        if (localStorage.getItem("usertoken")=== null) return <Redirect to='/login'/>
        return (
            <Layout className="layout">
    <MHeader/>
    <Layout>
    <Sider width={200} style={{ background: '#fff' }}>
        <UserMenu picture={picture} name={name} activeKey="1"/>
      </Sider>
      <Layout>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Account</Breadcrumb.Item>
        <Breadcrumb.Item>Edit Account</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <h1 style={{margin: "10px 35px"}}>Edit Account</h1><hr/>
         <UserAvatar/>
         <MainInformation/>
         <ChangePassword/>
      </div>
      {localStorage.getItem("usertoken") === null? null : <Chat/>}
    </Content>
    </Layout>
    </Layout>
    <MFooter/>
  </Layout>
        );
    }
}