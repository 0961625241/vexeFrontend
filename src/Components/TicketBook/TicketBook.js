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
            typesStation: '',

        }
        this.LuotDi1c = [];
        this.LuotDi = [];
        this.LuotVe = [];
    }
    componentDidMount() {
        this.props.getStationRequest()
        this.props.getTripRequest()
    }
    onClickSort = (sortBy, sortValue) => {
        let accordion = document.getElementsByClassName("accordion");
        let selectTicket = document.getElementsByClassName('selectTicket');
        for (let i = 0; i < selectTicket.length; i++) {
            selectTicket[i].style.display = 'none'
            accordion[i].classList.remove("active");
            accordion[i].innerHTML = 'Chọn vé'
        }
        this.props.sortPrice({
            by: sortBy,
            value: sortValue
        })
    }
    onFilterSeat = (filterName) => {
        let accordion = document.getElementsByClassName("accordion");
        let selectTicket = document.getElementsByClassName('selectTicket');
        for (let i = 0; i < selectTicket.length; i++) {
            selectTicket[i].style.display = 'none'
            accordion[i].classList.remove("active");
            accordion[i].innerHTML = 'Chọn vé'
        }
        this.props.filterSeat(filterName)
    }
    handleRadioChange = (event) => {
        console.log(event.target.value)
        this.setState({
            typesStation: event.target.value
        });
    }
    render() {
        let { listTrip } = this.props;
        let { sort } = this.props;
        let { filter } = this.props;
        if (filter.filterName) {
            listTrip = listTrip.filter((task) => {
                if (filter.filterName === '') {
                    return task;
                }
                else if (filter.filterName === task.cars.typesSeat) {
                    return task
                }
                else
                    if (filter.filterName === task.cars.typesSeat) {
                        return task
                    }
            });
        }
        if (sort.by === 'price') {
            listTrip.sort((a, b) => {
                if (a.price > b.price) return sort.value;
                else if (a.price < b.price) return -sort.value;
                else return 0;
            });
        }

        var elmTasks;
        var elmTasks1;
        var elmTasks2;
        let ve = this.props.match.params.ve;
        if (ve === '1c') {
            if (listTrip && listTrip.length > 0) {
                this.LuotDi1c = listTrip.filter((item, index) => {
                    let from = this.props.match.params.from;
                    let to = this.props.match.params.to;
                    if (from === slugify(item.fromStation.nameStation)) {
                        from = slugify(item.fromStation.province.nameProvince)
                    }
                    if (to === slugify(item.toStation.nameStation)) {
                        to = slugify(item.toStation.province.nameProvince);
                    }
                    if (slugify(item.fromStation.province.nameProvince) === from && slugify(item.toStation.province.nameProvince) === to && new Date(item.startTime).toLocaleDateString("nl-NL") === this.props.match.params.date
                    ) {
                        return item;

                    }
                })
            }
        }
        if (ve === '1c') {
            elmTasks = this.LuotDi1c && this.LuotDi1c.length > 0 ? <TicketBook1c goBack={this.props.history} ve={this.props.match.params.ve} LuotDi1c={this.LuotDi1c} ></TicketBook1c> : '';
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
                    if (slugify(item.fromStation.province.nameProvince) === from && slugify(item.toStation.province.nameProvince) === to && new Date(item.startTime).toLocaleDateString("nl-NL") === this.props.match.params.date
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
                    if (slugify(item.fromStation.province.nameProvince) === from && slugify(item.toStation.province.nameProvince) === to && new Date(item.startTime).toLocaleDateString("nl-NL") === JSON.parse(localStorage.getItem("OriginDest")).selectDateTo
                    ) {
                        return item
                    }
                })
            }

        }
        if (ve === '2c') {
            elmTasks1 = this.LuotDi && this.LuotDi.length > 0 && this.LuotVe && this.LuotVe.length > 0 ? <TicketBook2c goBack={this.props.history} ve={this.props.match.params.ve} LuotDi={this.LuotDi} LuotVe={this.LuotVe}></TicketBook2c> : '';
        }
        return (
            <>
                <Layout className="layout">
                    <Headers></Headers>
                    <FindTickets selectFromAndTo={this.props.match.params} listStation={this.props.listStation}></FindTickets>
                    <Layout className="Alltrip">
                        <Row>
                            <Col span={24}>
                                <div className="container">
                                    <Row >
                                        <Col className="gutter-row" span={10}>
                                            <div>
                                                <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'rgb(0, 21, 41)' }}>Xe đi {JSON.parse(localStorage.getItem("OriginDest")).selectTo} từ {JSON.parse(localStorage.getItem("OriginDest")).selectFrom}</span>
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" span={14}>
                                            {/* {ve === '1c' ?
                                                <div className='filterTicket'>
                                                    <div className='filterTicketOne'>
                                                        <div className="dropdown">
                                                            <button
                                                                className="dropdown-toggle dropdown-toggleFilter"
                                                                type="button"
                                                                id="dropdownMenu1"
                                                                data-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="true"
                                                            >
                                                                Lọc theo chỗ ngồi <span className="fa fa-caret-square-o-down ml-5"></span>
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                                                <li onClick={() => this.onFilterSeat('')} >
                                                                    <a
                                                                        role="button"
                                                                        className='sort_selected'
                                                                        style={(this.props.filter.filterName === '') ? { fontWeight: 'bold' } : {}}
                                                                    >
                                                                        <span className="faFilter">
                                                                            Tất cả
                                                                    </span>
                                                                        <span className="faFilter">
                                                                            {(this.props.filter.filterName === '') ? <i className="fas fa-check"></i> : ''}
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li onClick={() => this.onFilterSeat('Ghế ngồi')} >
                                                                    <a
                                                                        role="button"
                                                                        className='sort_selected'
                                                                        style={(this.props.filter.filterName === 'Ghế ngồi') ? { fontWeight: 'bold' } : {}}
                                                                    >
                                                                        <span className="faFilter">
                                                                            Ghế ngồi
                                                                      </span>
                                                                        <span className="faFilter">
                                                                            {(this.props.filter.filterName === 'Ghế ngồi') ? <i className="fas fa-check"></i> : ''}
                                                                        </span>

                                                                    </a>
                                                                </li>
                                                                <li onClick={() => this.onFilterSeat('Giường nằm')}>
                                                                    <a
                                                                        role="button"
                                                                        className='sort_selected'
                                                                        style={(this.props.filter.filterName === 'Giường nằm') ? { fontWeight: 'bold' } : {}}
                                                                    >
                                                                        <span className="faFilter">
                                                                            Giường nằm
                                </span>
                                                                        <span className="faFilter">
                                                                            {(this.props.filter.filterName === 'Giường nằm') ? <i className="fas fa-check"></i> : ''}
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className='filterTicketOne'>
                                                        <div className="dropdown">
                                                            <button
                                                                className=" dropdown-toggle dropdown-toggleFilter"
                                                                type="button"
                                                                id="dropdownMenu1"
                                                                data-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="true"
                                                            >
                                                                Lọc theo giá <span className="fa fa-caret-square-o-down ml-5"></span>
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">

                                                                <li onClick={() => this.onClickSort('price', -1)}>
                                                                    <a
                                                                        role="button"
                                                                        className='sort_selected'
                                                                        style={(this.props.sort.by === 'price' && this.props.sort.value === -1) ? { fontWeight: 'bold' } : {}}
                                                                    >
                                                                        <span className="faFilter">

                                                                            Giá cao nhất
                                                                        </span>
                                                                        <span className="faFilter">
                                                                            {(this.props.sort.by === 'price' && this.props.sort.value === -1) ? <i className="fas fa-check"></i> : ''}
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li onClick={() => this.onClickSort('price', 1)} >
                                                                    <a
                                                                        role="button"
                                                                        className='sort_selected'
                                                                        style={(this.props.sort.by === 'price' && this.props.sort.value === 1) ? { fontWeight: 'bold' } : {}}
                                                                    >
                                                                        <span className="faFilter">
                                                                            Giá thấp nhất
                                                                    </span>
                                                                        <span className="faFilter">
                                                                            {(this.props.sort.by === 'price' && this.props.sort.value === 1) ? <i className="fas fa-check"></i> : ''}
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                : ''} */}
                                        </Col>
                                    </Row>

                                </div>
                            </Col>
                            <Col span={24}>
                                {elmTasks}
                                {elmTasks1}
                                {elmTasks2}

                            </Col>
                        </Row>
                    </Layout>
                    <Footers></Footers>
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
        }
    }
}
const mapStateToProps = (state) => ({
    listStation: state.listStation.stations,
    listTrip: state.listTrip.trips,
    sort: state.sortPrice,
    filter: state.filterSeat
});

