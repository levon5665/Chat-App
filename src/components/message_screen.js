import React, { Component } from 'react';
import io from 'socket.io-client';
import Typing from './typing';
import SingleMessage from './single_message';

export default class MessageScreen extends Component {

	connected = false;
	typing = false;
	TYPING_TIMER_LENGTH = 1000; // ms
	lastTypingTime;

	constructor(props){
		super(props);
		this.state = { message : '' , typing : false , typingData: {}};
		this.socket = io();
		this.socket.on('user joined',this.userJoined.bind(this));
		this.socket.on('login',this.login.bind(this));
		this.socket.on('new message',this.newMessage.bind(this));
		this.socket.on('typing',this.onTyping.bind(this));
		this.socket.on('stop typing',this.stopTyping.bind(this));
		this.socket.on('to disconnect',this.logOut.bind(this));
	}

	componentDidMount(){
        this.socket.connect('http://localhost:3000');
		this.socket.emit('add user', this.props.user);
	}

	componentWillUnmount(){
		this.socket.disconnect();
	}

	login(){
		this.connected = true;
	}

	scrollToEnd(){
        let objDiv = document.getElementById(`message-content${this.props.user.id}`);
        objDiv.scrollTop = objDiv.scrollHeight + 1000;
	}

	onTyping(typingData){
		this.setState({ typing : true , typingData},()=>{
            this.scrollToEnd();
        })
	}

	stopTyping(){
		this.setState({ typing : false , typingData : {}})
	}

	userJoined(data){
		data.type = 'notification';
        this.props.addNewMessage(data);
	}

	handleOnChange(e){
		this.setState({
			message:e.target.value
		})
	}

	handleOnClick(){
		if(this.state.message.trim() == '') return false;
		this.sendMessage();
	}

	handleKeyPress(event){
		if(event.key == 'Enter'){
        	event.preventDefault();
            if(this.state.message.trim() == '') return false;
			return this.sendMessage();
		}
		this.updateTyping(event)
	}

	newMessage(data){
		this.setState({ typing : false});
		this.props.addNewMessage(data);
	}

	sendMessage(){
		let newDate = new Date();
		let date = `${newDate.getHours()}:${newDate.getMinutes()}`;
		this.socket.emit('new message', {type:'message',msg:this.state.message, date, user:this.props.user});
		this.setState({
			message: ''
		});
	}

	updateTyping(e) {
		if (this.connected) {
			if (!this.typing) {
				this.typing = true;
				this.socket.emit('typing',this.props.user);
			}
			this.lastTypingTime = (new Date()).getTime();

			setTimeout(()=>{
				var typingTimer = (new Date()).getTime();
				var timeDiff = typingTimer - this.lastTypingTime;
				if (timeDiff >= this.TYPING_TIMER_LENGTH && this.typing) {
					this.socket.emit('stop typing');
					this.typing = false;
				}
			}, this.TYPING_TIMER_LENGTH);
		}
	}

	onLogOut(){
        this.socket.emit('left chat',this.props.user);
	}

    logOut(data){
		if(data.user.id == this.props.user.id){
            data.type = 'notification';
            this.props.addNewMessage(data);
            this.props.logout();
		}
	}

	componentDidUpdate(){
        this.scrollToEnd();
	}

	render() {
    	let user = this.props.user;
    return (
		  <div className="message-block">
			  <div className="message-header">
				 <div className="image-block">
					 <img src={user.avatar} alt={user.name || ''} />
				 </div>
				 <h2>{this.props.user.name || ''}</h2>
                 <button onClick={this.onLogOut.bind(this)}>Log Out</button>
			  </div>
			  <div className="message-content" id={`message-content${user.id}`}>
				  {
					  this.props.data.map((msg,key)=>{
                          switch (msg.type){
                              case 'message':
                                  return(
									  <SingleMessage key={key} left={msg.user.id == user.id} data={msg}/>
                                  )
							  case 'notification':
							  	if(msg.user.id != user.id){
                                    return (<div key={key} className="join"><span className="joinspan">{msg.message}</span></div>)
								}

                          }

					  },this)
				  }
				  {this.state.typing ? <Typing data={this.state.typingData} /> : ''}
			  </div>
			  <div className="message-action">
				  <div className="typing">
					  <textarea onChange={this.handleOnChange.bind(this)}
								onKeyPress={this.handleKeyPress.bind(this)}
								placeholder="Write Message" value={this.state.message} />
				  </div>
				  <button onClick={this.handleOnClick.bind(this)}></button>
			  </div>
		  </div>
    );
  }
}
