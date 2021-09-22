import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const InforLogin = ({path,component:Component}) => {
    return (
        <>
            <Route path={path}
                 render={routeProps => {
                    if (JSON.parse(localStorage.getItem("User")) && JSON.parse(localStorage.getItem("User")).userType === 'client') {
                      return (
                        <Redirect to="/" />
                      );
                    }else if(JSON.parse(localStorage.getItem("User")) && JSON.parse(localStorage.getItem("User")).userType === 'admin'){
                      return (
                        <Redirect to="/manager" />
                      );
                    }
                    return  <Component {...routeProps} />
                  }}
            ></Route>
        </>
    )
}

export default InforLogin;
