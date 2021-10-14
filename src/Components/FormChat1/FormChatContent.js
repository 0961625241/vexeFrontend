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
    objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới
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
              <div className="showNameTab"><span >Chăm sóc khách hàng</span>
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
                        <p className="tawk-text"><span>Chúng tôi hiện đang trực tuyến và sẵn sàng hỗ trợ.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-container">
                    <div className=" tawk-card-inverse ">
                      <p className="tawk-text-bold-1"><i className="tawk-icon tawk-icon-message" /> Cuộc tư vấn của bạn đã kết thúc </p>
                      {/* <p className="tawk-margin-small-top tawk-text-regular-2">Cảm ơn đã trò chuyện với chúng tôi. Vui lòng bắt đầu phiên trò chuyện mới hoặc nhập email của bạn và gửi bản ghi của cuộc trò chuyện này đến hộp thư đến của bạn.</p> */}
                      <div className="tawk-form-wrapper ">
                        <input onChange={this.props.onChange} name="email" value={this.props.inforUser.email} type="email" placeholder="Email" className="tawk-input" />
                        <label htmlFor="qmritsuuroag1fa5sa1k1" className={`tawk-form-label ${this.props.inforUser.email !== '' ? 'tawk-form-label1' : ''}`}><span>*</span> Email </label>
                      </div>
                      <div className="tawk-form-wrapper ">
                        <input onChange={this.props.onChange} name="name" value={this.props.inforUser.name} type="text" placeholder="Họ và Tên" className="tawk-input" />
                        <label htmlFor="qmritsuuroag1fa5sa1k1" className={`tawk-form-label ${this.props.inforUser.name !== '' ? 'tawk-form-label1' : ''}`}><span>*</span> Họ và Tên </label>
                      </div>
                      {/* <div className="tawk-form-wrapper ">
                 <input onChange={this.onChange} name="sdt" value={this.state.inforUser.sdt}  type="text" placeholder="Điện thoại" className="tawk-input" />
                 <label htmlFor="qmritsuuroag1fa5sa1k1" className={`tawk-form-label ${this.state.inforUser.sdt !== '' ? 'tawk-form-label1' : ''}`}><span>*</span> Điện thoại </label>
               </div> */}
                      <div className="tawk-form-footer">
                        <button onClick={this.props.onComplete} type="button" className="tawk-button">
                          Hoàn tất
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
