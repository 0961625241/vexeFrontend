import React, { Component } from 'react'
import Payment from '../../Payment/Payment';
import TicketBook1cAll from './TicketBook1cAll/TicketBook1cAll'
import TicketBook1cAllTime from './TicketBook1cAll/TicketBook1cAllTime';
import TicketBook1cAllCheckBox from './TicketBook1cAll/TicketBook1cAllCheckBox';
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card, Form, Spin } from 'antd';
import { BrowserRouter as Router, Link, } from "react-router-dom";

export default class TicketbookC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typesStation: `${this.props.LuotDi1c[0].fromStation.nameStation} - ${this.props.LuotDi1c[0].toStation.nameStation}`,
            itemStart: this.props.LuotDi1c[0],
            setCodesLuotDi: [],
            priceLuotDi: 0,
            continue: true,
            continue2: false,
            continue3: false,
            registers: {
                typesTicket: '',
                tripId: '',
                emailKH: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).email : '',
                seatCodes: '',
                sdt: '',
                address: '',
                fullName: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).fullName : '',
                captureID: ''
            },
            registersERR: {
                fullName: '',
                emailKH: '',
                sdt: '',
                address: ''
            },
            item_List: [],
            value: this.props.LuotDi1c[0]._id,
            timeDi: this.props.LuotDi1c[0].startTime
        }
    }




    handleChangeTime = (event) => {
        console.log(event.target.value)
        this.props.LuotDi1c.map(item => {
            if (item._id === event.target.value) {
                this.setState({
                    itemStart: item,
                    timeDi: item.startTime,
                    setCodesLuotDi: [],
                    priceLuotDi: 0,
                    value: event.target.value,
                })
            }
        })
    }
    onChangeStation = () => {
        this.setState({
            setCodesLuotDi: [],
            priceLuotDi: 0
        })
    }
    handleRadioChange = (event, data) => {
        console.log(event.target.value)
        this.setState({
            itemStart: data,
            timeDi: data.startTime,
            value: data._id,
            typesStation: event.target.value
        })
    }
    onCheckbox = (priceLuotDix, setCodesLuotDix) => {
        console.log(priceLuotDix, setCodesLuotDix)
        let { setCodesLuotDi, priceLuotDi } = this.state;
        var findI = setCodesLuotDi.findIndex(x => x === setCodesLuotDix)
        if (findI === -1) {
            setCodesLuotDi.push(setCodesLuotDix)
            priceLuotDi = priceLuotDi + priceLuotDix
        } else {
            var xoaCode = setCodesLuotDi.indexOf(setCodesLuotDix);
            setCodesLuotDi.splice(xoaCode, 1);
            priceLuotDi = priceLuotDi - priceLuotDix
        }
        this.setState({
            setCodesLuotDi: setCodesLuotDi,
            priceLuotDi: priceLuotDi
        })
    }
    onContinue2 = () => {
        let { registers, setCodesLuotDi, value } = this.state;
        registers.tripId = value;
        registers.seatCodes = setCodesLuotDi;
        registers.typesTicket = this.props.ve;
        if (setCodesLuotDi.length > 0) {
            this.setState({
                continue2: true,
                continue: false
            })
        }
    }
    onGoBack = () => {
        this.setState({
            continue2: false,
            continue: true,
            setCodesLuotDi: [],
            priceLuotDi: 0,
            registersERR: {
                fullName: "",
                emailKH: "",
                sdt: "",
                address: ""
            }
        })
    }
    onChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState(prevState => ({
            registers: {
                ...prevState.registers,
                [name]: value
            }
        }));
    }
    validate = () => {
        let fullName = "", address = "", sdt = "", emailKH = "";
        let { registers } = this.state;
        if (registers.fullName.trim() === '') {
            fullName = "vui lòng nhập Họ và tên";
        }
        if (registers.emailKH.trim() === '') {
            emailKH = "vui lòng nhập email";
        }
        if (registers.sdt === '') {
            sdt = "vui lòng nhập sdt";
        }
        if (registers.address.trim() === '') {
            address = "vui lòng nhập địa chỉ";
        }

        if (fullName || address || sdt || emailKH) {
            this.setState({
                registersERR: {
                    fullName: fullName,
                    emailKH: emailKH,
                    sdt: sdt,
                    address: address
                }
            })
            return false;
        }
        return true;
    }
    onContinue3 = () => {
        let { item_List, registers } = this.state;
        const isValid = this.validate();
        // this.props.postTicketRequest(registers)
        if (isValid) {
            console.log('vo')
            registers.seatCodes.filter((item) => {
                item_List.push({
                    description: "Chỗ ngồi lượt đi: ",
                    name: item,
                    unit_amount: {
                        currency_code: "USD",
                        value: Number((this.state.itemStart.price / 23083).toFixed(2))
                    },
                    quantity: "1",
                })
            })
            this.setState({
                continue3: true,
                continue2: false,
                continue: false,
            });
        }
    }
    onGoBack3 = () => {
        this.setState({
            continue2: true,
            continue3: false,
            continue: false
        })
    }
    render() {
        let homedi, homedi1, homediTime;
        let { ve, LuotDi1c } = this.props;
        let LuotDiForm = this.props.LuotDi1c[0].fromStation.province.nameProvince;
        let LuotDiTo = this.props.LuotDi1c[0].toStation.province.nameProvince;
        let stationLuotDi = [];
        if (ve === '1c') {
            homedi = LuotDi1c.map((item, index) => {
                if (stationLuotDi.includes(`${item.fromStation.nameStation} - ${item.toStation.nameStation}`) === false) {
                    stationLuotDi.push(`${item.fromStation.nameStation} - ${item.toStation.nameStation}`);
                    return <TicketBook1cAll onChangeStation={this.onChangeStation} handleRadioChange={this.handleRadioChange} typesStation={this.state.typesStation} key={index} item={item} index={index}></TicketBook1cAll>
                }
            })
        }
        if (ve === '1c') {
            homediTime = LuotDi1c.map((item, index) => {
                if (`${item.fromStation.nameStation} - ${item.toStation.nameStation}` === this.state.typesStation) {
                    return <TicketBook1cAllTime key={index} item={item} index={index}></TicketBook1cAllTime>
                }
            })
        }
        if (ve === '1c') {
            homedi1 = LuotDi1c.map((item, index) => {
                return <TicketBook1cAllCheckBox onCheckbox={this.onCheckbox} value={this.state.value} key={index} item={item} index={index}></TicketBook1cAllCheckBox>
            })
        }

        console.log(this.props.LuotDi1c.length)
        return (
            <>
                {this.state.continue === true ?
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="info-container">
                                    <div className="title"><span >{new Date(this.state.timeDi).getHours()}:{(new Date(this.state.timeDi).getMinutes() < 10 ? '0' : '')}{new Date(this.state.timeDi).getMinutes()} {JSON.parse(localStorage.getItem("OriginDest")).selectDate}</span></div>
                                    <div className="route-name">{LuotDi1c[0].fromStation.province.nameProvince} ⇒ {LuotDi1c[0].toStation.province.nameProvince}</div>
                                    <div className="route-list">
                                        <div className="station-select-title">Chọn bến xe</div>
                                        <div className='typesTicket2C'>
                                            {homedi}
                                        </div>
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Giờ khởi hành</div>
                                        <select className="time-select" onChange={this.handleChangeTime}>
                                            {homediTime}
                                        </select>
                                    </div>
                                    <div className="pick-up">
                                        <div className="pick-up-title">Điểm lên xe</div>
                                        <div className="pickup-select"><span>{this.state.itemStart.fromStation.nameStation}: {this.state.itemStart.fromStation.addressStation}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="seat-map-container">
                                    <div className="title">Sơ đồ ghế</div>
                                    <div className="seat-tables">
                                        {homedi1}
                                    </div>
                                    <div className="seat-statuses">
                                        <div className="status-item">
                                            <div className="active"></div>
                                            <div className="status-text">Trống</div>
                                        </div> <div className="status-item">
                                            <div className="select"></div>
                                            <div className="status-text">Đang chọn</div>
                                        </div>
                                        <div className="status-item">
                                            <div className="disable"></div>
                                            <div className="status-text">Đã đặt</div>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <div className="selected">
                                            <div className="title">
                                                Ghế đã chọn:
                                                <span style={{ "display": "none" }}>0</span>
                                            </div>
                                            <div className="selected-list">
                                                {
                                                    this.state.setCodesLuotDi.map(item => {
                                                        return (<span key={item}>{item} </span>)
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="total">
                                            <div className="title">Tổng tiền</div>
                                            <div className="total-price-text">
                                                {this.state.priceLuotDi}
                                                <sup >₫</sup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="booking-nav-buttons">
                            <div className="left-btns">
                                <Link to="/">  <button className="back-btn">
                                    <img alt="back" className="icon lazyLoad isLoaded" src="./../img/quaylai.png" />
                                    QUAY LẠI
                                </button></Link>
                            </div>
                            <div className="right-btns">
                                <button className="next-btn" onClick={this.onContinue2}>
                                    TIẾP TỤC
                                    <img alt="back" className="icon lazyLoad isLoaded" src="./../img/tieptuc.png" />
                                </button>
                            </div>
                        </div>
                    </div>
                    : ''}


                {this.state.continue2 === true ?
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="info-container info-container1">
                                    <p className="title" >THÔNG TIN HÀNH KHÁCH</p>
                                    <form id="form-steps" style={{ padding: '0px 0px 30px 0px' }} >
                                        <fieldset style={{ 'width': "100%", "paddingLeft": "16px", "paddingRight": "16px" }}>
                                            <p className="input-title">Họ tên hành khách *</p>
                                            <input placeholder="Họ và tên" value={this.state.registers.fullName} name="fullName" onChange={this.onChange} className="input full" />
                                            <span style={{ color: 'red' }}>{this.state.registersERR.fullName}</span>
                                            <p className="input-title">Số điện thoại *</p>
                                            <input placeholder="Nhập số điện thoại" type="tel" value={this.state.registers.sdt} name="sdt" onChange={this.onChange} className="input half left" />
                                            <span style={{ color: 'red' }}>{this.state.registersERR.sdt}</span>
                                            <p className="input-title">Email *</p>
                                            <input placeholder="Nhập email" type="email" value={this.state.registers.emailKH} name="emailKH" onChange={this.onChange} className="input full" />
                                            <span style={{ color: 'red' }}>{this.state.registersERR.emailKH}</span>
                                            <p className="input-title">Địa chỉ *</p>
                                            <input placeholder="Nhập địa chỉ" type="text" value={this.state.registers.address} name="address" onChange={this.onChange} className="input full" />
                                            <span style={{ color: 'red' }}>{this.state.registersERR.address}</span>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="notes-container"><p className="title">ĐIỀU KHOẢN &amp; LƯU Ý</p> <p className="txt">
                                    (*) Quý khách vui lòng mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến ít nhất 60 phút
                                    để chúng tôi trung chuyển.
                                </p> <p className="txt">(*) Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/đổi vé.</p> <p className="txt">
                                        (*) Quý khách không được đổi/trả vé vào các ngày Lễ Tết (ngày thường quý khách được quyền chuyển đổi hoặc hủy vé một lần
                                        duy nhất trước giờ xe chạy 24 giờ), phí hủy vé 10%.
                                    </p> <p className="txt">
                                        (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ số điện thoại
                                        <a data-v-626b8649="" href="tel:0961625241" className="high-light">&nbsp; 0961625241 &nbsp;</a>
                                        trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.
                                    </p></div>
                            </div>
                        </div>
                        <div className="booking-nav-buttons">
                            <div className="left-btns">
                                <button onClick={this.onGoBack} className="back-btn">
                                    <img alt="back" className="icon lazyLoad isLoaded" src="./../img/quaylai.png" />
                                    QUAY LẠI
                                </button>
                            </div>
                            <div className="right-btns">
                                <button className="next-btn" onClick={this.onContinue3}>
                                    TIẾP TỤC
                                    < img alt="back" className="icon lazyLoad isLoaded" src="./../img/tieptuc.png" />
                                </button>
                            </div>
                        </div>
                    </div>
                    : ''}


                {this.state.continue3 === true ?
                    <Payment goBack={this.props.goBack} item_List={this.state.item_List} itemStart={this.state.itemStart} priceLuotDi={this.state.priceLuotDi} LuotDiForm={LuotDiForm} LuotDiTo={LuotDiTo} registers={this.state.registers} onGoBack3={this.onGoBack3}></Payment>
                    : ''}
            </>
        )
    }
}

