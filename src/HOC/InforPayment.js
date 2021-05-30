import React from 'react'
import { Route, Redirect } from 'react-router-dom';
const InforPayment = ({path,component:Component}) => {
    return (
        <>
            <Route path={path}
                 render={routeProps => {
                    if (localStorage.getItem('InforTicket')) {
                      return (
                        <Component {...routeProps} />
                        
                      );
                    }
                    else{
                        return (
                            <Redirect to="/" />
                            
                          );
                    }
                 
                  }}
            ></Route>
        </>
    )
}

export default InforPayment;
