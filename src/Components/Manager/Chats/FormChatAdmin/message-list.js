import React, { Component } from 'react'
import Message from './message-item';
export default class MessageList1 extends Component {


    render() {
        let {itemOne} =this.props;
        console.log(itemOne.conversation)
        return (
            <>
                <ul className="messages1" id={`messages1${itemOne.conversation.replace("@gmail.com", "")}`}>
                    { itemOne.listContent.map((item,index)=>{
                            if(new Date(item.created).valueOf() >= new Date().setHours(0, 0, 0, 0))
                            {
                            return(<Message inforUser={this.props.inforUser} item={item} key={item._id}></Message>)
                            }
                        })
                    }
                </ul>
            </>
        )
    }
}
