// import React, { Component } from 'react'
// import { Route, Link } from 'react-router-dom';
// import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import { postTicketRequest } from './../../actions/tickets';
// import { getTripRequest } from './../../actions/trips';
// import { connect } from 'react-redux';
// import { v1 as uuidv1 } from 'uuid';
// const Axios = require('axios');
// const CryptoJS   = require("crypto-js");
// const { Header, Content, Footer, Sider } = Layout;

// // function ConvertVN(USD){
// //     return USD * 23075;
// //   }
// // function ConvertUSD(VND){
// // return VND / 23075;
// // }  
// // function numberToMoney(money) {
// // return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
// // } 

// class Payment extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {

//         }

//     }

//     componentDidMount() {
//         console.log(this.props.history)
//         console.log(this.props.registers)
//         let details;
//         localStorage.setItem("InforTicket",JSON.stringify(this.props.registers))
//         window.document.querySelectorAll('input[name=payment-option]').forEach(function (el) {
//             el.addEventListener('change', function (event) {
//                 // If PayPal is selected, show the PayPal button
//                 if (event.target.value === 'paypal') {
//                     document.querySelector('#momo-button-container').style.display = 'none';
//                     document.querySelector('#paypal-button-container').style.display = 'block';
//                 }

//                 // // If Card is selected, show the standard continue button
//                 if (event.target.value === 'momo') {
//                     document.querySelector('#momo-button-container').style.display = 'block';
//                     document.querySelector('#paypal-button-container').style.display = 'none';
//                 }
//             });
//         });

//         // Hide Non-PayPal button by default
//         document.querySelector('#momo-button-container').style.display = 'none';

//         let item_List=this.props.item_List
//         let price = Number( (this.props.inforStation.price /23083).toFixed(2)) * this.props.registers.seatCodes.length;
//         let totalPrice = Number(price).toFixed(2);
//         let registers =this.props.registers;

//         // Render the PayPal button into #paypal-button-container
//         window.paypal.Buttons({
//             style: {
//                 // layout: 'horizontal',
//                 // tagline: "false",
//                 // label: 'checkout',
//             },
//             createOrder: function(data, actions) {
//             return actions.order.create({
//             purchase_units: [{
//                 amount: {
//                     currency_code: "USD",
//                     value: totalPrice,
//                     breakdown: {
//                         item_total: {
//                             currency_code: "USD",
//                             value: totalPrice
//                         }
//                     }
//                 },
//                 items: item_List,
//             }],

//         })
//     },

//     onApprove: function(data, actions) {
//         return actions.order.capture().then(function(details) {
//             details =details 
//             console.log(registers)
//             // let InforTicket=JSON.parse(localStorage.getItem("InforTicket"));
//             // let captureID = details.purchase_units[0].payments.captures[0].id ;

//             // if(captureID !== '' || captureID !== undefined)
//             // {
//             //     InforTicket.captureID = captureID
//             //    this.props.postTicketRequest(InforTicket)
//             // //    this.props.history.goBack()
//             //    localStorage.removeItem("InforTicket");
//             // }
//             // // alert('Transaction completed by ' + details.payer.name.given_name)

//         })
//     }
//         }).render('#paypal-button-container');

//         // this.props.getTripRequest()
//         console.log(details)
//         if(details !== undefined)
//         {
//             console.log(details)
//         }
//     }



