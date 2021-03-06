import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { postTicketRequest } from './../../actions/tickets';
import { getTripRequest } from './../../actions/trips';
import { connect } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import Swal from 'sweetalert2';
const Axios = require('axios');
const CryptoJS   = require("crypto-js");
const { Header, Content, Footer, Sider } = Layout;

function Payment2c(props) {
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

        // Render the PayPal button into #paypal-button-container
        let priceStart = Number((props.itemStart.price /23083).toFixed(2)) * props.registers.seatCodes.length;
        let priceEnd = Number((props.itemEnd.price /23083).toFixed(2)) * props.registers.seatCodesTo.length;
        let totalPrice = Number((priceStart + priceEnd).toFixed(2));
        let item_List=props.item_List
        window.paypal.Buttons({
            style: {
                layout: 'horizontal',
                tagline: "false",
                label: 'checkout',
            },
            createOrder: function(data, actions) {
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
                items: item_List
                // [{description: "Ch??? ng???i l?????t ??i: ",
                // name: "A8",
                // quantity: "1",
                // unit_amount:
                // {
                // currency_code: "USD",
                // value: 17.33
                // }
                // },{description: "Ch??? ng???i l?????t ??i: ",
                // name: "A7",
                // quantity: "1",
                // unit_amount:
                // {
                // currency_code: "USD",
                // value: 17.33
                // }
                // }]
            }],
           
        })
    },
    
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // let InforTicket=JSON.parse(localStorage.getItem("InforTicket"));
            // let captureID = details.purchase_units[0].payments.captures[0].id ;
            props.registers.captureID= details.purchase_units[0].payments.captures[0].id ;
            if(props.registers.captureID !== '' )
           {
               // InforTicket.captureID = captureID
           props.postTicketRequest(props.registers)
           Swal.fire({
            icon: 'success',
            title: 'B???n ???? mua th??nh c??ng',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `Ok`,
          
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                props.goBack.goBack()
            }
          })
           }
            // alert('Transaction completed by ' + details.payer.name.given_name)
         
        })
    }
        }).render('#paypal-button-container');
    },[]);
    
    const onClickMOMO = () => {
        let priceStart = Number(props.itemStart.price) * props.registers.seatCodes.length;
        let priceEnd = Number(props.itemEnd.price) * props.registers.seatCodesTo.length;
        let price = priceStart + priceEnd;
        var partnerCode = "MOMOFBKM20210425"
        var accessKey = "l6TpTlpLvQ4JBuYY"
        var orderInfo = "Thanh to??n v???i MoMo"
        var returnUrl = "http://localhost:4000/"
        var notifyUrl = "http://localhost:4000/notifyUrl"
        var amount = `${price}`
        var orderId = uuidv1()
        var requestId = uuidv1()
        var requestType = "captureMoMoWallet"
        var extraData = "email=ddrduongqua1027@gmail.com"
        var serectkey = 'OuC3uvUGmPvxdp3G0ow5QjWWgdljrbCb';
        var rawSignature = "partnerCode="+partnerCode+"&accessKey="+accessKey+"&requestId="+requestId+"&amount="+amount+"&orderId="+orderId+"&orderInfo="+orderInfo+"&returnUrl="+returnUrl+"&notifyUrl="+notifyUrl+"&extraData="+extraData
        var signature = CryptoJS.HmacSHA256(rawSignature,serectkey)
                               .toString(CryptoJS.enc.Hex)
        let data = JSON.stringify({
            accessKey: accessKey,
            partnerCode: partnerCode,
            requestType: requestType,
            notifyUrl: notifyUrl,
            returnUrl: returnUrl,
            orderId: orderId,
            amount: amount,
            orderInfo: orderInfo,
            requestId: requestId,
            extraData: extraData,
            signature: signature
        })
        Axios({
            method: "POST",
            headers: {
                 'content-type': 'application/x-www-form-urlencoded',
            },
            url: "https://test-payment.momo.vn/gw_payment/transactionProcessor"
            , data: data
        }).then((result) => {
            console.log(result)
            localStorage.setItem("InforTicket",JSON.stringify(props.registers));
           window.location.href = result.data.payUrl;
        }).catch((error) => {
            console.log(error.response)
        })
    }
        return (
            <>
              <div className="container"> 
                            <div className="row">
                            <div className="col-md-12">
                                <div className="info-container info-container3">
                                    <div id="ticket-infomation-container" className="buy-info-container">
                                        <div className="title-bar-bg"><p className="title-txt inForBuyT">TH??NG TIN MUA V??</p></div>
                                        <div className="customer-info-container">
                                            <div className="title-bar"><p className="title-txt">Th??ng tin h??nh kh??ch</p></div>
                                            <div className="containerRow">
                                                    <div style={{flex:10}}>
                                                        <div className=" field">
                                                            <div className=" sub-tit">H??? t??n:</div>
                                                            <div >{props.registers.fullName}</div>
                                                        </div>
                                                        <div className=" field">
                                                            <div className=" sub-tit">S??? ??i???n tho???i:</div>
                                                            <div >{props.registers.sdt}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{flex:10}}>
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
                                                    <p><span>Th??ng tin l?????t ??i</span></p>
                                                </div>
                                            </div>
                                            <div className="containerRow">
                                            <div style={{flex:10}}>
                                                        <div className=" field">
                                                            <div className=" sub-tit">Tuy???n xe:</div>
                                                            <div ><span>{props.LuotDiForm} ??? {props.LuotDiTo}</span></div>
                                                        </div>
                                                        <div className=" field">
                                                            <div className=" sub-tit">Th???i gian:</div>
                                                            <div ><span className="orange-value green">{`${new Date(props.itemStart.startTime).toLocaleDateString("es-CL")}    ${new Date(props.itemStart.startTime).getHours()}:${(new Date(props.itemStart.startTime).getMinutes() < 10 ? '0' : '')}${new Date(props.itemStart.startTime).getMinutes()}`}</span></div>
                                                        </div>
                                                        <div className=" field">
                                                            <div className=" sub-tit">??i???m l??n xe:</div>
                                                            <div >{props.itemStart.fromStation.nameStation}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{flex:10}}>
                                                        <div className=" field">
                                                            <div className=" sub-tit">S??? l?????ng gh???:</div>
                                                            <div >{props.registers.seatCodes.length}</div>
                                                        </div>
                                                        <div className=" field">
                                                            <div className=" sub-tit">S??? gh???:</div>
                                                            {props.registers.seatCodes.map(item=> {
                                                                return (<div className=" orange-value green" key={item}><span>{item}</span></div>)
                                                            })}
                                                          
                                                        </div>
                                                        <div className=" field">
                                                            <div className=" sub-tit">T???ng ti???n l?????t ??i:</div>
                                                            <div className=" orange-value green">
                                                            {props.itemStart.price * props.registers.seatCodes.length}
                            <sup>???</sup>
                                                            </div>
                                                        </div>
                                                        <div className=" field" />
                                                    </div>
                                                </div>
                                         
                                            <div className="ticket-info-container" fragment="4e5b8c30e4">
                                                <div className="title-bar">
                                                    <div className="title-txt">
                                                        <p><span>Th??ng tin l?????t v???</span></p>
                                                    </div>
                                                </div>
                                              
                                                <div className="containerRow">
                                            <div style={{flex:10}}>
                                                       
                                                            <div className=" field">
                                                                <div className=" sub-tit">Tuy???n xe:</div>
                                                                <div ><span>{props.LuotVeForm} ??? {props.LuotVeTo}</span></div>
                                                            </div>
                                                            <div className=" field">
                                                                <div className=" sub-tit">Th???i gian:</div>
                                                                <div ><span className="orange-value">{`${new Date(props.itemEnd.startTime).toLocaleDateString("es-CL")}    ${new Date(props.itemEnd.startTime).getHours()}:${(new Date(props.itemEnd.startTime).getMinutes() < 10 ? '0' : '')}${new Date(props.itemEnd.startTime).getMinutes()}`}</span></div>
                                                            </div>
                                                            <div className=" field">
                                                                <div className=" sub-tit">??i???m l??n xe:</div>
                                                                <div >
                                                                {props.itemEnd.fromStation.nameStation}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{flex:10}}>
                                                            <div className=" field">
                                                                <div className=" sub-tit">S??? l?????ng gh???:</div>
                                                                <div >{props.registers.seatCodesTo.length}</div>
                                                            </div>
                                                            <div className=" field">
                                                                <div className=" sub-tit">S??? gh???:</div>
                                                                  {props.registers.seatCodesTo.map(item=> {
                                                                return (<div className=" orange-value " key={item}><span>{item}</span></div>)
                                                            })}
                                                            </div>
                                                            <div className=" field">
                                                                <div className=" sub-tit">T???ng ti???n l?????t v???:</div>
                                                                <div className=" orange-value">
                                                                {props.registers.seatCodesTo.length *props.itemEnd.price}
                                <sup>???</sup>
                                                                </div>
                                                            </div>
                                                            <div className=" field" />
                                                        </div>
                                                    </div>
                                              
                                                <div fragment="4e5b8c30e4" className="footer-bar">
                                                    <div className="total-info">
                                                        <p className="footer-title">T???NG TI???N</p>
                                                        <p className="footer-price inForBuyT">{(props.itemStart.price * props.registers.seatCodes.length) + (props.registers.seatCodesTo.length *props.itemEnd.price)}<sup>???</sup></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   <div className="thanhtoan2c">
                                   <    div  className="title">CH???N C??CH THANH TO??N</div>
                                    <div className="ticket-info-body" style={{minHeight:'200px'}}>
                                        <label style={{fontSize:'18px',margin:'5px 0px'}}>
                                            <input type="radio" name="payment-option" value="paypal" defaultChecked />
                                            <span>Thanh to??n v???i Paypal</span>
                                        </label>
                                        <br></br>
                                        <label style={{fontSize:'18px',margin:'5px 0px'}}>
                                            <input type="radio" name="payment-option" value="momo"  />
                                            <span>Th??nh to??n v???i MoMo</span>
                                        </label>
                                    </div>
                                    </div>
                                </div>
                                <div className="booking-nav-buttons">
                            <div className="left-btns">
                                <button onClick={props.onGoBack3}  className="back-btn">
                                    <img alt="back" className="icon lazyLoad isLoaded" src="./../img/quaylai.png" />
                                                QUAY L???I
                                </button>
                             
                            
                            </div>
                            <div className="right-btns">
                                {/* <button className="next-btn">
                                    Thanh To??n
                                    < img alt="back" className="icon lazyLoad isLoaded" src="./../img/tieptuc.png" />
                                </button> */}
                                    <div id="paypal-button-container"></div>
                                <div  id="momo-button-container" className="hidden"><Button onClick={onClickMOMO}   type="primary">Thanh To??n</Button></div>
                            </div>


                        </div>
                            </div>
                            </div>
                        
                    </div>
          
            </>
        )
    
}
const mapStateToProps = (state) => ({
    listTrip:state.listTrip.trips
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


export default connect(mapStateToProps, mapDispathToProps)(Payment2c)