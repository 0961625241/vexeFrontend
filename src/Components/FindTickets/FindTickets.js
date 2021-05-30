import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Calendar, Input, DatePicker, Button, Select, AutoComplete, ConfigProvider, Modal } from 'antd';
import Icon from '@ant-design/icons';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import moment from 'moment';
import './../../App.css';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';
import Draggable from 'react-draggable';
import { getSelectRequest } from './../../actions/select';
import { connect } from 'react-redux';
const dateFromat = 'YYYY/MM/DD';
const monthFromat = 'YYYY/MM';
const dateFromatList = ['DD/MM/YYYY', 'DD/MM/YY'];

function slugify(string) {
    return string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd')
}
class Findtickets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectFrom: JSON.parse(localStorage.getItem("OriginDest")) !== null ? JSON.parse(localStorage.getItem("OriginDest")).selectFrom : this.props.selectFrom,
            selectTo: JSON.parse(localStorage.getItem("OriginDest")) !== null ? JSON.parse(localStorage.getItem("OriginDest")).selectTo : this.props.selectTo,
            provinceArr1: [],
            provinceArr2: [],
            selectDate: JSON.parse(localStorage.getItem("OriginDest")) !== null ? JSON.parse(localStorage.getItem("OriginDest")).selectDate : this.props.selectDate,
            visible: false,
            disabled: true,
            qua: 'Tỉnh - Thành Phố',
            selectDateTo:JSON.parse(localStorage.getItem("OriginDest")) !== null ? JSON.parse(localStorage.getItem("OriginDest")).selectDateTo :this.props.selectDateTo,
            typesTicket:'1c',
            checkdTicket:false
            // selectedOption:'option1'
        }
    }
    // componentWillMount() {
    //     window.addEventListener("mousedown", this.handleClickOutside1);
    //     window.addEventListener("mousedown", this.handleClickOutside2);
    //     return () => {
    //         window.removeEventListener("mousedown", this.handleClickOutside1);
    //         window.removeEventListener("mousedown", this.handleClickOutside2);
    //     };

    // }
    // componentWillUnmount() {
    //     // fix Warning: Can't perFrom a React state update on an unmounted component
    //     this.setState = (state, callback) => {
    //         return;
    //     };
    // }
    onChange1 = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let suggestions = [];
        let qua = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            this.props.listStation.sort().filter(v => {
                if (regex.test(v.nameStation)) {
                    suggestions.push(v.nameStation)
                    this.setState({
                        qua: 'Bến xe'
                    })
                }
                else if (regex.test(v.province.nameProvince)) {
                    suggestions.push(v.province.nameProvince)
                    this.setState({
                        qua: 'Tỉnh - Thành Phố'
                    })
                }

            })
        } else {
            this.props.listStation.sort().filter(v => {
                suggestions.push(v.province.nameProvince)
                this.setState({
                    qua: 'Tỉnh - Thành Phố'
                })
            })

        }
        this.setState({
            selectFrom: value,
            provinceArr1: suggestions,
        })
    }
    onChange2 = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            this.props.listStation.sort().filter(v => {
                if (regex.test(v.nameStation)) {
                    suggestions.push(v.nameStation)
                    this.setState({
                        qua: 'Bến xe'
                    })
                }
                else if (regex.test(v.province.nameProvince)) {
                    suggestions.push(v.province.nameProvince)
                    this.setState({
                        qua: 'Tỉnh - Thành Phố'
                    })
                }
            })
        } else {
            this.props.listStation.sort().filter(v => {
                suggestions.push(v.province.nameProvince)
                this.setState({
                    qua: 'Tỉnh - Thành Phố'
                })
            })
        }
        this.setState({
            selectTo: value,
            provinceArr2: suggestions
        })
    }
    handleFocus1 = (event) => {
        event.target.select();
        let suggestions = [];
        this.props.listStation.sort().filter(v => { return suggestions.push(v.province.nameProvince) })
        this.setState({
            provinceArr1: suggestions,
        })
    }
    handleFocus2 = (event) => {
        event.target.select();
        let suggestions = [];
        this.props.listStation.sort().filter(v => { return suggestions.push(v.province.nameProvince) })
        this.setState({
            provinceArr2: suggestions,
        })
    }
    optionsFrom = () => {
        let province = '';
        let total = -1;
        let arr = [];
        let value = this.state.selectFrom
        const regex = new RegExp(`^${value}`, 'i');

        return this.state.provinceArr1.map((item, index) => {
            if (item !== province) {
                province = item
                return (
                    <li style={this.state.selectFrom === item ? { 'background': 'rgb(24 144 255)', color: 'rgba(0,0,0,.65)', 'fontWeight': '600px' } : {}} key={index} onClick={() => {
                        // document.getElementById('input2').()
                        arr.push(item)
                        this.setState({
                            selectFrom: item,
                            provinceArr1: arr
                        })
                    }}>{item}</li>
                )
            }
        })
    }
    optionsTo = () => {
        let province = '';
        let arr = [];
        return this.state.provinceArr2.map((item, index) => {
            if (item !== province) {
                province = item
                return (
                    <li style={this.state.selectTo === item ? { 'background': 'rgb(24 144 255)', color: 'rgba(0,0,0,.65)', 'fontWeight': '600px' } : {}} key={index} onClick={() => {
                        // document.getElementById('input3').style.background='red'
                        arr.push(item)
                        this.setState({
                            selectTo: item,
                            provinceArr2: arr
                        })
                    }}>{item}</li>
                )
            }
        })
    }
    changeFromTo = (e) => {
        let btn = document.getElementById('btn');
        if (e.target === btn) {
            this.setState({
                selectFrom: this.state.selectTo,
                selectTo: this.state.selectFrom,
                provinceArr1: this.state.provinceArr2,
                provinceArr2: this.state.provinceArr1
            })
        }

    }
    handleClickOutside1 = (event) => {
        let dropdown1 = document.getElementById('dropdown1');
        let bt;
        let bt1;
        if (dropdown1 && !dropdown1.contains(event.target)) {
            if (this.state.provinceArr1.length > 0) {
                this.state.provinceArr1.filter(x => x === this.state.selectFrom).map((item) => {
                    bt = item;
                })
                if (bt !== this.state.selectFrom) {
                    this.setState({
                        selectFrom: this.state.provinceArr1[0],
                    })
                }
            }
            else
                if (this.state.provinceArr1.length === 0) {
                    this.props.listStation.map((item) => {
                        if (item.province.nameProvince === this.state.selectFrom) {
                            bt1 = item.province.nameProvince
                            this.setState({
                                selectFrom: this.state.selectFrom,
                            })
                        }
                    })
                    if (bt1 !== this.state.selectFrom) {
                        this.setState({
                            selectFrom: '',
                        })
                    }
                }
        }
    }
    handleClickOutside2 = (event) => {
        let dropdown2 = document.getElementById('dropdown2');
        let bt;
        let bt1;
        if (dropdown2 && !dropdown2.contains(event.target)) {
            if (this.state.provinceArr2.length > 0) {
                this.state.provinceArr2.filter(x => x === this.state.selectTo).map((item) => {
                    bt = item
                })
                if (bt !== this.state.selectTo) {
                    this.setState({
                        selectTo: this.state.provinceArr2[0],
                    })
                }
            }
            else
                if (this.state.provinceArr2.length === 0) {
                    this.props.listStation.map((item) => {
                        if (item.province.nameProvince === this.state.selectTo) {
                            bt1 = item.province.nameProvince
                            this.setState({
                                selectTo: this.state.selectTo,
                            })
                        }
                    })
                    if (bt1 !== this.state.selectTo) {
                        this.setState({
                            selectTo: '',
                        })
                    }
                }
        }
    };
    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Fromatted Selected Time: ', dateString);
        var mm = value._d.getMonth() + 1;
        var dd = value._d.getDate();
        var yy = value._d.getFullYear();
        var myDateString = dd + '-' + mm + '-' + yy;
        this.setState({
            selectDate: myDateString
        })
    }
    onChangeTo = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Fromatted Selected Time: ', dateString);
        var mm = value._d.getMonth() + 1;
        var dd = value._d.getDate();
        var yy = value._d.getFullYear();
        var myDateString = dd + '-' + mm + '-' + yy;
        this.setState({
            selectDateTo: myDateString
        })
    }
    onOk = (value) => {
        console.log('onOk: ', value);


    }
    onOkTo = (value) => {
        console.log('onOk: ', value);


    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        e.preventDefault();
        console.log(this.state.registers)
        // this.props.postTicketRequest(values)
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    onFindTicket = () => {
        this.props.getSelectRequest(this.state.selectFrom, this.state.selectTo, this.state.selectDate,this.state.selectDateTo)
    }
    disabledDate(current) {
        let customDate = new Date().toLocaleDateString("es-CL");
        return current && current < moment(customDate, "DD-MM-YYYY");
    }
    disabledDateTo(current) {
        let customDate = new Date().toLocaleDateString("es-CL");
        return current && current < moment(customDate, "DD-MM-YYYY");
    }
    handleRadioChange=(event)=> {
      console.log(event.target.value)
      this.setState({
        typesTicket: event.target.value
      });
    }
   
    render() {

        return (
            <>
                {this.props.selectFromAndTo ?
                    <section>
                        <div className="container">
                            <Row>
                                <Col className="" span={24}>
                                    <span className='titleFromTo'>Vé xe từ {JSON.parse(localStorage.getItem("OriginDest")).selectFrom} đến {JSON.parse(localStorage.getItem("OriginDest")).selectTo}</span>
                                </Col>
                            </Row>
                        </div>
                    </section> : ''}
                <Layout className="book_Ticket" style={{ background: "#001529" }}>
                    <div className="container">
                        <Row>

                            <Col className="ticket-col" span={24}>
                                <h4 style={{ color: "white" }}>Đặt vé trực tuyến</h4>
                                <div  className="roundtrip-checkbox-container">
                                    <input  type="radio" id="one-way" value="1c"   onChange={this.handleRadioChange} checked={this.state.typesTicket  === '1c'  }/> 
                                        <label htmlFor="one-way"    className="one-way-label">Một chiều</label> 
                                    <input  type="radio" id="round-trip" value="2c"   onChange={this.handleRadioChange} checked={this.state.typesTicket === '2c'}/>
                                        <label  htmlFor="round-trip"   className="round-trip-label">Khứ hồi</label>
                                </div>
                                <div className="book d-flex">
                                    <div className="dropdown" id='dropdown1'>
                                        <div className="fontAwe"><i className="fas fa-map-marker-alt"></i></div>
                                        <input id='input1' autoComplete="off" value={this.state.selectFrom} placeholder="chon noi di " className="dropdown-toggle book-input" name="selectFrom" type="text" data-toggle="dropdown" onFocus={this.handleFocus1} onChange={this.onChange1} />
                                        <ul className="dropdown-menu select-dropdown">
                                            <li><div>{this.state.provinceArr1 && this.state.provinceArr1.length > 0 ? this.state.qua : ""}</div>
                                                <ul>
                                                    {this.optionsFrom()}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="fontAwex">
                                        <i id="btn" onClick={(e) => this.changeFromTo(e)} className="fas fa-exchange-alt"></i>
                                    </div>
                                    <div className="dropdown" id='dropdown2'>
                                        <div className="fontAwe"><i className="fas fa-map-marker-alt"></i></div>
                                        <input autoComplete="off" className="dropdown-toggle book-input" placeholder="chon noi den " id='input2' type="text" onFocus={this.handleFocus2} name="selectTo" value={this.state.selectTo} onChange={this.onChange2} data-toggle="dropdown"></input>
                                        <ul className="dropdown-menu select-dropdown">
                                            <li><div>{this.state.provinceArr2 && this.state.provinceArr2.length > 0 ? this.state.qua : ""}</div>
                                                <ul>
                                                    {this.optionsTo()}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown ">
                                        <div className="fontAwexx"><i className="fas fa-calendar-alt"></i></div>
                                        <ConfigProvider locale={locale}>
                                            <DatePicker
                                                defaultValue={moment(this.state.selectDate, "DD-MM-YYYY")}
                                                allowClear={false}
                                                id='input3'
                                                suffixIcon={false}
                                                onChange={this.onChange}
                                                onOk={this.onOk}
                                                className="book-date" format={"DD-MM-YYYY"}
                                                disabledDate={this.disabledDate}
                                            />


                                        </ConfigProvider>

                                    </div>
                                       <div className="dropdown ">
                                        <div className="fontAwexx"><i className="fas fa-calendar-alt"></i></div>
                                        <ConfigProvider locale={locale}>
                                            <DatePicker
                                                defaultValue={moment(this.state.selectDateTo, "DD-MM-YYYY")}
                                                allowClear={false}
                                                id='input3'
                                                suffixIcon={false}
                                                onChange={this.onChangeTo}
                                                disabled={this.state.typesTicket === '1c' ? true : false}
                                                onOk={this.onOkTo}
                                                className="book-date" format={"DD-MM-YYYY"}
                                                disabledDate={this.disabledDateTo}
                                                style={{marginRight:'18px'}}
                                            />
                                        </ConfigProvider>

                                    </div>

                                    {this.state.selectTo !== '' && this.state.selectFrom !== '' && this.state.selectDate !== '' ?
                                        <div className="dropdown">
                                            <Button className="book-btn" type="primary" >
                                                <Link
                                                    onClick={this.onFindTicket}
                                                    to={`/vi-VN/ve-xe-khach-tu-${slugify(this.state.selectFrom)}-di-${slugify(this.state.selectTo)}-tg-${this.state.selectDate}-ve${this.state.typesTicket}`}
                                                > Tìm vé xe</Link>
                                            </Button>
                                        </div>
                                        :
                                        <div className="dropdown">
                                            <Button onClick={this.showModal} className="book-btn" type="primary">
                                                Tìm vé xe
                                           </Button>
                                            <Modal
                                                title={
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            cursor: 'move',
                                                        }}
                                                        onMouseOver={() => {
                                                            if (this.state.disabled) {
                                                                this.setState({
                                                                    disabled: false,
                                                                });
                                                            }
                                                        }}
                                                        onMouseOut={() => {
                                                            this.setState({
                                                                disabled: true,
                                                            });
                                                        }}
                                                        onFocus={() => { }}
                                                        onBlur={() => { }}
                                                    >
                                                        Dat ve
</div>
                                                }
                                                visible={this.state.visible}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel}
                                                modalRender={modal => <Draggable disabled={this.state.disabled}>{modal}</Draggable>}
                                            >
                                                <p>
                                                    Ban co muon dat ve khong ?
</p>

                                            </Modal>

                                        </div>}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Layout>
            </>
        )
    }
}



const mapDispathToProps = (dispatch) => {
    return {
        getSelectRequest: (selectFrom, selectTo, selectDate,selectDateTo) => {
            dispatch(getSelectRequest(selectFrom, selectTo, selectDate,selectDateTo))
        },
    }
}
const mapStateToProps = (state) => ({
    selectFrom: state.selectToFrom.selectFrom,
    selectTo: state.selectToFrom.selectTo,
    selectDate: state.selectToFrom.selectDate,
    selectDateTo:state.selectToFrom.selectDateTo,
});

export default connect(mapStateToProps, mapDispathToProps)(Findtickets);
   // if(data.some(xxx => xxx.value === item.province)  === false)
            // {
            //    total++;
            //     data.push({
            //          key:total,
            //         value:item.province
            //     })
            // }

