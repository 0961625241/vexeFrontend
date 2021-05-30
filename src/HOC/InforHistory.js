
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserIDRequest } from './../actions/users';




const InforHistory = ({path,component:Component,props}) => {

    return (
        <>
          <Route path={path}
              render={routeProps => {
                // console.log(routeProps)
                  if (localStorage.getItem('User')) {
                    return (
                    <Component {...routeProps} />
                    );
                  }
                  return   Redirect('')
                }}
          ></Route>
    </>
    )
}

 export default InforHistory;
