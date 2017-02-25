import React, { Component } from 'react';
import ChatWindow from './chat_window';


export default class App extends Component {

    constructor(props){
        super(props);
        this.state = this.getInitializeState();
    }

    getInitializeState() {
        return {
            msgList : []
        };
    }

    addNewMessage(newFeed){
        this.setState({
            msgList:this.state.msgList.concat(newFeed)
        });
    }

  render() {
  	let windows = ['visitor1','visitor2'];

    return (
      <div className="container">
		   {
		   		windows.map(window =>{
		   			return(
		   					<ChatWindow key={window} id={window}  addNewMessage={this.addNewMessage.bind(this)} data={this.state.msgList} />
		   				)
	   				
		   		})
		   }
	  </div>
    );
  }
}
