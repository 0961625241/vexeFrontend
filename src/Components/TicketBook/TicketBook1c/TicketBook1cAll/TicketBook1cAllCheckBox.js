import React, { Component } from 'react'
import TicketBook1cAllChecked from './TicketBook1cAllChecked'

export default class TicketbookCallcheckbox extends Component {
    render() {
        let {item,index} =this.props;
        return (
            <>
                 {item._id === this.props.value ?
                        <TicketBook1cAllChecked onCheckbox={this.props.onCheckbox}   id={item._id} price={item.price} seat={item.seats} key={index} index={index}></TicketBook1cAllChecked> : ''
                      } 
              
            </>
        )
    }
}

