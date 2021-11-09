import React, { useEffect, useState } from 'react';
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import { postTicketRequest } from './../../actions/tickets';
import FindTickets from '../FindTickets/FindTickets';
import { getStationRequest } from './../../actions/stations';
import { getCarRequest } from './../../actions/cars';
import { getTripRequest } from './../../actions/trips';
import { getChatRequest } from './../../actions/chats';
import { connect } from 'react-redux';
import Footers from './../Footers/Footers';
import Headers from './../Headers/Headers'
import Banner from './../Banner/Banner'
import InForCar from './../InForCar/InForCar';
import InForStation from './../InForStation/InForStation';
import System from './../System/System';
import { Route, Link,  useLocation ,Redirect} from 'react-router-dom';
import FormChat from './../FormChat/FormChat';
import Swal from 'sweetalert2';
import {getSelectNotify} from './../../actions/loading';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = (props) => {
  let query = useQuery();
  console.log(props.listStation)
  useEffect(() => {
    // props.getSelectNotify({loading: true})
    // props.getStationRequest();
    // props.getCarRequest();
    // props.getTripRequest();
    // props.getChatRequest()
    let InforTicket=JSON.parse(localStorage.getItem("InforTicket"));
    if(query.get("errorCode") === '0' && InforTicket !== null)
    {
      console.log(`thanh cong`)
      props.postTicketRequest(InforTicket)
      Swal.fire({
        icon: 'success',
        title: 'Bạn đã mua thành công',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `Ok`,
      })
      localStorage.removeItem("InforTicket")
    }else{
      localStorage.removeItem("InforTicket")
    }
  },[])
 
  // let query = useQuery();
  // let InforTicket=JSON.parse(localStorage.getItem("InforTicket"));
  // const qua =()=>{
    
  // }
  if (JSON.parse(localStorage.getItem("User")) && JSON.parse(localStorage.getItem("User")).userType === 'admin') {
    return (
      <Redirect to="/manager" />
     
    );
    }
    else
    {

    
  return (
    <>
   
      <Layout className="layout">
        {/* <div className="header">
          <div className="container">
            <div className="header-content">
              <div className="header-content-left">
                <span>0961625241</span>
              </div>
              <div className="header-content-right">
                <span>Dangnhap</span>
              </div>
            </div>
          </div>
        </div> */}
       
        <Headers ></Headers>
        <Banner></Banner>
        <FindTickets history={props.history} listStation={props.listStation} ></FindTickets>
        <InForStation></InForStation>
      <System></System>
      <InForCar></InForCar>
        <Footers ></Footers>
        <FormChat></FormChat>
      </Layout >
    </>
  )
}
}

const mapDispathToProps = (dispatch) => {
  return {
    postTicketRequest: (data) => {
      dispatch(postTicketRequest(data))
    },
    getStationRequest: () => {
      dispatch(getStationRequest())
    },
    getCarRequest: () => {
      dispatch(getCarRequest())
    },
    getTripRequest: () => {
      dispatch(getTripRequest())
    },
    getChatRequest: () => {
      dispatch(getChatRequest())
    },
    getSelectNotify: (notify) => {
      dispatch(getSelectNotify(notify))
  },
  }
}
const mapStateToProps = (state) => ({
  listStation: state.listStation.stations,
  listChat: state.listChat.chats,
});
export default connect(mapStateToProps, mapDispathToProps)(Home);

