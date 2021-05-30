import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;





const Headers = () => {
    const changeLogin = () => {
        let result = <Link className='loginHeader' to="/login"><i className="fas fa-sign-in-alt"></i></Link>
        let user = JSON.parse(localStorage.getItem("User"));
        if (user) {
            result =
                <div className="dropdown dropdownHeader" >
                    <button className="btn-dropdown-menu  " id="dropdownMenuButtonn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  ><Avatar size="large" icon={<UserOutlined />} /></button>
                    <div className="dropdown-menu dropdown-menuHeader" aria-labelledby="dropdownMenuButtonn">
                        <div id="user-popup" className="">
                            <div className="user-info">
                                <img src="./../img/userImg.jpg" alt="" />
                                <h3>{JSON.parse(localStorage.getItem("User")).email}</h3>
                                <Link onClick={() => logout()} className="btnLogout" to="/" >Đăng xuất</Link>
                            </div>
                            <div className='inforHeader'><Link className="" to="/history">Xem thông tin</Link> </div>
                        </div>
                    </div>
                </div>
        }
        return result
    }
    const logout = () => {
        return localStorage.removeItem('User');
    }
    const menus = [
        {
            name: 'Trang Chủ',
            to: '/',
            exact: true
        },
    ];

    const showMenus = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <Route key={index} path={menu.to}
                        exact={menu.exact}
                        children={({ match }) => {
                            var active = match ? 'active' : '';

                            return (
                                <li className={active} > <Link to={menu.to}>
                                    {menu.name}
                                </Link>
                                </li>
                            );
                        }}
                    />
                );
            });
        }
        return result;
    }
    const showMenus1 = () => {
        let user = JSON.parse(localStorage.getItem("User"));
        if (user) {
            return <Route path='/history'
                exact={false}
                children={({ match }) => {
                    var active = match ? 'active' : '';
                    return (
                        <li className={active} > <Link to='/history'>
                            Thông tin
                  </Link>
                        </li>
                    );
                }}
            />
        }
    }
    return (
        <>

            <Header style={{ height: 'auto' }}>
                <div className="container">
                    <Row>
                        <Col span={10}>
                            <div className="logo" style={{}} >
                                <Link to="/"><img src="/img/logo.png" alt=""></img></Link>;
                        </div>
                        </Col>
                        <Col span={10}>
                            <ul className='menuHeader'>
                                {showMenus(menus)}
                                {showMenus1()}
                            </ul>
                        </Col>
                        <Col span={4}>
                            <div className="showDropdownLogin" style={{ textAlign: 'center' }}>
                                {changeLogin()}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Header>


        </>
    )
}

export default Headers;
