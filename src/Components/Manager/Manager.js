import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Table, Space, Select, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
// import { postStationRequest, putStationRequest, deleteStationRequest } from './../../../actions/stations';
// import { search } from './../../../actions/index';
import Item from 'antd/lib/list/Item';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;
// import DashboardItem from './Dashboard/DashBoardItem';

class Manager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterNameProvince: "",
      visible: false,
      columns: [
        {
          title: 'Tên quản lý',
          dataIndex: 'ModelName',
          width: 100,
        },
        {
          title: 'Giá trị',
          dataIndex: 'Records',
          width: 800,
          render: (text) => (
            <>

              <div className="progress progress-success">
                <div className={`progress-bar progress-bar-striped ${text.class}`} role="progressbar" style={{ width: `${text.name}%` }} aria-valuenow={text} aria-valuemin={0} aria-valuemax={100}> {text.name}</div>
              </div>

            </>
          )
          // sorter: (a, b) => a.amount - b.amount,
        },
        {
          title: 'Hành động',
          key: 'action',
          width: 100,
          render: (text) => (
            <Space size="middle">
              <Link to={`/manager/${text.link}`}><i style={{ color: '#1890ff' }} className="fas fa-list"></i>  </Link>
            </Space>
          )
        },
      ],
    }


  }
  listStation = () => {
    const data = []
    let { listStation, listSearch, listDriver, listTrip, listTicket, listBusA1, listUser, listCar } = this.props;
    data.push({
      key: 1,
      _id: 1,
      ModelName: 'Bến xe',
      Records: {
        name: listStation.length,
        class: 'bg-success',
      },
      link: 'stations'
    },
      {
        key: 2,
        _id: 2,
        ModelName: 'Tài xế',
        Records: {
          name: listDriver.length,
          class: 'bg-info',
        },
        link: 'drivers'
      },
      {
        key: 3,
        _id: 3,
        ModelName: 'Chuyến đi',
        Records: {
          name: listTrip.length,
          class: 'bg-warning',
        },
        link: 'trips'
      },
      {
        key: 4,
        _id: 4,
        ModelName: 'Vé',
        Records: {
          name: listTicket.length,
          class: 'bg-danger',
        },
        link: 'tickets'
      },
      {
        key: 5,
        _id: 5,
        ModelName: 'Phụ xe',
        Records: {
          name: listBusA1.length,
          class: '',
        },
        link: 'busA1s'
      },
      {
        key: 6,
        _id: 6,
        ModelName: 'Người dùng',
        Records: {
          name: listUser.length,
          class: 'bg-info',
        },
        link: 'users'
      },
      {
        key: 7,
        _id: 7,
        ModelName: 'Hãng xe',
        Records: {
          name: listCar.length,
          class: 'bg-warning',
        },
        link: 'cars'
      },
    )

    return data;
  }
  render() {
    return (
      <>
        <div>
          <h4 className="titleListManager">Quản trị</h4>
          <div className="breadcrumbList">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to='/manager'>Trang chủ</Link>
              </Breadcrumb.Item>
           </Breadcrumb>
           </div>
          <div className='SearchTicket'>
            <div className="input-groupSearch">
            </div>
            <div className="input-groupSearch">
            </div>
            <div className="input-groupSearch" style={{ display: 'flex' }}>
            </div>
          </div>
          <Table pagination={false} bordered columns={this.state.columns} dataSource={this.listStation()} />
        </div>
        {/* <Redirect to="/manager/stations" /> */}
        {/* <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>25%</div>
          </div> */}

      </>
    )
  }
}

const mapStateToProps = (state) => ({
  listDriver: state.listDriver.drivers,
  listStation: state.listStation.stations,
  listProvince: state.listProvince.provinces,
  listTrip: state.listTrip.trips,
  listTicket: state.listTicket.tickets,
  listBusA1: state.listBusA1.busA1s,
  listUser: state.listUser.user,
  listCar: state.listCar.cars,
  listSearch: state.search.keyword
});

const mapDispathToProps = (dispatch) => {
  return {
    // postStationRequest: (data) => {
    //   dispatch(postStationRequest(data))
    // },
    // putStationRequest: (id, data) => {
    //   dispatch(putStationRequest(id, data))
    // },
    // deleteStationRequest: (id) => {
    //   dispatch(deleteStationRequest(id))
    // },
    // search: (keyword) => {
    //   dispatch(search(keyword))
    // }

  }
}
export default connect(mapStateToProps, mapDispathToProps)(Manager);