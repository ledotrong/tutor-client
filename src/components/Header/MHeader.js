import React from "react";
import {Link} from "react-router-dom";
import { Layout, Menu, Button, Icon, Avatar, Badge, List} from "antd";
import * as callApi from '../../utils/apiCaller';
import InfiniteScroll from 'react-infinite-scroller';
const { SubMenu } = Menu;
const { Header } = Layout;
export default class MHeader extends React.Component{
  state = {
    loading: false,
    hasMore: true
  };

  handleInfiniteOnLoad = () => {
    const {messagesData, add4Messages} = this.props;
    this.setState({
      loading: true,
    });
    if (messagesData.length % 4 !== 0) {
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    else {
    callApi.callApiGet4Messages(messagesData.length / 4).then((data)=>{
      add4Messages(data);
      this.setState({loading: false});
    }).catch(err=>{
      console.log(err);
    })
  }
  };
 handleClickNewMessages=(item)=>{
   var data = {id: item.id};
   const {getMessages, set4Messages, switchIsChat, getUser} = this.props;
  callApi.callApiSeenMessages(data).then(()=>{
    callApi.callApiGet4Messages(0).then((data)=>{
      set4Messages(data.data.data);
      getMessages(item.id);
      getUser();
      switchIsChat(true);
    }).catch(err=>{
      console.log(err);
    })
  }).catch(err=>{
    console.log(err)
  })
 }
 handleClickMessages=(item)=>{
  const {switchIsChat, getMessages} = this.props;
  getMessages(item.id);
  switchIsChat(true);
 }
  chat=()=>{
    const { email, role, messagesData, newMessages}=this.props;
    if ((localStorage.getItem("usertoken") !== null && email !== null && role === "student") ||  (localStorage.getItem("usertoken") !== null && email !== null && role === "tutor") )
      return (
    <SubMenu key="11"
          style={{ float: 'right' }}
          title={
            <Badge count={newMessages}>
            <Icon type="message" theme="filled" style={{fontSize:"22px"}}/>
          </Badge>
          }>
            <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
            <List
            style={{backgroundColor:"white", height:"240px"}}
    itemLayout="horizontal"
    dataSource={messagesData}
    renderItem={item => {
      if (item.newMessage=== true && item.lastMessageAuthor !== "You") return (
      <List.Item className="messages new"  >
      <a onClick={()=>this.handleClickNewMessages(item)}>
        <List.Item.Meta
        style={{padding:"10px 25px", height:"60px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width:"400px"}}
          avatar={<Avatar src={item.picture} />}
          title={<h3>{item.name}</h3>}
          description={(<div><b>{item.lastMessageAuthor}: &nbsp;</b>{item.lastMessage}</div>)}
        />
     </a> </List.Item>)
    else return (
      <List.Item className="messages" >
        <a onClick={()=>this.handleClickMessages(item)}>
      <List.Item.Meta 
      style={{padding:"10px 25px", height:"60px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width:"400px"}}
        avatar={<Avatar src={item.picture} />}
        title={<h3>{item.name}</h3>}
        description={(<div><b>{item.lastMessageAuthor}: &nbsp;</b>{item.lastMessage}</div>)}
      /></a>
    </List.Item>
    )}} />
      </InfiniteScroll>
        </SubMenu>);
        else return null;
  }
    isLogin=()=>{
      const {logout, email, picture, role}=this.props;
      if (localStorage.getItem("usertoken") !== null && email !== null && role === "student")
        return (
          <SubMenu key="10"
          style={{ float: 'right' }}
          title={
            <span className="submenu-title-wrapper">
              <Avatar size="large" icon="user" src={picture} />
              &nbsp;
              <Icon type="down"/>
            </span>
          }
        >
          <Menu.Item key="user:1">
          <Link to="/profile">Change profile</Link>
          </Menu.Item>
          <Menu.Item key="user:2">
          <Link to="/contracthistory">Contract History</Link>
          </Menu.Item><hr/>
           <Menu.Item key="user:3">
            <a onClick={logout}>Log out</a>
          </Menu.Item>
        </SubMenu>
        );
       else if (localStorage.getItem("usertoken") !== null && email !== null && role === "tutor")
        return (
          <SubMenu key="10"
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
          </Menu.Item>
          <Menu.Item key="user:2">
          <Link to="/contracthistory">Contract History</Link>
          </Menu.Item>
          <Menu.Item key="user:3">
          <Link to="/">Revenue Statistics</Link>
          </Menu.Item><hr/>
           <Menu.Item key="user:4">
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
              {this.chat()}
      </Menu>
    </Header>
        );
    }
}