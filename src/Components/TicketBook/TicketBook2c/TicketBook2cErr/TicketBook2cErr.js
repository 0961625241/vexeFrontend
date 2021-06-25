import React, { Component } from 'react'
import { BrowserRouter as Router, Link, } from "react-router-dom";
export default class Ticketbook2cerr extends Component {



    render() {
        let seat1s = [1, 2, 3, 4, 5, 6];
        let seat2s = [1, 2, 3, 4, 5, 6]
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="info-container">
                                <div className="title">Lượt đi <span > </span>{JSON.parse(localStorage.getItem("OriginDest")).selectDate}</div>
                                <div className="route-name">{JSON.parse(localStorage.getItem("OriginDest")).selectFrom} ⇒ {JSON.parse(localStorage.getItem("OriginDest")).selectTo}</div>
                                <div className="route-list">
                                    <div className="station-select-title">Chọn bến xe</div>

                                    <div className='typesTicket2C'>
                                        <div className="route-info">
                                            <div style={{ width: '260px' }} className="route-info-name">{JSON.parse(localStorage.getItem("OriginDest")).selectFrom} ⇒ {JSON.parse(localStorage.getItem("OriginDest")).selectTo}</div>
                                            <span style={{ color: 'red', margin: '0px' }}>
                                                Không tìm thấy vé
                                            </span>
                                            <input type="radio" className="route-select-checkbox" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                                <div className="alert alert-info">  <div className="LoadSpinErr" >
                                    <div>Không tìm thấy thông tin chuyến</div>
                                </div></div>
                                {/* <div className="start-time">
                                    <div className="start-time-title">Giờ khởi hành</div>
                                    <select className="time-select" onChange={this.handleChangeTime}>
                                                {homediTime}
                                            </select>
                                </div> */}
                                <div className="pick-up" style={{ marginBottom: '10px' }}>
                                    <div className="pick-up-title">Điểm lên xe</div>
                                    {/* <div className="pickup-select"><span>{this.state.itemStart.fromStation.nameStation}: {this.state.itemStart.fromStation.addressStation}</span></div> */}
                                </div>
                                <div className="alert alert-info">
                                    <div className="LoadSpinErr" >
                                        <div>Không tìm thấy địa điểm lên xe</div>
                                    </div>
                                </div>
                            </div>
                            <div className="seat-map-container">
                                <div className="title">Sơ đồ ghế</div>
                                <div className="seat-tables">
                                    <div className="seat-table-container" fragment="104369d545f">
                                        <p className="title">Tầng 1</p>
                                        <table className="table seat-table">
                                            <tbody >
                                                {seat1s.map((item, index) => {
                                                    return (<tr key={item}>
                                                        <td className="seatTD" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={0}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide" >
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                        <td className="seatTD">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={1}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide">
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                        <td className="seatTD">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={2}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide">
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                        <td className="seatTD">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={3}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide">
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                        <td className="seatTD">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={4}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide">
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                    </tr>)
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
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

                                            {/* {
                                                        this.state.setCodesLuotDi.map(item => {
                                                            return (<span key={item}>{item} </span>)
                                                        })
                                                    } */}
                                        </div>
                                    </div>
                                    <div className="total">
                                        <div className="title">Tổng tiền</div>
                                        <div className="total-price-text">
                                            0
                                            <sup >₫</sup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="info-container">
                                <div className="title" style={{ color: '#f15a24' }}>Lượt về <span > </span>{JSON.parse(localStorage.getItem("OriginDest")).selectDateTo}</div>
                                <div className="route-name">{JSON.parse(localStorage.getItem("OriginDest")).selectTo} ⇒ {JSON.parse(localStorage.getItem("OriginDest")).selectFrom}</div>
                                <div className="route-list">
                                    <div className="station-select-title">Chọn bến xe</div>
                                    <div className='typesTicket2C'>
                                        <div className="route-info">
                                            <div style={{ width: '260px' }} className="route-info-name">{JSON.parse(localStorage.getItem("OriginDest")).selectTo} ⇒ {JSON.parse(localStorage.getItem("OriginDest")).selectFrom}</div>
                                            <span style={{ color: 'red', margin: '0px' }}>
                                                Không tìm thấy vé
                                            </span>
                                            <input type="radio" className="route-select-checkbox" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                                <div className="alert alert-info">  <div className="LoadSpinErr" >
                                    <div>Không tìm thấy thông tin chuyến</div>
                                </div></div>
                                {/* <div className="start-time">
                                    <div className="start-time-title">Giờ khởi hành</div>
                                    <select className="time-select" onChange={this.handleChangeTime1}>
                                                {homeveTime}
                                            </select>


                                </div> */}
                                <div className="pick-up" style={{ marginBottom: '10px' }}>
                                    <div className="pick-up-title">Điểm lên xe</div>
                                    {/* <div className="pickup-select"><span>{this.state.itemStart.fromStation.nameStation}: {this.state.itemStart.fromStation.addressStation}</span></div> */}
                                </div>
                                <div className="alert alert-info">
                                    <div className="LoadSpinErr" >
                                        <div>Không tìm thấy địa điểm lên xe</div>
                                    </div>
                                </div>
                            </div>

                            <div className="seat-map-container">
                                <div className="title">Sơ đồ ghế</div>
                                <div className="seat-tables">
                                    <div className="seat-table-container" fragment="104369d545f">
                                        <p className="title">Tầng 1</p>
                                        <table className="table seat-table">
                                            <tbody >
                                                {seat2s.map((item, index) => {
                                                    return (<tr key={item}>
                                                        <td className="seatTD" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={0}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide" >
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                        <td className="seatTD">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={1}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide">
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                        <td className="seatTD">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={2}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide">
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                        <td className="seatTD">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={3}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide">
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                        <td className="seatTD">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat s-disabled no-price animated-background" pos={4}>
                                                                <g fill="none" fillRule="evenodd">
                                                                    <g className="svg-hide">
                                                                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                                                                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                                                                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                                                                    </g>
                                                                </g> {/**/}</svg>
                                                        </td>
                                                    </tr>)
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
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
                                        </div>
                                    </div>
                                    <div className="total">
                                        <div className="title">Tổng tiền</div>
                                        <div className="total-price-text">
                                            0
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
