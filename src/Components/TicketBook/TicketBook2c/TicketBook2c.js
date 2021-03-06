import React, { Component } from 'react'
import TicketBook2cLeft from './TicketBook2cLeft/TicketBook2cLeft'
import TicketBook2cLeftCheckBox from './TicketBook2cLeft/TicketBook2cLeftCheckBox'
import TicketBook2cRight from './TicketBook2cRight/TicketBook2cRight'
import TicketBook2cRightCheckBox from './TicketBook2cRight/TicketBook2cRightCheckBox';
import TicketBook2cLeftTime from './TicketBook2cLeft/TicketBook2cLeftTime';
import TicketBook2cRightTime from './TicketBook2cRight/TicketBook2cRightTime';
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import { postTicketRequest } from './../../../actions/tickets';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, } from "react-router-dom";
import Payment2c from '../../Payment/Payment2c';
class TicketBook2c extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // typesStation: this.props.LuotDi[0]._id,
            typesStation:`${this.props.LuotDi[0].fromStation.nameStation} - ${this.props.LuotDi[0].toStation.nameStation}`,
            typesStation1:`${this.props.LuotVe[0].fromStation.nameStation} - ${this.props.LuotVe[0].toStation.nameStation}`,

            // itemStart:this.props.LuotDi[0],
            itemStart: this.props.LuotDi[0],
            itemEnd: this.props.LuotVe[0],
            setCodesLuotDi: [],
            priceLuotDi: 0,
            setCodesLuotVe: [],
            priceLuotVe: 0,
            continue: true,
            continue2: false,
            continue3: false,
            registers: {
                typesTicket: '',
                tripId: '',
                tripIDTo: '',
                emailKH: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).email : '',
                seatCodes: '',
                seatCodesTo: '',
                sdt: '',
                address: '',
                fullName: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).fullName : '',
                // price:this.props.item.price,
                // item_List:[],
                // totalPrice:0,
                captureID: ''
            },
            registersERR: {
                fullName: '',
                emailKH: '',
                sdt: '',
                address: ''
            },
            item_List: [],
            value: this.props.LuotDi[0]._id,
            value1: this.props.LuotVe[0]._id,
            timeDi:this.props.LuotDi[0].startTime,
            timeVe:this.props.LuotVe[0].startTime,
        }
    }


    handleChangeTime = (event) => {
        console.log(event.target.value)
        this.props.LuotDi.map(item => {
            if (item._id === event.target.value) {
                this.setState({
                    itemStart: item,
                    timeDi:item.startTime,
                    setCodesLuotDi: [],
                    priceLuotDi: 0,
                    value: event.target.value,
                })
            }
        })
    }

    handleChangeTime1 = (event) => {
        console.log(event.target.value)
        this.props.LuotVe.map(item => {
            if (item._id === event.target.value) {
                this.setState({
                    itemEnd: item,
                    timeVe:item.startTime,
                    setCodesLuotVe: [],
                    priceLuotVe: 0,
                    value1: event.target.value
                })
            }
        })
    }
    handleRadioChange = (event, data) => {
        console.log(event.target.value)
        this.setState({
            itemStart: data,
            timeDi:data.startTime,
            value: data._id,
            typesStation: event.target.value
        })
    }
    handleRadioChange1 = (event, data) => {
        console.log(event.target.value)
        this.setState({
            itemEnd: data,
            timeVe:data.startTime,
            value1: data._id,
            typesStation1: event.target.value
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
    onCheckbox1 = (priceLuotVex, setCodesLuotVex) => {
        console.log(priceLuotVex, setCodesLuotVex)
        let { setCodesLuotVe, priceLuotVe } = this.state;
        var findI = setCodesLuotVe.findIndex(x => x === setCodesLuotVex)
        if (findI === -1) {
            setCodesLuotVe.push(setCodesLuotVex)
            priceLuotVe = priceLuotVe + priceLuotVex
        } else {
            var xoaCode = setCodesLuotVe.indexOf(setCodesLuotVex);
            setCodesLuotVe.splice(xoaCode, 1);
            priceLuotVe = priceLuotVe - priceLuotVex
        }
        this.setState({
            setCodesLuotVe: setCodesLuotVe,
            priceLuotVe: priceLuotVe
        })
    }
    onChangeStation = () => {
        this.setState({
            setCodesLuotDi: [],
            priceLuotDi: 0
        })
    }
    onChangeStation1 = () => {
        this.setState({
            setCodesLuotVe: [],
            priceLuotVe: 0
        })
    }

    onContinue2 = () => {
        let { registers, setCodesLuotDi, setCodesLuotVe, value, value1 } = this.state;
        registers.tripId = value;
        registers.tripIDTo = value1;
        registers.seatCodes = setCodesLuotDi;
        registers.seatCodesTo = setCodesLuotVe;
        registers.typesTicket = this.props.ve;
        if (setCodesLuotDi.length > 0 && setCodesLuotVe.length > 0) {
            this.setState({
                continue2: true,
                continue: false
            })
        }
    }
    validate = () => {
        let fullName = "", address = "", sdt = "", emailKH = "";
        let { registers } = this.state;
        if (registers.fullName.trim() === '') {
            fullName = "vui l??ng nh???p H??? v?? t??n";
        }
        if (registers.emailKH.trim() === '') {
            emailKH = "vui l??ng nh???p email";
        }
        if (registers.sdt === '') {
            sdt = "vui l??ng nh???p sdt";
        }
        if (registers.address.trim() === '') {
            address = "vui l??ng nh???p ?????a ch???";
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
                    description: "Ch??? ng???i l?????t ??i: ",
                    name: item,
                    unit_amount: {
                        currency_code: "USD",
                        value: Number((this.state.itemStart.price / 23083).toFixed(2))
                    },
                    quantity: "1",
                })
            })
            registers.seatCodesTo.filter((item) => {
                item_List.push({
                    description: "Ch??? ng???i l?????t v???: ",
                    name: item,
                    unit_amount: {
                        currency_code: "USD",
                        value: Number((this.state.itemEnd.price / 23083).toFixed(2))
                    },
                    quantity: "1",
                })
            })



            this.setState({
                // setCodesLuotDi: [],
                // priceLuotDi: 0,
                // setCodesLuotVe: [],
                // priceLuotVe: 0,
                // registersERR:{
                //     fullName:"",
                //     emailKH:"",
                //     sdt:"",
                //     address:""
                // },
                continue3: true,
                continue2: false,
                continue: false,
            });
        }

    }
    onGoBack = () => {
        this.setState({
            continue2: false,
            continue: true,
            setCodesLuotVe: [],
            priceLuotVe: 0,
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
    onGoBack3 = () => {
        this.setState({
            continue2: true,
            continue3: false,
            continue: false
        })
    }
    render() {
        // console.log(this.state.typesStation)
        // console.log(this.state.typesStation1)
        console.log(this.state.itemStart)
        // console.log(this.state.itemEnd)
        // console.log(this.state.value)
        // console.log(this.state.value1)
        let { from, ve, to, LuotDi, LuotVe } = this.props;
        let homedi, homedi1, homeve, homeve1, homediTime, homeveTime;
        let LuotDiForm = this.props.LuotDi[0].fromStation.province.nameProvince;
        let LuotDiTo = this.props.LuotDi[0].toStation.province.nameProvince;
        let LuotVeForm = this.props.LuotVe[0].fromStation.province.nameProvince;
        let LuotVeTo = this.props.LuotVe[0].toStation.province.nameProvince;
        let stationLuotDi = [];
        let stationLuotVe = [];
        // let []
        if (ve === '2c') {
            homedi = LuotDi.map((item, index) => {
                //stationDEN.includes(item.yoStation.nameStation) === false 
                if (stationLuotDi.includes(`${item.fromStation.nameStation} - ${item.toStation.nameStation}`) === false) {
                    stationLuotDi.push(`${item.fromStation.nameStation} - ${item.toStation.nameStation}`);
                    return <TicketBook2cLeft onChangeStation={this.onChangeStation} handleRadioChange={this.handleRadioChange} typesStation={this.state.typesStation} key={index} item={item} index={index}></TicketBook2cLeft>
                }

            })
        }
        if (ve === '2c') {
            homediTime = LuotDi.map((item, index) => {
                if (`${item.fromStation.nameStation} - ${item.toStation.nameStation}` === this.state.typesStation) {

                    return <TicketBook2cLeftTime key={index} item={item} index={index}></TicketBook2cLeftTime>
                }
            })
        }
        if (ve === '2c') {
            homedi1 = LuotDi.map((item, index) => {
                return <TicketBook2cLeftCheckBox onCheckbox={this.onCheckbox} value={this.state.value} typesStation={this.state.typesStation} key={index} item={item} index={index}></TicketBook2cLeftCheckBox>
            })
        }
        if (ve === '2c') {
            homeve = LuotVe.map((item, index) => {
                if (stationLuotVe.includes(`${item.fromStation.nameStation} - ${item.toStation.nameStation}`) === false) {
                    stationLuotVe.push(`${item.fromStation.nameStation} - ${item.toStation.nameStation}`);
                    return <TicketBook2cRight onChangeStation1={this.onChangeStation1} handleRadioChange1={this.handleRadioChange1} typesStation1={this.state.typesStation1} key={index} item={item} index={index}></TicketBook2cRight>
                }
            })
        }
        if (ve === '2c') {
            homeveTime = LuotVe.map((item, index) => {
                if (`${item.fromStation.nameStation} - ${item.toStation.nameStation}` === this.state.typesStation1) {

                    return <TicketBook2cRightTime key={index} item={item} index={index}></TicketBook2cRightTime>
                }
            })
        }
        if (ve === '2c') {
            homeve1 = LuotVe.map((item, index) => {
                return <TicketBook2cRightCheckBox onCheckbox1={this.onCheckbox1} value1={this.state.value1} typesStation1={this.state.typesStation1} key={index} item={item} index={index}></TicketBook2cRightCheckBox>
            })
        }
        return (
            <>
              <div className="container step-lineT">
                    <div className="lineT">
                        <div className="current-lineT"></div>
                        <div className="next-lineT" style={ this.state.continue2 || this.state.continue3 ? {background:'#1890ff'} : {} }></div>
                        <div className="next-lineX" style={ this.state.continue3 ? {background:'#1890ff'} : {} }></div>
                    </div>
                    <div className="step-circles">
                        <div className="current-step">
                            <div className="text">1</div>
                            {/* <div  className="active-title" style="display: none;">
                                CH???N TUY???N
                            </div> */}
                        </div>
                        <div className="next-step" style={ this.state.continue2 || this.state.continue3 ? {background:'#1890ff'} : {} }>
                            <div className="text">2</div>
                            <div className="active-titleT" style={this.state.continue ? {} : { display: 'none' }} >
                                CH???N GH???
                            </div>
                    </div>                          
                        <div className="empty-step" style={ this.state.continue2  ? {background:'#fff',border:'2px solid #1890ff'} : this.state.continue3 ? {background:'#1890ff'} :{} } >
                            <div className="text">3</div>
                            <div className="active-titleT" style={this.state.continue2 ? {} : { display: 'none' }}>
                                TH??NG TIN KH??CH H??NG
                            </div>                                   
                        </div>
                        <div className="empty-step" style={ this.state.continue3 ? {background:'#fff',border:'2px solid #1890ff'} : {} }>
                            <div className="text">4</div>
                            <div className="active-titleT" style={this.state.continue3 ? {} : { display: 'none' }}>
                                THANH TO??N
                            </div>
                        </div>


                    </div>

                </div>

                {this.state.continue === true ?
                    <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="info-container">
                                        <div className="title">L?????t ??i <span >{new Date(this.state.timeDi).getHours()}:{(new Date(this.state.timeDi).getMinutes() < 10 ? '0' : '')}{new Date(this.state.timeDi).getMinutes()} &nbsp;</span>{JSON.parse(localStorage.getItem("OriginDest")).selectDate}</div>
                                        <div className="route-name">{this.props.LuotDi[0].fromStation.province.nameProvince} ??? {this.props.LuotDi[0].toStation.province.nameProvince}</div>
                                        <div className="route-list">
                                            <div className="station-select-title">Ch???n b???n xe</div>

                                            <div className='typesTicket2C'>
                                                {homedi}
                                            </div>
                                        </div>
                                        <div className="start-time">
                                            <div className="start-time-title">Gi??? kh???i h??nh</div>
                                            <select className="time-select" onChange={this.handleChangeTime}>
                                                {homediTime}
                                            </select>


                                        </div>
                                        <div className="pick-up">
                                            <div className="pick-up-title">??i???m l??n xe</div>
                                            <div className="pickup-select"><span>{this.state.itemStart.fromStation.nameStation}: {this.state.itemStart.fromStation.addressStation}</span></div>
                                        </div>
                                    </div>
                                    <div className="seat-map-container">
                                        <div className="title">S?? ????? gh???</div>
                                        <div className="seat-tables">
                                            {homedi1}
                                        </div>

                                        <div className="seat-statuses">
                                            <div className="status-item">
                                                <div className="active"></div>
                                                <div className="status-text">Tr???ng</div>
                                            </div> <div className="status-item">
                                                <div className="select"></div>
                                                <div className="status-text">??ang ch???n</div>
                                            </div>
                                            <div className="status-item">
                                                <div className="disable"></div>
                                                <div className="status-text">???? ?????t</div>
                                            </div>
                                        </div>
                                        <div className="footer">
                                            <div className="selected">
                                                <div className="title">
                                                    Gh??? ???? ch???n:
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
                                                <div className="title">T???ng ti???n</div>
                                                <div className="total-price-text">
                                                    {this.state.priceLuotDi}
                                                    <sup >???</sup>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="info-container">
                                        <div className="title" style={{color:'#f15a24'}}>L?????t v??? <span>{new Date(this.state.timeVe).getHours()}:{(new Date(this.state.timeVe).getMinutes() < 10 ? '0' : '')}{new Date(this.state.timeVe).getMinutes()} &nbsp;</span>{JSON.parse(localStorage.getItem("OriginDest")).selectDateTo}</div>
                                        <div className="route-name">{this.props.LuotVe[0].fromStation.province.nameProvince} ??? {this.props.LuotVe[0].toStation.province.nameProvince}</div>
                                        <div className="route-list">
                                            <div className="station-select-title">Ch???n b???n xe</div>
                                            <div className='typesTicket2C'>
                                                {homeve}
                                            </div>
                                        </div>
                                        <div className="start-time">
                                            <div className="start-time-title">Gi??? kh???i h??nh</div>
                                            <select className="time-select" onChange={this.handleChangeTime1}>
                                                {homeveTime}
                                            </select>


                                        </div>
                                        <div className="pick-up">
                                            <div className="pick-up-title">??i???m l??n xe</div>
                                            <div className="pickup-select"><span>{this.state.itemEnd.fromStation.nameStation}: {this.state.itemEnd.fromStation.addressStation}</span></div>
                                        </div>
                                    </div>

                                    <div className="seat-map-container">
                                        <div className="title">S?? ????? gh???</div>
                                        <div className="seat-tables">
                                            {homeve1}
                                        </div>
                                        <div className="seat-statuses">
                                            <div className="status-item">
                                                <div className="active"></div>
                                                <div className="status-text">Tr???ng</div>
                                            </div> <div className="status-item">
                                                <div className="select"></div>
                                                <div className="status-text">??ang ch???n</div>
                                            </div>
                                            <div className="status-item">
                                                <div className="disable"></div>
                                                <div className="status-text">???? ?????t</div>
                                            </div>
                                        </div>
                                        <div className="footer">
                                            <div className="selected">
                                                <div className="title">
                                                    Gh??? ???? ch???n:
                                            <span style={{ "display": "none" }}>0</span>
                                                </div>
                                                <div className="selected-list">
                                                    {
                                                        this.state.setCodesLuotVe.map(item => {
                                                            return (<span key={item}>{item} </span>)
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="total">
                                                <div className="title">T???ng ti???n</div>
                                                <div className="total-price-text">
                                                    {this.state.priceLuotVe}
                                                    <sup >???</sup>
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
                            QUAY L???I
                            </button></Link>
                            </div>
                            <div className="right-btns">
                                <button className="next-btn" onClick={this.onContinue2}>
                                    TI???P T???C
                                 <img alt="back" className="icon lazyLoad isLoaded" src="./../img/tieptuc.png" />
                                </button>
                            </div>


                        </div>



                    </div>
                    : ' '}



                {this.state.continue2 === true ?
                     <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="info-container info-container1">
                                        <p className="title" >TH??NG TIN H??NH KH??CH</p>
                                        <form id="form-steps" style={{ padding: '0px 0px 30px 0px' }} >
                                            <fieldset style={{ 'width': "100%", "paddingLeft": "16px", "paddingRight": "16px" }}>
                                                <p className="input-title">H??? t??n h??nh kh??ch *</p>
                                                <input placeholder="H??? v?? t??n" value={this.state.registers.fullName} name="fullName" onChange={this.onChange} className="input full" />
                                                <span style={{ color: 'red' }}>{this.state.registersERR.fullName}</span>
                                                <p className="input-title">S??? ??i???n tho???i *</p>
                                                <input placeholder="Nh???p s??? ??i???n tho???i" type="tel" value={this.state.registers.sdt} name="sdt" onChange={this.onChange} className="input half left" />
                                                <span style={{ color: 'red' }}>{this.state.registersERR.sdt}</span>
                                                <p className="input-title">Email *</p>
                                                <input placeholder="Nh???p email" type="email" value={this.state.registers.emailKH} name="emailKH" onChange={this.onChange} className="input full" />
                                                <span style={{ color: 'red' }}>{this.state.registersERR.emailKH}</span>
                                                <p className="input-title">?????a ch??? *</p>
                                                <input placeholder="Nh???p ?????a ch???" type="text" value={this.state.registers.address} name="address" onChange={this.onChange} className="input full" />
                                                <span style={{ color: 'red' }}>{this.state.registersERR.address}</span>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="notes-container"><p className="title">??I???U KHO???N &amp; L??U ??</p> <p className="txt">
                                        (*) Qu?? kh??ch vui l??ng mang email c?? ch???a m?? v?? ?????n v??n ph??ng ????? ?????i v?? l??n xe tr?????c gi??? xu???t b???n ??t nh???t 60 ph??t
                                    ????? ch??ng t??i trung chuy???n.
                                </p> <p className="txt">(*) Th??ng tin h??nh kh??ch ph???i ch??nh x??c, n???u kh??ng s??? kh??ng th??? l??n xe ho???c h???y/?????i v??.</p> <p className="txt">
                                            (*) Qu?? kh??ch kh??ng ???????c ?????i/tr??? v?? v??o c??c ng??y L??? T???t (ng??y th?????ng qu?? kh??ch ???????c quy???n chuy???n ?????i ho???c h???y v?? m???t l???n
                                    duy nh???t tr?????c gi??? xe ch???y 24 gi???), ph?? h???y v?? 10%.
                                </p> <p className="txt">
                                            (*) N???u qu?? kh??ch c?? nhu c???u trung chuy???n, vui l??ng li??n h??? s??? ??i???n tho???i
                                    <a data-v-626b8649="" href="tel:0961625241" className="high-light">&nbsp; 0961625241 &nbsp;</a>
                                    tr?????c khi ?????t v??. Ch??ng t??i kh??ng ????n/trung chuy???n t???i nh???ng ??i???m xe trung chuy???n kh??ng th??? t???i ???????c.
                                </p></div>
                                </div>
                            </div>
                      
                        <div className="booking-nav-buttons">
                            <div className="left-btns">
                                <button onClick={this.onGoBack} className="back-btn">
                                    <img alt="back" className="icon lazyLoad isLoaded" src="./../img/quaylai.png" />
                                                QUAY L???I
                                                </button>
                            </div>
                            <div className="right-btns">
                                <button className="next-btn" onClick={this.onContinue3}>
                                    TI???P T???C
                                    < img alt="back" className="icon lazyLoad isLoaded" src="./../img/tieptuc.png" />
                                </button>
                            </div>


                        </div>
                    </div>
                    : ''}

                {this.state.continue3 === true ?
                    <Payment2c goBack={this.props.goBack} item_List={this.state.item_List} itemStart={this.state.itemStart} itemEnd={this.state.itemEnd} priceLuotDi={this.state.priceLuotDi} priceLuotVe={this.state.priceLuotVe} LuotDiForm={LuotDiForm} LuotDiTo={LuotDiTo} LuotVeForm={LuotVeForm} LuotVeTo={LuotVeTo} registers={this.state.registers} onGoBack3={this.onGoBack3}></Payment2c>

                    : ''}
                {/* <div classNameName='AllTicket'>

                </div> */}

            </>
        )
    }
}



const mapDispathToProps = (dispatch) => {
    return {
        postTicketRequest: (data) => {
            dispatch(postTicketRequest(data))
        },
    }
}


export default connect(null, mapDispathToProps)(TicketBook2c)