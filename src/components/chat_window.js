import React, { Component } from 'react';
import MessageScreen from './message_screen';
import LoginScreen from './login_screen';


const AVATAR_PATH = '/img/avatars/';

export default class ChatWindow extends Component {
    constructor(props){
        super(props);
        this.state = this.getInitializeState();
    }

    getInitializeState() {
        return {
            authorized : false,
            user       : {}
        };
    }

    makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    randomInteger(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }

    handleAuth(userdata){
        this.setState({
            authorized:true,
            user      : {
                id: this.makeid(),
                name:userdata.name,
                gender:userdata.gender,
                avatar:`${AVATAR_PATH}${userdata.gender}${this.randomInteger(1,7)}.png`
            }

        })
    }

    logOut(){
        this.setState({authorized:false,name:''})
    }

    addNewMessage(msgData){
        this.props.addNewMessage(msgData)
    }

  render() {
    return (
      <div className="conversation">
          {this.state.authorized ?
              <MessageScreen
                  addNewMessage={this.addNewMessage.bind(this)}
                  user={this.state.user}
                  data={this.props.data}
                  logout={this.logOut.bind(this)}
              /> :
              <LoginScreen id={this.props.id} authorize={this.handleAuth.bind(this)}/>
          }
	  </div>
    );
  }
}
