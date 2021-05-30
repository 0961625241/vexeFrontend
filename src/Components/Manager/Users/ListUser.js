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
import { Resizable } from 'react-resizable';
import { Button, Modal, Form, Input, Radio,Table ,Space} from 'antd';
import { connect } from 'react-redux';
import {deleteUserRequest,putUserRequest} from './../../../actions/users';
import { searchUser } from './../../../actions/index';

const CollectionCreateForm = ({ FindId,visible, onCreate, onCancel,data }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={FindId !== '' ? 'Sửa' : 'Thêm'}
      okText="Đồng ý"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            console.log(values)
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
         fields={data}
         form={form}
         layout="vertical"
         name="nest-messages"
         initialValues={{
           modifier: 'public',
         }}
      >
        <Form.Item
          hidden
          label="id"
          name="id"
        >
          <Input hidden />
        </Form.Item>
        <Form.Item  label="Email"  name={'email'}
          rules={[
            {
              required: true,
              message: 'Please input the Email of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'fullName'} label="Họ và tên"
          rules={[
            {
              required: true,
              message: 'Please input the FullName of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};


class ListUser extends Component {
  state = {
    collapsed: false,
    columns: [
      {
        title: 'Email',
        dataIndex: 'email',
        width: 200,
      },
      {
        title: 'Họ và tên',
        dataIndex: 'fullName',
        width: 150,
        // sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: 'Loại  người dùng',
        dataIndex: 'userType',
        width: 150,
      },
      {
        title: 'Hành động',
        key: 'action',
        render: (text) => (
            <Space size="middle">
             <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a>
            <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a>
          </Space>
        )
      },
    ],
    data:[
      {
        name: ["id"],
        value: ""
      },
      {
        name: ["email"],
        value: ""
      },
      {
        name: ["fullName"],
        value: ""
      },
    ],
    keyword:'',
    FindId:''
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  listTrip=()=>{
    const data =[];
    let {listUser,listSearch} = this.props;
    listUser = listUser.filter((task) => {
       return task.email.toLowerCase().indexOf(listSearch.toLowerCase()) !== -1;
   });
   listUser.map((item,index)=>{
      if(item.userType === 'client')
        data.push({
          key:index,
          _id:item._id,
          userType:item.userType,
          fullName:item.fullName,
          email:item.email,
        })
    })
    return data;
  }
  onDelete=(id)=>{
    this.props.deleteUserRequest(id)
  }
  onUpdate=(id)=>{
    console.log(id)
    var listUser=this.props.listUser
    console.log(listUser)
    var index =  listUser.findIndex(x=>x._id===id);
    var data = listUser[index];
    console.log(data)
    this.setState({
      visible:true,
      FindId:id,
      data:[
        {
          name: ["id"],
          value: data._id
        },
        {
          name: ["email"],
          value: data.email
        },
        {
          name: ["fullName"],
          value: data.fullName
        },
      ]
    })
  }
  onCreate = (values) => {
    console.log(values.id)
    console.log('Received values of form: ', values);
    
    if(values.id){
      this.props.putUserRequest(values.id,values)
    }else{
    }
    // this.props.postStationRequest(values)
    this.setState({
      visible:false,
      data:[
        {
          name: ["id"],
          value: ""
        },
        {
          name: ["email"],
          value: ""
        },
        {
          name: ["fullname"],
          value: ""
        },
      ]
    })
  };
  onChangeSearch = (event) => {
    this.setState({
        keyword : event.target.value
    });
}
  onSearch=()=>{
      this.props.searchUser(this.state.keyword)
  }
  render() {
    console.log(this.state.keyword)
    return (
      <>
       <h4 style={{marginBottom:'10px'}}>Quản lý User</h4>
       <div className='SearchTicket'>
            <div className="input-groupSearch">
            </div>
            <div className="input-groupSearch" style={{display:'flex'}}>
              <input
                name="keyword"
                value={this.state.keyword}
                type="text"
                className="form-control"
                placeholder="Nhập từ khóa..."
                onChange={this.onChangeSearch}
              />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                  <span className="fa fa-search " style={{marginRight:'5px'}}></span>Tìm kiếm
                        </button>
              </span>
            </div>
          </div>
      <CollectionCreateForm
      FindId={this.state.FindId}
        data ={this.state.data}
        visible={this.state.visible === true}
        onCreate={this.onCreate}
        onCancel={() => {
          this.setState({
            visible:false
          })
        }}
      />
                <Table bordered  columns={this.state.columns} dataSource={this.listTrip()}  />
                </>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    deleteUserRequest: (id) => {
      dispatch(deleteUserRequest(id))
  },
  putUserRequest: (id,data) => {
    dispatch(putUserRequest(id,data))
},
searchUser:(keyword)=>{
  dispatch(searchUser(keyword))
}
  }
}
const mapStateToProps = (state) => ({
  listUser: state.listUser.user,
  listSearch:state.searchUser.keyword
});
export default connect(mapStateToProps, mapDispathToProps)(ListUser);


