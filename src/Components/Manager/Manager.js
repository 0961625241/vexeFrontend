import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { Button, Modal, Form, Input, Radio, Table, Space ,Select,Breadcrumb} from 'antd';

export default class Manager extends Component {
  

  render() {
    return (
      <>
      
         {/* <Redirect to="/manager/stations" /> */}
         <div className="breadcrumbList"><Breadcrumb>
    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
   
  </Breadcrumb></div>
         
      </>
    )
  }
}
