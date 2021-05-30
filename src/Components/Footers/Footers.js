import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card, Form, Spin } from 'antd';
const { Header, Content, Sider,Footer } = Layout;
export default class Footers extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <>
                <Footer className="footer" style={{ textAlign: 'center' }, { background: "#001529" }}>
                        <h3>Công ty TNHH Thương Mại Dịch Vụ Đặt vé xe online </h3>
                        <p>
                            Địa chỉ: 527/18,Hoàng Sa,Phuong 7, Quận 3, TP. Hồ Chí Minh, Việt Nam
                        </p>
                        <p>Giấy chứng nhận ĐKKD số 9999999 do Sở KH và ĐT TP. Hồ Chí Minh </p>
                        <p> Bản quyền © 2020 thuộc về đăt vé xe online
                 </p>
                    </Footer> 
            </>
        )
    }
}
