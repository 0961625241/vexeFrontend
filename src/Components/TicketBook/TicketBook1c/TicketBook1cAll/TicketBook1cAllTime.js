import React, { Component } from 'react'

export default class TicketbookCalltime extends Component {
    render() {
        let {index,item}=this.props;
        return (
            <>
                <option value={item._id}>{ `${new Date(item.startTime).getHours()}:${(new Date(item.startTime).getMinutes() < 10 ? '0' : '')}${new Date(item.startTime).getMinutes()} ${item.cars.typesSeat}`}</option>
            </>
        )
    }
}
