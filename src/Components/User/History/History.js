import React, { Component } from 'react'
import { putIdClient, getUserIDRequest } from './../../../actions/users';
import { connect } from 'react-redux';
import Headers from './../../Headers/Headers'
import { Space, Layout, Row, Col, Table, Tag, Modal,Button } from 'antd';
import Footers from './../../Footers/Footers';
import { deleteTicketRequest } from './../../../actions/tickets';
import Swal from 'sweetalert2';
function ConvertUSD(VND) {
    return VND / 23075;
}
function numberToMoney(money) {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
const { Header, Footer, Sider, Content } = Layout;


class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            changePassword: {
                email: JSON.parse(localStorage.getItem("User")).email,
                fullName: JSON.parse(localStorage.getItem("User")).fullName,
                passwordCurrent: '',
                passwordNew: '',
                isModalVisible: false,

                
                captureID: '',
                totalPrice: '',
                ticketId: '',
                dataTicket: '',
            },
            typesTicket1c:false,
            typesTicket2c:true
        }
        this.columns1c =[
            {
                title: 'STT',
                dataIndex: 'stt',
            },
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
                title: 'Tổng tiền',
                dataIndex: 'totalPrice',
                render: (text) => (
                    <Space size="middle">
                        <span style={{ color: 'red' }} >{text}</span>
                        {/* <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a> */}
                        {/* <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a> */}
                    </Space>
                )
            },
            {
                title: 'Hành động',
                key: 'action',
                render: (text) => (
                    <a onClick={() => this.showModal(text)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a>
                )
            },
        ]
        this.columns = [

            {
                title: 'STT',
                dataIndex: 'stt',
            },
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
                title: 'Tổng tiền',
                dataIndex: 'totalPrice',
                render: (text) => (
                    <Space size="middle">
                        <span style={{ color: 'red' }} >{text}</span>
                        {/* <a onClick={() => this.onUpdate(text._id)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a> */}
                        {/* <a onClick={() => this.onDelete(text._id)}><i style={{ color: '#1890ff' }} className="far fa-trash-alt"></i></a> */}
                    </Space>
                )
            },
            {
                title: 'Hành động',
                key: 'action',
                render: (text) => (
                    <a onClick={() => this.showModal(text)}><i style={{ color: '#1890ff' }} className="far fa-edit"></i>  </a>
                )
            },
        ];

    }
    componentDidMount() {
        if (JSON.parse(localStorage.getItem("User")) && JSON.parse(localStorage.getItem("User")) !== null) {
            this.props.getUserIDRequest(JSON.parse(localStorage.getItem("User")).id)
        }
    }

    showModal = (text) => {
        console.log(text._id)
        let index = this.props.getIDUser.ticketId.findIndex((item, index) => {
            console.log(item._id === text._id)
            return item._id === text._id
        })
        console.log(index)
        this.setState({
            isModalVisible: true,
            captureID: this.props.getIDUser.ticketId[index].captureID,
            totalPrice: this.props.getIDUser.ticketId[index].totalPrice,
            ticketId: this.props.getIDUser.ticketId[index]._id,
            dataTicket: this.props.getIDUser.ticketId[index],
        })

    };

    handleOk = () => {
        let captureID = this.state.captureID;
        let totalPrice = this.state.totalPrice
        let ticketId = this.state.ticketId;
        let dataTicket = this.state.dataTicket;
        console.log(Number(((totalPrice)/23083).toFixed(2)))
            if(captureID !== '') 
            {
            const clientIdAndSecret = "AXOD1mIiVxUmqztNJB2aN1g_Oq6WH19OciK3NUMBVW7sQXKuYhUm2oatBUz5f1sATdjww5H-MiIjnFuf:EO0w99oTyqkWvSxtAX4MsqC3mEpznc57AYNogtlANgvx8f4BI9RtyAui7yu8PbNzjeiRScecRwycD6ce";
            const base64 = Buffer.from(clientIdAndSecret).toString('base64')
            fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {method: 'POST',headers: { 'Content-Type': 'application/json','Accept': 'application/json','Accept-Language': 'en_US', 'Authorization': `Basic ${base64}`,},
                body: 'grant_type=client_credentials'
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data.access_token)
                fetch(`https://api-m.sandbox.paypal.com/v2/payments/captures/${captureID}/refund`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: `application/json`,
                        Authorization: `Bearer ${data.access_token}`
                    },
                    body: JSON.stringify({
                        amount: {
                            currency_code: "USD",
                            value: Number(((totalPrice)/23083).toFixed(2))
                        }
                    })
                }).then(function (response) {
                    console.log(response)



                })
            }).catch(function () {
                console.log("couldn't get auth token");
              });

            // }
        }
        console.log(ticketId,dataTicket)
        this.props.deleteTicketRequest(ticketId, dataTicket)
        this.setState({
            isModalVisible: false
        })
    };

    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    };
    dataSource1c = () => {
        const data = [];
        let stt = 1;
        if (this.props.getIDUser.ticketId && this.props.getIDUser.ticketId !== undefined) {
            this.props.getIDUser.ticketId.map((item, index) => {
                console.log(item)
                if (item.typesTicket === '1c') {
                    data.push({
                        key: index,
                        stt: stt++,
                        _id: item._id,
                        seats: item.seats,
                        fromStation: item.tripId.fromStation.nameStation,
                        toStation: item.tripId.toStation.nameStation,
                        startTime: item.tripId.startTime,
                        // startTime: `${new Date(item.tripId.startTime).toLocaleDateString("es-CL")}    ${new Date(item.tripId.startTime).toLocaleTimeString()}`,
                        totalPrice: `${numberToMoney(item.totalPrice)}đ`,
                        captureID: item.captureID
                    })
                }
            })
            return data;
        }
    }
    dataSource = () => {
        const data = [];
        let stt = 1;
        if (this.props.getIDUser.ticketId && this.props.getIDUser.ticketId !== undefined) {
            this.props.getIDUser.ticketId.map((item, index) => {
                console.log(item)
                if (item.typesTicket === '2c') {
                    console.log(item)
                    data.push({
                        key: index,
                        stt: stt++,
                        _id: item._id,
                        seats: item.seats,
                        fromStation: item.tripId.fromStation.nameStation,
                        toStation: item.tripId.toStation.nameStation,
                        startTime: item.tripId.startTime,
                      //  startTime: `${new Date(item.tripId.startTime).toLocaleDateString("es-CL")}    ${new Date(item.tripId.startTime).toLocaleTimeString()}`,
                        fromStationDI: item.tripIDTo !== null ? item.tripIDTo.fromStation.nameStation : '',
                        toStationDI: item.tripIDTo !== null ? item.tripIDTo.toStation.nameStation : '',
                        startTimeDI: item.tripIDTo !== null ? item.tripIDTo.startTime : '',
                        // startTimeDI: item.tripIDTo !== null ? `${new Date(item.tripIDTo.startTime).toLocaleDateString("es-CL")}    ${new Date(item.tripIDTo.startTime).toLocaleTimeString()}` : '',
                        seatsDI: item.seatCodesTo,
                        totalPrice: `${numberToMoney(item.totalPrice)}đ`,
                        captureID: item.captureID
                    })
                }
            })
            return data;
        }
    }

    onChange = (event) => {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        console.log(value)
        this.setState(prevState => ({
            changePassword: {
                ...prevState.changePassword,
                [name]: value
            }
        }))
    }
    onSubmit = (e) => {
        e.preventDefault();
        let changePassword = this.state.changePassword;
        console.log(changePassword)
        this.props.putIdClient(changePassword)
        Swal.fire(
            '',
            'Thay đổi mật khẩu thành công',
            'success'
        )
    }
    onClickTicket1c=()=>{
        this.setState({
            typesTicket1c:true,
            typesTicket2c:false
        })
    }
    onClickTicket2c=()=>{
        this.setState({
            typesTicket2c:true,
            typesTicket1c:false
        })
    }
    render() {
        return (
            <>
                <Layout className="layout-history">
                    <Headers></Headers>
                    <section className='history' style={{ background: '#F7F9FA' }}>
                        <div className="container">
                            <Row gutter={16}>
                                <Col className="gutter-row" span={6}>
                                    <div className="aside" >
                                        <div className="aside-sidebar">
                                            <div className="aside-user">
                                                <div className="aside-user__info">
                                                    <img alt="" className="aside-user__info-thumb" src="https://avatargarenanow-a.akamaihd.net/avatar/user/375/80/110080375.2164260864.jpg" />
                                                    <div className="aside-user__info-desc">
                                                        <div className="aside-user__info-name">{JSON.parse(localStorage.getItem("User")).fullName}</div>
                                                    </div>
                                                </div>
                                                <div className="aside-user__state">
                                                    <div className="aside-user__state-lv">
                                                        <div className="aside-user__state-lv-icon" />
                                                    </div>
                                                    <div className="aside-user__state-shell">
                                                        <div className="aside-user__state-shell-icon" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="aside-panel">
                                                <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
                                                    <li className="nav-item">
                                                        <a href="#" className="aside-panel__item nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                                                            <div className="aside-panel__icon--password" ></div>
                                                            <div className="aside-panel__txt" >Xem thông tin</div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#" className="aside-panel__item nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                                                            <div className="aside-panel__icon--mobile" /><div className="aside-panel__txt">Thay đổi Mật Khẩu</div>
                                                            <div className="aside-panel__operation">Thay đổi </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </Col>
                                <Col className="gutter-row" span={18}>
                                    <div style={{ background: '#FFF', minHeight: '500px' }}>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="content-item__title">THÔNG TIN</div>
                                                <div className="content-item__main"></div>
                                                <div className='contentData' style={{ padding: '20px' }}>
                                                   { this.state.typesTicket2c === true ? 
                                                   <div>
                                                        <Button style={{marginBottom:'10px'}} onClick={this.onClickTicket1c} type="primary">Xem vé 1 chiều</Button>
                                                       <Table scroll={{ x: 1500 }} dataSource={this.dataSource()}  bordered columns={this.columns} />
                                                       </div>
                                                   :''}
                                                      { this.state.typesTicket1c === true ? 
                                                   <div>
                                                        <Button style={{marginBottom:'10px'}} onClick={this.onClickTicket2c} type="primary">Xem vé 2 chiều</Button>
                                                       <Table bordered scroll={{ x: 1000 }} dataSource={this.dataSource1c()}  bordered columns={this.columns1c} />
                                                       </div>
                                                   :''}
                                                
                                                </div>
                                                <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                                                    <p>Nếu bạn muốn hủy chuyến đi ,bạn sẽ bị mất 30% tiền của bạn. </p>
                                                    <p>Bạn có chắc chưa ?</p>
                                                </Modal>
                                                <div className="content-item__main"></div>
                                            </div>
                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <div className="content-item__title">ĐỔI MẬT KHẨU</div>
                                                <div className="content-item__main">
                                                    <div className="content-stepEdit" >
                                                        <div className="form-group">
                                                            <label >Email</label>
                                                            <input disabled={true} type="email" name="email" value={this.state.changePassword.email} className="form-control" placeholder="Enter email" onChange={this.onChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Full Name</label>
                                                            <input disabled={true} type="text" name="fullName" value={this.state.changePassword.fullName} className="form-control" placeholder="fullName" onChange={this.onChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Mật khẩu Cũ</label>
                                                            <input value={this.state.changePassword.passwordCurrent} name="passwordCurrent" type="text" className="form-control" placeholder="Nhập mật khẩu cũ" onChange={this.onChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Mật khẩu Mới</label>
                                                            <input value={this.state.changePassword.passwordNew} name="passwordNew" type="text" className="form-control" placeholder="Nhập mật khẩu mới" onChange={this.onChange} />
                                                        </div>
                                                        <button className='submitEditInfor' onClick={this.onSubmit} type="submit" >
                                                            XÁC NHẬN
                                        </button>
                                                    </div>
                                                </div>
                                                <div className="content-item__main"></div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </section>
                    <Footers></Footers>
                </Layout>
            </>
        )
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        getUserIDRequest: (id) => {
            dispatch(getUserIDRequest(id))
        },
        putIdClient: (data) => {
            dispatch(putIdClient(data))
        },
        deleteTicketRequest: (id, data) => {
            dispatch(deleteTicketRequest(id, data))
        },
    }
}
const mapStateToProps = (state) => ({
    userLogin: state.userLogin.getUserLogin,
    getIDUser: state.listUser.getIDUser,
});
export default connect(mapStateToProps, mapDispathToProps)(History);