import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Table, Space, Upload, Icon, message,Select,InputNumber ,DatePicker,} from 'antd';
import { connect } from 'react-redux';
import { postBusA1Request,deleteBusA1Request ,putBusA1Request} from './../../../actions/busA1s';
import { UploadOutlined } from '@ant-design/icons';
import { searchBusA1 } from './../../../actions/index';
import moment from 'moment';
// import { searchCar } from './../../../actions/index';
function numberToMoney(money){
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")   
}
const { Option } = Select;
const { TextArea } = Input;
const Dragger = Upload.Dragger;

const CollectionCreateForm = ({selectCarMFG,onChangeCarMFG,selectStation,onChangeStation,listCarMFG,listCar,listProvince,selectProvince,onChangeProvince,listStation, FindId,visible, onCreate, onCancel, data }) => {
    const [form] = Form.useForm();
    let nameProvince = '';
    let nameCarMF='';
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
            name="nameBusA1"
            label="Tên tài xế "
            rules={[
              {
                required: true,
                message: 'Please input the nameBusA1 of collection!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="addressBusA1"
            label="Địa chỉ "
            rules={[
              {
                required: true,
                message: 'Please input the addressBusA1 of collection!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
          rules={[ { required: true, message: 'lease input the sdtDriver of collection!' },
          { min: 10,max:11,message:'sdtDriver must be between 10 and 11' },]}
          className='priceTrip'
          name={'sdtBusA1'}
          label="sdtBusA1"
        >
          <Input />
        </Form.Item>
        <Form.Item name="bdayBusA1" label="Thời gian bắt đầu" rules={[{ required: true }]} >
          <DatePicker showTime format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          rules={[     { required: true, message: 'CMNDDriver input the sdtDriver of collection!' },
          { min: 9,max:9,message:'sdtDriver must be between 9 and 9' },]}
          name={'CMNDBusA1'}
          label="CMNDBusA1"
        >
          <Input />
        </Form.Item>
          <Form.Item
            name='avatarBusA1'
            label="Hình ảnh"
             valuePropName="avatarBusA1"
           
          >
               <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Upload </Button>
      </Upload>
          </Form.Item>
          <Form.Item name="SContactBusA1" label="SContactBusA1" rules={[{ required: true }]} >
          <DatePicker showTime format="DD-MM-YYYY " />
        </Form.Item>
        <Form.Item name="EContactBusA1" label="EContactBusA1" rules={[{ required: true }]} >
          <DatePicker showTime format="DD-MM-YYYY " />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={'salaryBusA1'}
          label="salaryBusA1"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="allowanceBusA1"
          label="allowanceBusA1"
          rules={[
            {
              required: true,
              message: 'Mô tả không được để trống !',
            },
          ]}
        >
          <TextArea />
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
              onChange={onChangeStation}
              placeholder="Chọn bến xe"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
             {
            listStation.map((item, index) => {
              if(item.province._id === selectProvince)
              {
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
              placeholder="Chọn hãng xe"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
             {
            listCar.map((item, index) => {
              if(item.station._id === selectStation)
              {
                if(item.CarMFG.nameCarMFG !==nameCarMF)
                {
                  nameCarMF=item.CarMFG.nameCarMFG
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
              style={{ width: 200 }}
             
              placeholder="Chọn mã xe"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
             {
            listCar.map((item, index) => {
                if(item.CarMFG.nameCarMFG === selectCarMFG)
                {
                  if(item.busA1.length < 2 )
                  {
                    return (<Option key={index + item._id} value={item._id}>{item.codeBus}</Option>)
                   }
                   else if(item.busA1.length === 2)
                   {
                    return (<Option disabled={true} key={index + item._id} value={item._id}>{item.codeBus}</Option>)
                   }
                  
                }
            
              
            })}
            </Select>
        </Form.Item>
        </Form>
      </Modal>
    );
  };

class BusA1s extends Component {
    constructor(props) {
        super(props)

        this.state = {
          filterNameStation:"",
          selectStation:'',
            selectProvince:'',
            selectCarMFG:"",
            columns: [
                {
                  title: 'Tên xe',
                  dataIndex: 'nameBusA1',
                  width: 200,
                },
                {
                  title: 'Địa chỉ xe',
                  dataIndex: 'addressBusA1',
                  width: 100,
                },
               
                {
                  title: 'sdtBusA1',
                  dataIndex: 'sdtBusA1',
                  width: 150,
                  // sorter: (a, b) => a.amount - b.amount,
                },
                {
                  title: 'bdayBusA1',
                  dataIndex: 'bdayBusA1',
                  width: 200,
                  // sorter: (a, b) => a.amount - b.amount,
                },
                {
                    title: 'CMNDBusA1',
                    dataIndex: 'CMNDBusA1',
                    width: 200,
                    // sorter: (a, b) => a.amount - b.amount,
                  },
                  {
                    title: 'Hình ảnh',
                    dataIndex: 'avatarBusA1',
                    width: 100,
                    render:  (image) =>{
                      let link='http://localhost:3000/'
                      return <img style={{width:'50px',height:'50px'}} src={`${link}${image}`} />
                    },
                  //  sorter: (a, b) => a.imageBus - b.imageBus,
                  },
                  {
                    title: 'SContactBusA1',
                    dataIndex: 'SContactBusA1',
                    width: 200,
                    // sorter: (a, b) => a.amount - b.amount,
                  },
                  {
                    title: 'EContactBusA1',
                    dataIndex: 'EContactBusA1',
                    width: 200,
                    // sorter: (a, b) => a.amount - b.amount,
                  },
                  {
                    title: 'salaryBusA1',
                    dataIndex: 'salaryBusA1',
                    width: 200,
                    render: (text) => (
                      <Space size="middle">
                        <span style={{color:'red'}}>{text}</span>
                        {/* <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a> */}
                        {/* <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a> */}
                      </Space>
                  )
                    // sorter: (a, b) => a.amount - b.amount,
                  },
                  {
                    title: 'allowanceBusA1',
                    dataIndex: 'allowanceBusA1',
                    width: 200,
                    
                    // sorter: (a, b) => a.amount - b.amount,
                  },
                  {
                    title: 'totalSalary',
                    dataIndex: 'totalSalary',
                    width: 200,
                    render: (text) => (
                      <Space size="middle">
                        <span style={{color:'red'}}>{text}</span>
                        {/* <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a> */}
                        {/* <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a> */}
                      </Space>
                  )
                    // sorter: (a, b) => a.amount - b.amount,
                  },
                {
                  title: 'Hanh dong',
                  key: 'action',
                  render: (text) => (
                    <Space size="middle">
                      <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a>
                      <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a>
                    </Space>
                  )
                },
              ],
              keyword:''
        }

       
    }
    onChangeSearch = (event) => {
      this.setState({
          keyword : event.target.value
      });
  }
    onSearch=()=>{
        this.props.searchBusA1(this.state.keyword)
    }
    onChangeProvince = (value) => {
        console.log(`selected ${value}`);
    
        this.setState({
          selectProvince: value,
        //   selectCodeCar: 'Vui long chon ma xe'
        })
      }

      onChangeStation = (value) => {
        console.log(`selected ${value}`);
    
        this.setState({
          selectStation: value,
        //   selectCodeCar: 'Vui long chon ma xe'
        })
      }
      onChangeCarMFG  = (value) => {
        console.log(`selected ${value}`);
    
        this.setState({
          selectCarMFG: value,
        //   selectCodeCar: 'Vui long chon ma xe'
        })
      }
    listDriver = () => {
        const data = [];
        let {listBusA1,listSearch} = this.props;
    let filterNameStation = this.state.filterNameStation
    if (filterNameStation) {
      listBusA1 = listBusA1.filter((task) => {
       
        if (filterNameStation === '') {
          return task;
        }
        else if (filterNameStation === task.station._id) {
          return task
        }
      });
    }
    listBusA1 = listBusA1.filter((task) => {
      return task.nameBusA1.toLowerCase().indexOf(listSearch.toLowerCase()) !== -1;
  });
    listBusA1.map((item, index) => {
      var date1 = new Date(item.SContactBusA1);
      var date2 = new Date(item.EContactBusA1);
      var diff = new Date(date2.getTime() - date1.getTime());
      const tinhSalary =(((diff.getUTCFullYear() - 1970)*12)+diff.getUTCMonth()) *  item.salaryBusA1
          data.push({
            key: index,
            _id: item._id,
            nameBusA1: item.nameBusA1,
            addressBusA1: item.addressBusA1,
            sdtBusA1: item.sdtBusA1,
            bdayBusA1:`${new Date(item.bdayBusA1).toLocaleDateString("es-CL")}`,
            CMNDBusA1:item.CMNDBusA1,
            avatarBusA1: item.avatarBusA1,
            SContactBusA1:`${new Date(item.SContactBusA1).toLocaleDateString("es-CL")}`,
            EContactBusA1:`${new Date(item.EContactBusA1).toLocaleDateString("es-CL")}`,
            salaryBusA1:`${numberToMoney(item.salaryBusA1)}đ`,
            allowanceBusA1:item.allowanceBusA1,
            totalSalary:`${numberToMoney(tinhSalary)}đ`
          })
        })
        return data;
      }
      onCreate = (values) => {
        console.log('Received values of form: ', values);
        var formData = new FormData(); // Currently empty
        formData.append("nameBusA1", values.nameBusA1);
        formData.append("addressBusA1", values.addressBusA1);
        formData.append("sdtBusA1", values.sdtBusA1);
        formData.append("bdayBusA1", values.bdayBusA1);
        formData.append("CMNDBusA1", values.CMNDBusA1);
        formData.append("avatarBusA1", values.avatarBusA1.fileList[0].originFileObj);
        formData.append("SContactBusA1", values.SContactBusA1);
        formData.append("EContactBusA1", values.EContactBusA1);
        formData.append("salaryBusA1", values.salaryBusA1);
        formData.append("allowanceBusA1", values.allowanceBusA1);
        formData.append("station", values.station);
        formData.append("car", values.car);
        if (values.id) {
           this.props.putBusA1Request(values.id, formData)
        }
         else {
           console.log(values)
          this.props.postBusA1Request(formData)
        }
        this.setState({
          visible: false,
          data: [
            {
              name: ["id"],
              value: ""
            },
            {
              name: ["nameBusA1"],
              value: ""
            },
            {
              name: ["addressBusA1"],
              value: ""
            },
            {
              name: ["sdtBusA1"],
              value: ""
            },
            {
              name: ["bdayBusA1"],
              value: ""
            },
            {
              name: ["CMNDBusA1"],
              value: ""
            },
            {
              name: ["avatarBusA1"],
              value: ""
            },
            {
              name: ["SContactBusA1"],
              value: ""
            },
            {
              name: ["EContactBusA1"],
              value: ""
            },
            {
              name: ["salaryBusA1"],
              value: ""
            },
            {
              name: ["allowanceBusA1"],
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
        var listBusA1 = this.props.listBusA1
        var index = listBusA1.findIndex(x => x._id === id);
        var data = listBusA1[index];
        console.log(data)
        this.setState({
          visible: true,
          selectStation: data.station._id,
           selectProvince: data.station.province._id,
          selectCarMFG: data.car.CarMFG.nameCarMFG,
          data: [
            {
              name: ["id"],
              value: data._id
            },
            {
              name: ["nameBusA1"],
              value: data.nameBusA1
            },
            {
              name: ["addressBusA1"],
              value: data.addressBusA1
            },
            {
              name: ["sdtBusA1"],
              value: data.sdtBusA1
            },
            {
              name: ["bdayBusA1"],
              value: moment(data.bdayBusA1)
            },
            {
              name: ["CMNDBusA1"],
              value: data.CMNDBusA1
            },
            // {
            //   name: ["avatarBusA1"],
            //   value: data.avatarBusA1
            // },
            {
              name: ["SContactBusA1"],
              value: moment(data.SContactBusA1moment)
            },
            {
              name: ["EContactBusA1"],
              value:  moment(data.EContactBusA1)
            },
            {
              name: ["salaryBusA1"],
              value: data.salaryBusA1
            },
            {
              name: ["allowanceBusA1"],
              value: data.allowanceBusA1
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
        this.props.deleteBusA1Request(id)
      }
      onChangeFilterStation = (value) => {
        console.log(`selected ${value}`);
        this.setState({
          filterNameStation: value,
          //   selectCodeCar: 'Vui long chon ma xe'
        })
      }
    render() {
        console.log(this.props.listDriver)
        console.log(this.props.listStation)
        
        return (
            <>
            <div>
            <h4 style={{marginBottom:'10px'}}>Quản lý Tài xế</h4>
            <div className='SearchTicket'>
                <div className="input-groupSearch">
                <Button style={{marginBottom:'15px'}}
                type="primary"
                onClick={() => {
                  this.setState({
                    FindId:'',
                    visible: true,
                    data: [
                      {
                        name: ["id"],
                        value: ""
                      },
                      {
                        name: ["nameBus"],
                        value: ""
                      },
                      {
                        name: ["codeBus"],
                        value: ""
                      },
                      {
                        name: ["imageBus"],
                        value: ""
                      },
                      {
                        name: ["Seats"],
                        value: ""
                      },
                       {
                        name: ["typesSeat"],
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
            //   listBusA={this.pr}
              selectCarMFG={this.state.selectCarMFG}
              onChangeCarMFG={this.onChangeCarMFG}
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
              <Table bordered  scroll={{ x: 1500 }} columns={this.state.columns} dataSource={this.listDriver()} />
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
    listBusA1:state.listBusA1.busA1s,
    listSearch:state.searchBusA1.keyword
  });
  
  const mapDispathToProps = (dispatch) => {
    return {
        postBusA1Request: (data) => {
        dispatch(postBusA1Request(data))
      },
      putBusA1Request: (id, data) => {
        dispatch(putBusA1Request(id, data))
      },
      deleteBusA1Request: (id) => {
        dispatch(deleteBusA1Request(id))
      },
      searchBusA1:(keyword)=>{
        dispatch(searchBusA1(keyword))
      }
    }
  }
  export default connect(mapStateToProps, mapDispathToProps)(BusA1s);
