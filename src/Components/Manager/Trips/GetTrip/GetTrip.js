import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTripIdRequest } from './../../../../actions/trips';
import {  Link,} from "react-router-dom";
import { Breadcrumb,Button, Modal, Form, Input, Radio,Table ,Space} from 'antd';
import GetTripSeats from './GetTripSeats'

class Gettrip extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }

    }

    
    componentDidMount(){
        this.props.getTripIdRequest(this.props.match.params.id)
    }
    
    showTotalPrice=()=>{
        let getIdTrip =this.props.getIdTrip
        if(getIdTrip !== null)
        {
           let qua= getIdTrip.seats.filter(seat=>seat.isBooked)
           return  getIdTrip.price * qua.length

        }
      
    }
    render() {
        let getIdTrip=this.props.getIdTrip;
        // let homedi1;
        // homedi1 =
        console.log(getIdTrip)
        console.log(this.props)
        return (
            <>
            {getIdTrip !== null ?
            <div>
                 <h4 className="titleListManager">Quản lý Chuyến đi</h4>
       <div className="breadcrumbList"><Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/manager'>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to='/manager/trips'>Chuyến đi</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                {this.props.match.params.id}
    </Breadcrumb.Item>
          </Breadcrumb></div>
          
         
                    <div >
                        <div className="row">
                            <div className="col-md-5">

                                <div className="info-container">
                                    <div className="title"><span >{new Date(getIdTrip.startTime).getHours()}:{(new Date(getIdTrip.startTime).getMinutes() < 10 ? '0' : '')}{new Date(getIdTrip.startTime).getMinutes()} {new Date(getIdTrip.startTime).toLocaleDateString("es-CL")}</span></div>
                                    <div className="route-name">{getIdTrip.fromStation.province.nameProvince} ⇒ {getIdTrip.toStation.province.nameProvince}</div>
                                    <div className="route-list">
                                        {/* <div className="station-select-title">Chọn bến xe</div>
                                        <div className='typesTicket2C'>
                                         
                                        </div> */}
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Giờ khởi hành</div>
                                        <div><span>{new Date(getIdTrip.startTime).getHours()}:{(new Date(getIdTrip.startTime).getMinutes() < 10 ? '0' : '')}{new Date(getIdTrip.startTime).getMinutes()}</span></div>
                                    </div>
                                      <div className="start-time">
                                        <div className="start-time-title">Xe</div>
                                        <div><span>{getIdTrip.cars.CarMFG.nameCarMFG}</span></div>
                                    </div>
                                     <div className="start-time">
                                        <div className="start-time-title">Mã Xe</div>
                                        <div><span>{getIdTrip.cars.codeBus}</span></div>
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Điểm lên xe</div>
                                        <div><span>{getIdTrip.fromStation.nameStation}: {getIdTrip.fromStation.addressStation}</span></div>
                                    </div>
                                      <div className="start-time" style={{marginBottom:'20px'}}>
                                        <div className="start-time-title">Giá tiền</div>
                                        <div><span>{getIdTrip.price}</span></div>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="col-md-7">
                            <div className="seat-map-container">
                                    <div className="title">Sơ đồ ghế</div>
                                    <div className="seat-tables">
                                
           <GetTripSeats    seat={getIdTrip.seats} ></GetTripSeats>
   
                                    </div>

                                    <div className="seat-statuses">
                                        <div className="status-item">
                                            <div className="active"></div>
                                            <div className="status-text">Trống</div>
                                        </div> 
                                        {/* <div className="status-item">
                                            <div className="select"></div>
                                            <div className="status-text">Đang chọn</div>
                                        </div> */}
                                        <div className="status-item">
                                            <div className="disable"></div>
                                            <div className="status-text">Đã đặt</div>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <div className="selected">
                                            <div className="title">
                                            Tổng tiền của chuyến đi:
                                            <span style={{ "display": "none" }}>0</span>
                                            </div>
                                            <div className="selected-list">
                                            <span>{this.showTotalPrice()} đ</span>
                                                {/* {
                                                    this.state.setCodesLuotDi.map(item => {
                                                        return (<span key={item}>{item} </span>)
                                                    })
                                                } */}
                                            </div>
                                        </div>
                                        <div className="total">
                                            {/* <div className="title">Tổng tiền</div> */}
                                            {/* <div className="total-price-text">
                                                {this.state.priceLuotDi}
                                                <sup >₫</sup>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
                 : ''}
                  
            </>
        )
    }
}



const mapStateToProps = (state) => ({
    getIdTrip: state.listTrip.getIdTrip,
  });
  const mapDispathToProps = (dispatch) => {
    return {
        getTripIdRequest: (id) => {
        dispatch(getTripIdRequest(id))
      },
    }
  }
  export default connect(mapStateToProps, mapDispathToProps)(Gettrip);