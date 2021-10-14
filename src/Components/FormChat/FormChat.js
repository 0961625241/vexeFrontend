import React, { Component } from 'react'
import { io } from "socket.io-client";
import $ from 'jquery';
import axios from 'axios';
import Messages from './message-list';
import Input from './input';
import { connect } from 'react-redux';
import {getSelectChatRequest}  from './../../actions/selectChat';
import {postChatRequest}  from './../../actions/chats';
function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd')
}
class Formchat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userOnline: [],
      inforUser: {
        id: '',
        conversation: JSON.parse(localStorage.getItem("User")) !== null ? `${JSON.parse(localStorage.getItem("User")).email}-admin` : '',
        email: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).email : '',
        name: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).fullName : '',
        sdt: '',
      },
      isDisplayChat: false,
      displayNumberChat:0,
    }
    this.socket = null;
  }

  componentDidMount() {
    // this.socket = io("http://localhost:3000", { transports: ['websocket'] });
    this.socket = io("https://vexe220921.herokuapp.com/", { transports: ['websocket'] });
    this.socket.on('newMessage', response => {
      let inforUser = this.state.inforUser;
      let displayNumberChat=this.state.displayNumberChat;
      this.newMessage(response)
      if (response.conversation === inforUser.conversation) {
        displayNumberChat=displayNumberChat+1
        this.setState({
          isDisplayChat: true,
          displayNumberChat:displayNumberChat
        })
      }
    })
      this.socket.on('serverSendUserTyping', data => {
        let index =this.props.listChat.find(item=>item.username === data.username)
        if(index === undefined) index = '';
          if (data.showTyping && data.username !== index.username) {
            let slug = slugify(`show-typing${data.username}`);
            if ($(`p.${slug}`).length > 0) {
              $(`p.${slug}`).remove();
            }
            const xhtmlUserTyping = `<p class='show-typing ${slug}' >${data.username} is typing ...</p>`;
            $(xhtmlUserTyping).insertBefore($(`#bottom_wrapper${data.conversation.replace("@gmail.com", "")}`))
          } else if(data.showTyping === false && data.username !== index.username){
            $("p.show-typing").remove();
          }
      
     
    })
 

    if (this.state.inforUser.email !== '' && this.state.inforUser.name !== '') {
      this.props.getSelectChatRequest(false,true)
    }
  }
  isDisplayBoxChat = () => {
    this.setState({
      isDisplayChat: true
    })
  }
  closeBoxChat = () => {
    this.setState({
      isDisplayChat: false
    })
  }
  onChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    this.setState(prevState => ({
      inforUser: {
        ...prevState.inforUser,
        [name]: value
      }
    }));
  }
  onComplete = () => {
    let inforUser = this.state.inforUser;
    inforUser.id = this.socket.id;
    inforUser.conversation = `${inforUser.email}-admin`;
    this.props.getSelectChatRequest(false,true)
    this.setState({
      inforUser: inforUser,
    })
  }
  buttonSend = (m) => {
    if (m.value) {
      let inforUser = this.state.inforUser;
      let listContent = { email: inforUser.email, username: inforUser.name, content: m.value, created: Date.now() };
      this.socket.emit("newMessage", { data: listContent, user: this.state.inforUser });
    }
  }
  newMessage = (m) => {
    // let  messages = this.props.listChat;
    this.props.postChatRequest(m)
    // let index = messages.findIndex(item => item._id === m._id)
    // if (index === -1) {
    //   messages.push(m)
    // } else {
    //   messages[index].listContent = m.listContent;
    // }
    let objMessage = $(`#messages1${m.conversation.replace("@gmail.com", "")}`);
    // this.setState({ messages });
    objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới
  }

  render() {
    console.log(this.state.inforUser)
    let filterMessages = this.props.listChat
      .filter(item => {
        return item.conversation === this.state.inforUser.conversation;
      })
    return (
      <>
      {/* <div className="divBtnChatBox"> */}
        {/* <span>{this.state.displayNumberChat}</span> */}
      <button type="button" className="btn btn-primary " id="btnChatBox" onClick={this.isDisplayBoxChat}>Tư vấn trực tiếp</button>
      {/* </div> */}
       
        {this.state.isDisplayChat === true ?
          <div className="tawk-flex boxChatForm" id="boxChat" >
            <div className="tawk-router-view  ">
              <div className="showNameTab"><span >Chăm sóc khách hàng</span>
              </div>
              <div className="tab-view">
                <button onClick={this.closeBoxChat} ><i className="fas fa-times"></i></button>
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
                        <input onChange={this.onChange} name="email" value={this.state.inforUser.email} type="email" placeholder="Email" className="tawk-input" />
                        <label htmlFor="qmritsuuroag1fa5sa1k1" className={`tawk-form-label ${this.state.inforUser.email !== '' ? 'tawk-form-label1' : ''}`}><span>*</span> Email </label>
                      </div>
                      <div className="tawk-form-wrapper ">
                        <input onChange={this.onChange} name="name" value={this.state.inforUser.name} type="text" placeholder="Họ và Tên" className="tawk-input" />
                        <label htmlFor="qmritsuuroag1fa5sa1k1" className={`tawk-form-label ${this.state.inforUser.name !== '' ? 'tawk-form-label1' : ''}`}><span>*</span> Họ và Tên </label>
                      </div>
                      {/* <div className="tawk-form-wrapper ">
                 <input onChange={this.onChange} name="sdt" value={this.state.inforUser.sdt}  type="text" placeholder="Điện thoại" className="tawk-input" />
                 <label htmlFor="qmritsuuroag1fa5sa1k1" className={`tawk-form-label ${this.state.inforUser.sdt !== '' ? 'tawk-form-label1' : ''}`}><span>*</span> Điện thoại </label>
               </div> */}
                      <div className="tawk-form-footer">
                        <button onClick={this.onComplete} type="button" className="tawk-button">
                          Hoàn tất
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                : ''}

              {this.props.selectChat.inforChat2 === true ?
                <div>
                  <Messages inforUser={this.state.inforUser} messages={filterMessages}></Messages>
                  <Input inforUser={this.state.inforUser} socket={this.socket} buttonSend={this.buttonSend} />
                </div>
                : ''}

            </div>
          </div>
          : ''}
      </>
    )
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    getSelectChatRequest:(inforChat1,inforChat2)=>{
      dispatch(getSelectChatRequest(inforChat1,inforChat2))
    },
    postChatRequest:(data)=>{
      dispatch(postChatRequest(data))
    }
  }
}
const mapStateToProps = (state) => ({
  selectChat:state.selectChat,
  listChat: state.listChat.chats,
});
export default connect(mapStateToProps, mapDispathToProps)(Formchat);
