import React, { Component } from 'react'
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
export default class InForStation extends Component {
    render() {
        return (
            <>
                <Layout className="inforStation" style={{background:'#fff'}}>
                    <div className="container">
                        <Row >
                            <Col className="station-col" span={24}>
                                <h4>Bến xe khách</h4>
                                <Row gutter={[16,16]}>
                                    <Col className="imgStation" span={6}>
                                        <Link to='/vi-VN/ben-xe-mien-dong'>
                                            <img src="./img/benxemiendong.jpg"></img>
                                            <p>Bến xe Miền Đông</p>
                                        </Link>
                                    </Col>
                                    <Col className="imgStation" span={6}>
                                    <Link to='/vi-VN/ben-xe-gia-lam'>
                                            <img src="./img/bx-gia-lam.jpg"></img>
                                            <p>Bến xe Gia Lâm</p>
                                        </Link>
                                    </Col>
                                    <Col className="imgStation" span={6}>
                                         <Link to='/vi-VN/ben-xe-nuoc-ngam'>
                                            <img src="./img/bx-nuoc-ngam.jpg"></img>
                                            <p>Bến xe Nước Ngầm</p>
                                        </Link>
                                    </Col>
                                    <Col className="imgStation" span={6}>
                                         <Link to='/vi-VN/ben-xe-my-dinh'>
                                            <img src="./img/bx-my-dinh.jpg"></img>
                                            <p>Bến xe Mỹ Đình</p>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Layout>
            </>
        )
    }
}
