import React, { Component } from 'react'
import { io } from "socket.io-client";
import $ from 'jquery';
import { connect } from 'react-redux';
import { getChatRequest,postChatRequest } from '../../../actions/chats';
import FormChatAdmin from './FormChatAdmin/FormChat';
import {deleteOneUserChatRequest,postOneUserChatRequest} from './../../../actions/userOnline';
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
class ListChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userClientOnline: [],
      inforUser: {
        id: '',
        conversation: ``,
        email: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).email : '',
        name: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).fullName : '',
        sdt: '',
      },
    };
    this.socket = null;
  }
  componentDidMount() {
    // this.socket = io("http://localhost:3000", { transports: ['websocket'] });
    this.socket = io("https://vexe220921.herokuapp.com/", { transports: ['websocket'] });
    this.socket.on('newMessage', response => {
      this.props.postOneUserChatRequest(response)
      this.newMessage(response)
    })
    this.socket.on('serverSendUserTyping', data => {
          if (data.showTyping === true && data.username !== this.state.inforUser.name) {
            let slug = slugify(`show-typing${data.username}`);
            if ($(`p.${slug}`).length > 0) {
              $(`p.${slug}`).remove();
            }
            const xhtmlUserTyping = `<p class='show-typing ${slug}' >${data.username} is typing ...</p>`;
            $(xhtmlUserTyping).insertBefore($(`#bottom_wrapperx${data.conversation.replace("@gmail.com", "")}`))
          }else 
          if(data.showTyping === false && data.username !== this.state.inforUser.name) {
            $("p.show-typing").remove();
          }
    })
  }
  newMessage = (m) => {
    this.props.postChatRequest(m)
    let objMessage = $(`#messages1${m.conversation.replace("@gmail.com", "")}`);
    objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới
  }

  buttonSend = (m, conversation) => {
   
    if (m.value) {
      let inforUser = this.props.userOnline.inforUser;
      inforUser.conversation = conversation;
      let listContent = { email: inforUser.email, username: inforUser.name, content: m.value, created: Date.now() };
      console.log(listContent)
      console.log(inforUser)
      this.socket.emit("newMessage", { data: listContent, user: inforUser });
    }
  }
  closeBoxChat = (conversation) => {
    this.props.deleteOneUserChatRequest(conversation)
  }
  render() {
    console.log(this.props.userOnline.inforUser)
    let userClientOnline =this.props.userOnline.userClientOnline;
    let filterMessages = this.props.listChat
      .filter(item => {
        return userClientOnline.includes(item.conversation) === true
      })
    return (
      <>
        {filterMessages.map((item, index) => {
          return <FormChatAdmin socket={this.socket} item={item} index={index * 360} key={item._id} closeBoxChat={this.closeBoxChat} inforUser={this.props.userOnline.inforUser} buttonSend={this.buttonSend}  ></FormChatAdmin>
        })}
      </>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    getChatRequest: () => {
      dispatch(getChatRequest())
    },
    postChatRequest:(data)=>{
      dispatch(postChatRequest(data))
    },
    postOneUserChatRequest:(data)=>{
      dispatch(postOneUserChatRequest(data))
    },
    deleteOneUserChatRequest:(data)=>{
      dispatch(deleteOneUserChatRequest(data))
    }
  }
}
const mapStateToProps = (state) => ({
  listChat: state.listChat.chats,
  userOnline:state.userOnline
});
export default connect(mapStateToProps, mapDispathToProps)(ListChat);


