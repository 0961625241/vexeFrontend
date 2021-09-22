import React, { Component } from 'react'
import Headers from './../../Headers/Headers';
// import { getStationRequest } from './../../../actions/stations';
import { getCarRequest } from './../../../actions/cars';
 import { getTripRequest } from './../../../actions/trips';
import { connect } from 'react-redux';
import Footers from './../../Footers/Footers'
 import CarSingleItem from './CarSingleItem'
import FormChat from '../../FormChat/FormChat';
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Calendar, Input, DatePicker, Button, Select, AutoComplete, ConfigProvider, Modal } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';
import { getSelectRequest } from './../../../actions/select';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import Swal from 'sweetalert2';
import InForCar from '../InForCar';
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
class CarSingle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            provinceArr1: [],
            provinceArr2: [],
            qua: 'Tỉnh - Thành Phố',
            selectFrom: "",
            selectTo: "",
            selectDate: "",
            selectDateTo: "",
            typesTicket: "",
        }
    }
    componentDidMount() {
         this.props.getCarRequest()
         this.props.getTripRequest();
         var body = document.body; // For Safari
         var html = document.documentElement; // Chrome, Firefox, IE and Opera places the overflow at the html level, unless else is specified. Therefore, we use the documentElement property for these browsers
         body.scrollTop = 0;
         html.scrollTop = 0;
    }
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
        let btn = document.getElementById('btnDiv');
        console.log(btn)
        console.log(e.target)
        console.log(e.target === btn)
        if (e.target === btn) {
            this.setState({
                selectFrom: this.state.selectTo,
                selectTo: this.state.selectFrom,
                provinceArr1: this.state.provinceArr2,
                provinceArr2: this.state.provinceArr1
            })
        }

    }
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
    showModal = () => {
        Swal.fire({
            title: 'Vui lòng chọn chuyến đi',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `Ok`,

        })
    };
    disabledDate(current) {
        let customDate = new Date().toLocaleDateString("es-CL");
        return current && current < moment(customDate, "DD-MM-YYYY");
    }
    onFindTicket = () => {
        this.props.getSelectRequest(this.state.selectFrom, this.state.selectTo, this.state.selectDate,moment().format("DD-MM-YYYY"),'1c')
    }
    render() {
     
        let nameCar='';
        let addressCar='';
        let imageBus ='';
        // let descriptionCar='';
        this.props.listCar.map((item,index)=>{
            // console.log(item)
            if(slugify(item.CarMFG.nameCarMFG) ===  this.props.match.params.hangxe)
            {
                nameCar=item.CarMFG.nameCarMFG;
                    // addressStation=item.address;
                    // descriptionStation=item.description;
                    imageBus=item.CarMFG.imageCarMFG;
            }
        })
        let CarFast =  this.props.listTrip.map((item,index)=>{
            // console.log(item)
            if(slugify(item.cars.CarMFG.nameCarMFG) ===  this.props.match.params.hangxe && new Date(item.startTime).valueOf() >= new Date().valueOf() )
            {
                return(<CarSingleItem listTrip={this.props.listTrip} item={item} key ={item._id + index} ></CarSingleItem>)
            }
        })
        return (
            <>
                <Layout className="layout-history">
                    <Headers></Headers>
                    <section  style={{ background: '#F7F9FA' }}>
                        <div className="container">
                            <Row >
                                <Col  span={24} style={{ background: '#fff' }}>
                                <hr className="HrDiv"/>
                                <ul className="list-inlineDiv">
                                            <li className="liDiv liDiv1">
                                                    <Link to="/">Nhà xe</Link>
                                            </li>

                                            <li className="liDiv liDiv2">
                                                <Link to={`/vi-VN/xe-${slugify(nameCar)}`}>Nhà xe {nameCar}</Link>
                                            </li>
                                        </ul>
                                </Col>
                            </Row>
                        </div>
                    </section>
                    <section className='history' style={{ background: '#F7F9FA' }}>
                        <div className="container">
                            <Row >
                                <Col className="gutter-row" span={6}>
                                    <div className="aside-station" style={{ background: '#fff', height: '100%',padding:'30px 7px 30px 7px' }}  >
                                        <h1 className="mt0 hidden-xs hidden-sm bus-station-name" itemProp="name">
                                            <b>Xe {nameCar}</b>
                                        </h1>

                                        <p style={{ marginTop: '16px' }}><small className="pt10" style={{ fontSize: '16px' }}><i className="fas fa-map-marker-alt"></i>&nbsp;<b>Trụ sở:</b> Số 789 Giải Phóng</small></p>

                                        <div id="readmore" style={{ maxHeight: "none" ,textAlign:'center'}}>
                                            <img style={{objectFit:'cover',borderRadius:'8px'}} width='230' height='200px'  src={`http://localhost:3000/${imageBus}`}></img>
                                            {/* <p>{descriptionStation}
                                     </p> */}
                                        </div>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={18}>
                                <div style={{ background: '#FFF', padding: '30px 10px 30px 10px' }}>
                                        <h2 style={{ marginBottom: '20px' }} className='bus-station-name'>Tìm vé nhanh</h2>
                                        <div className="FindTicketL2">
                                           <div className="FindTicketL2__content FindTicketL2__contentLocation">
                                           <div className="dropdown FindTicketL2__div FindTicketL2__div__right" >
                                        <input id='input1' autoComplete="off" value={this.state.selectFrom} placeholder="Gõ vào nơi đi" className="dropdown-toggle " name="selectFrom" type="text" data-toggle="dropdown" onFocus={this.handleFocus1} onChange={this.onChange1} />
                                        <ul className="dropdown-menu select-dropdownDiv">
                                            <li><div>{this.state.provinceArr1 && this.state.provinceArr1.length > 0 ? this.state.qua : ""}</div>
                                                <ul>
                                                    {this.optionsFrom()}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="fontAwexL2">
                                        <p>
                                            <img src="http://localhost:4000/img/transfer.svg"></img>
                                        </p>
                                    </div>
                                    <div className="dropdown FindTicketL2__div FindTicketL2__div__left" >
                                        <input autoComplete="off" className="dropdown-toggle " placeholder="Gõ vào nơi đến" id='input2' type="text" onFocus={this.handleFocus2} name="selectTo" value={this.state.selectTo} onChange={this.onChange2} data-toggle="dropdown"></input>
                                        <ul className="dropdown-menu select-dropdownDiv">
                                            <li><div>{this.state.provinceArr2 && this.state.provinceArr2.length > 0 ? this.state.qua : ""}</div>
                                                <ul>
                                                    {this.optionsTo()}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                           </div>
                                           <div className="FindTicketL2__contentLocation">
                                               <div className="FindTicketL2__div FindTicketL2__div__rightTime">
                                               <ConfigProvider locale={locale}>
                                                    <DatePicker
                                                        // defaultValue={moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY")}
                                                        allowClear={false}
                                                        id='input3'
                                                        suffixIcon={false}
                                                        onChange={this.onChange}
                                                        onOk={this.onOk}
                                                        className="inputCalendar" format={"DD-MM-YYYY"}
                                                        disabledDate={this.disabledDate}
                                                        placeholder="Ngày đi"
                                                    />
                                                </ConfigProvider>
                                               </div>
                                           
                                           </div>
                                           <div className="FindTicketL2__contentBtn">
                                               <div className="FindTicketL2__div FindTicketL2__div__leftTime">
                                               {this.state.selectTo !== '' && this.state.selectFrom !== '' && this.state.selectDate !== '' ?
                                                        <button className="findBtnDiv"  >
                                                            <Link
                                                                className="buy__ticketDiv"
                                                                onClick={this.onFindTicket}
                                                                to={`/vi-VN/ve-xe-khach-tu-${slugify(this.state.selectFrom)}-di-${slugify(this.state.selectTo)}-tg-${this.state.selectDate}-ve1c`}
                                                            >  TÌM VÉ XE</Link>
                                                        </button>
                                                    :
                                                        <button onClick={this.showModal} className="findBtnDiv" >
                                                        TÌM VÉ XE
                                                    </button>
                                                    } 
                                               </div>
                                           </div>
                                          
                                        </div>
                                    </div>
                                    <div style={{ background: '#FFF' ,padding:'30px 10px 30px 10px'}}>
                                        <h2 style={{ marginBottom: '20px' }} className='bus-station-name'>Bảng giá xe</h2>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{width:'150px'}}>Tuyến đường</th>
                                                    <th style={{width:'200px'}}>Thông tin vé</th>
                                                    {/* <th style={{width:'130px'}}>Giá vé</th>*/}
                                                    <th style={{width:'100px'}}>Ngày</th> 
                                                    <th style={{width:'100px'}}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                             {CarFast}
                                            </tbody>
                                        </table>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </section>
                    <InForCar></InForCar>
                    <Footers></Footers>
                    <FormChat></FormChat>
                </Layout>
            </>
        )
    }
}



const mapDispathToProps = (dispatch) => {
    return {
        getCarRequest: () => {
            dispatch(getCarRequest())
        },
        getTripRequest: () => {
            dispatch(getTripRequest())
        },
        getSelectRequest: (selectFrom, selectTo, selectDate,selectDateTo,selectVe) => {
            dispatch(getSelectRequest(selectFrom, selectTo, selectDate,selectDateTo,selectVe))
        },
    }
}
const mapStateToProps = (state) => ({
    listStation: state.listStation.stations,
    listCar: state.listCar.cars,
    listTrip: state.listTrip.trips,
    selectFrom: state.selectToFrom.selectFrom,
    selectTo: state.selectToFrom.selectTo,
    selectDate: state.selectToFrom.selectDate,
    selectDateTo: state.selectToFrom.selectDateTo,
    selectVe: state.selectToFrom.selectVe,
});

export default connect(mapStateToProps, mapDispathToProps)(CarSingle);