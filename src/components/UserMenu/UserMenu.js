import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {Icon, Menu, Avatar} from 'antd';

class UserMenu extends React.Component{
    handleClick = e =>{
        console.log(e, "eeeee")
        if (e.key === "1")  return this.props.history.push('/profile')
        else if (e.key === "2") return this.props.history.push('/contracthistory')
        else return (<Link to='/notification'/>);
    }
    render(){
        const {picture, name, activeKey} = this.props;
        console.log(activeKey)
        return(
            <div>
                <div className="usermenu-user">
                <Avatar shape='square' size={100} src={picture} />
                <b style={{fontSize:"18px", color:"black"}}>{name}</b>
                </div>
            
            <Menu
          mode="inline"
          onClick={this.handleClick}
          defaultSelectedKeys={activeKey}
          defaultOpenKeys={activeKey}
          style={{ height: '100%', borderRight: 0 }}
        >
            <Menu.Item key="1"><Icon type="profile" theme="twoTone" twoToneColor="red" />&nbsp;Change Profile</Menu.Item>
            <Menu.Item key="2"><Icon type="container" theme="twoTone" /> &nbsp;Contract History</Menu.Item>
            <Menu.Item key="3"><Icon type="notification" theme="twoTone" twoToneColor="yellow" />&nbsp;Notification</Menu.Item>
         
        </Menu>
        </div>
        )
    }
}
UserMenu = withRouter(UserMenu);
export default UserMenu;