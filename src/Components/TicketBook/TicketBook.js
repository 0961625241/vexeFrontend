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
    //      showPage = (loadSpin) => {
    //          let loadSpinx =document.getElementById(loadSpin)
    //          let elmH1 =document.getElementById("elmH1");
    //          let TicketBook1c =document.getElementById("TicketBook1c");
    //          console.log(this.LuotDi1c)
    //          if(this.LuotDi1c && this.LuotDi1c.length > 0)
    //          {
    //             TicketBook1c.style.display = "block";
    //             loadSpinx.style.display = "none";
    //          }else{
    //             elmH1.style.display = "block";
    //             loadSpinx.style.display = "none";
    //          }

    // }
    componentDidMount() {
        //    window.onload = setTimeout(() => this.showPage("loadSpin"), 10000);
        this.props.getTripRequest()
        this.props.getStationRequest()


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
        // if (filter.filterName) {
        //     listTrip = listTrip.filter((task) => {
        //         if (filter.filterName === '') {
        //             return task;
        //         }
        //         else if (filter.filterName === task.cars.typesSeat) {
        //             return task
        //         }
        //         else
        //             if (filter.filterName === task.cars.typesSeat) {
        //                 return task
        //             }
        //     });
        // }
        // if (sort.by === 'price') {
        //     listTrip.sort((a, b) => {
        //         if (a.price > b.price) return sort.value;
        //         else if (a.price < b.price) return -sort.value;
        //         else return 0;
        //     });
        // }

        var elmTasks;
        var elmTasks1;
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
                    if (slugify(item.fromStation.province.nameProvince) === from && slugify(item.toStation.province.nameProvince) === to && new Date(item.startTime).toLocaleDateString("nl-NL") === this.props.match.params.date && new Date(item.startTime).valueOf() >= new Date().valueOf()
                    ) {
                        return item;

                    }
                })
            }
        }
        if (ve === '1c') {
            elmTasks = this.LuotDi1c && this.LuotDi1c.length > 0 ? <TicketBook1c goBack={this.props.history} ve={this.props.match.params.ve} LuotDi1c={this.LuotDi1c} ></TicketBook1c> : <TicketBook1cErr goBack={this.props.history} ve={this.props.match.params.ve} LuotDi1c={this.LuotDi1c}></TicketBook1cErr>
            // <div>
            // <div className="LoadSpin" style={{ textAlign: 'center' }}>
            //          <div  id="loadSpin" ><Spin size="large" /></div>
            //                </div>
            //                {/* id={`${item._id}`}  style={{ display: 'none' }} */}
            //  <h1 id="elmH1" >Ko cos chuyeen ddi nao</h1>
            //  </div>
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
                    if (slugify(item.fromStation.province.nameProvince) === from && slugify(item.toStation.province.nameProvince) === to && new Date(item.startTime).toLocaleDateString("nl-NL") === JSON.parse(localStorage.getItem("OriginDest")).selectDateTo && new Date(item.startTime).valueOf() >= new Date().valueOf()
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
                    <FindTickets selectFromAndTo={this.props.match.params} listStation={this.props.listStation}></FindTickets>
                    <Layout className="Alltrip">
                        <Row>
                            <Col span={24} style={{background:'#1890ff',marginBottom:'15px'}}>
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


                            <Col span={24}>
                                <div style={{ minHeight: '450px' }}>
                                    {/* <div className="LoadSpin" style={{ textAlign: 'center',width:'100%',padding:'211px 0px' }}>
                                               <div  id="loadSpin"  ><Spin size="large" /></div>
                                              <h4>Đang xử lý...</h4> 
                                                   </div> */}
                                    
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
                            {/* {this.LuotDi1c.length > 0 ?  
                                                // :
                                                // <div className="LoadSpin" style={{ textAlign: 'center',width:'100%',padding:'211px 0px' }}>
                                                // <div  id="loadSpin"  ><Spin size="large" /></div>
                                                // <h4>Đang xử lý...</h4>
                                                //     </div>
                                                // } */}


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

// import React, { Component } from 'react'
// import {
//     WifiOutlined,
// } from '@ant-design/icons';
// import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card, Form, Spin, Modal } from 'antd';
// import Icon from '@ant-design/icons';
// import Checkbox from './Checkbox/Checkbox';
// import { postTicketRequest } from './../../../actions/tickets';
// import { connect } from 'react-redux';
// import FromToStation from './FromToStation/FromToStation';
// import Draggable from 'react-draggable';
// import { getTripRequest } from './../../../actions/trips';

// function numberToMoney(money){
//     return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")   
// }

// const ArrowRight = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" height="14px" width="14px"
//         viewBox="0 0 31.49 31.49" >
//         <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
//             C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
//             c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/>
//     </svg>
// );
// const ArrowRightIcon = () => {
//     return <Icon component={ArrowRight} />;
// }
// const Car = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 28 44"><g fill="#fff" stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g></svg>
// )
// const CarIcon = () => {
//     return <Icon component={Car} />;
// }

// const hidePanels = (selectTicket, accordion, tabcontent) => {
//     for (let i = 0; i < selectTicket.length; i++) {
//         selectTicket[i].style.display = 'none'
//         accordion[i].classList.remove("active");
//         accordion[i].innerHTML = 'Ch?n vé'
//     }
// }

// const showPage = (elem, selectTicket, accordion, li, loadSpin) => {
//     hidePanels(selectTicket, accordion)
//     elem.classList.add("active");
//     elem.innerHTML = 'Ðóng';
//     selectTicket[li].style.display = "block";
//     loadSpin[li].style.display = "none";
// }
// class TicketBookItem extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             setCodes:[],
//             registers: {
//                 tripId: this.props.item._id,
//                 emailKH: 'qua',
//                 address: '527/18,Hoàng Sa,Phuong 7, Qu?n 3',
//                 sdt: '0907455769',

//             },
//             visible: false,
//             disabled: true,
//             price: 0,
//             pickDate:''
//         }

//     }

//     componentDidMount() {
//         let accordion = document.getElementsByClassName("accordion");
//         let selectTicket = document.getElementsByClassName('selectTicket');
//         let loadSpin = document.getElementsByClassName("loadSpin");

//         for (let i = 0; i < accordion.length; i++) {
//             accordion[i].innerHTML = 'Ch?n vé';
//             accordion[i].onclick = function () {
//                 if (selectTicket[i].style.display === "block") {
//                     hidePanels(selectTicket, accordion)
//                 }
//                 else {

//                     loadSpin[i].style.display = "block";
//                     window.onload = setTimeout(() => showPage(this, selectTicket, accordion, i, loadSpin), 1000);
//                 }
//             }
//         }



//     }

//     qua = () => {
//         let tabcontent = document.querySelectorAll(`.tabcontent${this.props.index}`);
//         tabcontent.forEach((item, i) => { return item.style.display = "none" });
//         tabcontent[0].style.display = "block";
//         let tablinks = document.querySelectorAll(`.tablinks${this.props.index}`);
//         tablinks.forEach((item, i) => { return item.classList.remove("active") });
//         tablinks[0].classList.add("active")
//         let spanx = document.querySelectorAll(`.spanx${this.props.item._id}`);
//         spanx.forEach((item, i) => {
//             if (item.style.fill === "rgb(24, 144, 255)") {
//                 return item.style.fill = "rgb(192, 192, 192)"
//             }
//         });
//         let thanhcong = document.getElementsByClassName('thanhcong');
//         for (let i = 0; i < thanhcong.length; i++) {
//             thanhcong[i].innerHTML = ''
//         }

//         this.setState({
//             setCodes:[],
//             price:0
//         })
//     }
//     onChange = (e) => {
//         // this.setState({ value: e.target.value });
//         let target = e.target;
//         let value = target.type === 'checkbox' ? target.checked : target.value;
//         let name = target.name;
//         console.log(value)
//         this.setState(prevState => ({
//              registers:{
//                 ...prevState.registers,
//                 [name]:value
//             }
//           }));
//     }

//     onCheckbox = (pricex, setCodesx) => {
//         let {setCodes,price}=this.state;
//         var findI =setCodes.findIndex(x=>x === setCodesx)
//         if(findI === -1)
//         {
//             setCodes.push(setCodesx)
//             price= price + pricex
//         }else{
//             var xoaCode = setCodes.indexOf(setCodesx);
//             setCodes.splice(xoaCode, 1);
//             price= price - pricex
//         }
//         this.setState({
//             setCodes: setCodes,
//             price:price
//         })
//     }
//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     };

//     handleOk = e => {

//         e.preventDefault();
//         let pickDate = new Date();
//         let registers = this.state.registers;
//         console.log(registers)
//         registers.seatCodes = this.state.setCodes;
//         registers.dateBooked =pickDate
//         if (JSON.parse(localStorage.getItem("User"))) {
//             registers.emailKH = JSON.parse(localStorage.getItem("User")).email
//         }
//         console.log(this.state.registers)
//         if(registers.seatCodes.length > 0)
//         {
//             this.props.postTicketRequest(registers)
//             let accordion = document.getElementsByClassName("accordion");
//             let selectTicket = document.getElementsByClassName('selectTicket');

//             let thanhcong = document.getElementsByClassName('thanhcong');
//             for (let i = 0; i < thanhcong.length; i++) {
//                 thanhcong[i].innerHTML = 'Chúc m?ng b?n d?t vé thành công'
//             }
//             window.onload = setTimeout(function qya(){
//                 for (let i = 0; i < selectTicket.length; i++) {
//                     selectTicket[i].style.display = 'none'
//                     accordion[i].classList.remove("active");
//                     accordion[i].innerHTML = 'Ch?n vé'
//                 }
//             },2000);
//         }





//         this.setState({
//             visible: false,
//             setCodes:[],
//             price:0
//         });
//     };

//     handleCancel = e => {
//         console.log(e);
//         this.setState({
//             visible: false,
//         });
//     };
//     render() {
//         let { item, index } = this.props;
//         console.log(item)
//          let checkbox = <Checkbox   onCheckbox={this.onCheckbox} id={item._id} price={item.price} seat={item.cars.seats} key={index} index={index}></Checkbox>;
//         let emailKH = JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).email : this.state.registers.emailKH;
//         let disabled = JSON.parse(localStorage.getItem("User")) !== null ? true : false;
//         return (
//             <>
//                 <div className="content-trip"  >
//                     <div className="content-item">
//                         <div className="icons-list" style={{ marginRight: '40px' }} >
//                             <div style={{textAlign:'center'}}><h4 style={{fontSize:"16px"}}>{item.cars.nameBus}</h4></div>
//                             <img style={{width:'140px',height:'100px',borderRadius:'2px'}} src={`http://localhost:3000/${item.cars.imageBus}`}></img>
//                             {/* <span style={{ marginTop: '52px', marginBottom: '11px', display: 'block', fontWeight: 'bold' }}><i style={{ fontSize: '23px' }} className="fas fa-bus"></i></span> */}
//                         </div>
//                         {/* <div className="icons-list" style={{ marginRight: '100px' }} >
//                             <span style={{ marginTop: '52px', marginBottom: '11px', display: 'block', fontWeight: 'bold' }}>{item.car}</span>
//                             <WifiOutlined />
//                         </div> */}
//                         <div className="icons-list"  >
//                             <span style={{ marginTop: '52px', marginBottom: '11px', display: 'block', fontWeight: 'bold' }}>{item.fromStation.name}</span>
//                         </div>
//                         <div className="icons-list" style={{ marginRight: '30px', marginLeft: '30px', width: '100px', textAlign: 'center' }} >
//                             <span style={{ display: 'block', fontSize: '13px', marginTop: '28px'}}>8:30</span>
//                             <ArrowRightIcon />
//                             <span style={{ display: 'block', fontSize: '13px' }}>D? ki?n</span>
//                         </div>
//                         <div className="icons-list" style={{ marginRight: '50px' }} >
//                             <span style={{ marginTop: '52px', marginBottom: '11px', display: 'block', fontWeight: 'bold' }}>{item.toStation.name}</span>
//                         </div>
//                         <div className="icons-list" style={{ marginRight: '60px' }} >
//                             <span style={{ marginTop: '52px', marginBottom: '11px', display: 'block', fontWeight: 'bold' }}>Ch? ng?i 24 ch?</span>
//                         </div>
//                         <div className="icons-list" style={{ marginRight: '60px' }} >
//                             <span style={{ marginTop: '52px', marginBottom: '5px', display: 'block', fontWeight: 'bold',color:'red' }}>{numberToMoney(item.price)}d</span>
//                         </div>
//                         <div className="icons-list accordionbtn "  >
//                             <a className="accordion" onClick={() => this.qua()} ></a>
//                         </div>
//                     </div>
//                     <div className="LoadSpin" style={{ textAlign: 'center' }}>
//                         <div id={`${item._id}`} className="loadSpin" style={{ display: 'none' }}><Spin /></div>
//                     </div>

//                 </div>
//                 {/* style={this.state.isDisplayForm === true ? { display: 'block' } : { display: 'none' }} */}
//                 <div id={item._id + 'collapse'} className="selectTicket" style={{ display: 'none' }} >
//                     <div className="container">
//                         <Row>
//                             <Col span={8}>
//                                 <div className="leftSelect">
//                                     <div className="title-step">
//                                         <p>1 - ch?n ch?</p>
//                                     </div>
//                                     <div className="content-step1" style={{ minHeight: '270px' }}>
//                                         <div className="border-centent-step1">
//                                             <div className="checkGhe">
//                                                 <div><span style={{ background: 'rgb(192, 192, 192)' }}></span>Gh? tr?ng</div>
//                                                 <div><span style={{ background: 'rgb(253, 237, 232)' }}></span>Không th? ch?n</div>
//                                                 <div><span style={{ background: 'rgb(24, 144, 255)' }}></span>Ðang ch?n</div>
//                                             </div>
//                                             <div className="showGhe">
//                                                 {checkbox}

//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="totalTrip"  >
//                                         <p><span>S? gh? : </span><span style={{ color: 'red' }}>{this.state.setCodes.length}</span></p>
//                                         <p><span>T?ng ti?n : </span><span style={{ color: 'red' }}>{numberToMoney(this.state.price)}d</span></p>
//                                     </div>
//                                 </div>

//                             </Col>
//                             <Col span={8}>
//                                 <div className="centerSelect">
//                                     <div className="title-step">
//                                         <p>2 - xem di?m di và di?m d?n</p>
//                                     </div>
//                                     <div className="content-step2" style={{ minHeight: '270px' }}>
//                                         <FromToStation index={index} id={item._id} fromStation={item.fromStation} toStation={item.toStation}></FromToStation>
//                                     </div>
//                                 </div>
//                             </Col>
//                             <Col span={8}>
//                                 <div className="rightSelect">
//                                     <div className="title-step">
//                                         <p>3 - Thông tin khách hàng </p>
//                                     </div>
//                                     <div className="content-step3" style={{ minHeight: '270px' }}>
//                                         <div className="border-centent-step3">
//                                             <div className="form-group" style={{ display: 'none' }}>
//                                                 <input type="text" value={this.state.registers.tripId} name='tripId' hidden className="form-control" onChange={this.onChange} />
//                                             </div>
//                                             <div className="form-group">
//                                                 <label >Email</label>
//                                                 <input disabled={disabled} type="email" value={emailKH} name='emailKH' className="form-control" placeholder="Enter email" onChange={this.onChange} />
//                                             </div>
//                                             <div className="form-group">
//                                                 <label >Ð?a ch?</label>
//                                                 <input type="text" value={this.state.registers.address} name='address' className="form-control" placeholder="Address" onChange={this.onChange} />
//                                             </div>
//                                             <div className="form-group">
//                                                 <label >S? di?n tho?i</label>
//                                                 <input value={this.state.registers.sdt} type="text" name='sdt' className="form-control" placeholder="So dien thoai" onChange={this.onChange} />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="payTrip">
//                                         <Button onClick={this.showModal} type="primary" htmlType="submit">
//                                             Ð?t vé
//                                         </Button>
//                                         <p className={`thanhcong`}></p>
//                                         <Modal
//                                             title={
//                                                 <div
//                                                     style={{
//                                                         width: '100%',
//                                                         cursor: 'move',
//                                                     }}
//                                                     onMouseOver={() => {
//                                                         if (this.state.disabled) {
//                                                             this.setState({
//                                                                 disabled: false,
//                                                             });
//                                                         }
//                                                     }}
//                                                     onMouseOut={() => {
//                                                         this.setState({
//                                                             disabled: true,
//                                                         });
//                                                     }}
//                                                     onFocus={() => { }}
//                                                     onBlur={() => { }}
//                                                 >
//                                                     Ð?t vé
//             </div>
//                                             }
//                                             visible={this.state.visible}
//                                             onOk={this.handleOk}
//                                             onCancel={this.handleCancel}
//                                             modalRender={modal => <Draggable disabled={this.state.disabled}>{modal}</Draggable>}
//                                         >
//                                             <p> {this.state.setCodes && this.state.setCodes.length > 0 ? 'B?n có mu?n d?t vé không ?' : 'Vui lòng ch?n vé'}      </p>

//                                         </Modal>
//                                     </div>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </div>
//                 </div>

//             </>
//         )
//     }
// }
// const mapDispathToProps = (dispatch) => {
//     return {
//         postTicketRequest: (data) => {
//             dispatch(postTicketRequest(data))
//         },
//         getTripRequest: () => {
//             dispatch(getTripRequest())
//         }
//     }
// }


// export default connect(null, mapDispathToProps)(TicketBookItem)

