import React, { Component } from 'react'
import { Breadcrumb,Button, Modal, Form, Input, Radio, Table, Space, Select, DatePicker, Tag } from 'antd';
import { connect } from 'react-redux';
import { deleteTicketRequest } from './../../../actions/tickets';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;
function numberToMoney(money) {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
const CollectionCreateForm = ({ onChangeStartTime, visible, onCreate, onCancel, data, handleChangeFromStation, handleChangeToStation, fromStation, selectToStation, validateMessages, selectFormStation }) => {
  const [form] = Form.useForm();
  const allStation = (fromStation, selectToStation) => {
    return fromStation.map((item, index) => {
      console.log(item.tripId.fromStation._id)
      if (item.tripId.fromStation._id !== selectToStation) {
        return (<Select.Option key={index + item.tripId.fromStation._id} value={item.tripId.fromStation._id}>{item.tripId.fromStation.name}</Select.Option>)
      }
    })
  }
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
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
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          hidden
          name="id"
          label="id"
        >
          <Input />
        </Form.Item>
        <Form.Item label="fromStation" name={'fromStation'} rules={[{ required: true }]} >
          <Select onChange={handleChangeFromStation}>
            {allStation(fromStation, selectToStation)}
          </Select>
        </Form.Item>
        <Form.Item label="toStation" name={'toStation'} dependencies={['fromStation']}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('fromStation') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject('toStation is not identical with the fromStation');
              },
            }),
          ]} >
          <Select onChange={handleChangeToStation}>
            {allStation(fromStation, selectFormStation)}
          </Select>
        </Form.Item>

        <Form.Item name="startTime" label="startTime" rules={[{ required: true }]} >
          <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" />
        </Form.Item>

      </Form>
    </Modal>
  );
};

