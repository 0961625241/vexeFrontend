import React, { Component } from 'react'
import { Breadcrumb, Button, InputNumber, Modal, Form, Input, Radio, Table, Space, Select, DatePicker, Tag } from 'antd';
import { connect } from 'react-redux';
import { postTripRequest, putTripRequest, deleteTripRequest } from './../../../actions/trips';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import moment from 'moment';
import { search, searchTrip } from './../../../actions/index';
function numberToMoney(money) {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


const { Option } = Select;
const CollectionCreateForm = ({ listStation, selectProvinceEnd, onChangeProvinceEnd, selectProvinceStart, onChangeProvinceStart, listProvince, listTrip, selectStartTime, onChangeStartTime, FindId, handleCodeCar, selectCodeCar, handleCar, selectCar, selectSeats, handleSeats, seats, visible, onCreate, onCancel, data, stationFrom, handleChangeFromStation, handleChangeToStation, fromStation, selectToStation, validateMessages, selectFormStation }) => {
  const [form] = Form.useForm();
  //       // if (item._id !== selectToStation) {
  let nameBus = '';
  let seatCodes = '';
  let quaxx = [{ name: '' }];
  listTrip.filter((trip, index) => {
    if (trip.fromStation._id === selectFormStation) {
      if (new Date(trip.startTime).toLocaleDateString("es-CL") === selectStartTime || new Date(new Date(trip.startTime).valueOf() + 24 * 60 * 60 * 1000).toLocaleDateString("es-CL") === selectStartTime) {
        quaxx.push({ name: trip.cars.codeBus })
      }
    }
  })

  return (
    <Modal
      title={FindId !== '' ? 'Sửa' : 'Thêm'}
      okText="Đồng ý"
      cancelText="Hủy"
      visible={visible}

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
        <Form.Item
          name="provinceStart"
          label="Khu vực điểm đi"
          rules={[
            {
              required: true,
              message: 'Khu vực không được để trống !',
            },
          ]}
        >
          <Select
            style={{ width: 150 }}
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            onChange={onChangeProvinceStart}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              listProvince.map((item, index) => {
                return (<Option key={index + item._id} value={item._id}>{item.nameProvince}</Option>)
              })}
          </Select>
        </Form.Item>

        <Form.Item label="Điểm đi" name={'fromStation'} rules={[{ required: true }]} >
          <Select onChange={handleChangeFromStation}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {listStation.map((item, index) => {
              if (selectProvinceStart === item.province._id) {
                return (<Option key={index + item._id} value={item._id}>{item.nameStation}</Option>)
              }

            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="provinceEnd"
          label="Khu vực điểm đến"
          rules={[
            {
              required: true,
              message: 'Khu vực điểm đến không được để trống !',
            },
          ]}
        >
          <Select
            style={{ width: 150 }}
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            onChange={onChangeProvinceEnd}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              listProvince.map((item, index) => {
                return (<Option key={index + item._id} value={item._id}>{item.nameProvince}</Option>)
              })}
          </Select>
        </Form.Item>

        <Form.Item label="Điểm đến" name={'toStation'} dependencies={['fromStation']}
        // rules={[
        //   { required: true },
        //   ({ getFieldValue }) => ({
        //     validator(rule, value) {
        //       if (!value || getFieldValue('fromStation') !== value) {
        //         return Promise.resolve();
        //       }
        //       return Promise.reject('toStation is not identical with the fromStation');
        //     },
        //   }),
        // ]}
        >
          <Select onChange={handleChangeToStation}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {listStation.map((item, index) => {
              if (selectProvinceEnd === item.province._id) {
                return (<Option key={index + item._id} value={item._id}>{item.nameStation}</Option>)
              }
            })}
          </Select>
        </Form.Item>

        <Form.Item name="startTime" label="Thời gian bắt đầu" rules={[{ required: true }]} >
          <DatePicker onChange={onChangeStartTime} showTime format="DD-MM-YYYY HH:mm:ss" />
        </Form.Item>
        <Form.Item className='opption' label="Chỗ ngồi" name={'numberSeat'} rules={[{ required: true }]} >
          <Select style={{ width: 120 }} onChange={handleSeats}>
            {

              seats.sort((a, b) => { return a.seats - b.seats }).map((item, index) => {
                if (item.seats !== seatCodes) {
                  seatCodes = item.seats
                  return (<Option key={index + item._id} value={item.seats}>{item.seats}</Option>)
                }
              })

            }
          </Select>
        </Form.Item>
        <Form.Item className='opption' label="Xe" name={'carx'} rules={[{ required: true }]} >
          <Select onChange={handleCar} style={{ width: 150 }}
          >
            {
              seats.map((item, index) => {
                if (item.station._id === selectFormStation) {
                  if (item.seats === parseInt(selectSeats)) {
                    if (item.CarMFG.nameCarMFG !== nameBus) {
                      nameBus = item.CarMFG.nameCarMFG
                      return (<Option key={index + item._id} value={item.CarMFG.nameCarMFG}>{item.CarMFG.nameCarMFG}</Option>)
                    }
                  }
                }
              })}
          </Select>

        </Form.Item>
        <Form.Item className='opption' label="Mã xe" name={'cars'} rules={[{ required: true }]} >
          <Select onChange={handleCodeCar} style={{ width: 160 }}
          >
            {

              seats.map((item, index) => {
                if (item.station._id === selectFormStation) {
                  if (item.CarMFG.nameCarMFG === selectCar) {
                    if (item.driver !== undefined) {
                      let temp;
                      quaxx.map((itemxx, indexx) => {
                        if (itemxx.name === item.codeBus) {
                          temp = <Select.Option key={index + item._id} disabled value={item._id}>{item.codeBus}</Select.Option>
                        }
                      })
                      if (temp === undefined) {
                        return <Select.Option key={index + item._id} value={item._id}>{item.codeBus}</Select.Option>
                      }
                      return temp;
                    }
                    // if (item.busA1.length === 2) {
                    //   let temp;
                    //   quaxx.map((itemxx, indexx) => {
                    //     if (itemxx.name === item.codeBus) {
                    //       temp = <Select.Option key={index + item._id} disabled value={item._id}>{item.codeBus}</Select.Option>
                    //     }
                    //   })
                    //   if (temp === undefined) {
                    //     return <Select.Option key={index + item._id} value={item._id}>{item.codeBus}</Select.Option>
                    //   }
                    //   return temp;
                    // }
                  }
                }
              })}
          </Select>
        </Form.Item>



        <Form.Item
          rules={[{ required: true }]}
          className='priceTrip'
          name={'price'}
          label="Giá tiền"
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};


class ListTrip extends Component {
  state = {
    filterNameStation: "",
    columns: [
      {
        title: 'Điểm đi',
        dataIndex: 'fromStation',
        key: 'fromStation',
        width: 150,
      },
      {
        title: 'Điểm đến',
        dataIndex: ['toStation'],
        key: 'toStation',
        width: 150,
        // sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: 'Thời gian bắt đầu',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 200,
        render: (item) => (
          <Space size="middle">
            <span >{`${new Date(item).toLocaleDateString("es-CL")}    ${new Date(item).toLocaleTimeString()}`}</span>
          </Space>
        ),
        sorter: (a, b) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
      },
      {
        title: 'Xe',
        dataIndex: 'nameBus',
        key: 'nameBus',
        width: 150,
      },
      {
        title: 'Mã Xe',
        dataIndex: 'codeBus',
        key: 'codeBus',
        width: 150,
      },
      {
        title: 'Số chỗ ngồi',
        dataIndex: 'seats',
        key: 'seats',
        width: 100,
        render: text => {

          return (<Tag color={'green'} >
            {text}
          </Tag>)

        }
      },
      {
        title: 'Giá tiền',
        dataIndex: 'price',
        key: 'price',
        width: 100,
        render: (text) => (
          <Space size="middle">
            <span style={{ color: 'red' }}>{text}</span>
            {/* <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a> */}
            {/* <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a> */}
          </Space>
        )
      },
      {
        title: 'Hành động',
        key: 'action',
        render: (text) => (
          <Space size="middle">
            <Link to={`/manager/trips/${text._id}`} ><i style={{ color: '#1890ff' }} className="far fa-bookmark"></i></Link>
            <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a>
            <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a>
          </Space>
        )
      },
    ],

    data: [
      {
        name: ["id"],
        value: ""
      },
      {
        name: ["provinceStart"],
        value: ""
      },
      {
        name: ["fromStation"],
        value: ""
      },
      {
        name: ["provinceEnd"],
        value: ""
      },
      {
        name: ["toStation"],
        value: ""
      },
      {
        name: ["startTime"],
        value: ""
      },
      {
        name: ["numberSeat"],
        value: ""
      },
      {
        name: ["carx"],
        value: ""
      },
      {
        name: ["cars"],
        value: ""
      },
      {
        name: ["price"],
        value: ""
      },

    ],
    FindId: '',
    keyword: '',
    // validateMessages: {
    //   required: '${label} is required!',
    //   types: {
    //     email: '${label} is not validate email!',
    //     number: '${label} is not a validate number!',
    //   },
    //   number: {
    //     // range: '${label} must be between ${min} and ${max}',
    //     range:  '${label} must have at least ${min} characters'
    //   },
    // },
    selectProvinceEnd: '',
    selectProvinceStart: '',
    selectFormStation: '',
    selectToStation: '',
    selectSeats: '',
    selectCar: 'Vui long chon xe',
    selectCodeCar: 'Vui long chon ma xe',
    selectStartTime: '',
  };
  onUpdate = (id) => {
    var listTrip = this.props.listTrip
    console.log(id)
    var index = listTrip.findIndex(x => x._id === id);
    var data = listTrip[index];
    console.log(data)
    this.setState({
      FindId: id,
      visible: true,
      selectProvinceStart: data.fromStation.province._id,
      selectProvinceEnd: data.toStation.province._id,
      selectFormStation: data.fromStation._id,
      selectToStation: data.toStation._id,
      selectSeats: data.cars.seats.length,
      selectCar: data.cars.CarMFG.nameCarMFG,
      selectCodeCar: data.cars._id,
      data: [
        {
          name: ["id"],
          value: data._id
        },
        {
          name: ["provinceStart"],
          value: data.fromStation.province._id
        },
        {
          name: ["fromStation"],
          value: data.fromStation._id
        },
        {
          name: ["provinceEnd"],
          value: data.toStation.province._id
        },
        {
          name: ["toStation"],
          value: data.toStation._id
        },
        {
          name: ["startTime"],
          value: moment(data.startTime)
        },
        {
          name: ["numberSeat"],
          value: data.cars.seats
        },
        {
          name: ["carx"],
          value: data.cars.CarMFG.nameCarMFG
        },
        {
          name: ["cars"],
          value: data.cars._id
        },
        {
          name: ["price"],
          value: data.price
        },
      ]
    })
  }
  onDelete = (id) => {
    this.props.deleteTripRequest(id)
  }

  onCreate = (values) => {
    console.log('Received values of form: ', values);
    if (values.id) {
      //   console.log('sua')
      this.props.putTripRequest(values.id, values)
    } else {
      console.log(values)
      this.props.postTripRequest(values)
    }
    this.setState({
      visible: false,
      data: [
        {
          name: ["id"],
          value: ""
        },
        {
          name: ["provinceStart"],
          value: ""
        },
        {
          name: ["fromStation"],
          value: ""
        },
        {
          name: ["provinceEnd"],
          value: ""
        },
        {
          name: ["toStation"],
          value: ""
        },
        {
          name: ["startTime"],
          value: ""
        },
        {
          name: ["numberSeat"],
          value: ""
        },
        {
          name: ["carx"],
          value: ""
        },
        {
          name: ["cars"],
          value: ""
        },
        {
          name: ["price"],
          value: ""
        },

      ],
      selectFormStation: '',
      selectToStation: '',
      selectSeats: ''
    })
  };
  listTrip = () => {
    const data = [];
    let { listTrip, listSearch } = this.props;
    let filterNameStation = this.state.filterNameStation
    if (filterNameStation) {
      listTrip = listTrip.filter((task) => {
        if (filterNameStation === '') {
          return task;
        }
        else if (filterNameStation === task.fromStation._id) {
          return task
        }
      });
    }
    listTrip = listTrip.filter((task) => {
      return task.fromStation.nameStation.toLowerCase().indexOf(listSearch.toLowerCase()) !== -1;
    });

    listTrip.map((item, index) => {
      //  console.log(item)
      data.push({
        key: index,
        _id: item._id,
        fromStation: item.fromStation.nameStation,
        toStation: item.toStation.nameStation,
        startTime: item.startTime,
        // startTime: `${new Date(item.startTime).toLocaleDateString("es-CL")}    ${new Date(item.startTime).toLocaleTimeString()}`,
        nameBus: item.cars.CarMFG.nameCarMFG,

        codeBus: item.cars.codeBus,
        seats: item.seats.length,
        price: `${numberToMoney(item.price)}đ`
      })
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
  handleChangeFromStation = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectFormStation: value
    })
  }
  handleChangeToStation = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectToStation: value,

    })
  }
  handleSeats = (value) => {
    console.log(`selected ${value}`);

    let qua = this.props.listCar.filter((item, index) => {
      if (item.seats.length === parseInt(value)) {
        return item
      }
    })
    this.setState({
      selectSeats: value,
      selectCar: 'Vui long chon xe',
      selectCodeCar: 'Vui long chon ma xe'
    })
  }

  handleCar = (value) => {
    console.log(`selected ${value}`);

    this.setState({
      selectCar: value,
      selectCodeCar: 'Vui long chon ma xe'
    })
  }

  handleCodeCar = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectCodeCar: value
    })
  }

  onChangeProvinceStart = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectProvinceStart: value
    })
  }
  onChangeProvinceEnd = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectProvinceEnd: value
    })
  }
  onChangeSearch = (event) => {
    this.setState({
      keyword: event.target.value
    });
  }
  onSearch = () => {
    this.props.searchTrip(this.state.keyword)
  }
  onChangeStartTime = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      selectStartTime: new Date(date._d).toLocaleDateString("es-CL")
    })
  }
  render() {

    let { selectSeats, selectCar, selectCodeCar, selectFormStation } = this.state;
    console.log({ selectSeats, selectCar, selectCodeCar, selectFormStation })
    return (
      <>
        <div>
          <h4 className="titleListManager">Quản lý Chuyến đi</h4>
          <div className="breadcrumbList"><Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/manager'>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Chuyến đi
            </Breadcrumb.Item>
          </Breadcrumb></div>

          <div className='SearchTicket'>
            <div className="input-groupSearch">
              <Button
                style={{ marginBottom: '15px' }}
                type="primary"
                onClick={() => {
                  this.setState({
                    selectSeats: '',
                    selectCar: '',
                    selectCodeCar: '',
                    selectFormStation: '',
                    selectToStation: '',
                    FindId: '',
                    visible: true,
                    data: [
                      {
                        name: ["id"],
                        value: ""
                      },
                      {
                        name: ["provinceStart"],
                        value: ""
                      },
                      {
                        name: ["fromStation"],
                        value: ""
                      },
                      {
                        name: ["provinceEnd"],
                        value: ""
                      },
                      {
                        name: ["toStation"],
                        value: ""
                      },
                      {
                        name: ["startTime"],
                        value: ""
                      },
                      {
                        name: ["numberSeat"],
                        value: ""
                      },
                      {
                        name: ["carx"],
                        value: ""
                      },
                      {
                        name: ["cars"],
                        value: ""
                      },
                      {
                        name: ["price"],
                        value: ""
                      },

                    ],
                  })
                }}
              >
                <i className="far fa-plus-square" style={{ marginRight: '9px' }}></i>  Thêm
              </Button>
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
                placeholder="Nhập từ khóa..."
                onChange={this.onChangeSearch}
              />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                  <span className="fa fa-search " style={{ marginRight: '5px' }}></span>Tìm kiếm
                </button>
              </span>
            </div>
          </div>



          <CollectionCreateForm
            selectProvinceEnd={this.state.selectProvinceEnd}
            onChangeProvinceEnd={this.onChangeProvinceEnd}
            selectProvinceStart={this.state.selectProvinceStart}
            onChangeProvinceStart={this.onChangeProvinceStart}
            listProvince={this.props.listProvince}
            listTrip={this.props.listTrip}
            selectStartTime={this.state.selectStartTime}
            onChangeStartTime={this.onChangeStartTime}
            FindId={this.state.FindId}
            selectFormStation={this.state.selectFormStation}
            selectToStation={this.state.selectToStation}
            validateMessages={this.state.validateMessages}
            data={this.state.data}
            visible={this.state.visible === true}
            onCreate={this.onCreate}
            handleChangeFromStation={this.handleChangeFromStation}
            handleChangeToStation={this.handleChangeToStation}
            listStation={this.props.listStation}
            seats={this.props.listCar}
            handleSeats={this.handleSeats}
            selectSeats={this.state.selectSeats}
            selectCar={this.state.selectCar}
            handleCar={this.handleCar}
            handleCodeCar={this.handleCodeCar}
            selectCodeCar={this.state.selectCodeCar}
            onCancel={() => {
              this.setState({
                visible: false
              })
            }}
          />
          <Table bordered columns={this.state.columns} dataSource={this.listTrip()} />
        </div>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  listProvince: state.listProvince.provinces,
  listTrip: state.listTrip.trips,
  listStation: state.listStation.stations,
  listCar: state.listCar.cars,
  listSearch: state.searchTrip.keyword
});
const mapDispathToProps = (dispatch) => {
  return {
    postTripRequest: (data) => {
      dispatch(postTripRequest(data))
    },
    putTripRequest: (id, data) => {
      dispatch(putTripRequest(id, data))
    },
    deleteTripRequest: (id) => {
      dispatch(deleteTripRequest(id))
    },
    search: (keyword) => {
      dispatch(search(keyword))
    },
    searchTrip: (keyword) => {
      dispatch(searchTrip(keyword))
    },

  }
}
export default connect(mapStateToProps, mapDispathToProps)(ListTrip);












