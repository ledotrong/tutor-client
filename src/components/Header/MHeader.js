import React from "react";
import {Link} from "react-router-dom";
import { Layout, Menu, Button, Icon, Avatar} from "antd";
const { SubMenu } = Menu;
const { Header } = Layout;

export default class MHeader extends React.Component{
    isLogin=()=>{
      const {logout, email, picture}=this.props;
      if (localStorage.getItem("usertoken") !== null && email !== null)
        return (
          <SubMenu
          style={{ float: 'right' }}
          title={
            <span className="submenu-title-wrapper">
              <Avatar size="large" icon="user" src={picture} />
              &nbsp;
              <Icon type="down" />
            </span>
          }
        >
          <Menu.Item key="user:1">
          <Link to="/profile">Change profile</Link>
          </Menu.Item><hr/>
           <Menu.Item key="user:2">
            <a onClick={logout}>Log out</a>
          </Menu.Item>
        </SubMenu>
        );
        else return (
          <Menu.Item key="4" style={{ float: 'right' }}><Link to='/login'><Button ghost>Log in</Button></Link></Menu.Item>)
    }
    componentWillMount(){
      const {getUser, email} = this.props;
      if (localStorage.getItem("usertoken") !== null && email === null)  getUser();
    }
    render(){
        return(
            <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
         <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/tutorlist">Tutor List</Link>
              </Menu.Item>
              {this.isLogin()}
       
      </Menu>
    </Header>
        );
    }
}