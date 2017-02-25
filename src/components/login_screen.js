import React, { Component } from 'react';


export default class LoginScreen extends Component {

    constructor(props){
        super(props);
        this.state = { name: '' , gender:'male'};
    }

    handleOnChange(e){
    	this.setState({
    		name:e.target.value
		})
	}

    handleOnClick(){
    	if(this.state.name.trim() == '') return;
        this.props.authorize(this.state);
	}

	handleKeyPress(event){
		if(event.key == 'Enter'){
			this.props.authorize(this.state);
		}
	}

    handleOnRadioChange(e){
        this.setState({
            gender:e.currentTarget.value
        })
	}

  render() {
	return (
			 <div className="login-block">
				 <div className="login-title">
					 <h2>Enter your name</h2>
				 </div>
				 <div className="login-action">
					 <div className="input">
						 <input type="text" onChange={this.handleOnChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} value={this.state.name} required maxLength="20"/>
                         <span className="highlight"></span>
                         <span className="bar"></span>
                         <label>Your Name*</label>
                     </div>
                     <div className="gender">
                         <p>Gender</p>
                         <label htmlFor={`${this.props.id}male`}>
							 <input type="radio" id={`${this.props.id}male`} name={`${this.props.id}gender`} onChange={this.handleOnRadioChange.bind(this)} value="male" defaultChecked={true}/>
							 <span className="gen"></span>Male
						 </label>
                         <label htmlFor={`${this.props.id}female`}>
							 <input type="radio" id={`${this.props.id}female`}name={`${this.props.id}gender`} onChange={this.handleOnRadioChange.bind(this)} value="female" />
							 <span className="gen"></span>Female
						 </label>
                     </div>
					 <button onClick={this.handleOnClick.bind(this)}>Login</button>
				 </div>
			 </div>
	);
  }
}
