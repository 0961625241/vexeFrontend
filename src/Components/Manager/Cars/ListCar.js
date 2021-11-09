import React, { Component } from 'react';
import { Breadcrumb, Button, Modal, Form, Input, Radio, Table, Space, Upload, Icon, message, Select } from 'antd';
import { connect } from 'react-redux';
import { postCarRequest, deleteCarRequest, putCarRequest } from './../../../actions/cars';
import { UploadOutlined } from '@ant-design/icons';
import { searchCar } from './../../../actions/index';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
const { Option } = Select;

const Dragger = Upload.Dragger;
// const props = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     token: "token",
//     "Content-Type": "multipart/form-data"
//   },


//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },

// };

function handleChange(value) {
  console.log(`selected ${value}`);
}


function handleTypesSeat(value) {
  console.log(`selected ${value}`);
}
const CollectionCreateForm = ({ listProvince, selectProvince, onChangeProvince, listStation, listCarMFG, listCar, FindId, visible, onCreate, onCancel, data }) => {
  const [form] = Form.useForm();


  let nameProvince = '';
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
          // Seats: '22' ,
          // typesSeat:'Ghế ngồi'
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
          name="CarMFG"
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
            placeholder="Chọn hãng xe"
            optionFilterProp="children"
            // onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              listCarMFG.map((item, index) => {
                console.log(item)
                return (<Option key={index + item._id} value={item._id}>{item.nameCarMFG}</Option>)
              })}
          </Select>
        </Form.Item>
        {/* <Form.Item
          name='imageBus'
          label="Hình ảnh"
           valuePropName="imageBus"
         
        >
             <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload </Button>
    </Upload>
        </Form.Item> */}
        <Form.Item
          name='codeBus'
          label="Mã xe"
          rules={[
            {
              required: true,
              message: 'Please input the codeBus of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='seats'
          label="Số chỗ ngồi"
          rules={[{ required: true }]}
        >
          <Select style={{ width: 120 }} onChange={handleChange}>
            <Option value="22">22 cho</Option>
            <Option value="24">24 cho</Option>
            <Option value="34">34 cho</Option>
            <Option value="41">41 cho</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='typesSeat'
          label="Loại chỗ"
          rules={[{ required: true }]}
        >
          <Select style={{ width: 120 }} onChange={handleTypesSeat}>
            <Option value="Ghế ngồi">Ghế ngồi</Option>
            <Option value="Giường nằm">Giường nằm</Option>

          </Select>
        </Form.Item>


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




      </Form>
    </Modal>
  );
};


class ListCar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterNameStation: "",
      selectProvince: "",
      visible: false,
      uploadFile: '',
      FindId: '',
      keyword: '',
      columns: [
        {
          title: 'Tên xe',
          dataIndex: 'nameBus',
          width: 200,
        },
        {
          title: 'Mã Xe',
          dataIndex: 'codeBus',
          width: 100,
        },
        {
          title: 'Hình ảnh',
          dataIndex: 'imageBus',
          width: 100,
          render: (image) => {
            let link = 'http://localhost:3000/'
            return <img style={{ width: '50px', height: '50px' }} src={`${link}${image}`} />
          },
          //  sorter: (a, b) => a.imageBus - b.imageBus,
        },
        {
          title: 'Số chỗ ngồi',
          dataIndex: 'Seats',
          width: 150,
          // sorter: (a, b) => a.amount - b.amount,
        },
        {
          title: 'Loại chỗ',
          dataIndex: 'typesSeat',
          width: 200,
          // sorter: (a, b) => a.amount - b.amount,
        },
        {
          title: 'Bến xe',
          dataIndex: 'station',
          width: 200,
          // sorter: (a, b) => a.amount - b.amount,
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
      data: [
        {
          name: ["id"],
          value: ""
        },
        {
          name: ["CarMFG"],
          value: ""
        },
        {
          name: ["codeBus"],
          value: ""
        },
        {
          name: ["seats"],
          value: ""
        },
        {
          name: ["typesSeat"],
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
      ]
    }


  }



  onDelete = (id) => {
    this.props.deleteCarRequest(id)
  }
  onUpdate = (id) => {
    var listCar = this.props.listCar
    var index = listCar.findIndex(x => x._id === id);
    var data = listCar[index];
    console.log(data)
    this.setState({
      selectProvince: data.station.province._id,
      visible: true,
      FindId: id,
      data: [
        {
          name: ["id"],
          value: data._id
        },
        {
          name: ["CarMFG"],
          value: data.CarMFG._id
        },
        {
          name: ["codeBus"],
          value: data.codeBus
        },
        {
          name: ["typesSeat"],
          value: data.typesSeat
        },
        {
          name: ["seats"],
          value: data.seats
        },
        {
          name: ["province"],
          value: data.station.province._id
        },
        {
          name: ["station"],
          value: data.station._id
        },
      ]
    })
  }
  onCreate = (values) => {
    console.log('Received values of form: ', values);

    // var formData = new FormData(); // Currently empty
    // formData.append("imageBus", values.imageBus.fileList[0].originFileObj);
    // formData.append("nameBus", values.nameBus);
    // formData.append("codeBus", values.codeBus);
    // formData.append("Seats", values.Seats);
    // formData.append("typesSeat", values.typesSeat);
    if (values.id) {
      this.props.putCarRequest(values.id, values)
    }
    else {
      console.log(values)
      this.props.postCarRequest(values)
    }
    this.setState({
      visible: false,
      data: [
        {
          name: ["id"],
          value: ""
        },
        {
          name: ["CarMFG"],
          value: ""
        },
        {
          name: ["codeBus"],
          value: ""
        },
        {
          name: ["seats"],
          value: ""
        },
        {
          name: ["typesSeat"],
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
      ]
    })
  };
  listCar = () => {
    const data = [];
    let { listCar, listSearch } = this.props;

    let filterNameStation = this.state.filterNameStation
    if (filterNameStation) {
      listCar = listCar.filter((task) => {
        if (filterNameStation === '') {
          return task;
        }
        else if (filterNameStation === task.station._id) {
          return task
        }
      });
    }
    listCar = listCar.filter((task) => {
      return task.CarMFG.nameCarMFG.toLowerCase().indexOf(listSearch.toLowerCase()) !== -1;
    });


    listCar.map((item, index) => {
      console.log(item)
      data.push({
        key: index,
        _id: item._id,
        nameBus: item.CarMFG.nameCarMFG,
        codeBus: item.codeBus,
        imageBus: item.CarMFG.imageCarMFG,
        Seats: item.seats,
        typesSeat: item.typesSeat,
        station: item.station.nameStation
      })
    })
    return data;
  }
  onChangeSearch = (event) => {
    this.setState({
      keyword: event.target.value
    });
  }
  onSearch = () => {
    this.props.searchCar(this.state.keyword)
  }
  onChangeProvince = (value) => {
    console.log(`selected ${value}`);

    this.setState({
      selectProvince: value,
      //   selectCodeCar: 'Vui long chon ma xe'
    })
  }

  onChangeFilterStation = (value) => {
    console.log(`selected ${value}`);

    this.setState({
      filterNameStation: value,
      //   selectCodeCar: 'Vui long chon ma xe'
    })
  }

  render() {

    let { listCar } = this.props;


    return (
      <>
        <div>
          <h4 className="titleListManager">Quản lý Hãng xe</h4>
          <div className="breadcrumbList"><Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/manager'>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Hãng xe
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
                    data: [
                      {
                        name: ["id"],
                        value: ""
                      },
                      {
                        name: ["CarMFG"],
                        value: ""
                      },
                      {
                        name: ["codeBus"],
                        value: ""
                      },
                      {
                        name: ["seats"],
                        value: ""
                      },
                      {
                        name: ["typesSeat"],
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
            listProvince={this.props.listProvince}
            selectProvince={this.state.selectProvince}
            onChangeProvince={this.onChangeProvince}
            listStation={this.props.listStation}
            listCarMFG={this.props.listCarMFG}
            listCar={this.props.listCar}
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
          <Table bordered columns={this.state.columns} dataSource={this.listCar()} />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  listCar: state.listCar.cars,
  listCarMFG: state.listCarMFG.carMFGs,
  listSearch: state.searchCar.keyword,
  listProvince: state.listProvince.provinces,
  listStation: state.listStation.stations,
});

const mapDispathToProps = (dispatch) => {
  return {
    postCarRequest: (data) => {
      dispatch(postCarRequest(data))
    },
    putCarRequest: (id, data) => {
      dispatch(putCarRequest(id, data))
    },
    deleteCarRequest: (id) => {
      dispatch(deleteCarRequest(id))
    },
    searchCar: (keyword) => {
      dispatch(searchCar(keyword))
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(ListCar);


// <div className="dropdown">
// <button
//   className="dropdown-toggle dropdown-toggleFilter"
//   type="button"
//   id="dropdownMenu1"
//   data-toggle="dropdown"
//   aria-haspopup="true"
//   aria-expanded="true"
// >
//   Lọc theo chỗ ngồi <span className="fa fa-caret-square-o-down ml-5"></span>
// </button>
// <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
//   {/* onClick={() => this.onFilterSeat('')} */}
//   <li  >
//     <a
//       role="button"
//       className='sort_selected'
//     // style={(this.props.filter.filterName === '') ? { fontWeight: 'bold' } : {}}
//     >
//       <span className="faFilter">
//         Tất cả
//                                                     </span>
//       <span className="faFilter">
//         {/* {(this.props.filter.filterName === '') ? <i className="fas fa-check"></i> : ''} */}
//       </span>
//     </a>
//   </li>
//   {/* onClick={() => this.onFilterSeat('Ghế ngồi')} */}
//   <li  >
//     <a
//       role="button"
//       className='sort_selected'
//     // style={(this.props.filter.filterName === 'Ghế ngồi') ? { fontWeight: 'bold' } : {}}
//     >
//       <span className="faFilter">
//         Ghế ngồi
//                                                       </span>
//       <span className="faFilter">
//         {/* {(this.props.filter.filterName === 'Ghế ngồi') ? <i className="fas fa-check"></i> : ''} */}
//       </span>

//     </a>
//   </li>
//   <li onClick={() => this.onFilterSeat('Giường nằm')}>
//     <a
//       role="button"
//       className='sort_selected'
//     // style={(this.props.filter.filterName === 'Giường nằm') ? { fontWeight: 'bold' } : {}}
//     >
//       <span className="faFilter">
//         Giường nằm
//                 </span>
//       <span className="faFilter">
//         {/* {(this.props.filter.filterName === 'Giường nằm') ? <i className="fas fa-check"></i> : ''} */}
//       </span>
//     </a>
//   </li>
// </ul>
// </div>