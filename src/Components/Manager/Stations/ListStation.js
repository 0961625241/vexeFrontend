import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Table, Space, Select, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { postStationRequest, putStationRequest, deleteStationRequest } from './../../../actions/stations';
import { search } from './../../../actions/index';
import Item from 'antd/lib/list/Item';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;
const CollectionCreateForm = ({ listProvince, listStation, FindId, visible, onCreate, onCancel, data }) => {

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
        }}
      >
        <Form.Item
          hidden
          name="id"
          label="id"
        >
          <Input />
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
              listProvince.map((item, index) => {
                return (<Option key={index + item._id} value={item._id}>{item.nameProvince}</Option>)
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="nameStation"
          label="Tên bến xe"
          rules={[
            {
              required: true,
              message: 'Tên bến xe không được để trống !',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="addressStation"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: 'Địa chỉ không được để trống !',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descriptionStation"
          label="Mô tả"
          rules={[
            {
              required: true,
              message: 'Mô tả không được để trống !',
            },
          ]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};


class ListStation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterNameProvince: "",
      visible: false,
      columns: [
        {
          title: 'Tên bến xe',
          dataIndex: 'name',
          width: 300,
        },
        {
          title: 'Địa chỉ',
          dataIndex: 'address',
          width: 500,
          // sorter: (a, b) => a.amount - b.amount,
        },
        {
          title: 'Khu vực',
          dataIndex: 'province',
          width: 200,
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
          name: ["nameStation"],
          value: ""
        },
        {
          name: ["addressStation"],
          value: ""
        },
        {
          name: ["province"],
          value: ""
        },
        {
          name: ["descriptionStation"],
          value: ""
        }
      ],

      FindId: '',
      keyword: ''
    }


  }



  onDelete = (id) => {
    this.props.deleteStationRequest(id)
  }
  onUpdate = (id) => {

    var listStation = this.props.listStation
    var index = listStation.findIndex(x => x._id === id);
    var data = listStation[index];
    this.setState({
      visible: true,
      FindId: id,
      data: [
        {
          name: ["id"],
          value: data._id
        },
        {
          name: ["nameStation"],
          value: data.nameStation
        },
        {
          name: ["addressStation"],
          value: data.addressStation
        },
        {
          name: ["province"],
          value: data.province._id
        },
        {
          name: ["descriptionStation"],
          value: data.descriptionStation
        }
      ]
    })
  }
  onCreate = (values) => {
    console.log(values)
    console.log('Received values of form: ', values);
    if (values.id) {
      this.props.putStationRequest(values.id, values)
    } else {
      this.props.postStationRequest(values)
    }
    // this.props.postStationRequest(values)
    this.setState({
      visible: false,
      data: [
        {
          name: ["id"],
          value: ""
        },
        {
          name: ["nameStation"],
          value: ""
        },
        {
          name: ["addressStation"],
          value: ""
        },
        {
          name: ["province"],
          value: ""
        },
        {
          name: ["descriptionStation"],
          value: ""
        }
      ]
    })
  };
  listStation = () => {
    const data = []
    let { keyword } = this.state;
    let { listStation, listSearch } = this.props;
    //  const regex = new RegExp(`^${value}`, 'i');
    let filterNameProvince = this.state.filterNameProvince
    if (filterNameProvince) {
      listStation = listStation.filter((task) => {
        if (filterNameProvince === '') {
          return task;
        }
        else if (filterNameProvince === task.province._id) {
          return task
        }
      });
    }
    listStation = listStation.filter((task) => {
      return task.nameStation.toLowerCase().indexOf(listSearch.toLowerCase()) !== -1;
    });

    listStation.map((item, index) => {
      // console.log(item)
      data.push({
        key: index,
        _id: item._id,
        name: item.nameStation,
        address: item.addressStation,
        province: item.province.nameProvince,
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
    this.props.search(this.state.keyword)
  }
  onChangeFilterProvince = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      filterNameProvince: value,
      //   selectCodeCar: 'Vui long chon ma xe'
    })
  }
  render() {

    return (
      <>
        <div>
          <h4 className="titleListManager">Quản lý Bến xe</h4>
          <div className="breadcrumbList"><Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/manager'>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Bến xe
    </Breadcrumb.Item>
          </Breadcrumb></div>
          <div className='SearchTicket'>
            <div className="input-groupSearch">

              <Button
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
                        name: ["nameStation"],
                        value: ""
                      },
                      {
                        name: ["addressStation"],
                        value: ""
                      },
                      {
                        name: ["province"],
                        value: ""
                      },
                      {
                        name: ["descriptionStation"],
                        value: ""
                      }
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
                placeholder="Chọn khu vực"
                optionFilterProp="children"
                onChange={this.onChangeFilterProvince}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Tất cả</Option>
                {
                  this.props.listProvince.map((item, index) => {
                    return (<Option key={index + item._id} value={item._id}>{item.nameProvince}</Option>)
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
            listStation={this.props.listStation}
            FindId={this.state.FindId}
            data={this.state.data}
            visible={this.state.visible === true}
            onCreate={this.onCreate}
            onCancel={() => {
              this.setState({
                visible: false
              })
            }}
          />
          <Table bordered columns={this.state.columns} dataSource={this.listStation()} />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  listStation: state.listStation.stations,
  listProvince: state.listProvince.provinces,
  listSearch: state.search.keyword
});

const mapDispathToProps = (dispatch) => {
  return {
    postStationRequest: (data) => {
      dispatch(postStationRequest(data))
    },
    putStationRequest: (id, data) => {
      dispatch(putStationRequest(id, data))
    },
    deleteStationRequest: (id) => {
      dispatch(deleteStationRequest(id))
    },
    search: (keyword) => {
      dispatch(search(keyword))
    }

  }
}
export default connect(mapStateToProps, mapDispathToProps)(ListStation);



