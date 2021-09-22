import React, { Component } from 'react'
import { Breadcrumb,Button, Modal, Form, Input, Radio, Table, Space, Select, DatePicker, Tag } from 'antd';
import { connect } from 'react-redux';
import { deleteTicketRequest } from './../../../actions/tickets';
import { searchTicket } from './../../../actions/index';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;
function numberToMoney(money) {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


class ListTicket extends Component {
  state = {
    keyword: '',
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
                return (<Tag color={'green'} key={text._id}>
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
                  return (<Tag color={'green'} key={text._id}>
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
                    return (<Tag color={'green'} key={text._id}>
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
    ],
    validateMessages: {
      required: '${label} is required!',
      types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
      },
      number: {
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
    let filterNameStation = this.state.filterNameStation;
    let listSearch =this.props.listSearch;
   
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
    listTicket = listTicket.filter((task) => {
      return task.emailKH.toLowerCase().indexOf(listSearch.toLowerCase()) !== -1;
    });
    listTicket.map((item, index) => {
      if (item.typesTicket === '1c') {
        data.push({
          key: item._id,
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
    let filterNameStation2 = this.state.filterNameStation2c;
    let listSearch=this.props.listSearch
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
    listTicket = listTicket.filter((task) => {
      return task.emailKH.toLowerCase().indexOf(listSearch.toLowerCase()) !== -1;
    });
    listTicket.map((item, index) => {
      if (item.typesTicket === '2c') {
        data.push({
          key: item._id,
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
onChangeSearch = (event) => {
  this.setState({
    keyword: event.target.value
  });
}
onSearch = () => {
  this.props.searchTicket(this.state.keyword)
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
            <div className="input-groupSearch" style={{ display: 'flex' }}>
              <input
                name="keyword"
                value={this.state.keyword}
                type="text"
                className="form-control"
                placeholder="Nhập email..."
                onChange={this.onChangeSearch}
              />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                  <span className="fa fa-search " style={{ marginRight: '5px' }}></span>Tìm kiếm
                        </button>
              </span>
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
            <div className="input-groupSearch" style={{ display: 'flex' }}>
              <input
                name="keyword"
                value={this.state.keyword}
                type="text"
                className="form-control"
                placeholder="Nhập email..."
                onChange={this.onChangeSearch}
              />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                  <span className="fa fa-search " style={{ marginRight: '5px' }}></span>Tìm kiếm
                        </button>
              </span>
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
  listSearch: state.searchTicket.keyword
});


const mapDispathToProps = (dispatch) => {
  return {
    deleteTicketRequest: (id, data) => {
      dispatch(deleteTicketRequest(id, data))
    },
    searchTicket: (keyword) => {
      dispatch(searchTicket(keyword))
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(ListTicket);




