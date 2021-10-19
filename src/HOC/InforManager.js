import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Table,Avatar } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,ScheduleOutlined,TagsOutlined ,ThunderboltOutlined,TableOutlined ,StarOutlined  } from '@ant-design/icons';
import { getStationRequest } from './../actions/stations';
import { getTripRequest } from './../actions/trips';
import { getTicketRequest } from './../actions/tickets';
import { getUserRequest } from './../actions/users';
import { getCarRequest } from './../actions/cars';
import { getDriverRequest } from './../actions/drivers';
import { getProvinceRequest } from './../actions/provinces';
import { getCarMFGRequest } from './../actions/carMFGs';
import { getBusA1Request } from '../actions/busA1s';
import { getChatRequest } from '../actions/chats';
import { connect } from 'react-redux';
import {
    Redirect, BrowserRouter as Router,
    Link,
} from 'react-router-dom';
import FormChatAdmin from '../Components/Manager/Chats/FormChatAdmin/FormChat';
import Manager from '../Components/Manager/Manager';
import ListChat from '../Components/Manager/Chats/ListChat';
import {loginAdminChatRequest} from '../actions/userOnline';

const { Header, Content, Sider } = Layout;
class InforManager extends Component {
    state = {
        collapsed: false,
        current: this.props.location.pathname,
    };
    componentDidMount() {
        this.props.loginAdminChatRequest(JSON.parse(localStorage.getItem("User")))
        this.props.getStationRequest()
        this.props.getTripRequest()
        this.props.getTicketRequest()
        this.props.getUserRequest()
        this.props.getCarRequest()
        this.props.getDriverRequest()
        this.props.getProvinceRequest()
        this.props.getCarMFGRequest()
        this.props.getBusA1Request()
        this.props.getChatRequest()
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    handleClick = e => {
        this.setState({
          current: e.key,
        });
      };
    logout = () => {
        return localStorage.removeItem('User');
    }
    onClickCurrent=(text)=>{
        this.setState({
            current:text
        })
    }
    render() {
        if (JSON.parse(localStorage.getItem("User")) && JSON.parse(localStorage.getItem("User")).userType === 'admin') {
            return (
                <Layout>
                    <Header className="header d-flex justify-content-between headerManager">
                        <div className="logo"  ><Link to="/manager" onClick={()=>{
                            this.setState({current:'1'})
                        }}><img src="/img/logo.png" alt=""></img></Link>;</div>
                        {/* <Menu className="d-flex justify-content-end" style={{ width: "100%" }} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1"><img src="/img/userImg.jpg" alt=""></img></Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                        </Menu> */}
                          <div className="showDropdownLogin" style={{ textAlign: 'center' }}>
                            <div className="dropdown dropdownManager" >
                                    <button style={{height:'64px'}} className="btn-dropdown-menu  " id="dropdownMenuButtonn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  ><Avatar size="large" icon={<UserOutlined />} /></button>
                                    <div className="dropdown-menu  dropdown-menuManager"  aria-labelledby="dropdownMenuButtonn">
                                        <div style={{textAlign:'center',padding:'0 15px'}}> <span style={{display:'block',fontWeight:'bold',color:'#fff'}}>{JSON.parse(localStorage.getItem("User")).email}</span></div>
                                               
                             <div style={{textAlign:'center',padding:'0 15px'}}>  <Link onClick={() => this.logout()} style={{display:'block',fontWeight:'bold',color:'#fff'}} className="btnLogout" to="/login" >Đăng xuất</Link></div>
                                             
                                        
                                    </div>
                                </div>
                            </div>
                    </Header>
                    <Layout>
                        <Sider style={{ height:'1500px',overflow: 'auto', left: 0,background:'none' }}
                            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} width={200} >
                            <Menu
                            className='menuSidebar'
                                mode="inline"
                               defaultSelectedKeys={['1']}
                                style={{ height: '100%', borderRight: 0 }}
                                selectedKeys={[this.state.current]}
                                onClick={this.handleClick}
                            >
                                <Menu.Item style={{borderBottom:'1px solid silver',margin:'0px'}} key="/manager/stations" icon={<LaptopOutlined />} ><Link to="/manager/stations">Bến xe</Link></Menu.Item>
                                <Menu.Item style={{borderBottom:'1px solid silver',margin:'0px'}} key="/manager/drivers" icon={<StarOutlined />} ><Link to="/manager/drivers">Tài xế</Link></Menu.Item>
                                <Menu.Item style={{borderBottom:'1px solid silver',margin:'0px'}} key="/manager/trips" icon={<NotificationOutlined />}><Link to="/manager/trips">Chuyến đi</Link></Menu.Item>
                                <Menu.Item style={{borderBottom:'1px solid silver',margin:'0px'}} key="/manager/tickets" icon={<TagsOutlined />}><Link to="/manager/tickets">Vé xe</Link></Menu.Item>
                                {/* <Menu.Item style={{borderBottom:'1px solid silver',margin:'0px'}} key="/manager/busA1s" icon={<ThunderboltOutlined />} ><Link to="/manager/busA1s">Phụ xe</Link></Menu.Item> */}
                                <Menu.Item style={{borderBottom:'1px solid silver',margin:'0px'}} key="/manager/users" icon={<TableOutlined />}><Link to="/manager/users">User</Link></Menu.Item>
                                <Menu.Item style={{borderBottom:'1px solid silver',margin:'0px'}} key="/manager/cars" icon={<StarOutlined />}><Link to="/manager/cars">Hãng xe</Link></Menu.Item>
                                <Menu.Item style={{borderBottom:'1px solid silver',margin:'0px'}} key="/manager/total" icon={<ScheduleOutlined />}><Link to="/manager/total">Thông kê</Link></Menu.Item>
                                <Menu.Item style={{borderBottom:'1px solid silver',margin:'0px'}} key="/manager/chats" icon={<ScheduleOutlined />}><Link to="/manager/chats">Quản lý chát</Link></Menu.Item>
                            </Menu>
                        </Sider>
                        <Content className="site-layout-background"  style={{ padding: 24, margin: 0, minHeight: 280,background:'#fff'}}>
                         
                                  {this.props.children}
                                  {/* <Manager onClickCurrent={this.onClickCurrent}>  </Manager> */}
                        </Content>
                    </Layout>
                    <ListChat></ListChat>
                </Layout>
            )
        }
        else {
            return Redirect('')
        }

    }
}

const mapDispathToProps = (dispatch) => {
    return {
        getStationRequest: () => {
            dispatch(getStationRequest())
        },
        getTripRequest: () => {
            dispatch(getTripRequest())
        },
        getTicketRequest: () => {
            dispatch(getTicketRequest())
        },
        getUserRequest: () => {
            dispatch(getUserRequest())
        },
        getCarRequest: () => {
            dispatch(getCarRequest())
        },
        getDriverRequest: () => {
            dispatch(getDriverRequest())
        },
        getProvinceRequest: () => {
            dispatch(getProvinceRequest())
        },
        getCarMFGRequest: () => {
            dispatch(getCarMFGRequest())
        },
        getBusA1Request: () => {
            dispatch(getBusA1Request())
        },
        getChatRequest: () => {
            dispatch(getChatRequest())
        },
        loginAdminChatRequest: (data) => {
            dispatch(loginAdminChatRequest(data))
        },
    }
}
export default connect(null, mapDispathToProps)(InforManager);

