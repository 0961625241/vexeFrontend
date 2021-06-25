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
                // [{description: "Chỗ ngồi lượt đi: ",
                // name: "A8",
                // quantity: "1",
                // unit_amount:
                // {
                // currency_code: "USD",
                // value: 17.33
                // }
                // },{description: "Chỗ ngồi lượt đi: ",
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
           }
            // alert('Transaction completed by ' + details.payer.name.given_name)
         
        })
    }
        }).render('#paypal-button-container');
    },[]);
    
  
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
                                                    <div style={{flex:10}}>
                                                        <div className=" field">
                                                            <div className=" sub-tit">Họ tên:</div>
                                                            <div >{props.registers.fullName}</div>
                                                        </div>
                                                        <div className=" field">
                                                            <div className=" sub-tit">Số điện thoại:</div>
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
                                                    <p><span>Thông tin lượt đi</span></p>
                                                </div>
                                            </div>
                                            <div className="containerRow">
                                            <div style={{flex:10}}>
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
                                                            <div >{props.itemStart.fromStation.nameStation}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{flex:10}}>
                                                        <div className=" field">
                                                            <div className=" sub-tit">Số lượng ghế:</div>
                                                            <div >{props.registers.seatCodes.length}</div>
                                                        </div>
                                                        <div className=" field">
                                                            <div className=" sub-tit">Số ghế:</div>
                                                            {props.registers.seatCodes.map(item=> {
                                                                return (<div className=" orange-value green" key={item}><span>{item}</span></div>)
                                                            })}
                                                          
                                                        </div>
                                                        <div className=" field">
                                                            <div className=" sub-tit">Tổng tiền lượt đi:</div>
                                                            <div className=" orange-value green">
                                                            {props.itemStart.price * props.registers.seatCodes.length}
                            <sup>₫</sup>
                                                            </div>
                                                        </div>
                                                        <div className=" field" />
                                                    </div>
                                                </div>
                                         
                                            <div className="ticket-info-container" fragment="4e5b8c30e4">
                                                <div className="title-bar">
                                                    <div className="title-txt">
                                                        <p><span>Thông tin lượt về</span></p>
                                                    </div>
                                                </div>
                                              
                                                <div className="containerRow">
                                            <div style={{flex:10}}>
                                                       
                                                            <div className=" field">
                                                                <div className=" sub-tit">Tuyến xe:</div>
                                                                <div ><span>{props.LuotVeForm} ⇒ {props.LuotVeTo}</span></div>
                                                            </div>
                                                            <div className=" field">
                                                                <div className=" sub-tit">Thời gian:</div>
                                                                <div ><span className="orange-value">{props.itemEnd.startTime}</span></div>
                                                            </div>
                                                            <div className=" field">
                                                                <div className=" sub-tit">Điểm lên xe:</div>
                                                                <div >
                                                                {props.itemEnd.fromStation.nameStation}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{flex:10}}>
                                                            <div className=" field">
                                                                <div className=" sub-tit">Số lượng ghế:</div>
                                                                <div >{props.registers.seatCodesTo.length}</div>
                                                            </div>
                                                            <div className=" field">
                                                                <div className=" sub-tit">Số ghế:</div>
                                                                  {props.registers.seatCodesTo.map(item=> {
                                                                return (<div className=" orange-value " key={item}><span>{item}</span></div>)
                                                            })}
                                                            </div>
                                                            <div className=" field">
                                                                <div className=" sub-tit">Tổng tiền lượt về:</div>
                                                                <div className=" orange-value">
                                                                {props.registers.seatCodesTo.length *props.itemEnd.price}
                                <sup>₫</sup>
                                                                </div>
                                                            </div>
                                                            <div className=" field" />
                                                        </div>
                                                    </div>
                                              
                                                <div fragment="4e5b8c30e4" className="footer-bar">
                                                    <div className="total-info">
                                                        <p className="footer-title">TỔNG TIỀN</p>
                                                        <p className="footer-price">{(props.itemStart.price * props.registers.seatCodes.length) + (props.registers.seatCodesTo.length *props.itemEnd.price)}<sup>₫</sup></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   <div className="thanhtoan2c">
                                   <    div  className="title">CHỌN CÁCH THANH TOÁN</div>
                                    <div className="ticket-info-body" style={{minHeight:'200px'}}>
                                        <label style={{fontSize:'18px',margin:'5px 0px'}}>
                                            <input type="radio" name="payment-option" value="paypal" defaultChecked />
                                            <span>Thanh toán với Paypal</span>
                                        </label>
                                        <br></br>
                                        <label style={{fontSize:'18px',margin:'5px 0px'}}>
                                            <input type="radio" name="payment-option" value="momo"  />
                                            <span>Thánh toán với MoMo</span>
                                        </label>
                                    </div>
                                    </div>
                                </div>
                                <div className="booking-nav-buttons">
                            <div className="left-btns">
                                <button onClick={props.onGoBack3}  className="back-btn">
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
                                <div  id="momo-button-container" className="hidden"><Button   style={{width:'100%'}} type="primary">Thanh Toán</Button></div>
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