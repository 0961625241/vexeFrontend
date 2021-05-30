import React from 'react'
import { Route, Redirect } from 'react-router-dom';
const InforEditUser = ({path,component:Component}) => {
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

export default InforEditUser;
