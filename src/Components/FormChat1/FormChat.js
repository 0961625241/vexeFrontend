// import React, { Component } from 'react'
// import { io } from "socket.io-client";
// import $ from 'jquery';
// import axios from 'axios';
// // import Messages from './message-list';
// // import Input from './input';
// import { connect } from 'react-redux';
// import {getSelectChatRequest}  from './../../actions/selectChat';
// import FormChatContent from './FormChatContent';
// function slugify(string) {
//   return string
//     .toString()
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/\-\-+/g, "-")
//     .replace(/^-+/, "")
//     .replace(/-+$/, "")
//     .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
//     .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
//     .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
//     .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
//     .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
//     .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
//     .replace(/đ/gi, 'd')
// }
// class Formchat extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       messages: [
//       ],
//       userOnline: [],
//       inforUser: {
//         id: '',
//         conversation: JSON.parse(localStorage.getItem("User")) !== null ? `${JSON.parse(localStorage.getItem("User")).email}-admin` : '',
//         email: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).email : '',
//         name: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).fullName : '',
//         sdt: '',
//       },
//       // inforChat1: true,
//       // inforChat2: false,
//       isDisplayChat: false,
//       displayNumberChat:0,
//     }
//     this.socket = null;
//   }

//   // componentDidMount() {
//   //   this.socket = io("http://localhost:3000", { transports: ['websocket'] });
//   //   this.socket.on('newMessage', response => {
//   //     let inforUser = this.state.inforUser;
//   //     let displayNumberChat=this.state.displayNumberChat;
//   //     this.newMessage(response)
//   //     if (response.conversation === inforUser.conversation) {
//   //       displayNumberChat=displayNumberChat+1
//   //       this.setState({
//   //         isDisplayChat: true,
//   //         displayNumberChat:displayNumberChat
//   //       })
//   //     }
//   //   })
//   //   this.socket.on('serverSendUserTyping', data => {
//   //     console.log(this.state.inforUser)
//   //     console.log( this.state.inforUser.name)
//   //     console.log( data.showTyping ,'-', data.username)
//   //       if (data.showTyping === true && data.username !== this.state.inforUser.name) {
//   //         let slug = slugify(`show-typing${data.username}`);
//   //         if ($(`p.${slug}`).length > 0) {
//   //           $(`p.${slug}`).remove();
//   //         }
//   //         const xhtmlUserTyping = `<p class='show-typing ${slug}' >${data.username} is typing ...</p>`;
//   //         $(xhtmlUserTyping).insertBefore($(`#bottom_wrapper${data.conversation.replace("@gmail.com", "")}`))
//   //       } else if(data.showTyping === false && data.username !== this.state.inforUser.name){
//   //         $("p.show-typing").remove();
//   //       }
     
     
//   //   })
//   //   axios.get(`http://localhost:3000/api/chats`)
//   //     .then(res => {
//   //       this.setState({ messages: res.data })
//   //     })
//   //     .catch(error => console.log(error));

//   //   if (this.state.inforUser.email !== '' && this.state.inforUser.name !== '') {
     
//   //     this.props.getSelectChatRequest(false,true)
//   //      // this.setState({
//   //     //   inforChat1: false,
//   //     //   inforChat2: true,
//   //     // })
//   //   }
//   //   console.log(this.state.inforUser)
//   // }
//   isDisplayBoxChat = () => {
//     this.setState({
//       isDisplayChat: true
//     })
//   }
//   closeBoxChat = () => {
//     this.setState({
//       isDisplayChat: false
//     })
//   }
//   onChange = (e) => {
//     let target = e.target;
//     let value = target.type === 'checkbox' ? target.checked : target.value;
//     let name = target.name;
//     this.setState(prevState => ({
//       inforUser: {
//         ...prevState.inforUser,
//         [name]: value
//       }
//     }));
//   }
//   onComplete = () => {
//     let inforUser = this.state.inforUser;
//     // inforUser.id = this.socket.id;
//     inforUser.conversation = `${inforUser.email}-admin`;
//     this.props.getSelectChatRequest(false,true)
//     this.setState({
//       inforUser: inforUser,
//       // inforChat1: false,
//       // inforChat2: true
//     })
//   }
//   // buttonSend = (m) => {
//   //   if (m.value) {
//   //     let inforUser = this.state.inforUser;
//   //     let listContent = { email: inforUser.email, username: inforUser.name, content: m.value, created: Date.now() };
//   //     this.socket.emit("newMessage", { data: listContent, user: this.state.inforUser });
//   //   }
//   // }
//   // newMessage = (m) => {
//   //   let { messages } = this.state;
//   //   console.log(m)
//   //   let index = messages.findIndex(item => item._id === m._id)
//   //   if (index === -1) {
//   //     messages.push(m)
//   //   } else {
//   //     messages[index].listContent = m.listContent;
//   //   }
//   //   let objMessage = $(`#messages1${m.conversation.replace("@gmail.com", "")}`);
//   //   this.setState({ messages });
//   //   objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới
//   // }

//   render() {
  
//     let filterMessages = this.state.messages
//       .filter(item => {
//         return item.conversation === this.state.inforUser.conversation;
//       })
//     return (
//       <>
//       {/* <div className="divBtnChatBox"> */}
//         {/* <span>{this.state.displayNumberChat}</span> */}
//       <button type="button" className="btn btn-primary " id="btnChatBox" onClick={this.isDisplayBoxChat}>Tư vấn trực tiếp</button>
//       {/* </div> */}
       
//         {this.state.isDisplayChat === true ?
//         <FormChatContent selectChat={this.props.selectChat} onComplete={this.onComplete} onChange={this.onChange} inforUser={this.state.inforUser} closeBoxChat={this.closeBoxChat}></FormChatContent>
//           : ''}
//       </>
//     )
//   }
// }

// const mapDispathToProps = (dispatch) => {
//   return {
//     getSelectChatRequest:(inforChat1,inforChat2)=>{
//       dispatch(getSelectChatRequest(inforChat1,inforChat2))
//     }
//   }
// }
// const mapStateToProps = (state) => ({
//   selectChat:state.selectChat,
//   listChat: state.listChat.chats,
// });
// export default connect(mapStateToProps, mapDispathToProps)(Formchat);
