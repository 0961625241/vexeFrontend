
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const InforOrder = ({path,component:Component,props}) => {

    return (
        <>
          <Route path={path}
              render={routeProps => {
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

 export default InforOrder;
