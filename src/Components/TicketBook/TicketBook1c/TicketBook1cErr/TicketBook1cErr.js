import React, { Component } from 'react'
import { BrowserRouter as Router, Link, } from "react-router-dom";
export default class TicketBook1cErr extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemStart: 'Không tìm thấy thông tin chuyến',
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
            // timeDi: this.props.LuotDi1c[0].startTime
        }
    }
    render() {
       
        return (
            <>
               <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="info-container">
                                {/* {new Date(this.state.timeDi).getHours()}:{(new Date(this.state.timeDi).getMinutes() < 10 ? '0' : '')}{new Date(this.state.timeDi).getMinutes()} {JSON.parse(localStorage.getItem("OriginDest")).selectDate} */}
                                    <div className="title"><span ></span></div>
                                    <div className="route-name">{JSON.parse(localStorage.getItem("OriginDest")).selectTo} ⇒ {JSON.parse(localStorage.getItem("OriginDest")).selectFrom}</div>
                                    <div className="route-list">
                                        <div className="station-select-title">Chọn bến xe</div>
                                        <div className='typesTicket2C'>
                                        <div className="route-info"><div className="route-info-name">{JSON.parse(localStorage.getItem("OriginDest")).selectTo} ⇒ {JSON.parse(localStorage.getItem("OriginDest")).selectFrom}</div>
                                            <span style={{color:'red'}}>Chưa có thông tin giá vé</span>
                                            <input type="radio"  className="route-select-checkbox"  checked={true}   />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="alert alert-info"><p style={{textAlign:'center'}}>Không tìm thấy thông tin chuyến</p></div>
                                    <div className="start-time">
                                        <div className="start-time-title">Giờ khởi hành</div>
                                        {/* <select className="time-select" onChange={this.handleChangeTime}>
                                            {homediTime}
                                        </select> */}
                                    </div>
                                    <div className="pick-up">
                                        <div className="pick-up-title">Điểm lên xe</div>
                                        {/* <div className="pickup-select"><span>{this.state.itemStart.fromStation.nameStation}: {this.state.itemStart.fromStation.addressStation}</span></div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="seat-map-container">
                                    <div className="title">Sơ đồ ghế</div>
                                    <div className="seat-tables">
                                        {/* {homedi1} */}
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
            </>
        )
    }
}
