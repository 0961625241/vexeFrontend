import React, { Component } from 'react'
import { Avatar, Layout, Menu, Dropdown, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Card } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { connect } from 'react-redux';

// import { postStationRequest, putStationRequest, deleteStationRequest } from './../../../actions/stations';


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
class InForCar extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }


    }

showStation=(start,end)=>{
    if(this.props.listStation && this.props.listStation.length > 0)
    {
      return  this.props.listStation.slice(start,end).map((item)=>{
            return( <Link key={item._id} to={`/vi-VN/${slugify(item.nameStation)}`}>
           <p style={{color: 'rgb(118, 118, 118)'}}>{item.nameStation}</p> 
        </Link> )
        })
    }
}
showCar=(start,end)=>{
    let car='';
    let data=[];
    if(this.props.listCar && this.props.listCar.length > 0)
    {
      this.props.listCar.map((item)=>{
          if(item.CarMFG.nameCarMFG !== car)
          {
            car = item.CarMFG.nameCarMFG;
            data.push(item)
          }
        })
    }
    if(data && data.length > 0){
        return  data.slice(start,end).map((item)=>{
            return( <Link key={item._id} to={`/vi-VN/xe-${slugify(item.CarMFG.nameCarMFG)}`}>
           <p style={{color: 'rgb(118, 118, 118)'}}>{item.CarMFG.nameCarMFG}</p> 
        </Link> )
        })
    }
}


render() {
   
    return (
        <>
            <Layout className="inforCar" style={{ padding: '20px 0px' }}>
                <div className="container">
                    <Row >
                        <Col className="car-col" span={12}>
                            <h4>Bến xe</h4>
                            <Row >

                                <Col span={12}>
                                    {this.showStation(0,3)}
                                </Col>
                                <Col span={12}>
                                {this.showStation(3,6)}
                                </Col>
                            </Row>
                        </Col>
                        <Col className="car-col" span={12}>
                            <h4>Nhà xe</h4>
                            <Row >
                                <Col span={12}>
                                {this.showCar(0,3)}
                                </Col>
                                <Col span={12}>
                                {this.showCar(3,6)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </>
    )
}
}

const mapStateToProps = (state) => ({
    listStation: state.listStation.stations,
    listCar: state.listCar.cars,
});

const mapDispathToProps = (dispatch) => {
    return {
        // postStationRequest: (data) => {
        //     dispatch(postStationRequest(data))
        // },
    }
}
export default connect(mapStateToProps, mapDispathToProps)(InForCar);