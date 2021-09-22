import React, { Component } from 'react'
import $ from 'jquery';
import Messages from './message-list';
import Input from './input';
import { connect } from 'react-redux';

class Formchat extends Component {


  componentDidMount(){
    var elmnt = document.getElementById(`messages1${this.props.item.conversation.replace("@gmail.com", "")}`);
    elmnt.scrollTop = elmnt.scrollHeight - elmnt.clientHeight;
  }
  render() {
    console.log(this.props.item)
    return (
      <>
        <div className="tawk-flex boxChatForm" id={`${this.props.item.conversation}boxChat`} style={{right:`${this.props.index}px`}} >
          <div className="tawk-router-view  ">
            <div className="showNameTab"><span >{this.props.item.username}</span>
            </div>
            <div className="tab-view">
              <button onClick={()=>this.props.closeBoxChat(this.props.item.conversation)} ><i className="fas fa-times"></i></button>
            </div>
          </div>
          <div className="contentChat">
            <div>
              <Messages inforUser={this.props.inforUser} itemOne={this.props.item}></Messages>
              <Input socket={this.props.socket} itemOne={this.props.item} conversation={this.props.item.conversation} inforUser={this.props.inforUser} buttonSend={this.props.buttonSend} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Formchat;
