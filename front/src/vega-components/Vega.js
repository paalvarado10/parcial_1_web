import React, { Component } from 'react';
import './Vega.css';
import { Button } from 'reactstrap';

class Vega extends Component {
  constructor (props) {
    super(props);
    this.state = {
    	view: this.props.view
    };
    this.verDetalle = this.verDetalle.bind(this);
  }
  verDetalle(){
  	console.log("ver detalle de: "+this.state.view);
  	this.props.verDetalle(this.state.view);	
  }
  render() {
  	let view = this.state.view;
  	return (
  		<div key={view._id.toString()}>
  		<h4>{"User Name: "+view.user}</h4>
  		<h5>{"Description: "+view.comment}</h5>
  		<Button onClick={this.verDetalle}>Detail</Button>
  		<br/>
  		<hr/>
  		</div>
  		);
  }
}

export default Vega;

