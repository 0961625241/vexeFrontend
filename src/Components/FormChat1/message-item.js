import React, { Component } from 'react'

export default class MessageItem1 extends Component {
    render() {
        let {item}= this.props;
        return (
            <>
             
                <li style={{marginBottom:'15px'}} className={this.props.inforUser.email === item.email ? 'rightChat' : " " }>
                    <div className={this.props.inforUser.email === item.email ? 'time-label-Chat-Right' : "time-label-Chat-Left" } >
                        <span className="timeChat">{ `${new Date(item.created).getHours()}:${(new Date(item.created).getMinutes() < 10 ? '0' : '')}${new Date(item.created).getMinutes()} `}</span>
                        <span className="labelChat">{item.content } </span>
                        <span className="avatarChat"><img src={this.props.inforUser.email === item.email ? './../img/1572444129932_my-avatar.png' : "./../img/female-35.svg" } /></span>
                    </div>
                </li>
            </>
        )
    }
}