export default connect(mapStateToProps, mapDispathToProps)(TicketBook);



// if(ve === '2c')
// {
//     if(listTrip && listTrip.length>0 )
//     {
//       elmTasks1 = listTrip.map((item, index) => {
//           let from = this.props.match.params.from;
//           let to = this.props.match.params.to;
//            if(from === slugify(item.fromStation.nameStation))
//             {
//               from = slugify(item.fromStation.province.nameProvince)
//             }
//           if(to === slugify(item.toStation.nameStation))
//              {
//               to = slugify(item.toStation.province.nameProvince);
//             }
//                 if (slugify(item.fromStation.province.nameProvince) === from && slugify(item.toStation.province.nameProvince) === to && new Date(item.startTime).toLocaleDateString("nl-NL") === this.props.match.params.date
//           ) {
//               console.log(item)
//               return (
//                   <TicketBook2cLeft handleRadioChange={this.handleRadioChange} typesStation={this.state.typesStation}  listTrip={listTrip}  key={index} item={item} index={index} ></TicketBook2cLeft>

//             )
//           }
//           else
//           if(slugify(item.fromStation.province.nameProvince) === to && slugify(item.toStation.province.nameProvince) === from && new Date(item.startTime).toLocaleDateString("nl-NL") === JSON.parse(localStorage.getItem("OriginDest")).selectDateTo
//           ){
//             console.log(item)
//             // return <TicketBook2cRight listTrip={listTrip}  key={index} item={item} index={index} ></TicketBook2cRight>
//           }
//       })
//     }

