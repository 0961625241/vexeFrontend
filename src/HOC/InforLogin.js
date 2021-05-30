import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const InforLogin = ({path,component:Component}) => {
    return (
        <>
            <Route path={path}
                 render={routeProps => {
                    if (localStorage.getItem('User')) {
                      return (
                        <Redirect to="/" />
                      );
                    }
                    return  <Component {...routeProps} />
                  }}
            ></Route>
        </>
    )
}

export default InforLogin;
