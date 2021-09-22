import React, { Component } from 'react';
import { Breadcrumb, Checkbox, Button, Modal, Form, Input, Radio, Table, Space, Upload, Icon, message, Select, InputNumber, DatePicker, } from 'antd';
import { connect } from 'react-redux';
import { postDriverRequest, putDriverRequest, deleteDriverRequest } from './../../../actions/drivers';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { searchDriver } from './../../../actions/index';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
const { Option } = Select;
const { TextArea } = Input;
const Dragger = Upload.Dragger;
function numberToMoney(money) {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const CollectionCreateForm = ({ getId, onChangeCar, onChangeAllowance, selectCarMFG, onChangeCarMFG, selectStation, onChangeStation, listCarMFG, listCar, listProvince, selectProvince, onChangeProvince, listStation, FindId, visible, onCreate, onCancel, data }) => {
  const [form] = Form.useForm();
  let nameCarMF = '';
 

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
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          hidden
          label="id"
          name="id"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nameDriver"
          label="Tên tài xế "
          rules={[
            {
              required: true,
              message: 'Please input the nameDriver of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="emailDriver"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input the Email of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="addressDriver"
          label="Địa chỉ "
          rules={[
            {
              required: true,
              message: 'Please input the addressDriver of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: 'please input the sdtDriver of collection!' },
            { min: 10, max: 11, message: 'sdtDriver must be between 10 and 11' },
          ]}
          className='priceTrip'
          name={'sdtDriver'}
          label="Số điện thoại "

        >
          <Input />
        </Form.Item>
        <Form.Item name="bdayDriver" label="Ngày Sinh" rules={[{ required: true }]} >
          <DatePicker showTime format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: 'CMNDDriver input the sdtDriver of collection!' },
            { min: 9, max: 9, message: 'sdtDriver must be between 9 and 9' },
          ]}
          name={'CMNDDriver'}
          label="CMND"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='avatarDriver'
          label="Hình ảnh"
          valuePropName="avatarDriver"
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload </Button>
          </Upload>
        </Form.Item>
        <Form.Item name="SContactDriver" label="Ngày bắt đầu hợp đồng" rules={[{ required: true }]} >
          <DatePicker showTime format="DD-MM-YYYY " />
        </Form.Item>
        <Form.Item name="EContactDriver" label="Ngày kết thúc hợp đồng" rules={[{ required: true }]} >
          {/* HH:mm:ss */}
          <DatePicker showTime format="DD-MM-YYYY " />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={'salaryDriver'}
          label="Lương"
        >
          <InputNumber />
        </Form.Item>
        {/* <Form.Item
          name="allowanceDriver"
          label="allowanceDriver"
          rules={[
            {
              required: true,
              message: 'Mô tả không được để trống !',
            },
          ]}
        >
          <TextArea />
        </Form.Item> */}
       
        <Form.Item
          name="province"
          label="Khu vực"
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
            disabled={getId === '' ? false : true}
            placeholder="Chọn khu vực"
            onChange={onChangeProvince}
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
        <Form.Item
          name="station"
          label="Bến xe"
          rules={[
            {
              required: true,
              message: 'Bến xe không được để trống !',
            },
          ]}
        >
          <Select
            style={{ width: 150 }}
            showSearch
            style={{ width: 200 }}
            onChange={onChangeStation}
            disabled={getId === '' ? false : true}
            placeholder="Chọn bến xe"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              listStation.map((item, index) => {
                if (item.province._id === selectProvince) {
                  return (<Option key={index + item._id} value={item._id}>{item.nameStation}</Option>)
                }

              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="nameCarMFG"
          label="Hãng xe"
          rules={[
            {
              required: true,
              message: 'Hãng xe không được để trống !',
            },
          ]}
        >
          <Select
            style={{ width: 150 }}
            showSearch
            style={{ width: 200 }}
            onChange={onChangeCarMFG}
            disabled={getId === '' ? false : true}
            placeholder="Chọn hãng xe"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              listCar.map((item, index) => {
                if (item.station._id === selectStation) {
                  if (item.CarMFG.nameCarMFG !== nameCarMF) {
                    nameCarMF = item.CarMFG.nameCarMFG
                    return (<Option key={index + item._id} value={item.CarMFG.nameCarMFG}>{item.CarMFG.nameCarMFG}</Option>)
                  }
                }

              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="car"
          label="Mã xe"
          rules={[
            {
              required: true,
              message: 'Mã xe không được để trống !',
            },
          ]}
        >
          <Select
            style={{ width: 150 }}
            showSearch
            disabled={getId === '' ? false : true}
            style={{ width: 200 }}
            onChange={onChangeCar}
            placeholder="Chọn mã xe"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              listCar.map((item, index) => {
                if (item.CarMFG.nameCarMFG === selectCarMFG) {
                  if (item.station._id === selectStation) {
                    if (getId === '') {
                      if (item.driver === undefined) {
                        return (<Option key={index + item._id} value={item._id}>{item.codeBus}</Option>)
                      }
                    } else {
                      return (<Option key={index + item._id} value={item._id}>{item.codeBus}</Option>)
                    }
                  }

                }
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

class Listdriver extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getId: '',
      filterNameStation: '',
      selectStation: '',
      selectProvince: '',
      selectCarMFG: "",
      selectCar: "",
      columns: [
        {
          title: 'Tên xe',
          dataIndex: 'nameDriver',
          width: 200,
        },
        {
          title: 'Địa chỉ xe',
          dataIndex: 'addressDriver',
          width: 200,
        },

        {
          title: 'Số điện thoại',
          dataIndex: 'sdtDriver',
          width: 150,
        },
        {
          title: 'Ngày sinh',
          dataIndex: 'bdayDriver',
          width: 200,
        },
        {
          title: 'CMND',
          dataIndex: 'CMNDDriver',
          width: 200,
        },
        {
          title: 'Ngày ký hợp đồng',
          dataIndex: 'SContactDriver',
          width: 200,
        },
        {
          title: 'Ngày kết thúc hợp đồng',
          dataIndex: 'EContactDriver',
          width: 200,
        },
        {
          title: 'Lương từng tháng',
          dataIndex: 'salaryDriver',
          width: 200,
          render: (text) => (
            <Space size="middle">
              <span style={{ color: 'red' }}>{text}</span>
            </Space>
          )
        },
        // {
        //   title: 'Phụ cấp',
        //   dataIndex: 'allowanceDriver',
        //   width: 100,
        // },
        {
          title: 'Tổng lương',
          dataIndex: 'totalSalary',
          width: 200,
          render: (text) => (
            <Space size="middle">
              <span style={{ color: 'red' }}>{text}</span>
            </Space>
          )
        },

        {
          title: 'Hành động',
          key: 'action',
          render: (text) => (
            <Space size="middle">
              <Link to={`/manager/drivers/${text._id}`} ><i style={{ color: '#1890ff' }} className="far fa-bookmark"></i></Link>
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
          name: ["nameDriver"],
          value: ""
        },
        {
          name: ["emailDriver"],
          value: ""
        },
        {
          name: ["addressDriver"],
          value: ""
        },
        {
          name: ["sdtDriver"],
          value: ""
        },
        {
          name: ["bdayDriver"],
          value: ""
        },
        {
          name: ["CMNDDriver"],
          value: ""
        },
        {
          name: ["avatarDriver"],
          value: ""
        },
        {
          name: ["SContactDriver"],
          value: ""
        },
        {
          name: ["EContactDriver"],
          value: ""
        },
        {
          name: ["salaryDriver"],
          value: ""
        },
        {
          name: ["allowanceDriver"],
          value: ""
        },
        {
          name: ["province"],
          value: ""
        },
        {
          name: ["station"],
          value: ""
        },
        {
          name: ["nameCarMFG"],
          value: ""
        },
        {
          name: ["car"],
          value: ""
        },
      ],
      keyword: ''
    }


  }
  onChangeProvince = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectProvince: value,
    })
  }

  onChangeStation = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectStation: value,
    })
  }
  onChangeCarMFG = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectCarMFG: value,
    })
  }
  listDriver = () => {
    const data = [];
    let { listDriver, listSearch } = this.props;
    let filterNameStation = this.state.filterNameStation
    if (filterNameStation) {
      listDriver = listDriver.filter((task) => {

        if (filterNameStation === '') {
          return task;
        }
        else if (filterNameStation === task.station._id) {
          return task
        }
      });
    }
    listDriver = listDriver.filter((task) => {
      return task.nameDriver.toLowerCase().indexOf(listSearch.toLowerCase()) !== -1;
    });
    listDriver.map((item, index) => {
    
      var date1 = new Date(item.SContactDriver);
      var date2 = new Date(item.EContactDriver);
      var diff = new Date(date2.getTime() - date1.getTime());
      const tinhSalary = (((diff.getUTCFullYear() - 1970) * 12) + diff.getUTCMonth()) * item.salaryDriver
      data.push({
        key: index,
        _id: item._id,
        nameDriver: item.nameDriver,
        addressDriver: item.addressDriver,
        sdtDriver: item.sdtDriver,
        bdayDriver: `${new Date(item.bdayDriver).toLocaleDateString("es-CL")}`,
        CMNDDriver: item.CMNDDriver,
        avatarDriver: item.avatarDriver,
        SContactDriver: `${new Date(item.SContactDriver).toLocaleDateString("es-CL")}`,
        EContactDriver: `${new Date(item.EContactDriver).toLocaleDateString("es-CL")}`,
        salaryDriver: `${numberToMoney(item.salaryDriver)}đ`,
        // allowanceDriver: item.allowanceDriver,
        totalSalary: `${numberToMoney(tinhSalary)}đ`
      })
    })
    return data;
  }
  onCreate = (values) => {
    console.log('Received values of form: ', values);
    var formData = new FormData(); // Currently empty
    formData.append("nameDriver", values.nameDriver);
    formData.append("addressDriver", values.addressDriver);
    formData.append("emailDriver", values.emailDriver);
    formData.append("sdtDriver", values.sdtDriver);
    formData.append("bdayDriver", values.bdayDriver);
    formData.append("CMNDDriver", values.CMNDDriver);
    formData.append("avatarDriver", values.avatarDriver.fileList[0].originFileObj);
    formData.append("SContactDriver", values.SContactDriver);
    formData.append("EContactDriver", values.EContactDriver);
    formData.append("salaryDriver", values.salaryDriver);
    formData.append("allowanceDriver", values.allowanceDriver);
    formData.append("station", values.station);
    formData.append("car", values.car);
    if (values.id) {
      this.props.putDriverRequest(values.id, formData)
    }
    else {
      this.props.postDriverRequest(formData)
    }
    this.setState({
      visible: false,

      data: [
        {
          name: ["id"],
          value: ""
        },
        {
          name: ["nameDriver"],
          value: ""
        },
        {
          name: ["emailDriver"],
          value: ""
        },
        {
          name: ["addressDriver"],
          value: ""
        },
        {
          name: ["sdtDriver"],
          value: ""
        },
        {
          name: ["bdayDriver"],
          value: ""
        },
        {
          name: ["CMNDDriver"],
          value: ""
        },
        {
          name: ["avatarDriver"],
          value: ""
        },
        {
          name: ["SContactDriver"],
          value: ""
        },
        {
          name: ["EContactDriver"],
          value: ""
        },
        {
          name: ["salaryDriver"],
          value: ""
        },
        {
          name: ["allowanceDriver"],
          value: ""
        },
        {
          name: ["province"],
          value: ""
        },
        {
          name: ["station"],
          value: ""
        },
        {
          name: ["nameCarMFG"],
          value: ""
        },
        {
          name: ["car"],
          value: ""
        },
      ]
    })
  };
  onUpdate = (id) => {
    var listDriver = this.props.listDriver
    var index = listDriver.findIndex(x => x._id === id);
    var data = listDriver[index];
    this.setState({
      getId: id,
      visible: true,
      selectStation: data.station._id,
      selectProvince: data.station.province._id,
      selectCarMFG: data.car.CarMFG.nameCarMFG,
      selectCar: data.car._id,
      data: [
        {
          name: ["id"],
          value: data._id
        },
        {
          name: ["nameDriver"],
          value: data.nameDriver
        },
        {
          name: ["emailDriver"],
          value: data.emailDriver
        },
        {
          name: ["addressDriver"],
          value: data.addressDriver
        },
        {
          name: ["sdtDriver"],
          value: data.sdtDriver
        },
        {
          name: ["bdayDriver"],
          value: moment(data.bdayDriver)
        },
        {
          name: ["CMNDDriver"],
          value: data.CMNDDriver
        },
        // {
        //   name: ["avatarDriver"],
        //   value: data.avatarDriver
        // },
        {
          name: ["SContactDriver"],
          value: moment(data.SContactDrivermoment)
        },
        {
          name: ["EContactDriver"],
          value: moment(data.EContactDriver)
        },
        {
          name: ["salaryDriver"],
          value: data.salaryDriver
        },
        {
          name: ["allowanceDriver"],
          value: data.allowanceDriver
        },
        {
          name: ["province"],
          value: data.station.province._id
        },
        {
          name: ["station"],
          value: data.station._id
        },
        {
          name: ["nameCarMFG"],
          value: data.car.CarMFG.nameCarMFG
        },
        {
          name: ["car"],
          value: data.car._id
        },
      ]
    })
  }
  onDelete = (id) => {
    this.props.deleteDriverRequest(id)
  }
  onChangeFilterStation = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      filterNameStation: value,
      //   selectCodeCar: 'Vui long chon ma xe'
    })
  }
  onChangeAllowance = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }
  onChangeSearch = (event) => {
    this.setState({
      keyword: event.target.value
    });
  }
  onSearch = () => {
    this.props.searchDriver(this.state.keyword)
  }
  onChangeCar = (value) => {
    console.log(`selected ${value}`);

    this.setState({
      selectCar: value,
      //   selectCodeCar: 'Vui long chon ma xe'
    })
  }
  render() {
    console.log(this.state.getId)

    return (
      <>
        <div>
          {/* <Bar
    data={{
      labels: [
        "Africa",
        "Asia",
        "Europe",
        "Latin America",
        "North America"
      ],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: [2478, 5267, 734, 784, 433]
        }
      ]
    }}
    options={{
      legend: { display: false },
      title: {
        display: true,
        text: "Lương của tài xế"
      }
    }}
  /> */}

          <h4 className="titleListManager">Quản lý Tài xế</h4>
          <div className="breadcrumbList"><Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/manager'>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Tài xế
            </Breadcrumb.Item>
          </Breadcrumb></div>
          <div className='SearchTicket'>
            <div className="input-groupSearch">
              <Button style={{ marginBottom: '15px' }}
                type="primary"
                onClick={() => {
                  this.setState({
                    FindId: '',
                    visible: true,
                    getId: "",
                    data: [
                      {
                        name: ["id"],
                        value: ""
                      },
                      {
                        name: ["nameDriver"],
                        value: ""
                      },
                      {
                        name: ["emailDriver"],
                        value: ""
                      },
                      {
                        name: ["addressDriver"],
                        value: ""
                      },
                      {
                        name: ["sdtDriver"],
                        value: ""
                      },
                      {
                        name: ["bdayDriver"],
                        value: ""
                      },
                      {
                        name: ["CMNDDriver"],
                        value: ""
                      },
                      {
                        name: ["avatarDriver"],
                        value: ""
                      },
                      {
                        name: ["SContactDriver"],
                        value: ""
                      },
                      {
                        name: ["EContactDriver"],
                        value: ""
                      },
                      {
                        name: ["salaryDriver"],
                        value: ""
                      },
                      {
                        name: ["allowanceDriver"],
                        value: ""
                      },
                      {
                        name: ["province"],
                        value: ""
                      },
                      {
                        name: ["station"],
                        value: ""
                      },
                      {
                        name: ["nameCarMFG"],
                        value: ""
                      },
                      {
                        name: ["car"],
                        value: ""
                      },
                    ]
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
            getId={this.state.getId}
            onChangeAllowance={this.onChangeAllowance}
            selectCarMFG={this.state.selectCarMFG}
            onChangeCarMFG={this.onChangeCarMFG}
            onChangeCar={this.onChangeCar}
            selectStation={this.state.selectStation}
            onChangeStation={this.onChangeStation}
            listCar={this.props.listCar}
            listProvince={this.props.listProvince}
            selectProvince={this.state.selectProvince}
            onChangeProvince={this.onChangeProvince}
            listStation={this.props.listStation}
            FindId={this.state.FindId}
            data={this.state.data}
            uploadFile={this.state.uploadFile}
            visible={this.state.visible === true}
            onCreate={this.onCreate}
            onCancel={() => {
              this.setState({
                visible: false
              })
            }}
          />
          <Table scroll={{ x: 1500 }} bordered columns={this.state.columns} dataSource={this.listDriver()} />



        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  listDriver: state.listDriver.drivers,
  listStation: state.listStation.stations,
  listProvince: state.listProvince.provinces,
  listCar: state.listCar.cars,
  listCarMFG: state.listCarMFG.carMFGs,
  listSearch: state.searchDriver.keyword
});

const mapDispathToProps = (dispatch) => {
  return {
    postDriverRequest: (data) => {
      dispatch(postDriverRequest(data))
    },
    putDriverRequest: (id, data) => {
      dispatch(putDriverRequest(id, data))
    },
    deleteDriverRequest: (id) => {
      dispatch(deleteDriverRequest(id))
    },
    searchDriver: (keyword) => {
      dispatch(searchDriver(keyword))
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Listdriver);
