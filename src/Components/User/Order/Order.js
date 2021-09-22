import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Space, Layout, Row, Col, Table, Tag, Modal,Button } from 'antd';
import Headers from '../../Headers/Headers';
import Footers from '../../Footers/Footers';

const { Header, Footer, Sider, Content } = Layout;
class Order extends Component {
 
    render() {
    
        return (
            <>
            <Layout className="layout-history">
                <Headers></Headers>
                <Footers ></Footers>
            </Layout>
            </>
        )
    }
}

export default Order;