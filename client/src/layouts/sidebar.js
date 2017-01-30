import React, { Component } from 'react'
import { PageHeader, PageHeaderHeading, Icon } from 'react-lightning-design-system';

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: true
		};
	}

	handleNav() {
	    document.getElementById("mySidenav").style.width = this.state.isOpen ? "250px" : "0";
	    document.getElementById("main").style.marginLeft = this.state.isOpen ? "250px" : "0";
		this.setState({isOpen: !this.state.isOpen})
	}

	render() {
		return (
			<div>
				<div id="mySidenav" className="sidenav">
				  <a href="javascript:void(0)" className="closebtn" onClick={this.handleNav.bind(this)}>&times;</a>
				  <a href="#">About</a>
				  <a href="#">Services</a>
				  <a href="#">Clients</a>
				  <a href="#">Contact</a>
				</div>
				<div id="main" style={{"display": "-webkit-inline-box"}}>
				  <span style={{"fontSize":"30px","cursor":"pointer"}} onClick={this.handleNav.bind(this)}>&#9776;</span>
				  <div  className="slds-page-header" role="banner" style={{marginLeft: "1rem"}}>
					  <PageHeader>
					    <PageHeaderHeading title="Rohde Corp - 80,000 Widgets"
					        info="Mark Jaeckal • Unlimited Customer • 11/13/15"
					        figure={ <Icon category="standard" icon="opportunity" /> }
					    />
					  </PageHeader>
				</div>
				</div>
			</div>
		)
	}
}