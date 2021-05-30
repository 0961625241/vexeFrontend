import React, { Component } from 'react'
import TicketBook2cLeftChecked from './TicketBook2cLeftChecked'
export default class TicketBook2cLeftCheckBox extends Component {
    render() {
        let {item,index} =this.props;
        return (
            <>
                 {/* this.props.typesStation */}
                  {item._id === this.props.value ?
                        <TicketBook2cLeftChecked onCheckbox={this.props.onCheckbox}   id={item._id} price={item.price} seat={item.seats} key={index} index={index}></TicketBook2cLeftChecked> : ''
                      } 
              
            </>
        )
    }
}
