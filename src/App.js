import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserIDRequest } from './actions/users';
import './App.css';
import Home from './Components/Home/Home';
import Routes from './RoutesDom/Routes';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import Signin from './Components/User/Signin/Signin';
import Signup from './Components/User/Signup/Signup';
import EditUser from './Components/User/EditUser/EditUser';
import History from './Components/User/History/History';
import InforPayment from './HOC/InforPayment';
import InforLogin from './HOC/InforLogin';
import InforSignup from './HOC/InforSignup';
import InforEditUser from './HOC/InforEditUser';
import InforHistory from './HOC/InforHistory';
import Manager from './Components/Manager/Manager';
import Stations from './Components/Manager/Stations/ListStation';
import Drivers from './Components/Manager/Drivers/ListDriver';
import Trips from './Components/Manager/Trips/ListTrip';
import Tickets from './Components/Manager/Tickets/ListTicket';
import Users from './Components/Manager/Users/ListUser';
import Cars from './Components/Manager/Cars/ListCar';
import BusA1s from './Components/Manager/BusA1s/BusA1s';
import Total from './Components/Manager/Total/Total';
import InforManager from './HOC/InforManager';
import TicketBook  from './Components/TicketBook/TicketBook'
import StationSingle  from './Components/InForStation/StationSingle/StationSingle'
import CarSingle  from './Components/InForCar/CarSingle/CarSingle';
import { createBrowserHistory } from "history";
import GetTrip from './Components/Manager/Trips/GetTrip/GetTrip';
import { getTripRequest } from './actions/trips';
const history = createBrowserHistory();
// import { createHashHistory } from "history";
// const history = createHashHistory();
// console.log(history)
const menuRoutes = (Routes) => {
  return Routes.map((item, index) => {
    return (
      <Route
        key={index}
        exact={item.exact}
        path={item.path}
        render={props => <item.main {...props} />}
      >
      </Route>
    )
  })
}
const App =(props)=> {

  useEffect(() => {
    // props.getTripRequest()
  }, []);
  console.log(props)
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}  />
          <Route exact path='/vi-VN/ve-xe-khach-tu-:from-di-:to-tg-:date-ve:ve' component={TicketBook}  /> 
          <Route exact path='/vi-VN/xe-:hangxe' component={CarSingle} /> 
          <Route exact path='/vi-VN/:benxe' component={StationSingle} /> 
          {/* {menuRoutes(Routes)} */}
          {/* manager */}
          <InforLogin  exact path='/login' component={Signin} ></InforLogin>
          <InforSignup  exact path='/signup' component={Signup} ></InforSignup>
          <InforEditUser  exact="true" path='/edit-user' component={EditUser}></InforEditUser>
          <InforHistory  exact path='/history' component={History}></InforHistory>
          {/* <InforPayment  exact path='/vi-VN/payment-method' component={Payment}></InforPayment> */}
          <InforManager >
              <Switch>
                  <Route exact path="/manager" component={Manager} />
                  <Route exact path="/manager/stations" component={Stations} />
                  <Route exact path="/manager/drivers" component={Drivers} />
                  <Route exact path="/manager/trips" component={Trips} />
                  <Route exact path="/manager/trips/:id" component={GetTrip} />
                  <Route exact path="/manager/tickets" component={Tickets} />
                  <Route exact path="/manager/users" component={Users} />
                  <Route exact path="/manager/cars" component={Cars} />
                  <Route exact path="/manager/total" component={Total} />
                  <Route exact path="/manager/busA1s" component={BusA1s} />
            </Switch>
          </InforManager>
        </Switch>
      </Router>
    </>
  );
}

// export default App;
const mapDispathToProps = (dispatch) => {
  return {
      getUserIDRequest: (id) => {
          dispatch(getUserIDRequest(id))
      },
      getTripRequest: () => {
        dispatch(getTripRequest())
    },
  }
}
const mapStateToProps = (state) => ({
  // getIDUser: state.listUser.getIDUser,
});

export default connect(mapStateToProps, mapDispathToProps)(App);