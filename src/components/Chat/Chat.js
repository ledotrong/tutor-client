import React from 'react';
import { Launcher } from 'react-chat-window';
import * as callApi from '../../utils/apiCaller';
class Chat extends React.Component {
  state ={
    enter: false,
    recieved: false
  }
  _onMessageWasSent(message) {
    if (this.state.enter === false){
      this.state.enter = true;
    const { addMessage, userID, name, picture, id } = this.props;
    message.author = id;
    console.log("dd",userID)
    if (userID) {
      var data = {
        userID, message, id, name, picture
      }
      addMessage(data);
      
    }
    this.setState({enter: false})
    }
  }
  /*_onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    this.setState({
      messageList: [...this.state.messageList, {
        type: 'file', author: 'me',
        data: {
          url: objectURL,
          fileName: fileList[0].name
        }
      }]
    });
  }*/
  handleClick=()=>{
    const {isChat, switchIsChat} = this.props;
    switchIsChat(!isChat);
  }
  componentDidUpdate(prevProps){
    if (prevProps.newMessages !== this.props.newMessages)
      this.setState({recieved: false})
  }
  render() {
    const { messages, name, socket, getMessages, isChat , set4Messages, setNumOfNewMessages} = this.props;
    console.log("abc", messages)
    socket.on("Client-send-message", (data) =>{
      if(this.state.recieved === false){
        this.state.recieved = true;
      console.log("Client-send-message haha", data)
       getMessages(data.message.author);
      callApi.callApiGet4Messages(0).then((data1)=>{
       set4Messages(data1.data.data);
       setNumOfNewMessages(data1.data.newMessages);
      }).catch(err=>{
        console.log(err);
      })
    }
    })
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: `${name}`,
            imageUrl:"https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
          }}
          isOpen={isChat}
         /* onFilesSelected={this._onFilesSelected.bind(this)}*/
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          handleClick={this.handleClick}
          messageList={messages}
          showEmoji
        />
      </div>
    );
  }
}

export default Chat;
