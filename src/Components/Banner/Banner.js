import React, { Component } from 'react'
import { Avatar,Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
export default class Banner extends Component {
    render() {
        return (
            <>
                <Layout className="Carousel">
                    <Row >
                        <Col  xs={24} >
                            <img width="100%" src="./img/banner2.png" alt="" />
                        </Col>
                    </Row>
                </Layout>
            </>
        )
    }
}
