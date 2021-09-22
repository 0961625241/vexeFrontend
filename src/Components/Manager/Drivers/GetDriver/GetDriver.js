import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getDriverIdRequest } from './../../../../actions/drivers';
import {  Link,} from "react-router-dom";
import { Breadcrumb,Button, Modal, Form, Input, Radio,Table ,Space} from 'antd';
// import GetTripSeats from './GetTripSeats'

class GetDriver extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }

    }

    
    componentDidMount(){
        this.props.getDriverIdRequest(this.props.match.params.id)
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
        let getIdDriver=this.props.getIdDriver;
        console.log(getIdDriver)
        return (
            <>
            {getIdDriver !== null ?
            <div>
                 <h4 className="titleListManager">Quản lý Tài xế</h4>
       <div className="breadcrumbList"><Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/manager'>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to='/manager/drivers'>Tài xế</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                {this.props.match.params.id}
    </Breadcrumb.Item>
          </Breadcrumb></div>
          
         
                    <div >
                        <div className="row">
                            <div className="col-md-5">
                                <div className="info-container">
                                     <div className="title"><span >Thông tin</span></div> 
                                    {/* <div className="route-name">sdsd</div>  */}
                                    <div className="route-list" style={{marginLeft:'13px',marginBottom:'13px'}}>
                                    <img alt="" className="aside-user__info-thumb" src={`http://localhost:3000/${getIdDriver.avatarDriver}`} />
                                        {/* <div className="station-select-title">Chọn bến xe</div>
                                        <div className='typesTicket2C'>
                                         
                                        </div> */}
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Họ và tên</div>
                                        <div><span>{getIdDriver.nameDriver}</span></div>
                                    </div>
                                      <div className="start-time">
                                        <div className="start-time-title">Email</div>
                                        <div><span>{getIdDriver.emailDriver}</span></div>
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">SĐT</div>
                                        <div><span>{getIdDriver.sdtDriver}</span></div>
                                    </div>
                                     <div className="start-time">
                                        <div className="start-time-title">Ngày Sinh</div>
                                        <div><span>{new Date(getIdDriver.bdayDriver).toLocaleDateString("es-CL")}</span></div>
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Địa chỉ</div>
                                        <div><span>{getIdDriver.addressDriver}</span></div>
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">CMND</div>
                                        <div><span>{getIdDriver.CMNDDriver}</span></div>
                                        {/* <div><button onClick={()=>{this.props.emailDriverRequest(getIdTrip)}}>Gửi email tài xế</button></div> */}
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Ngày ký hợp đồng</div>
                                         <div><span>{new Date(getIdDriver.SContactDriver).toLocaleDateString("es-CL")}</span></div>
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Ngày kết thúc hợp đồng</div>
                                         <div><span>{new Date(getIdDriver.EContactDriver).toLocaleDateString("es-CL")}</span></div>
                                    </div>
                                      <div className="start-time" style={{marginBottom:'20px'}}>
                                        <div className="start-time-title">Lương</div>
                                        <div><span>{getIdDriver.salaryDriver}đ</span></div>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="col-md-7">
                            <div className="info-container">
                                     <div className="title"><span >Thông tin</span></div> 
                                    {/* <div className="route-name">sdsd</div>  */}
                                    <div className="route-list">
                                        {/* <div className="station-select-title">Chọn bến xe</div>
                                        <div className='typesTicket2C'>
                                         
                                        </div> */}
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Khu vực</div>
                                        <div><span>{getIdDriver.station.province.nameProvince}</span></div>
                                    </div>
                                      <div className="start-time">
                                        <div className="start-time-title">Bến xe</div>
                                        <div><span>{getIdDriver.station.nameStation}</span></div>
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Địa chỉ bến xe</div>
                                        <div><span>{getIdDriver.station.addressStation}</span></div>
                                    </div>
                                     <div className="start-time">
                                        <div className="start-time-title">Hãng xe</div>
                                        <div><span>{getIdDriver.car.CarMFG.nameCarMFG}</span></div>
                                    </div>
                                    <div className="start-time">
                                        <div className="start-time-title">Mã xe</div>
                                        <div><span>{getIdDriver.car.codeBus}</span></div>
                                    </div>
                                      <div className="start-time" style={{marginBottom:'20px'}}>
                                        <div className="start-time-title">Chỗ ngồi</div>
                                        <div><span>{getIdDriver.car.seats}{' chỗ ngồi'}</span></div>
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
    getIdDriver: state.listDriver.getIdDriver,
  });
  const mapDispathToProps = (dispatch) => {
    return {
        getDriverIdRequest: (id) => {
        dispatch(getDriverIdRequest(id))
      },
    }
  }
  export default connect(mapStateToProps, mapDispathToProps)(GetDriver);