// }
// if(ve === '2c')
// {
//     if(listTrip && listTrip.length>0 )
//     {
//       elmTasks2 = listTrip.map((item, index) => {
//           let from = this.props.match.params.from;
//           let to = this.props.match.params.to;
//            if(from === slugify(item.fromStation.nameStation))
//             {
//               from = slugify(item.fromStation.province.nameProvince)
//             }
//           if(to === slugify(item.toStation.nameStation))
//              {
//               to = slugify(item.toStation.province.nameProvince);
//             }
//                 if (slugify(item.fromStation.province.nameProvince) === from && slugify(item.toStation.province.nameProvince) === to && new Date(item.startTime).toLocaleDateString("nl-NL") === this.props.match.params.date
//           ) {
//               console.log(item)

//               return (
//                   <CheckboxExample handleRadioChange={this.handleRadioChange} typesStation={this.state.typesStation}  listTrip={listTrip}  key={index} item={item} index={index} ></CheckboxExample>

//             )

//           }
//           else
//           if(slugify(item.fromStation.province.nameProvince) === to && slugify(item.toStation.province.nameProvince) === from && new Date(item.startTime).toLocaleDateString("nl-NL") === JSON.parse(localStorage.getItem("OriginDest")).selectDateTo
//           ){
//             console.log(item)
//             // return <TicketBook2cRight listTrip={listTrip}  key={index} item={item} index={index} ></TicketBook2cRight>
//           }
//       })
//     }

// }