import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { Breadcrumb, Button, Modal, Form, Input, Radio, Table, Space } from 'antd';
import { connect } from 'react-redux';
import {postOneUserChatRequest} from './../../../actions/userOnline';
class ListChat1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    };
  }
  
  
  listChat = () => {
    const data = [];
    let { listChat } = this.props;
    listChat.map((item, index) => {
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
  onUpdate = (response) => {
    this.props.postOneUserChatRequest(response)
  }
  render() {
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
        <Table bordered columns={this.state.columns} dataSource={this.listChat()} />
      </>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    postOneUserChatRequest:(data)=>{
      dispatch(postOneUserChatRequest(data))
    }
  }
}
const mapStateToProps = (state) => ({
  listChat: state.listChat.chats
});
export default connect(mapStateToProps, mapDispathToProps)(ListChat1);


