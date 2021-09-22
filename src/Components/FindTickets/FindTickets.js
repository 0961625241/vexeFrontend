import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Calendar, Input, DatePicker, Button, Select, AutoComplete, ConfigProvider, Modal } from 'antd';
import Icon from '@ant-design/icons';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import moment from 'moment';
import './../../App.css';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';
import Draggable from 'react-draggable';
import { getSelectRequest } from './../../actions/select';
import { connect } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import Swal from 'sweetalert2';
import {getSelectNotify} from './../../actions/loading';

import {getTripRequest} from './../../actions/trips'
const Axios = require('axios');

const dateFromat = 'YYYY/MM/DD';
const monthFromat = 'YYYY/MM';
const dateFromatList = ['DD/MM/YYYY', 'DD/MM/YY'];

function slugify(string) {
    return string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd')
}
class Findtickets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectFrom: JSON.parse(localStorage.getItem("OriginDest")) !== null ? JSON.parse(localStorage.getItem("OriginDest")).selectFrom : this.props.selectFrom,
            selectTo: JSON.parse(localStorage.getItem("OriginDest")) !== null ? JSON.parse(localStorage.getItem("OriginDest")).selectTo : this.props.selectTo,
            provinceArr1: [],
            provinceArr2: [],
            selectDate: JSON.parse(localStorage.getItem("OriginDest")) !== null ? JSON.parse(localStorage.getItem("OriginDest")).selectDate : this.props.selectDate,
            disabled: true,
            qua: 'Tỉnh - Thành Phố',
            selectDateTo:JSON.parse(localStorage.getItem("OriginDest")) !== null ? JSON.parse(localStorage.getItem("OriginDest")).selectDateTo :this.props.selectDateTo,
            typesTicket:JSON.parse(localStorage.getItem("OriginDest")) !== null ? JSON.parse(localStorage.getItem("OriginDest")).selectVe :this.props.selectVe,
            checkdTicket:false
            // selectedOption:'option1'
        }
    }
    // componentWillMount() {
    //     window.addEventListener("mousedown", this.handleClickOutside1);
    //     window.addEventListener("mousedown", this.handleClickOutside2);
    //     return () => {
    //         window.removeEventListener("mousedown", this.handleClickOutside1);
    //         window.removeEventListener("mousedown", this.handleClickOutside2);
    //     };

    // }
    // componentWillUnmount() {
    //     // fix Warning: Can't perFrom a React state update on an unmounted component
    //     this.setState = (state, callback) => {
    //         return;
    //     };
    // }
    onChange1 = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let suggestions = [];
        let qua = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            this.props.listStation.sort().filter(v => {
                if (regex.test(v.nameStation)) {
                    suggestions.push(v.nameStation)
                    this.setState({
                        qua: 'Bến xe'
                    })
                }
                else if (regex.test(v.province.nameProvince)) {
                    suggestions.push(v.province.nameProvince)
                    this.setState({
                        qua: 'Tỉnh - Thành Phố'
                    })
                }

            })
        } else {
            this.props.listStation.sort().filter(v => {
                suggestions.push(v.province.nameProvince)
                this.setState({
                    qua: 'Tỉnh - Thành Phố'
                })
            })

        }
        this.setState({
            selectFrom: value,
            provinceArr1: suggestions,
        })
    }
    onChange2 = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            this.props.listStation.sort().filter(v => {
                if (regex.test(v.nameStation)) {
                    suggestions.push(v.nameStation)
                    this.setState({
                        qua: 'Bến xe'
                    })
                }
                else if (regex.test(v.province.nameProvince)) {
                    suggestions.push(v.province.nameProvince)
                    this.setState({
                        qua: 'Tỉnh - Thành Phố'
                    })
                }
            })
        } else {
            this.props.listStation.sort().filter(v => {
                suggestions.push(v.province.nameProvince)
                this.setState({
                    qua: 'Tỉnh - Thành Phố'
                })
            })
        }
        this.setState({
            selectTo: value,
            provinceArr2: suggestions
        })
    }
    handleFocus1 = (event) => {
        event.target.select();
        let suggestions = [];
        this.props.listStation.sort().filter(v => { return suggestions.push(v.province.nameProvince) })
        this.setState({
            provinceArr1: suggestions,
        })
    }
    handleFocus2 = (event) => {
        event.target.select();
        let suggestions = [];
        this.props.listStation.sort().filter(v => { return suggestions.push(v.province.nameProvince) })
        this.setState({
            provinceArr2: suggestions,
        })
    }
    optionsFrom = () => {
        let province = '';
        let total = -1;
        let arr = [];
        let value = this.state.selectFrom
        const regex = new RegExp(`^${value}`, 'i');

        return this.state.provinceArr1.map((item, index) => {
            if (item !== province) {
                province = item
                return (
                    <li style={this.state.selectFrom === item ? { 'background': 'rgb(24 144 255)', color: 'rgba(0,0,0,.65)', 'fontWeight': '600px' } : {}} key={index} onClick={() => {
                        // document.getElementById('input2').()
                        arr.push(item)
                        this.setState({
                            selectFrom: item,
                            provinceArr1: arr
                        })
                    }}>{item}</li>
                )
            }
        })
    }
    optionsTo = () => {
        let province = '';
        let arr = [];
        return this.state.provinceArr2.map((item, index) => {
            if (item !== province) {
                province = item
                return (
                    <li style={this.state.selectTo === item ? { 'background': 'rgb(24 144 255)', color: 'rgba(0,0,0,.65)', 'fontWeight': '600px' } : {}} key={index} onClick={() => {
                        // document.getElementById('input3').style.background='red'
                        arr.push(item)
                        this.setState({
                            selectTo: item,
                            provinceArr2: arr
                        })
                    }}>{item}</li>
                )
            }
        })
    }
    changeFromTo = (e) => {
        let btn = document.getElementById('btn');
        if (e.target === btn) {
            this.setState({
                selectFrom: this.state.selectTo,
                selectTo: this.state.selectFrom,
                provinceArr1: this.state.provinceArr2,
                provinceArr2: this.state.provinceArr1
            })
        }

    }
    handleClickOutside1 = (event) => {
        let dropdown1 = document.getElementById('dropdown1');
        let bt;
        let bt1;
        if (dropdown1 && !dropdown1.contains(event.target)) {
            if (this.state.provinceArr1.length > 0) {
                this.state.provinceArr1.filter(x => x === this.state.selectFrom).map((item) => {
                    bt = item;
                })
                if (bt !== this.state.selectFrom) {
                    this.setState({
                        selectFrom: this.state.provinceArr1[0],
                    })
                }
            }
            else
                if (this.state.provinceArr1.length === 0) {
                    this.props.listStation.map((item) => {
                        if (item.province.nameProvince === this.state.selectFrom) {
                            bt1 = item.province.nameProvince
                            this.setState({
                                selectFrom: this.state.selectFrom,
                            })
                        }
                    })
                    if (bt1 !== this.state.selectFrom) {
                        this.setState({
                            selectFrom: '',
                        })
                    }
                }
        }
    }
    handleClickOutside2 = (event) => {
        let dropdown2 = document.getElementById('dropdown2');
        let bt;
        let bt1;
        if (dropdown2 && !dropdown2.contains(event.target)) {
            if (this.state.provinceArr2.length > 0) {
                this.state.provinceArr2.filter(x => x === this.state.selectTo).map((item) => {
                    bt = item
                })
                if (bt !== this.state.selectTo) {
                    this.setState({
                        selectTo: this.state.provinceArr2[0],
                    })
                }
            }
            else
                if (this.state.provinceArr2.length === 0) {
                    this.props.listStation.map((item) => {
                        if (item.province.nameProvince === this.state.selectTo) {
                            bt1 = item.province.nameProvince
                            this.setState({
                                selectTo: this.state.selectTo,
                            })
                        }
                    })
                    if (bt1 !== this.state.selectTo) {
                        this.setState({
                            selectTo: '',
                        })
                    }
                }
        }
    };
    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Fromatted Selected Time: ', dateString);
        var mm = value._d.getMonth() + 1;
        var dd = value._d.getDate();
        var yy = value._d.getFullYear();
        var myDateString = dd + '-' + mm + '-' + yy;
        this.setState({
            selectDate: myDateString
        })
    }
    onChangeTo = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Fromatted Selected Time: ', dateString);
        var mm = value._d.getMonth() + 1;
        var dd = value._d.getDate();
        var yy = value._d.getFullYear();
        var myDateString = dd + '-' + mm + '-' + yy;
        this.setState({
            selectDateTo: myDateString
        })
    }
    onOk = (value) => {
        console.log('onOk: ', value);


    }
    onOkTo = (value) => {
        console.log('onOk: ', value);


    }
    showModal = () => {
         Swal.fire({
            title: 'Vui lòng chọn chuyến đi',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `Ok`,
          
          })
    };
    handleOk = e => {
        e.preventDefault();
        console.log(this.state.registers)
        // this.props.postTicketRequest(values)
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    onFindTicket = () => {
    //     if(this.props.listTrip && this.props.listTrip.length === 0)
    //     {
    //         this.props.getSelectNotify({loading: true})
    //         setTimeout(() => {
    //             this.props.history.push(`/vi-VN/ve-xe-khach-tu-${slugify(this.state.selectFrom)}-di-${slugify(this.state.selectTo)}-tg-${this.state.selectDate}-ve${this.state.typesTicket}`)
    //             this.props.getSelectNotify({})
    //             this.props.getSelectRequest(this.state.selectFrom, this.state.selectTo, this.state.selectDate,this.state.selectDateTo,this.state.typesTicket)
    //         }, 2500);
    //     }
    //   else {
         this.props.history.push(`/vi-VN/ve-xe-khach-tu-${slugify(this.state.selectFrom)}-di-${slugify(this.state.selectTo)}-tg-${this.state.selectDate}-ve${this.state.typesTicket}`)
        this.props.getSelectRequest(this.state.selectFrom, this.state.selectTo, this.state.selectDate,this.state.selectDateTo,this.state.typesTicket)
    //   }
    }
    disabledDate(current) {
        let customDate = new Date().toLocaleDateString("es-CL");
        return current && current < moment(customDate, "DD-MM-YYYY");
    }
    disabledDateTo(current) {
        let customDate = new Date().toLocaleDateString("es-CL");
        return current && current < moment(customDate, "DD-MM-YYYY");
    }
    handleRadioChange=(event)=> {
      console.log(event.target.value)
      this.setState({
        typesTicket: event.target.value
      });
    }
    MOMO=()=>{
       let data= {
            "accessKey": "F8BBA842ECF85",
            "partnerCode": "MOMO",
            "requestType": "captureMoMoWallet",
            "notifyUrl": "https://momo.vn",
            "returnUrl": "https://momo.vn",
            "orderId": uuidv1(),
            "amount": "150000",
            "orderInfo": "SDK team.",
            "requestId": uuidv1(),
            "extraData": "email=abc@gmail.com",
            "signature": "996ed81d68a1b05c99516835e404b2d0146d9b12fbcecbf80c7e51df51cac85e"
          }
          Axios({
            method: "POST",
            headers: {
         'content-type': 'application/x-www-form-urlencoded',
                // 'accept': 'application/json',
                // 'content-type': 'multipart/form-data'
            },
            url: "https://test-payment.momo.vn/gw_payment/transactionProcessor"
            , data: data
        }).then((result) => {
            console.log(result)
             window.location.href = result.data.payUrl;
        }).catch((error) => {
            console.log(error.response)
        })
    }
    render() {
        return (
            <>
            {/* <button onClick={this.MOMO}>MoMo</button> */}
                {this.props.selectFromAndTo ?
                    <section>
                        <div className="container">
                            <Row>
                                <Col className="" span={24}>
                                    <span className='titleFromTo'>Vé xe từ {JSON.parse(localStorage.getItem("OriginDest")).selectFrom} đến {JSON.parse(localStorage.getItem("OriginDest")).selectTo}</span>
                                </Col>
                            </Row>
                        </div>
                    </section> : ''}
                <Layout className="book_Ticket" >
                    <div className="container">
                        <Row className="book_Ticket_content">

                            <Col className="ticket-col" md={24} xs={24}>
                                {/* <h4 style={{ color: "white" }}>Đặt vé trực tuyến</h4> */}
                                
                                <div  className="roundtrip-checkbox-container">
                                    <input  type="radio" id="one-way" value="1c"   onChange={this.handleRadioChange} checked={this.state.typesTicket  === '1c'  }/> 
                                        <label htmlFor="one-way"    className="one-way-label">Một chiều</label> 
                                    <input  type="radio" id="round-trip" value="2c"   onChange={this.handleRadioChange} checked={this.state.typesTicket === '2c'}/>
                                        <label  htmlFor="round-trip"   className="round-trip-label">Khứ hồi</label>
                                </div>
                                <div className="book d-flex">
                                    <div className="book__diemdi__diemden">
                                    <div className="dropdown book__diemdi" id='dropdown1'>
                                        <label className="label_diemdi">Điểm đi</label>
                                        {/* <div className="fontAwe"><i className="fas fa-map-marker-alt"></i></div> */}
                                        <input id='input1' autoComplete="off" value={this.state.selectFrom} placeholder="Chọn điểm đi" className="dropdown-toggle book-input" name="selectFrom" type="text" data-toggle="dropdown" onFocus={this.handleFocus1} onChange={this.onChange1} />
                                        <ul className="dropdown-menu select-dropdown">
                                            <li><div>{this.state.provinceArr1 && this.state.provinceArr1.length > 0 ? this.state.qua : ""}</div>
                                                <ul>
                                                    {this.optionsFrom()}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="fontAwex">
                                        <i id="btn" onClick={(e) => this.changeFromTo(e)} className="fas fa-exchange-alt"></i>
                                    </div>
                                    <div className="dropdown book__diemden" id='dropdown2'>
                                        <label className="label_diemdi">Điểm đến</label>
                                        {/* <div className="fontAwe"><i className="fas fa-map-marker-alt"></i></div> */}
                                        <input autoComplete="off" className="dropdown-toggle book-input" placeholder="chọn điển đến" id='input2' type="text" onFocus={this.handleFocus2} name="selectTo" value={this.state.selectTo} onChange={this.onChange2} data-toggle="dropdown"></input>
                                        <ul className="dropdown-menu select-dropdown">
                                            <li><div>{this.state.provinceArr2 && this.state.provinceArr2.length > 0 ? this.state.qua : ""}</div>
                                                <ul>
                                                    {this.optionsTo()}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    </div>
                                   <div className="book__ngdi__ngve">
                                    <div className="dropdown book__ngdi">
                                        <label className="label_diemdi">Ngày đi</label>
                                        <div className="fontAwexx">
                                            <i className="fas fa-calendar-alt"></i>
                                            <ConfigProvider locale={locale}>
                                                <DatePicker
                                                    defaultValue={moment(this.state.selectDate, "DD-MM-YYYY")}
                                                    allowClear={false}
                                                    id='input3'
                                                    suffixIcon={false}
                                                    onChange={this.onChange}
                                                    onOk={this.onOk}
                                                    className="book-date" format={"DD-MM-YYYY"}
                                                    disabledDate={this.disabledDate}
                                                />
                                            </ConfigProvider>
                                            </div>
                                    </div>
                                       <div className="dropdown book__ngve">
                                       <label className="label_diemdi">Ngày về</label>
                                        <div className="fontAwexx" style={this.state.typesTicket === '1c' ? {opacity:'.1',pointerEvents:'none'} : {}}>
                                            <i className="fas fa-calendar-alt"></i>
                                            <ConfigProvider locale={locale}>
                                                <DatePicker
                                                    defaultValue={moment(this.state.selectDateTo, "DD-MM-YYYY")}
                                                    allowClear={false}
                                                    id='input3'
                                                    suffixIcon={false}
                                                    onChange={this.onChangeTo}
                                                    disabled={this.state.typesTicket === '1c' ? true : false}
                                                    onOk={this.onOkTo}
                                                    className="book-date" format={"DD-MM-YYYY"}
                                                    disabledDate={this.disabledDateTo}
                                                />
                                            </ConfigProvider>
                                        </div>
                                      

                                    </div>
                                    </div>
                                  
                                </div>
                                  {this.state.selectTo !== '' && this.state.selectFrom !== '' && this.state.selectDate !== '' ?
                                            <button className="book-btn"   onClick={this.onFindTicket}>
                                                <i className="fa fa-search buy-icon"></i>
                                                TÌM CHUYẾN ĐI
                                                {/* <Link 
                                                    className="buy__ticket"
                                                    onClick={this.onFindTicket}
                                                    to={`/vi-VN/ve-xe-khach-tu-${slugify(this.state.selectFrom)}-di-${slugify(this.state.selectTo)}-tg-${this.state.selectDate}-ve${this.state.typesTicket}`}
                                                > TÌM CHUYẾN ĐI</Link> */}
                                            </button>
                                        :
                                        <div >
                                            <button onClick={this.showModal} className="book-btn" >
                                            <i className="fa fa-search buy-icon"></i> TÌM CHUYẾN ĐI
                                           </button>
                                        </div>
                                        }    
                            </Col>
                        </Row>
                    </div>
                </Layout>
            </>
        )
    }
}



const mapDispathToProps = (dispatch) => {
    return {
        getSelectRequest: (selectFrom, selectTo, selectDate,selectDateTo,selectVe) => {
            dispatch(getSelectRequest(selectFrom, selectTo, selectDate,selectDateTo,selectVe))
        },
        getSelectNotify: (notify) => {
            dispatch(getSelectNotify(notify))
        },
        getTripRequest: () => {
            dispatch(getTripRequest())
        },
    }
}
const mapStateToProps = (state) => ({
    selectFrom: state.selectToFrom.selectFrom,
    selectTo: state.selectToFrom.selectTo,
    selectDate: state.selectToFrom.selectDate,
    selectDateTo:state.selectToFrom.selectDateTo,
    selectVe:state.selectToFrom.selectVe,
});

export default connect(mapStateToProps, mapDispathToProps)(Findtickets);
   // if(data.some(xxx => xxx.value === item.province)  === false)
            // {
            //    total++;
            //     data.push({
            //          key:total,
            //         value:item.province
            //     })
            // }

