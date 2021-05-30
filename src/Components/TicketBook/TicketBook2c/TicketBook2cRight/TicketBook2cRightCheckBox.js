import React, { Component } from 'react'
import TicketBook2cRightChecked from './TicketBook2cRightChecked'
export default class TicketBook2cRightCheckBox extends Component {
    render() {
        let {item,index} =this.props;
       
        return (
            <>
                 
                  {item._id === this.props.value1 ?
                        <TicketBook2cRightChecked  onCheckbox1={this.props.onCheckbox1}  id={item._id} price={item.price} seat={item.seats} key={index} index={index}></TicketBook2cRightChecked> : ''
                      } 
            </>
        )
    }
}
