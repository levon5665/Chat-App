import React, { Component } from 'react';


export default class Typing extends Component {

    render() {
        let {user} = this.props.data;
        return (
            <div className="gif">
                <div className="image-block">
                    <img src={user.avatar || ''} alt={user.name || ''}/>
                </div>
                <div className="animation">
                    <div className="item1 item"></div>
                    <div className="item2 item"></div>
                    <div className="item3 item"></div>
                </div>
            </div>
        );
    }
}
