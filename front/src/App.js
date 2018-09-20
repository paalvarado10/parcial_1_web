import React, { Component } from 'react';
import './App.css';
import { Button, Row, Col } from 'reactstrap';
import vegaEmbed from 'vega-embed';
import showError from 'vega-embed';
import VegaItem from './vega-components/VegaItem';
import VegaCsv from './vega-components/VegaCsv';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      csv: false,
      json: false
    };
    this.clickJson = this.clickJson.bind(this);
    this.clickCSV = this.clickCSV.bind(this); 
  }
     clickJson(){
      this.setState({json:true});
     }
    clickCSV(){
      this.setState({csv:true});
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
    let {
      json,
      csv
    }=this.state;
    if(!csv &&!json){
      return(
      <div className="App">
      <h1 style={{color: "white"}}>Data Plot</h1>
         <br/>
         <div className="contenedor-vega">
          <div ref={(div) => this.divTarget=div}></div>
        </div>
        <br/>
         <Row>
            <Col>
                <h2 style={{color: "white"}}>{"Generate plot from CSV"}</h2>
                <br/>
                <Button onClick={this.clickCSV}>Click Here</Button>
            </Col>
            <Col>
                <h2 style={{color: "white"}}>{"Generate plot from Text"}</h2>
                <br/>
                <Button onClick={this.clickJson}>Click Here</Button>
            
            </Col>
         </Row>
      </div>
    );
    }
    else if(!csv && json){
      return(
      <div className="App">
      <h1 style={{color: "white"}}>Data Plot</h1>
         <br/>
         <VegaItem/>
      </div>
    );
    }
    else {
      return(
      <div className="App">
      <h1 style={{color: "white"}}>Data Plot</h1>
         <br/>
         <VegaCsv/>
      </div>
      );
    }
  }
}

export default App;
