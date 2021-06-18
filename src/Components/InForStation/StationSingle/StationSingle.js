import React, { Component } from 'react'
import Headers from './../../Headers/Headers';
import { getStationRequest } from './../../../actions/stations';
import { getTripRequest } from './../../../actions/trips';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card, Form, Spin } from 'antd';
import Footers from './../../Footers/Footers'
import StationSingleItem from './StationSingleItem'
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
class StationSingle extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        this.props.getStationRequest()
        this.props.getTripRequest()
    }
    render() {
        console.log(this.props.listTrip)
        let nameStation='';
        let addressStation='';
        let descriptionStation='';
        this.props.listStation.map((item,index)=>{
            if(slugify(item.nameStation) ===  this.props.match.params.benxe)
            {
                    nameStation=item.nameStation;
                    addressStation=item.addressStation;
                    descriptionStation=item.addressStation;
            }
        })
        let StationFast =  this.props.listTrip.map((item,index)=>{
            if(slugify(item.fromStation.nameStation) ===  this.props.match.params.benxe)
            {
                return(<StationSingleItem listTrip={this.props.listTrip} item={item} key ={item._id + index} ></StationSingleItem>)
            }
        })
        return (
            <>
                <Layout className="layout-history">
                    <Headers></Headers>
                    <section className='history' style={{ background: '#F7F9FA' }}>
                        <div className="container">
                            <Row >
                                <Col className="gutter-row" span={6}>
                                    <div className="aside-station" style={{ background: '#fff',height:'100%',padding:'30px 7px 30px 7px' }}  >
                                        <h1 className="mt0 hidden-xs hidden-sm bus-station-name" itemProp="name">
                                            <b>{nameStation}</b>
                                        </h1>

                                        <p style={{ marginTop: '16px' }}><small className="pt10" style={{ fontSize: '16px' }}><i className="glyphicon glyphicon-map-marker"></i>&nbsp;<b>Trụ sở:</b> {addressStation}</small></p>

                                        <div id="readmore" style={{ maxHeight: "none" }}>
                                            <h4 style={{ color: '#777', fontSize: '16px' }}>{nameStation}</h4>
                                            <p>{descriptionStation}
                                     </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={18}>
                                    <div style={{ background: '#FFF',height:'100%' ,padding:'30px 10px 30px 10px'}}>
                                        <h2 style={{ marginBottom: '20px' }} className='bus-station-name'>Đặt vé nhanh các tuyến đường từ {nameStation}</h2>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{width:'300px'}}>Tuyến đường</th>
                                                    <th style={{width:'130px'}}>Hãng xe</th>
                                                    <th style={{width:'130px'}}>Giá vé</th>
                                                    <th style={{width:'150px'}}>Ngày</th>
                                                    <th style={{width:'150px'}}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                             {StationFast}
                                            </tbody>
                                        </table>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </section>
                    <Footers></Footers>
                </Layout>
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
    }
}
const mapStateToProps = (state) => ({
    listStation: state.listStation.stations,
    listTrip: state.listTrip.trips,
});

export default connect(mapStateToProps, mapDispathToProps)(StationSingle);