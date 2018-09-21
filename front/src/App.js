import React, { Component } from 'react';
import './App.css';
import { Button, Row, Col } from 'reactstrap';

import VegaCsv from './vega-components/VegaCsv';
import VegaListComponent from './vega-components/VegaListComponent';
import VegaComponent from './vega-components/VegaComponent';
import Graph from './vega-components/Graph';
import VegaItem from './vega-components/VegaItem';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      csv: false,
      json: false,
      show: false,
      view:''
    };
    this.clickJson = this.clickJson.bind(this);
    this.clickCSV = this.clickCSV.bind(this); 
    this.verDetalle = this.verDetalle.bind(this);
    this.volver= this.volver.bind(this);
  }
  volver(volver){
    if(volver){
      this.setState({
        csv: false,
        json: false,
        show: false
      });
    }
  }
     clickJson(){
      this.setState({
        json:true,
        show: false
      });
     }
    clickCSV(){
      this.setState({
        csv:true,
        show: false
      });
    }
    verDetalle(view){
      console.log("LLega al APP "+view);
      this.setState({
        show: true,
        view: view
      });
    }
  render() {
    let {
      json,
      csv,
      show,
      view
    }=this.state;
    if(!csv && !json && !show){
      return(
      <div className="App">
        <br/>
        <br/>
        <h1 style={{color: "white"}}>Data Plot</h1>
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
         <br/>
         <hr/>
         <Row>
            <Col>
                <VegaComponent/>
            </Col>
            <Col>
                <VegaListComponent verDetalle={this.verDetalle}/>
            </Col>
         </Row>
        <br/>         
      </div>
    );
    }
    else if(!csv && json && !show){
      return(
      <div className="App">
      <br/>
      <br/>
      <h1 style={{color: "white"}}>Data Plot</h1>
         <br/>
         <VegaItem volver={this.volver}/>
      </div>
    );
    }
    else if(csv && !json && !show){
      return(
      <div className="App">
      <br/>
      <br/>
      <h1 style={{color: "white"}}>Data Plot</h1>
         <br/>
         <VegaCsv volver={this.volver}/>
      </div>
      );
    }
    else {
      return (

      <div className="App">
          <br/>
          <br/>
          <Graph view={view} show={show}  volver={this.volver}/>
          <br/>
         
      </div>

        );
  }
}
}

export default App;
