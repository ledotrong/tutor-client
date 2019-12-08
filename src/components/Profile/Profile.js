import React from "react";
import { Redirect } from 'react-router-dom';
import MHeader from "../Header/MHeader";
import MFooter from "../Footer/MFooter";
import UserAvatar from "../../containers/Profile/UserAvatar";
import MainInformation from "../../containers/Profile/MainInformation";
import { Layout, Breadcrumb } from "antd";

const { Content} = Layout;

export default class Profile extends React.Component{
    render(){
        const {getUser, email} = this.props;
        if (localStorage.getItem("usertoken") !== null && email === null)  getUser();
        if (localStorage.getItem("usertoken")=== null) return <Redirect to='/login'/>
        return (
            <Layout className="layout">
    <MHeader/>
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
      </div>
    </Content>
    <MFooter/>
  </Layout>
        );
    }
}