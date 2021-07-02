import React, { useEffect, useState } from 'react';
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import { postTicketRequest } from './../../actions/tickets';
import FindTickets from '../FindTickets/FindTickets';
import { getStationRequest } from './../../actions/stations';
import { getCarRequest } from './../../actions/cars';
import { getTripRequest } from './../../actions/trips';
import { connect } from 'react-redux';
import Footers from './../Footers/Footers';
import Headers from './../Headers/Headers'
import Banner from './../Banner/Banner'
import InForCar from './../InForCar/InForCar';
import InForStation from './../InForStation/InForStation';
import System from './../System/System';
import { Route, Link,  useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = (props) => {
  let query = useQuery();
  useEffect(() => {
    props.getStationRequest();
    props.getCarRequest();
    props.getTripRequest();
    
    let InforTicket=JSON.parse(localStorage.getItem("InforTicket"));
    if(query.get("errorCode") === '0' && InforTicket !== null)
    {
      console.log(`thanh cong`)
      props.postTicketRequest(InforTicket)
      localStorage.removeItem("InforTicket")
    }else{
      localStorage.removeItem("InforTicket")
    }
  },[])
  
  // let query = useQuery();
  // let InforTicket=JSON.parse(localStorage.getItem("InforTicket"));
  // const qua =()=>{
    
  // }
  return (
    <>
   
      <Layout className="layout">
        <Headers></Headers>
        <Banner></Banner>
        <FindTickets history={props.history} listStation={props.listStation}></FindTickets>
        <InForStation></InForStation>
      <System></System>
      <InForCar></InForCar>
        <Footers ></Footers>
      </Layout >
    </>
  )
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
  }
}
const mapStateToProps = (state) => ({
  listTrip:state.listTrip.trips,
  listStation: state.listStation.stations,
});
export default connect(mapStateToProps, mapDispathToProps)(Home);

