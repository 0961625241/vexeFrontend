import React, { Component } from 'react'
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import Swal from 'sweetalert2';

export default class System extends Component {


    render() {
        return (
            <>
                <Layout className="system" style={{background:'#fff'}}>
                    <div className="container">
                        <Row >
                            <Col span={24}>
                                <div className="systemAll">
                                    <h1 className="titleSystem">
                                        
                                        Hệ thống vé xe khách và vé xe lớn nhất Việt Nam</h1>
                                    <div className="systemFor">
                                        <div className="systemForOne">
                                            <img className="systemForImg" src="https://storage.googleapis.com/fe-production/svgIcon/static-icon-1.svg" />
                                            <div className="systemForContent">
                                                <h3 className="systemForN">5000+</h3>
                                                <h3 className="systemForS">Tuyến đường</h3></div>
                                        </div>
                                        <div className="systemForOne">
                                            <img className="systemForImg" src="https://storage.googleapis.com/fe-production/svgIcon/static-icon-2.svg" />
                                            <div className="systemForContent">
                                                <h3 className="systemForN">2000+</h3>
                                                <h3 className="systemForS">Nhà xe</h3>
                                            </div>
                                        </div>
                                        <div className=" systemForOne">
                                            <img className="systemForImg" src="https://storage.googleapis.com/fe-production/svgIcon/static-icon-3.svg" />
                                            <div className="systemForContent">
                                                <h3 className="systemForN">5000+</h3>
                                                <h3 className="systemForS">Đại lý bán vé</h3>
                                            </div>
                                        </div>
                                        <div className="systemForOne ">
                                            <img className="systemForImg" src="https://storage.googleapis.com/fe-production/svgIcon/static-icon-4.svg" />
                                            <div className="systemForContent">
                                                <h3 className="systemForN">400+</h3>
                                                <h3 className="systemForS">Bến xe</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Layout>

            </>
        )
    }
}