//     onClickMOMO=()=>{
//         var partnerCode = "MOMOFBKM20210425"
//         var partnerName = "VEXE"
//         var storeId = "VEXE"
//         var accessKey = "l6TpTlpLvQ4JBuYY"
//         var orderInfo = "chuyen di tu :" +"tphcm => danang" +"voi ma la A1 A2 chuyen ve từ danang=>tphcm voi ma la A1 A2"
//         var ipnUrl = "http://localhost:3004/notifyUrl"
//         var redirectUrl = "http://localhost:3001/about"
//         var lang  =  "vi"
//         var amount =  55000
//         var orderId = uuidv1()
//         var requestId = uuidv1()
//         var requestType = "captureWallet"
//         var extraData ="email=ddrduongqua1027@gmail.com"
//         var serectkey='OuC3uvUGmPvxdp3G0ow5QjWWgdljrbCb';
//           var rawSignature = "accessKey="+accessKey+"&amount="+amount+"&extraData="+extraData+"&ipnUrl="+ipnUrl+"&orderId="+orderId+"&orderInfo="+orderInfo+"&partnerCode="+partnerCode+"&redirectUrl="+redirectUrl+"&requestId="+requestId+"&requestType="+requestType
//            var signature = CryptoJS.HmacSHA256(rawSignature,serectkey)
//                                   .toString(CryptoJS.enc.Hex)
//           let data = {
//             "partnerCode": partnerCode,
//             // "partnerName" : partnerName,
//             // "storeId" : storeId,
//             "requestType": requestType,
//             "ipnUrl": ipnUrl,
//             "redirectUrl":redirectUrl,
//             "orderId": orderId,
//             "amount": amount,
//             "lang":  lang,
//             "orderInfo": orderInfo,
//             "requestId": requestId,
//             "extraData": extraData,
//             "signature": signature
//           }
//           Axios({ method: "POST",url: "https://test-payment.momo.vn/v2/gateway/api/create",data:data
//      }).then((data)=>{
//     console.log(data)
//   }).catch((error)=>{
//     console.log(error.response)
//   })
//     }
//     render() {
//         let {registers,LuotDi1c,inforStation}=this.props;
//         return (
//             <>
//                     <div className="content-trip"  >
//                         <div className="content-item">
//                             <div className="allTicket2c">
//                                 <div className="info-container info-container3">
//                                     <div id="ticket-infomation-container" className="buy-info-container">
//                                         <div className="title-bar-bg"><p className="title-txt">THÔNG TIN MUA VÉ</p></div>
//                                         <div className="customer-info-container">
//                                             <div className="title-bar"><p className="title-txt">Thông tin hành khách</p></div>
//                                             <div className="containerRow">
//                                                     <div style={{flex:10}}>
//                                                         <div className=" field">
//                                                             <div className=" sub-tit">Họ tên:</div>
//                                                             <div >{registers.fullName}</div>
//                                                         </div>
//                                                         <div className=" field">
//                                                             <div className=" sub-tit">Số điện thoại:</div>
//                                                             <div >{registers.sdt}</div>
//                                                         </div>
//                                                     </div>
//                                                     <div style={{flex:10}}>
//                                                         <div className=" field">
//                                                             <div className=" sub-tit">Email:</div>
//                                                             <div >{registers.emailKH}</div>
//                                                         </div>
//                                                     </div>
//                                             </div>
//                                         </div>
//                                             <div className="ticket-info-container" fragment="4e5b8c30e4">
//                                                 <div className="title-bar">
//                                                     <div className="title-txt">
//                                                         <p><span>Thông tin vé</span></p>
//                                                     </div>
//                                                 </div>

//                                                 <div className="containerRow">
//                                             <div style={{flex:10}}>

//                                                             <div className=" field">
//                                                                 <div className=" sub-tit">Tuyến xe:</div>
//                                                                 <div ><span>{inforStation.fromStation.province.nameProvince} ⇒ {inforStation.toStation.province.nameProvince}</span></div>
//                                                             </div>
//                                                             <div className=" field">
//                                                                 <div className=" sub-tit">Thời gian:</div>
//                                                                 <div ><span className="orange-value">{inforStation.startTime}</span></div>
//                                                             </div>
//                                                             <div className=" field">
//                                                                 <div className=" sub-tit">Điểm lên xe:</div>
//                                                                 <div >
//                                                                 {inforStation.toStation.nameStation}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                         <div style={{flex:10}}>
//                                                             <div className=" field">
//                                                                 <div className=" sub-tit">Số lượng ghế:</div>
//                                                                 <div >{registers.seatCodes.length}</div>
//                                                             </div>
//                                                             <div className=" field">
//                                                                 <div className=" sub-tit">Số ghế:</div>
//                                                                   {registers.seatCodes.map(item=> {
//                                                                 return (<div className=" orange-value " key={item}><span>{item}</span></div>)
//                                                             })}
//                                                             </div>
//                                                             <div className=" field" />
//                                                         </div>
//                                                     </div>

