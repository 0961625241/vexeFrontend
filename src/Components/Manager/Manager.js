import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
export default class Manager extends Component {
  

  render() {
    return (
      <>
         <Redirect to="/manager/stations" />
        {/* <h1>Hello</h1> */}
      </>
    )
  }
}
