import React, { Component } from 'react'
import Message from './message-item';
export default class MessageList1 extends Component {
    componentDidMount() {
        if (this.props.inforUser.conversation !== '') {
            var elmnt = document.getElementById(`messages1${this.props.inforUser.conversation.replace("@gmail.com", "")}`);
            elmnt.scrollTop = elmnt.scrollHeight - elmnt.clientHeight;
        }
    }
    render() {
        return (
            <>
                <ul className="messages1" id={`messages1${this.props.inforUser.conversation.replace("@gmail.com", "")}`}>
                    {this.props.messages.map(itemx => {
                        return itemx.listContent.map((item, index) => {
                            if(new Date(item.created).valueOf() >= new Date().setHours(0, 0, 0, 0))
                            {
                                return (<Message inforUser={this.props.inforUser} item={item} key={item._id}></Message>)
                            }
                        })
                    })}
                </ul>
            </>
        )
    }
}
