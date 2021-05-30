import React, { Component } from 'react'

export default class TicketBook2cLeft extends Component {
    render() {
        let item =this.props.item;
        return (
            <>
                    <div className="route-info"><div className="route-info-name">{item.fromStation.nameStation} ⇒ {item.toStation.nameStation}</div>
                        <span >{item.price}</span>
                        <input type="radio" onClick={this.props.onChangeStation}  className="route-select-checkbox" value={`${item.fromStation.nameStation} - ${item.toStation.nameStation}`}   onChange={(e)=>this.props.handleRadioChange(e,item)} checked={this.props.typesStation  === `${item.fromStation.nameStation} - ${item.toStation.nameStation}`  } />
                      </div>
            </>
        )
    }
}