//                                                 <div fragment="4e5b8c30e4" className="footer-bar">
//                                                     <div className="total-info">
//                                                         <p className="footer-title">TỔNG TIỀN</p>
//                                                         <p className="footer-price">{registers.price}<sup>₫</sup></p>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                     </div>
//                                    <div className="thanhtoan2c">
//                                    <    div  className="title">CHỌN CÁCH THANH TOÁN</div>
//                                     <div className="ticket-info-body" style={{minHeight:'200px'}}>
//                                         <label style={{fontSize:'18px',margin:'5px 0px'}}>
//                                             <input type="radio" name="payment-option" value="paypal" defaultChecked />
//                                             <span>Thanh toán với Paypal</span>
//                                         </label>
//                                         <br></br>
//                                         <label style={{fontSize:'18px',margin:'5px 0px'}}>
//                                             <input type="radio" name="payment-option" value="momo"  />
//                                             <span>Thánh toán với MoMo</span>
//                                         </label>
//                                     </div>
//                                     </div>
//                                 </div>
//                                 <div className="booking-nav-buttons">
//                             <div className="left-btns">
//                                 <button onClick={this.props.onGoBack3}  className="back-btn">
//                                     <img alt="back" className="icon lazyLoad isLoaded" src="./../img/quaylai.png" />
//                                                 QUAY LẠI
//                                 </button>


//                             </div>
//                             <div className="right-btns">
//                                 {/* <button className="next-btn">
//                                     Thanh Toán
//                                     < img alt="back" className="icon lazyLoad isLoaded" src="./../img/tieptuc.png" />
//                                 </button> */}
//                                     <div id="paypal-button-container"></div>
//                                 <div  id="momo-button-container" className="hidden"><Button onClick={this.onClickMOMO}  style={{width:'100%'}} type="primary">Thanh Toán</Button></div>
//                             </div>


//                         </div>
//                             </div>
//                         </div>
//                     </div>
//             </>
//         )
//     }
// }
// const mapStateToProps = (state) => ({
//     listTrip:state.listTrip.trips
//     // listSearch:state.searchCar.keyword
//   });
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


// export default connect(mapStateToProps, mapDispathToProps)(Payment)




