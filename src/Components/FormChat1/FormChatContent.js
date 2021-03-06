import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getSelectChatRequest}  from './../../actions/selectChat';
import Messages from './message-list';
import Input from './input';
import { io } from "socket.io-client";
import $ from 'jquery';
import axios from 'axios';
class FormChatContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.socket = null;
    }
    
    
    componentDidMount(){
        console.log('vovo')
        this.socket = io("http://localhost:3000", { transports: ['websocket'] });
        // this.socket.on('newMessage', response => {
        //   // let inforUser = this.state.inforUser;
        //   this.newMessage(response)
        //   // if (response.conversation === inforUser.conversation) {
        //   //   this.setState({
        //   //     isDisplayChat: true,
        //   //   })
        //   // }
        // })  

             this.socket.on('serverSendUserTyping', data => {
        
          console.log( this.props.inforUser)
          console.log( data.showTyping ,'-', data.username)
            // if (data.showTyping === true && data.username !== this.state.inforUser.name) {
            //   let slug = slugify(`show-typing${data.username}`);
            //   if ($(`p.${slug}`).length > 0) {
            //     $(`p.${slug}`).remove();
            //   }
            //   const xhtmlUserTyping = `<p class='show-typing ${slug}' >${data.username} is typing ...</p>`;
            //   $(xhtmlUserTyping).insertBefore($(`#bottom_wrapper${data.conversation.replace("@gmail.com", "")}`))
            // } else if(data.showTyping === false && data.username !== this.state.inforUser.name){
            //   $("p.show-typing").remove();
            // }
             })
}
    // componentDidMount() {
    //     this.socket = io("http://localhost:3000", { transports: ['websocket'] });
    //     this.socket.on('newMessage', response => {
    //       let inforUser = this.state.inforUser;
    //       let displayNumberChat=this.state.displayNumberChat;
    //       this.newMessage(response)
    //       if (response.conversation === inforUser.conversation) {
    //         displayNumberChat=displayNumberChat+1
    //         this.setState({
    //           isDisplayChat: true,
    //           displayNumberChat:displayNumberChat
    //         })
    //       }
    //     })
    //     this.socket.on('serverSendUserTyping', data => {
    //       console.log(this.state.inforUser)
    //       console.log( this.state.inforUser.name)
    //       console.log( data.showTyping ,'-', data.username)
    //         if (data.showTyping === true && data.username !== this.state.inforUser.name) {
    //           let slug = slugify(`show-typing${data.username}`);
    //           if ($(`p.${slug}`).length > 0) {
    //             $(`p.${slug}`).remove();
    //           }
    //           const xhtmlUserTyping = `<p class='show-typing ${slug}' >${data.username} is typing ...</p>`;
    //           $(xhtmlUserTyping).insertBefore($(`#bottom_wrapper${data.conversation.replace("@gmail.com", "")}`))
    //         } else if(data.showTyping === false && data.username !== this.state.inforUser.name){
    //           $("p.show-typing").remove();
    //         }
         
         
    //     })
    //     axios.get(`http://localhost:3000/api/chats`)
    //       .then(res => {
    //         this.setState({ messages: res.data })
    //       })
    //       .catch(error => console.log(error));
    
    //     if (this.state.inforUser.email !== '' && this.state.inforUser.name !== '') {
         
    //       this.props.getSelectChatRequest(false,true)
    //        // this.setState({
    //       //   inforChat1: false,
    //       //   inforChat2: true,
    //       // })
    //     }
    //     console.log(this.state.inforUser)
    //   }

      newMessage = (m) => {
    let { messages } = this.props.listChat;
    let index = messages.findIndex(item => item._id === m._id)
    if (index === -1) {
      messages.push(m)
    } else {
      messages[index].listContent = m.listContent;
    }
    let objMessage = $(`#messages1${m.conversation.replace("@gmail.com", "")}`);
    this.setState({ messages });
    objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //t???o hi???u ???ng cu???n khi c?? tin nh???n m???i
  }
    render() {
      console.log(this.props.listChat)
        let filterMessages = this.props.listChat
        .filter(item => {
          return item.conversation === this.props.inforUser.conversation;
        })
        return (
            <div className="tawk-flex boxChatForm" id="boxChat" >
            <div className="tawk-router-view  ">
              <div className="showNameTab"><span >Ch??m s??c kh??ch h??ng</span>
              </div>
              <div className="tab-view">
                <button onClick={this.props.closeBoxChat} ><i className="fas fa-times"></i></button>
              </div>
            </div>
            <div className="contentChat">

              {this.props.selectChat.inforChat1 === true ?
                <div className="tawk-chat-panel-inner">
                  <div className="tawk-card">
                    <div className="tawk-text-center">
                      <div className="header-card ">
                        <p className="tawk-text"><span>Ch??ng t??i hi???n ??ang tr???c tuy???n v?? s???n s??ng h??? tr???.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-container">
                    <div className=" tawk-card-inverse ">
                      <p className="tawk-text-bold-1"><i className="tawk-icon tawk-icon-message" /> Cu???c t?? v???n c???a b???n ???? k???t th??c </p>
                      {/* <p className="tawk-margin-small-top tawk-text-regular-2">C???m ??n ???? tr?? chuy???n v???i ch??ng t??i. Vui l??ng b???t ?????u phi??n tr?? chuy???n m???i ho???c nh???p email c???a b???n v?? g???i b???n ghi c???a cu???c tr?? chuy???n n??y ?????n h???p th?? ?????n c???a b???n.</p> */}
                      <div className="tawk-form-wrapper ">
                        <input onChange={this.props.onChange} name="email" value={this.props.inforUser.email} type="email" placeholder="Email" className="tawk-input" />
                        <label htmlFor="qmritsuuroag1fa5sa1k1" className={`tawk-form-label ${this.props.inforUser.email !== '' ? 'tawk-form-label1' : ''}`}><span>*</span> Email </label>
                      </div>
                      <div className="tawk-form-wrapper ">
                        <input onChange={this.props.onChange} name="name" value={this.props.inforUser.name} type="text" placeholder="H??? v?? T??n" className="tawk-input" />
                        <label htmlFor="qmritsuuroag1fa5sa1k1" className={`tawk-form-label ${this.props.inforUser.name !== '' ? 'tawk-form-label1' : ''}`}><span>*</span> H??? v?? T??n </label>
                      </div>
                      {/* <div className="tawk-form-wrapper ">
                 <input onChange={this.onChange} name="sdt" value={this.state.inforUser.sdt}  type="text" placeholder="??i???n tho???i" className="tawk-input" />
                 <label htmlFor="qmritsuuroag1fa5sa1k1" className={`tawk-form-label ${this.state.inforUser.sdt !== '' ? 'tawk-form-label1' : ''}`}><span>*</span> ??i???n tho???i </label>
               </div> */}
                      <div className="tawk-form-footer">
                        <button onClick={this.props.onComplete} type="button" className="tawk-button">
                          Ho??n t???t
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                : ''}

              {this.props.selectChat.inforChat2 === true ?
                <div>
                  <Messages inforUser={this.props.inforUser} messages={filterMessages}></Messages>
                  <Input inforUser={this.props.inforUser} socket={this.socket} buttonSend={this.buttonSend} /> 
                </div>
                : ''}

            </div>
          </div>
        );
    }
}


const mapDispathToProps = (dispatch) => {
    return {
      getSelectChatRequest:(inforChat1,inforChat2)=>{
        dispatch(getSelectChatRequest(inforChat1,inforChat2))
      }
    }
  }
  const mapStateToProps = (state) => ({
    selectChat:state.selectChat,
    listChat: state.listChat.chats,
  });
  export default connect(mapStateToProps, mapDispathToProps)(FormChatContent);
