import React, { useEffect, useState } from 'react';
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import { postTicketRequest } from './../../actions/tickets';
import FindTickets from '../FindTickets/FindTickets';
import { getStationRequest } from './../../actions/stations';
import { getCarRequest } from './../../actions/cars';
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
  useEffect(() => {
    props.getStationRequest();
    props.getCarRequest();
    
  })
  
  // let query = useQuery();
  // let InforTicket=JSON.parse(localStorage.getItem("InforTicket"));
  // const qua =()=>{
  //   if(query.get("resultCode") === '0' || query.get("resultCode") === 0)
  //   {
  //     console.log('sad')
  //   }
  // }
  
  return (
    <>
   
      <Layout className="layout">
        <Headers></Headers>
        <Banner></Banner>
        <FindTickets listStation={props.listStation}></FindTickets>
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
  }
}
const mapStateToProps = (state) => ({
  listStation: state.listStation.stations,
});
export default connect(mapStateToProps, mapDispathToProps)(Home);

