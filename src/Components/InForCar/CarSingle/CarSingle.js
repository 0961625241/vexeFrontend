import React, { Component } from 'react'
import Headers from './../../Headers/Headers';
// import { getStationRequest } from './../../../actions/stations';
import { getCarRequest } from './../../../actions/cars';
 import { getTripRequest } from './../../../actions/trips';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card, Form, Spin } from 'antd';
import Footers from './../../Footers/Footers'
 import CarSingleItem from './CarSingleItem'
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
        }
    }
    componentDidMount() {
         this.props.getCarRequest()
         this.props.getTripRequest()
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
            if(slugify(item.cars.CarMFG.nameCarMFG) ===  this.props.match.params.hangxe)
            {
                return(<CarSingleItem listTrip={this.props.listTrip} item={item} key ={item._id + index} ></CarSingleItem>)
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
                                            <b>Xe {nameCar}</b>
                                        </h1>

                                        <p style={{ marginTop: '16px' }}><small className="pt10" style={{ fontSize: '16px' }}><i className="glyphicon glyphicon-map-marker"></i>&nbsp;<b>Trụ sở:</b> Số 789 Giải Phóng</small></p>

                                        <div id="readmore" style={{ maxHeight: "none" ,textAlign:'center'}}>
                                            <img style={{objectFit:'cover',borderRadius:'8px'}} width='230' height='200px'  src={`http://localhost:3000/${imageBus}`}></img>
                                            {/* <p>{descriptionStation}
                                     </p> */}
                                        </div>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={18}>
                                    <div style={{ background: '#FFF',height:'100%' ,padding:'30px 10px 30px 10px'}}>
                                        <h2 style={{ marginBottom: '20px' }} className='bus-station-name'>Bảng giá xe</h2>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{width:'150px'}}>Tuyến đường</th>
                                                    <th style={{width:'200px'}}>Thông tin vé</th>
                                                    {/* <th style={{width:'130px'}}>Giá vé</th>*/}
                                                    <th style={{width:'150px'}}>Ngày</th> 
                                                    <th style={{width:'150px'}}></th>
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
                    <Footers></Footers>
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
    }
}
const mapStateToProps = (state) => ({
    // listStation: state.listStation.stations,
    listCar: state.listCar.cars,
    listTrip: state.listTrip.trips,
});

export default connect(mapStateToProps, mapDispathToProps)(CarSingle);