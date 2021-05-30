import React, { Component } from 'react'

export default class TicketBook2cRight extends Component {
    render() {
        let item =this.props.item;
        return (
            <>
                    <div className="route-info"><div className="route-info-name">{item.fromStation.nameStation} ⇒ {item.toStation.nameStation}</div>
                        <span >{item.price}</span>
                        <input onClick={this.props.onChangeStation1} type="radio"  className="route-select-checkbox" value={`${item.fromStation.nameStation} - ${item.toStation.nameStation}`}   onChange={(e)=>this.props.handleRadioChange1(e,item)} checked={this.props.typesStation1  === `${item.fromStation.nameStation} - ${item.toStation.nameStation}`  } />
                      </div>
            </>
        )
    }
}
