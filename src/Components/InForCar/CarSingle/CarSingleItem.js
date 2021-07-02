import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, Input, DatePicker, Button, Select, AutoComplete, ConfigProvider, Modal } from 'antd';
import moment from 'moment';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';
import { getSelectRequest } from './../../../actions/select';
import { connect } from 'react-redux';
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
class CarSingleItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectDate:''
        }


    }

    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Fromatted Selected Time: ', dateString);
        var mm = value._d.getMonth() + 1;
        var dd = value._d.getDate();
        var yy = value._d.getFullYear();
        var myDateString = dd + '-' + mm + '-' + yy;
        console.log(myDateString)
        this.setState({
            selectDate: myDateString
        })
    }
    onOk = (value) => {
        console.log('onOk: ', value);
        

    }
    onFindTicket=(selectFrom, selectTo, selectDate,selectDateTo,selectVe)=>{
        this.props.getSelectRequest(selectFrom, selectTo, selectDate,selectDateTo,selectVe)
    }
    disabledDate(current) {
        let customDate = new Date().toLocaleDateString("es-CL");
        return current && current < moment(customDate, "DD-MM-YYYY");
      }
      
     time = (valuex) => {
        let value = new Date(valuex)
        var mm = value.getMonth() + 1;
        var dd = value.getDate();
        var yy = value.getFullYear();
        var myDateString = dd + '-' + mm + '-' + yy;
        console.log(myDateString)
       return myDateString
    } 
    render() {
        // console.log(this.props.listTrip)
        let { item } = this.props;
        const date = moment()
        return (
            <>
                <tr>
                {/* {item.fromStation.name} đi {item.toStation.province} */}
                    <td >{item.fromStation.province.nameProvince} đi {item.toStation.province.nameProvince}</td>
                    <td>Vé xe {item.cars.CarMFG.nameCarMFG} tuyến {item.fromStation.province.nameProvince} đi {item.toStation.province.nameProvince}</td>
                    {/* <td>{item.price}</td> */}
                    <td >{new Date(item.startTime).toLocaleDateString("es-CL")}</td>
                    <td>
                                    <Button type="primary"    >
                                    <Link
                                       onClick={()=>this.onFindTicket(item.fromStation.province.nameProvince,item.toStation.province.nameProvince,this.time(item.startTime),moment().format("DD-MM-YYYY"),'1c')}
                                        to={`/vi-VN/ve-xe-khach-tu-${slugify(item.fromStation.province.nameProvince)}-di-${slugify(item.toStation.province.nameProvince)}-tg-${this.time(item.startTime)}-ve1c`}
                                    > Tìm vé xe</Link>
                                </Button>
                    </td>
                </tr>
            </>
        )
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        getSelectRequest: (selectFrom, selectTo, selectDate,selectDateTo,selectVe) => {
            dispatch(getSelectRequest(selectFrom, selectTo, selectDate,selectDateTo,selectVe))
        },
    }
}
const mapStateToProps = (state) => ({
   
});

export default connect(mapStateToProps, mapDispathToProps)(CarSingleItem);