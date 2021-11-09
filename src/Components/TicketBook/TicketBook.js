import React, { Component } from 'react'
import { BrowserRouter as Router, Link, } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card, Form, Spin } from 'antd';
import 'antd/dist/antd.css';
import FindTickets from '../FindTickets/FindTickets';
import { getStationRequest } from './../../actions/stations';
import { getTripRequest } from './../../actions/trips';
import { sortPrice, filterSeat } from './../../actions/index';
import { connect } from 'react-redux';
import Footers from '../Footers/Footers';
import Headers from './../Headers/Headers';

import TicketBook2c from './TicketBook2c/TicketBook2c';
import TicketBook1c from './TicketBook1c/TicketBook1c';
import TicketBook1cErr from './TicketBook1c/TicketBook1cErr/TicketBook1cErr'
import TicketBookErr from './TicketBookErr/TicketBookErr';
import TicketBook2cErr from './TicketBook2c/TicketBook2cErr/TicketBook2cErr'
import FormChat from '../FormChat/FormChat';
import {getSelectNotify} from './../../actions/loading';

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
class TicketBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.LuotDi = [];
        this.LuotVe = [];
    }
    componentDidMount() {
        // this.props.getSelectNotify({loading: true})
        this.props.getTripRequest()
        var body = document.body; 
        var html = document.documentElement; 
        body.scrollTop = 0;
        html.scrollTop = 0;
    }
    render() {
        let { listTrip ,listStation} = this.props;
        console.log(listTrip)
        var elmTasks;
        var elmTasks1;
        let ve = this.props.match.params.ve;
        if (ve === '1c') {
            if (listTrip && listTrip.length > 0) {
                listTrip = listTrip.filter((item, index) => {
                    let from = this.props.match.params.from;
                    let to = this.props.match.params.to;
                    if (from === slugify(item.fromStation.nameStation)) {
                        from = slugify(item.fromStation.province.nameProvince)
                    }
                    if (to === slugify(item.toStation.nameStation)) {
                        to = slugify(item.toStation.province.nameProvince);
                    }
                    if (slugify(item.fromStation.province.nameProvince) === from && slugify(item.toStation.province.nameProvince) === to && new Date(item.startTime).toLocaleDateString("nl-NL") === this.props.match.params.date && new Date(item.startTime).valueOf() >= new Date().valueOf()
                    ) {
                        return item;

                    }
                })
            }
        }
        if (ve === '1c') {
            elmTasks = listTrip && listTrip.length > 0 ? <TicketBook1c goBack={this.props.history} ve={this.props.match.params.ve} listTrip={listTrip} ></TicketBook1c> : <TicketBook1cErr goBack={this.props.history} ve={this.props.match.params.ve} listTrip={listTrip}></TicketBook1cErr>
        }
        if (ve === '2c') {
            if (listTrip && listTrip.length > 0) {
                this.LuotDi = listTrip.filter((item, index) => {
                    let from = this.props.match.params.from;
                    let to = this.props.match.params.to;
                    if (from === slugify(item.fromStation.nameStation)) {
                        from = slugify(item.fromStation.province.nameProvince)
                    }
                    if (to === slugify(item.toStation.nameStation)) {
                        to = slugify(item.toStation.province.nameProvince);
                    }
                    if (slugify(item.fromStation.province.nameProvince) === from && slugify(item.toStation.province.nameProvince) === to && new Date(item.startTime).toLocaleDateString("nl-NL") === this.props.match.params.date && new Date(item.startTime).valueOf() >= new Date().valueOf()
                    ) {
                        return item
                    }
                })
            }

        }
        if (ve === '2c') {
            if (listTrip && listTrip.length > 0) {
                this.LuotVe = listTrip.filter((item, index) => {
                    let to = this.props.match.params.from;
                    let from = this.props.match.params.to;
                    if (from === slugify(item.fromStation.nameStation)) {
                        from = slugify(item.fromStation.province.nameProvince)
                    }
                    if (to === slugify(item.toStation.nameStation)) {
                        to = slugify(item.toStation.province.nameProvince);
                    }
                    if (
                        slugify(item.fromStation.province.nameProvince) === from 
                        && slugify(item.toStation.province.nameProvince) === to 
                        && new Date(item.startTime).toLocaleDateString("nl-NL") === JSON.parse(localStorage.getItem("OriginDest")).selectDateTo 
                        && new Date(item.startTime).valueOf() >= new Date().valueOf() 
                        && (new Date(JSON.parse(localStorage.getItem("OriginDest")).selectDateTo)).valueOf() > ((new Date(this.props.match.params.date)).valueOf() + ((24*60*60*1000) * 5) )
                    ) {
                        return item
                    }
                })
            }

        }
        if (ve === '2c') {
            elmTasks1 = this.LuotDi && this.LuotDi.length > 0 && this.LuotVe && this.LuotVe.length > 0 ? <TicketBook2c goBack={this.props.history} ve={this.props.match.params.ve} LuotDi={this.LuotDi} LuotVe={this.LuotVe}></TicketBook2c> : <TicketBook2cErr></TicketBook2cErr>;
        }
        return (
            <>
                <Layout className="layout">
                    <Headers></Headers>
                    {/* <FindTickets  listTrip={listTrip} history={this.props.history} selectFromAndTo={this.props.match.params} listStation={this.props.listStation}></FindTickets> */}
                    <Layout className="Alltrip">
                        <Row>
                            <Col span={24} style={{background:'rgb(192 210 236)',marginBottom:'15px'}}>
                                <div className="container">
                                    <Row >
                                        <Col className="gutter-row" span={10}>
                                            <div style={{ margin: '7px 0px' }}>
                                                <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'rgb(0, 21, 41)' }}>Xe đi {JSON.parse(localStorage.getItem("OriginDest")).selectTo} từ {JSON.parse(localStorage.getItem("OriginDest")).selectFrom}</span>
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" span={14}>
                                        </Col>
                                    </Row>

                                </div>
                            </Col>
                            <Col span={24} >
                               
                          
                            </Col>
                            <Col span={24}>
                                <div style={{ minHeight: '450px' }}>
                                    {this.props.listTrip && this.props.listTrip.length === 0 ?
                                        <TicketBookErr ve={ve}></TicketBookErr>
                                        : ''}
                                    {this.props.listTrip && this.props.listTrip.length > 0 ?
                                        <div>
                                            {elmTasks}
                                            {elmTasks1}
                                        </div>
                                        : ''}
                                </div>
                            </Col>
                        </Row>
                    </Layout>
                    <Footers></Footers>
                    <FormChat></FormChat>
                </Layout >
            </>
        )
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
        sortPrice: (data) => {
            dispatch(sortPrice(data))
        },
        filterSeat: (data) => {
            dispatch(filterSeat(data))
        },
        getSelectNotify: (notify) => {
            dispatch(getSelectNotify(notify))
        },
    }
}
const mapStateToProps = (state) => ({
    listStation: state.listStation.stations,
    listTrip: state.listTrip.trips,
    sort: state.sortPrice,
    filter: state.filterSeat
});

export default connect(mapStateToProps, mapDispathToProps)(TicketBook);












