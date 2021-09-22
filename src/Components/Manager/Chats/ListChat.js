import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { io } from "socket.io-client";
import $ from 'jquery';
import axios from 'axios';
import { Breadcrumb, Button, Modal, Form, Input, Radio, Table, Space } from 'antd';
import { connect } from 'react-redux';
import { getChatRequest } from '../../../actions/chats';
import FormChatAdmin from './FormChatAdmin/FormChat';
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
      username: '',
      userClientOnline: [],
      inforUser: {
        id: '',
        conversation: ``,
        email: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).email : '',
        name: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).fullName : '',
        sdt: '',
      },
      columns: [
        {
          title: 'Email',
          dataIndex: 'email',
          width: 200,
        },
        {
          title: 'Họ và tên',
          dataIndex: 'username',
          width: 200,
          render: (text) => (
            <Space size="middle">
              <span style={{textTransform:'capitalize'}}>{text}</span>
              </Space>
              )
        },
        {
          title: 'Hành động',
          key: 'action',
          render: (text) => (
            <Space size="middle">
              <Button  onClick={() => this.onUpdate(text)} type="primary">
              <i className="fas fa-comments-alt"></i>
              </Button>
            </Space>
          )
        },
      ],
      messages: [
        // {id: 1, userId: 0, message: 'Hello'},
      ],
    };
    this.socket = null;
  }
  componentDidMount() {
    this.socket = io("http://localhost:3000", { transports: ['websocket'] });
    this.socket.on('newMessage', response => {
      console.log(response)
      let { inforUser, userClientOnline } = this.state;
      inforUser.conversation = response.conversation
      if (userClientOnline.includes(response.conversation) === false) {
        userClientOnline.push(response.conversation)
        if (userClientOnline.length === 3) {
          userClientOnline.splice(0, 1)
        }
      }

      this.setState({ inforUser, userClientOnline })
      this.newMessage(response)
    })
    this.socket.on('serverSendUserTyping', data => {
      // console.log(data.conversation)
      // let userClientOnline=this.state.userClientOnline;
      // if(userClientOnline && userClientOnline.length > 0)
      // {
      //   console.log(userClientOnline.indexOf(data.conversation))
      //   if(userClientOnline.indexOf(data.conversation) > -1)
      //   {
       
          if (data.showTyping && data.username !== this.state.inforUser.name) {
            let slug = slugify(`show-typing${data.username}`);
            if ($(`p.${slug}`).length > 0) {
              $(`p.${slug}`).remove();
            }
            const xhtmlUserTyping = `<p class='show-typing ${slug}' >${data.username} is typing ...</p>`;
            $(xhtmlUserTyping).insertBefore($(`#bottom_wrapper${data.conversation.replace("@gmail.com", "")}`))
          }else if(data.showTyping === false && data.username !== this.state.inforUser.name) {
            $("p.show-typing").remove();
          }
      //  }
      // }
     
    })
    axios.get(`http://localhost:3000/api/chats`)
      .then(res => {
        this.setState({ messages: res.data })
      })
      .catch(error => console.log(error));
  }
  newMessage = (m) => {
    let { messages } = this.state;
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

  buttonSend = (m, conversation) => {
    if (m.value) {
      let inforUser = this.state.inforUser;
      inforUser.conversation = conversation;
      let listContent = { email: inforUser.email, username: inforUser.name, content: m.value, created: Date.now() };
      this.socket.emit("newMessage", { data: listContent, user: inforUser });
    }
  }
  listChat = () => {
    const data = [];
    let { listChat } = this.props;
    listChat.map((item, index) => {
      console.log(item)
      data.push({
        key: index,
        _id: item._id,
        email: item.email,
        username:item.username,
        conversation: item.conversation,
      })
    })
    return data;
  }
  onUpdate = (text) => {
    let { userClientOnline, inforUser } = this.state;
    if (userClientOnline.includes(text.conversation) === false) {
      userClientOnline.push(text.conversation)
      if (userClientOnline.length === 3) {
        userClientOnline.splice(0, 1)
      }
    }
    inforUser.conversation = text.conversation;
    this.setState({ inforUser, userClientOnline })
  }
  closeBoxChat = (conversation) => {
    let { userClientOnline, messages } = this.state;
    let index = userClientOnline.findIndex(x => x === conversation);
    userClientOnline.splice(index, 1)
    this.setState({ userClientOnline })
  }
  render() {
    console.log(this.state.inforUser)
    
    let userClientOnline = this.state.userClientOnline;
    console.log(userClientOnline)
    let filterMessages = this.state.messages
      .filter(item => {
        return userClientOnline.includes(item.conversation) === true
      })
      console.log(this.state.messages)
    console.log(filterMessages)
    return (
      <>
        <h4 className="titleListManager">Quản lý Chat</h4>
        <div className="breadcrumbList"><Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/manager'>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Chat
          </Breadcrumb.Item>
        </Breadcrumb></div>
        <div className='SearchTicket'>
          <div className="input-groupSearch">
          </div>
        </div>
        {filterMessages.map((item, index) => {
          return <FormChatAdmin socket={this.socket} item={item} index={index * 360} key={item._id} closeBoxChat={this.closeBoxChat} inforUser={this.state.inforUser} buttonSend={this.buttonSend}  ></FormChatAdmin>
        })}

        <Table bordered columns={this.state.columns} dataSource={this.listChat()} />
      </>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    getChatRequest: () => {
      dispatch(getChatRequest())
    },
  }
}
const mapStateToProps = (state) => ({
  listChat: state.listChat.chats
});
export default connect(mapStateToProps, mapDispathToProps)(ListChat);


