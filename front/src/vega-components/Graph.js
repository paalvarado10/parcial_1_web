import React, { Component } from 'react';
import './Vega.css';
import { Button } from 'reactstrap';
import vegaEmbed from 'vega-embed';
import showError from 'vega-embed';



class Graph extends Component {
  constructor (props) {
    super(props);
    this.state = {
      view: this.props.view,
      text: ''
    };
    this.volver = this.volver.bind(this);
  }
   volver(){
    this.props.volver(true);
   }
  componentDidMount(){
  	this.setState({
  		text: "Llega al did Mount"
  	});
  	console.log("ENTRA");
  	this.plot();
  }
  plot(){
    const plot = this.state.view;
    console.log(plot.data+" ESTE ES EL TO STRING");
    let spec = plot.spec;
    const embed_opt = {"mode": "vega-lite"};    
    const el = this.divTarget;
    const view = vegaEmbed(el, spec, embed_opt)
      .catch(error => showError(el, error))
      .then((res) =>  res.view.insert(spec.data.name, JSON.parse(plot.data)).run());
      this.setState({
        view: view
      });
  
  }
  render() {
      return(
      <div>
      <h1 style={{color: "white"}}>Plot Detail</h1>
         <br/>
         <div className="contenedor-vega">
          <div ref={(div) => this.divTarget=div}></div>
        </div>
        <br/>
        <Button color="danger" onClick={this.volver}>Back</Button>
      </div>
    );
    }
}

export default Graph;