class ListTicket extends Component {
  state = {
    filterNameTicket: '',
    filterNameStation: "",
    filterNameStation2c: "",
    typesTicket1c: true,
    typesTicket2c: false,
    columns: [
      {
        title: 'Điểm đi ',
        dataIndex: 'fromStation',
        width: 100,
      },
      {
        title: 'Điểm đến',
        dataIndex: 'toStation',
        width: 100,
      },
      {
        title: 'Thời gian bắt đầu chuyến',
        dataIndex: 'startTime',
        width: 200,
        render: (item) => (
          <Space size="middle">
            <span >{`${new Date(item).toLocaleDateString("es-CL")}    ${new Date(item).toLocaleTimeString()}`}</span>
          </Space>
        ),
        sorter: (a, b) =>new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
      },
      {
        title: 'Chỗ ngồi đã đặt',
        dataIndex: 'seats',
        width: 150,
        render: text => {
          if (text && text.length > 0) {
            return (
              text.map((text) => {
                console.log(text)
                return (<Tag color={'green'} key={text}>
                  {text.code.toUpperCase()}
                </Tag>)
              })
            )
          }
        }
      },
      {
        title: 'Thời gian đặt chuyến KH ',
        dataIndex: 'dateBooked',
        width: 200,
        render: (item) => (
          <Space size="middle">
            <span >{`${new Date(item).toLocaleDateString("es-CL")}    ${new Date(item).toLocaleTimeString()}`}</span>
          </Space>
        ),
        sorter: (a, b) =>new Date(a.dateBooked).valueOf() - new Date(b.dateBooked).valueOf()
      },
      {
        title: 'Email khách hàng',
        dataIndex: 'emailKH',
        width: 100,
        // sorter: (a, b) => a.amount - b.amount,
      },

      {
        title: 'Giá tiền',
        dataIndex: 'totalPrice',
        width: 100,
        render: (text) => (
          <Space size="middle">
            <span style={{ color: 'red' }}>{text}</span>
            {/* <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a> */}
            {/* <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a> */}
          </Space>
        )
      },
    ],
    columns2c: [
      {
        title: 'Chuyến đi',
        children: [{
          title: 'Điểm đi ',
          dataIndex: 'fromStation',
          width: 100,
        },
        {
          title: 'Điểm đến',
          dataIndex: 'toStation',
          width: 100,
        },
        {
          title: 'Thời gian bắt đầu chuyến',
          dataIndex: 'startTime',
          width: 200,
          render: (item) => (
            <Space size="middle">
              <span >{`${new Date(item).toLocaleDateString("es-CL")}    ${new Date(item).toLocaleTimeString()}`}</span>
            </Space>
          ),
          sorter: (a, b) =>new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
        },
        {
          title: 'Chỗ ngồi đã đặt',
          dataIndex: 'seats',
          width: 150,
          render: text => {
            if (text && text.length > 0) {
              return (
                text.map((text) => {
                  console.log(text)
                  return (<Tag color={'green'} key={text}>
                    {text.code.toUpperCase()}
                  </Tag>)
                })
              )
            }
          }
        },
        ]
      },
      {
        title: 'Chuyến Về',
        children: [
          {
            title: 'Điểm đi ',
            dataIndex: 'fromStationDI',
            width: 100,
          },
          {
            title: 'Điểm đến',
            dataIndex: 'toStationDI',
            width: 100,
          },
          {
            title: 'Thời gian bắt đầu chuyến',
            dataIndex: 'startTimeDI',
            width: 200,
            render: (item) => (
              <Space size="middle">
                <span >{`${new Date(item).toLocaleDateString("es-CL")}    ${new Date(item).toLocaleTimeString()}`}</span>
              </Space>
            ),
            sorter: (a, b) =>new Date(a.startTimeDI).valueOf() - new Date(b.startTimeDI).valueOf()
          },

          {
            title: 'Chỗ ngồi đã đặt',
            dataIndex: 'seatsDI',
            width: 150,
            render: text => {
              if (text && text.length > 0) {
                return (
                  text.map((text) => {
                    console.log(text)
                    return (<Tag color={'green'} key={text}>
                      {text.code.toUpperCase()}
                    </Tag>)
                  })
                )
              } else if (text && text.length === 0) {
                return ''
              }
            },
          },
        ]
      },
      {
        title: 'Thời gian đặt chuyến KH ',
        dataIndex: 'dateBooked',
        width: 200,
        render: (item) => (
          <Space size="middle">
            <span >{`${new Date(item).toLocaleDateString("es-CL")}    ${new Date(item).toLocaleTimeString()}`}</span>
          </Space>
        ),
        sorter: (a, b) =>new Date(a.dateBooked).valueOf() - new Date(b.dateBooked).valueOf()
      },
      {
        title: 'Email khách hàng',
        dataIndex: 'emailKH',
        width: 100,
        // sorter: (a, b) => a.amount - b.amount,
      },

      {
        title: 'Giá tiền',
        dataIndex: 'totalPrice',
        width: 100,
        render: (text) => (
          <Space size="middle">
            <span style={{ color: 'red' }}>{text}</span>
            {/* <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a> */}
            {/* <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a> */}
          </Space>
        )
      },

      // {
      //   title: 'Hành động',
      //   key: 'action',
      //   render: (text) => (
      //     <Space size="middle">
      //       {/* <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a> */}
      //       <a onClick={() => this.onDelete(text._id, text)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a>
      //     </Space>

      //   )
      // }
    ],
    // data: [
    //   {
    //     name: ["id"],
    //     value: ""
    //   },
    //   {
    //     name: ["name"],
    //     value: ""
    //   },
    //   {
    //     name: ["address"],
    //     value: ""
    //   },
    //   {
    //     name: ["province"],
    //     value: ""
    //   }
    // ],

    validateMessages: {
      required: '${label} is required!',
      types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
      },
      number: {
        // range: '${label} must be between ${min} and ${max}',
        range: '${label} must have at least ${min} characters'
      },

    },
    selectFormStation: '',
    selectToStation: '',
  };


  onDelete = (id, text) => {
    console.log(text)
    let index = this.props.listTicket.findIndex((item, index) => {
      return item._id === text._id
    })
    // this.props.deleteTicketRequest(id, this.props.listTicket[index])
  }
  listTicket = (listTicket) => {
    const data = [];
    let filterNameTicket = this.state.filterNameTicket;
    let filterNameStation = this.state.filterNameStation
    if (filterNameStation) {
      listTicket = listTicket.filter((task) => {
        if (filterNameStation === '') {
          return task;
        }
        else if (filterNameStation === task.tripId.fromStation._id) {
          return task
        }
      });
    }
    if (filterNameTicket) {
      listTicket = listTicket.filter((task) => {
        if (filterNameTicket === '') {
          return task;
        }
        else if (filterNameTicket === task.typesTicket) {
          return task
        }
      });
    }
    listTicket.map((item, index) => {
      if (item.typesTicket === '1c') {
        console.log(item)
        data.push({
          key: index,
          _id: item._id,
          tripId: item.tripId,
          fromStation: item.tripId.fromStation.nameStation,
          toStation: item.tripId.toStation.nameStation,
          startTime: item.tripId.startTime,
          // startTime: `${new Date(item.tripId.startTime).toLocaleDateString("es-CL")}    ${new Date(item.tripId.startTime).toLocaleTimeString()}`,
          seats: item.seats,
          emailKH: item.emailKH,
          totalPrice: `${numberToMoney(item.totalPrice)}đ`,
          dateBooked: item.createdAt
          // dateBooked: `${new Date(item.createdAt).toLocaleDateString("es-CL")}    ${new Date(item.createdAt).toLocaleTimeString()}`,
        })
      }
    })
    return data;
  }
  listTicket2c = (listTicket) => {
    const data = [];
    let filterNameTicket = this.state.filterNameTicket;
    let filterNameStation2 = this.state.filterNameStation2c
    if (filterNameStation2) {
      listTicket = listTicket.filter((task) => {
        if (filterNameStation2 === '') {
          return task;
        }
        else if (filterNameStation2 === task.tripId.fromStation._id) {
          return task
        }
      });
    }
    if (filterNameTicket) {
      listTicket = listTicket.filter((task) => {
        if (filterNameTicket === '') {
          return task;
        }
        else if (filterNameTicket === task.typesTicket) {
          return task
        }
      });
    }
    listTicket.map((item, index) => {
      if (item.typesTicket === '2c') {
        data.push({
          key: index,
          _id: item._id,
          tripId: item.tripId,
          fromStation: item.tripId.fromStation.nameStation,
          toStation: item.tripId.toStation.nameStation,
          startTime: item.tripId.startTime,
          seats: item.seats,
          fromStationDI: item.tripIDTo !== null ? item.tripIDTo.fromStation.nameStation : '',
          toStationDI: item.tripIDTo !== null ? item.tripIDTo.toStation.nameStation : '',
          startTimeDI: item.tripIDTo !== null ? item.tripIDTo.startTime : '',
          seatsDI: item.seatCodesTo,
          emailKH: item.emailKH,
          dateBooked: item.createdAt,
          totalPrice: `${numberToMoney(item.totalPrice)}đ`
        })
      }
    })
    return data;
  }
  onChangeFilterStation = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      filterNameStation: value,
      //   selectCodeCar: 'Vui long chon ma xe'
    })
  }
  onChangeFilterStation2 = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      filterNameStation2c: value,
      //   selectCodeCar: 'Vui long chon ma xe'
    })
  }
  handleChangeFromStation = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectFormStation: value
    })
  }
  handleChangeToStation = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectToStation: value
    })
  }
  onChangeFilterTicket = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      filterNameTicket: value,
      //   selectCodeCar: 'Vui long chon ma xe'
    })
  }
  onClickTicket1c=()=>{
    this.setState({
        typesTicket1c:true,
        typesTicket2c:false
    })
}
onClickTicket2c=()=>{
  console.log('sad')
    this.setState({
        typesTicket2c:true,
        typesTicket1c:false
    })
}
  render() {
    return (
      <><div>
        <h4 className="titleListManager">Quản lý Vé xe</h4>
        <div className="breadcrumbList"><Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/manager'>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Vé xe
    </Breadcrumb.Item>
          </Breadcrumb></div>
        {this.state.typesTicket1c === true ?
          <div>
            <div className='SearchTicket'>
              <div className="input-groupSearch">
                <Button onClick={this.onClickTicket2c} type="primary">Vé khứ hồi</Button>
              </div>
              <div className="input-groupSearch">
              <Select
                style={{ width: 150 }}
                showSearch
                style={{ width: 200 }}
                placeholder="Chọn bến xe"
                optionFilterProp="children"
                onChange={this.onChangeFilterStation}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Tất cả</Option>
                {
                  this.props.listStation.map((item, index) => {
                    return (<Option key={index + item._id} value={item._id}>{item.nameStation}</Option>)
                  })}
              </Select>
            </div>
            </div>
            <Table bordered columns={this.state.columns} dataSource={this.listTicket(this.props.listTicket)} />
          </div>
          : ''}

        {this.state.typesTicket2c === true ?
          <div>
            <div className='SearchTicket'>
              <div className="input-groupSearch">
                <Button type="primary" onClick={this.onClickTicket1c}>Vé 1 chiều</Button>
              </div>
              <div className="input-groupSearch">
              <Select
                style={{ width: 150 }}
                showSearch
                style={{ width: 200 }}
                placeholder="Chọn bến xe"
                optionFilterProp="children"
                onChange={this.onChangeFilterStation2}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Tất cả</Option>
                {
                  this.props.listStation.map((item, index) => {
                    return (<Option key={index + item._id} value={item._id}>{item.nameStation}</Option>)
                  })}
              </Select>
            </div>
            </div>
            <Table scroll={{ x: 1500 }} bordered columns={this.state.columns2c} dataSource={this.listTicket2c(this.props.listTicket)} />
          </div>
          : ''}
      </div>
      </>

    );
  }
}


const mapStateToProps = (state) => ({
  listTicket: state.listTicket.tickets,
  listTrip: state.listTrip.trips,
  listStation: state.listStation.stations,
});


const mapDispathToProps = (dispatch) => {
  return {
    deleteTicketRequest: (id, data) => {
      dispatch(deleteTicketRequest(id, data))
    },
  }
}
export default connect(mapStateToProps, mapDispathToProps)(ListTicket);