import React, { useState, useEffect } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { postTicketRequest } from './../../actions/tickets';
import { getTripRequest } from './../../actions/trips';
import { connect } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import { createBrowserHistory } from "history";
import Swal from 'sweetalert2';
const history = createBrowserHistory();
const Axios = require('axios');
const CryptoJS = require("crypto-js");
const { Header, Content, Footer, Sider } = Layout;
function Payment(props) {
    console.log(props.history)
    useEffect(() => {

        window.document.querySelectorAll('input[name=payment-option]').forEach(function (el) {
            el.addEventListener('change', function (event) {
                // If PayPal is selected, show the PayPal button
                if (event.target.value === 'paypal') {
                    document.querySelector('#momo-button-container').style.display = 'none';
                    document.querySelector('#paypal-button-container').style.display = 'block';
                }

                // // If Card is selected, show the standard continue button
                if (event.target.value === 'momo') {
                    document.querySelector('#momo-button-container').style.display = 'block';
                    document.querySelector('#paypal-button-container').style.display = 'none';
                }
            });
        });

        // Hide Non-PayPal button by default
        document.querySelector('#momo-button-container').style.display = 'none';



        let price = Number((props.itemStart.price / 23083).toFixed(2)) * props.registers.seatCodes.length;
        let totalPrice = Number(price).toFixed(2);
        let item_List = props.item_List

        // Render the PayPal button into #paypal-button-container
        window.paypal.Buttons({
            style: {
                layout: 'horizontal',
                tagline: "false",
                label: 'checkout',
            },
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: "USD",
                            value: totalPrice,
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: totalPrice
                                }
                            }
                        },
                        items: item_List,
                    }],

                })
            },

            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    // let InforTicket=JSON.parse(localStorage.getItem("InforTicket"));
                    props.registers.captureID = details.purchase_units[0].payments.captures[0].id;
                    if (props.registers.captureID !== '') {
                        // InforTicket.captureID = captureID
                        props.postTicketRequest(props.registers)
                        Swal.fire({
                            icon: 'success',
                            title: 'Bạn đã mua thành công',
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `Ok`,
                          
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                props.goBack.goBack()
                            }
                          })
                        
                        //   props.history.goBack()
                        //    localStorage.removeItem("InforTicket");
                    }
                    // // alert('Transaction completed by ' + details.payer.name.given_name)

                })
            }
        }).render('#paypal-button-container');

        // props.getTripRequest()
    },[]);

    //      const onClickMOMO=()=>{
    //         var partnerCode = "MOMOFBKM20210425"
    //         var partnerName = "VEXE"
    //         var storeId = "VEXE"
    //         var accessKey = "l6TpTlpLvQ4JBuYY"
    //         var orderInfo = "chuyen di tu :" +"tphcm => danang" +"voi ma la A1 A2 chuyen ve từ danang=>tphcm voi ma la A1 A2"
    //         var ipnUrl = "http://localhost:3004/notifyUrl"
    //         var redirectUrl = "http://localhost:4000"
    //         var lang  =  "vi"
    //         var amount =  55000
    //         var orderId = uuidv1()
    //         var requestId = uuidv1()
    //         var requestType = "captureWallet"
    //         var extraData ="email=ddrduongqua1027@gmail.com"
    //         var serectkey='OuC3uvUGmPvxdp3G0ow5QjWWgdljrbCb';
    //           var rawSignature = "accessKey="+accessKey+"&amount="+amount+"&extraData="+extraData+"&ipnUrl="+ipnUrl+"&orderId="+orderId+"&orderInfo="+orderInfo+"&partnerCode="+partnerCode+"&redirectUrl="+redirectUrl+"&requestId="+requestId+"&requestType="+requestType
    //            var signature = CryptoJS.HmacSHA256(rawSignature,serectkey)
    //                                   .toString(CryptoJS.enc.Hex)
    //           let data = {
    //             "partnerCode": partnerCode,
    //             // "partnerName" : partnerName,
    //             // "storeId" : storeId,
    //             "requestType": requestType,
    //             "ipnUrl": ipnUrl,
    //             "redirectUrl":redirectUrl,
    //             "orderId": orderId,
    //             "amount": amount,
    //             "lang":  lang,
    //             "orderInfo": orderInfo,
    //             "requestId": requestId,
    //             "extraData": extraData,
    //             "signature": signature
    //           }
    //           Axios({ method: "POST",url: "https://test-payment.momo.vn/v2/gateway/api/create",data:data
    //      }).then((result)=>{
    //     console.log(result)
    //     window.document.getElementById("linkMoMo").href = result.data.payUrl;

    //   }).catch((error)=>{
    //     console.log(error.response)
    //   })
    //     } 
    //    const onLinkMoMo=()=>{
    //         localStorage.setItem("InforTicket",JSON.stringify(props.registers))
    //     }
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <div className="info-container info-container3">
                            <div id="ticket-infomation-container" className="buy-info-container">
                                <div className="title-bar-bg"><p className="title-txt">THÔNG TIN MUA VÉ</p></div>
                                <div className="customer-info-container">
                                    <div className="title-bar"><p className="title-txt">Thông tin hành khách</p></div>
                                    <div className="containerRow">
                                        <div style={{ flex: 10 }}>
                                            <div className=" field">
                                                <div className=" sub-tit">Họ tên:</div>
                                                <div >{props.registers.fullName}</div>
                                            </div>
                                            <div className=" field">
                                                <div className=" sub-tit">Số điện thoại:</div>
                                                <div >{props.registers.sdt}</div>
                                            </div>
                                        </div>
                                        <div style={{ flex: 10 }}>
                                            <div className=" field">
                                                <div className=" sub-tit">Email:</div>
                                                <div >{props.registers.emailKH}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ticket-info-container" fragment="4e5b8c30e4">
                                    <div className="title-bar">
                                        <div className="title-txt">
                                            <p><span>Thông tin vé</span></p>
                                        </div>
                                    </div>

                                    <div className="containerRow">
                                        <div style={{ flex: 10 }}>

                                            <div className=" field">
                                                <div className=" sub-tit">Tuyến xe:</div>
                                                <div ><span>{props.LuotDiForm} ⇒ {props.LuotDiTo}</span></div>
                                            </div>
                                            <div className=" field">
                                                <div className=" sub-tit">Thời gian:</div>
                                                <div ><span className="orange-value green">{props.itemStart.startTime}</span></div>
                                            </div>
                                            <div className=" field">
                                                <div className=" sub-tit">Điểm lên xe:</div>
                                                <div >
                                                    <div >{props.itemStart.fromStation.nameStation}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ flex: 10 }}>
                                            <div className=" field">
                                                <div className=" sub-tit">Số lượng ghế:</div>
                                                <div >{props.registers.seatCodes.length}</div>
                                            </div>
                                            <div className=" field">
                                                <div className=" sub-tit">Số ghế:</div>
                                                {props.registers.seatCodes.map(item => {
                                                    return (<div className=" orange-value green" key={item}><span>{item}</span></div>)
                                                })}
                                            </div>
                                            <div className=" field" />
                                        </div>
                                    </div>

                                    <div fragment="4e5b8c30e4" className="footer-bar">
                                        <div className="total-info">
                                            <p className="footer-title">TỔNG TIỀN</p>
                                            <p className="footer-price">{(props.itemStart.price * props.registers.seatCodes.length)}<sup>₫</sup></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="thanhtoan2c">
                                <    div className="title">CHỌN CÁCH THANH TOÁN</div>
                                <div className="ticket-info-body" style={{ minHeight: '200px' }}>
                                    <label style={{ fontSize: '18px', margin: '5px 0px' }}>
                                        <input type="radio" name="payment-option" value="paypal" defaultChecked />
                                        <span>Thanh toán với Paypal</span>
                                    </label>
                                    <br></br>
                                    <label style={{ fontSize: '18px', margin: '5px 0px' }}>
                                        <input type="radio" name="payment-option" value="momo" />
                                        <span>Thánh toán với MoMo</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="booking-nav-buttons">
                            <div className="left-btns">
                                <button onClick={props.onGoBack3} className="back-btn">
                                    <img alt="back" className="icon lazyLoad isLoaded" src="./../img/quaylai.png" />
                                    QUAY LẠI
                                </button>


                            </div>
                            <div className="right-btns">
                                {/* <button className="next-btn">
                                    Thanh Toán
                                    < img alt="back" className="icon lazyLoad isLoaded" src="./../img/tieptuc.png" />
                                </button> */}
                                <div id="paypal-button-container"></div>
                                {/* <div  id="momo-hidden" onClick={onClickMOMO()} className="hidden"></div> */}
                                <div id="momo-button-container" className="hidden"><a id="linkMoMo" style={{ width: '100%' }} type="primary">Thanh Toán</a></div>
                                {/* onClick={onLinkMoMo} */}
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


const mapStateToProps = (state) => ({
    listTrip: state.listTrip.trips
    // listSearch:state.searchCar.keyword
});
const mapDispathToProps = (dispatch) => {
    return {
        postTicketRequest: (data) => {
            dispatch(postTicketRequest(data))
        },
        getTripRequest: () => {
            dispatch(getTripRequest())
        }
    }
}


export default connect(mapStateToProps, mapDispathToProps)(Payment)