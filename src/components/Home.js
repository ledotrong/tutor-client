import React from "react";
import {
    Layout,Breadcrumb
  } from 'antd';
 
import MHeader from "../containers/Header/MHeader";
import MFooter from "./Footer/MFooter";
const { Content} = Layout;
export default class Home extends React.Component{
    renderSkills = () =>{
        const {skills} = this.props;
        var kq = [];
        for (let i=0;i<skills.length; i+=1)
        {
            kq.push(<li>{skills[i]}</li>);
        }
        return kq;
    }
    render (){
        const {role, email, address, name, getUser, socket} = this.props;
        if (localStorage.getItem("usertoken") !== null && email === null)  getUser(); 
       if (email === null) return (
                 <Layout className="layout">
    <MHeader/>
    <Breadcrumb style={{ margin: '20px 0' }}>
      </Breadcrumb>
    <Content style={{ padding: '0 50px' }}>
    <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
               </div>
          </Content>
       <MFooter/>
        </Layout>
        );
        else return (
            <Layout className="layout">
    <MHeader/>
    <Breadcrumb style={{ margin: '20px 0' }}>
      </Breadcrumb>
    <Content style={{ padding: '0 50px' }}>
    <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Role: {role}</p>
                <p>Address: {address.address}</p>
                <p>Skills: <ul>{this.renderSkills()}</ul></p>
                </div>
          </Content>
       <MFooter/>
        </Layout>
        )
    }
}