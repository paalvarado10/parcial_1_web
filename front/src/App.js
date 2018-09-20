import React, { Component } from 'react';
import './App.css';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import vegaEmbed from 'vega-embed';
import showError from 'vega-embed';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      estadoPrueba:'',
      data:''
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
console.log(el);
console.log(embed_opt)
const view = vegaEmbed(el, spec, embed_opt)
      .catch(error => showError(el, error))
      .then((res) =>  res.view.insert("myData", myData).run());
  }
  render() {

    return (
      <div className="App">
        <div ref={(div) => this.divTarget=div}></div>
        <div class="form-group">
          <label for="comment">Inserte la informacion:</label>
          <textarea class="form-control" rows="20" className="Json"></textarea>
          <button>Aceptar</button>         
        </div>
          <br/>
      </div>
    );  
    }
}

export default App;
