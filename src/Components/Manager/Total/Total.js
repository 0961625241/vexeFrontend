import React, { Component } from 'react'
import { Button, InputNumber, Modal, Form, Input, Radio, Table, Space, Select, DatePicker, ConfigProvider,Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';
import { Bar } from "react-chartjs-2";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
const { Option } = Select;
function numberToMoney(money) {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const { RangePicker } = DatePicker;

class Total extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataTotalTrip: [],
      fromDateTrip: '',
      toDateTrip: '',
      totalPriceTrip: 0,
      selectFromTrip: '',
      selectToTrip: '',
      ticketsTrip: 0,

      // totalPrice
      totalPriceTicketAll: 0,
      ticketAll: 0,
      fromDateTicketAll: '',
      toDateTicketAll: '',
      filterNameStation: '6045edefcb260b0ef4d0b1ef',
      selectMonth: "2021",
    }
  }


  onChangeTrip = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    let totalPriceTrip = 0;
    let stt = 0;
    this.props.listTicket.filter((item, index) => {
      if (item.tripId.fromStation._id === this.state.selectFromTrip && item.tripId.toStation._id === this.state.selectToTrip) {
        if ((new Date(dates[0]._d)).setHours(0,0,0,0) <= (new Date(item.createdAt)).setHours(0,0,0,0) && (new Date(item.createdAt)).setHours(0,0,0,0) <= (new Date(dates[1]._d)).setHours(0,0,0,0)) {
          stt = stt + 1
          totalPriceTrip = totalPriceTrip + item.totalStart
        }
      }
      else if(item.tripIDTo !== null)
      {
        if(item.tripIDTo.fromStation._id === this.state.selectFromTrip && item.tripIDTo.toStation._id === this.state.selectToTrip)
        {
          if ((new Date(dates[0]._d)).setHours(0,0,0,0) <= (new Date(item.createdAt)).setHours(0,0,0,0) && (new Date(item.createdAt)).setHours(0,0,0,0) <= (new Date(dates[1]._d)).setHours(0,0,0,0)) {
            stt = stt + 1
            totalPriceTrip = totalPriceTrip + item.totalEnd
          }
        }
      }
    })
    this.setState({
      ticketsTrip: stt,
      totalPriceTrip: totalPriceTrip,
      fromDateTrip: new Date(dates[0]._d).toLocaleDateString("es-CL"),
      toDateTrip: new Date(dates[1]._d).toLocaleDateString("es-CL")
    })


  }
  onChangeTicketAll = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    let totalPriceTicketAll = 0;
    let stt = 0;
    this.props.listTicket.filter((item, index) => {
       if (item.typesTicket === '1c') {
        if ((new Date(dates[0]._d)).setHours(0,0,0,0) <= (new Date(item.createdAt)).setHours(0,0,0,0) && (new Date(item.createdAt)).setHours(0,0,0,0) <= (new Date(dates[1]._d)).setHours(0,0,0,0)) {
          stt = stt + 1
          totalPriceTicketAll = totalPriceTicketAll + item.totalPrice
        }
      } else if(item.typesTicket === '2c')
      {
        stt = stt + 1
        totalPriceTicketAll = totalPriceTicketAll + item.totalPrice
      }

    })

    this.setState({
      ticketAll: stt,
      totalPriceTicketAll: totalPriceTicketAll,
      fromDateTicketAll: new Date(dates[0]._d).toLocaleDateString("es-CL"),
      toDateTicketAll: new Date(dates[1]._d).toLocaleDateString("es-CL")
    })
  }


  handleSelectFROM = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectFromTrip: value
    })
  }
  handleSelectTO = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectToTrip: value
    })
  }
  onChangeFilterStation = (value) => {
    console.log(`selected ${value}`);

    this.setState({
      filterNameStation: value,
      selectMonth:"2021"
      //   selectCodeCar: 'Vui long chon ma xe'
    })
  }
  onChangeMonth = (value) => {
    console.log(`selected ${value}`);

    this.setState({
      selectMonth: value
    })
  }
  render() {
    let { ticketAll, totalPriceTicketAll, fromDateTicketAll, toDateTicketAll, dataTotalTrip, fromDateTrip, toDateTrip, selectFromTrip, selectToTrip, ticketsTrip } = this.state;
    let { listStation } = this.props;
    let { filterNameStation, selectMonth } = this.state
    console.log(this.props.listTicket)
    let year = new Date(selectMonth)
    let YearARR = [{ T1: 1, gia: 0 }, { T1: 2, gia: 0 }, { T1: 3, gia: 0 }, { T1: 4, gia: 0 }, { T1: 5, gia: 0 }, { T1: 6, gia: 0 }, { T1: 7, gia: 0 }, { T1: 8, gia: 0 }, { T1: 9, gia: 0 }, { T1: 10, gia: 0 }, { T1: 11, gia: 0 }, { T1: 12, gia: 0 },];
    this.props.listTicket.map((item, index) => {
      if (filterNameStation === item.tripId.fromStation._id) {
        if (year.getFullYear() === new Date(item.tripId.startTime).getFullYear()) {
          YearARR.map((itemx, index) => {
            if (itemx.T1 === new Date(item.tripId.startTime).getMonth() + 1) {
              itemx.gia = itemx.gia + item.totalStart
            }
          })
        }
      }
      else if(item.tripIDTo !== null)
      {
        if(filterNameStation === item.tripIDTo.fromStation._id)
        {
          if (year.getFullYear() === new Date(item.tripIDTo.startTime).getFullYear()) {
            YearARR.map((itemx, index) => {
              if (itemx.T1 === new Date(item.tripIDTo.startTime).getMonth() + 1) {
                itemx.gia = itemx.gia + item.totalEnd
              }
            })
          }
        }
      }
    })
    let quan = [];
    YearARR.map((itemx, index) => {
      quan.push(itemx.gia)
    })
    return (
      <>
      <div>
      <h4 className="titleListManager">Qu???n l?? Th???ng k??</h4>
          <div className="breadcrumbList"><Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/manager'>Trang ch???</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Th??ng k??
    </Breadcrumb.Item>
          </Breadcrumb></div>
      </div>
        <div className="input-groupSearch">
        
          <div className="statisticalOfTrip">
          <h4>Th???ng k?? chuy???n ??i t??? : </h4>
          <div className='Statistical' style={{ display: 'flex' ,marginBottom:'10px'}}>
            <div>
              <p>??i???m ??i : </p>
              <Select onChange={this.handleSelectFROM} style={{ width: 250 }}
              // value={selectCodeCar}
              >
                {listStation.map((item, index) => {
                  return (<Select.Option key={index + item._id} value={item._id}>{item.nameStation}</Select.Option>)
                })}
              </Select>
            </div>
            <div>
              <p>??i???m ?????n :</p>
              <Select onChange={this.handleSelectTO} style={{ width: 250 }}
              // value={selectCodeCar}
              >
                {listStation.map((item, index) => {
                  return (<Select.Option key={index + item._id} value={item._id}>{item.nameStation}</Select.Option>)
                })}
              </Select>
            </div>
            <div>
              <p>Th???i gian :</p>
              <Space direction="vertical" size={12}>
                <ConfigProvider locale={locale}>
                  <RangePicker
                    ranges={{
                      Today: [moment(), moment()],
                      'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    onChange={this.onChangeTrip}
                    // defaultValue ={moment(this.state.selectDate, "DD-MM-YYYY")}
                    format={"DD-MM-YYYY"}
                  />
                </ConfigProvider>
              </Space>
            </div>
          </div>
          {
            fromDateTrip !== '' && toDateTrip !== '' ? <p>V??  ?????t t??? ng??y {fromDateTrip} ?????n ng??y {toDateTrip} c?? {ticketsTrip} v?? t????ng ??????ng l?? : {numberToMoney(this.state.totalPriceTrip)}??</p>
              : <p>T???ng c???ng c?? {ticketsTrip} v?? t????ng ??????ng l?? : 0??</p>
          }
        </div>






        <div className="statisticalOfTrip">
          <h4>Th???ng k?? v?? c???a t???t c??? c??c chuy???n ??i : </h4>
          <p>Th???i gian :</p>
          <Space direction="vertical" size={12}>
            <ConfigProvider locale={locale}>
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={this.onChangeTicketAll}
                // defaultValue ={moment(this.state.selectDate, "DD-MM-YYYY")}
                format={"DD-MM-YYYY"}
              />
            </ConfigProvider>
          </Space>
          {
            fromDateTicketAll !== '' && toDateTicketAll !== '' ? <p style={{marginBottom:'10px'}}>V??  ?????t t??? ng??y {fromDateTicketAll} ?????n ng??y {toDateTicketAll} c?? {ticketAll} v?? t????ng ??????ng l?? : {numberToMoney(this.state.totalPriceTicketAll)}??</p>
              : <p style={{marginBottom:'10px'}}>T???ng c???ng c?? {ticketAll} v?? t????ng ??????ng l?? : 0??</p>
          }
        </div>


        <h4>Th???ng k?? v?? theo bi???u ?????: </h4>
        <Select
            style={{ width: 150 }}
            showSearch
            style={{ width: 200 }}
            placeholder="Vui l??ng ch???n khu v???c"
            optionFilterProp="children"
            onChange={this.onChangeFilterStation}
            defaultValue={this.state.filterNameStation}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="">T???t c???</Option>
            {
              this.props.listStation.map((item, index) => {
                return (<Option key={index + item._id} value={item._id}>{item.nameStation}</Option>)
              })}
          </Select>
          <Space direction="vertical" size={12}>
            <ConfigProvider locale={locale}>
              <DatePicker onChange={this.onChangeMonth}  value ={moment(this.state.selectMonth, "YYYY")}  picker="year" />
            </ConfigProvider>
          </Space>
          <Bar
          data={{
            labels: [
              "Th??ng 1",
              "Th??ng 2",
              "Th??ng 3",
              "Th??ng 4",
              "Th??ng 5",
              "Th??ng 6",
              "Th??ng 7",
              "Th??ng 8",
              "Th??ng 9",
              "Th??ng 10",
              "Th??ng 11",
              "Th??ng 12",
            ],
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#c45850",
                  "#c45850"
                ],
                data: quan
              }
            ]
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: "t???ng ti???n"
            }
          }}
        />
        </div>
        



     
      </>
    )
  }
}


const mapStateToProps = (state) => ({
  listTicket: state.listTicket.tickets,
  listStation: state.listStation.stations,
});
const mapDispathToProps = (dispatch) => {
  return {
    //   deleteTicketRequest: (id,data) => {
    //         dispatch(deleteTicketRequest(id,data))
    //     },
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Total);