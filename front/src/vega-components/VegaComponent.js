import React, { Component } from 'react';
import './Vega.css';
import vegaEmbed from 'vega-embed';
import showError from 'vega-embed';



class VegaComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      view: this.props.view,
      show: this.props.show
    };
  }
  componentDidMount(){
      var myData = [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ];
    var spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "description": "A simple bar chart with embedded data.",
      "data": {
        "name": "myData" 
      },
      "mark": "bar",
      "encoding": {
        "y": {"field": "a", "type": "ordinal"},
        "x": {"field": "b", "type": "quantitative"}
      }
    }
    const embed_opt = {"mode": "vega-lite"};    
    const el = this.divTarget;
    const view = vegaEmbed(el, spec, embed_opt)
      .catch(error => showError(el, error))
      .then((res) =>  res.view.insert("myData", myData).run());
      this.setState({
        view: view
      });
      
  }
  render() {
      return(
      <div>
      <h1 style={{color: "white"}}>Data Plot Example</h1>
         <br/>
         <div className="contenedor-vega">
          <div ref={(div) => this.divTarget=div}></div>
        </div>
        <br/>
      </div>
    );
  }
}

export default VegaComponent;

