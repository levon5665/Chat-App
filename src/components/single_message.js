import React, { Component } from 'react';


export default class SingleMessage extends Component {

    render() {
        let {date,msg,user} = this.props.data;
        return (
            <div className={this.props.left ? "message left" : "message"}>
                <div className="image-block">
                    <div className="centering">
                        <img src={user.avatar} alt={user.name}/>
                    </div>
                    <div className="date">
                        <span>{date}</span>
                    </div>
                </div>
                <div className="text-block">
                    <span>{msg}</span>
                </div>
            </div>
        );
    }
}