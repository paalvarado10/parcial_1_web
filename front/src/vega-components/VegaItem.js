import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import vegaEmbed from 'vega-embed';
import showError from 'vega-embed';


class VegaItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data:'',
      error:'',
      ejex:'',
      ejey:''
    };
    this.onChangeText=this.onChangeText.bind(this);
    this.aceptar=this.aceptar.bind(this);
    this.onChangeTextEjeY=this.onChangeTextEjeY.bind(this);
    this.onChangeTextEjeX=this.onChangeTextEjeX.bind(this);
  }
  onChangeTextEjeX(event){
    this.setState({
      ejex: event.target.value
    },()=>{ console.log(this.state.ejex)});
  }
  onChangeTextEjeY(event){
    this.setState({
      ejey: event.target.value
    },()=>{ console.log(this.state.ejey)});
  }
  onChangeText(event){
    this.setState({
      data: event.target.value
    },()=>{ console.log(this.state.data)});
  }
  aceptar(){
    if(!this.state.ejex){
      this.setState({
        error: 'Mising value: X axis missing'
      });
    }
    else if(!this.state.ejey){
      this.setState({
        error: 'Mising value: Y axis missing'
      });
    }
    else if(!this.state.data){
      this.setState({
        error: 'Mising value: Data '
      });
    }
    else {
    try {
      let data = JSON.parse(this.state.data);
      let specPrueba ={
        "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
        "description": "A simple bar chart with embedded data.",
        "data": {
            "name": "myData" 
          },
        "mark": "bar"
      };
      let x = {};
      x.field = this.state.ejex;
      x.type = "quantitative";
      let y = {};
      y.field = this.state.ejey;
      y.type = "ordinal";
      let encoding = {};
      encoding.y=y;
      encoding.x=x;
      specPrueba.encoding= encoding;
      const embed_opt = {"mode": "vega-lite"};    
      const el = this.divrender;
      vegaEmbed(el, specPrueba, embed_opt)
      .catch(error => showError(el, error))
      .then((res) =>  res.view.insert("myData", data).run());
    }catch(error) {
      let x = error.toString();
      this.setState({
        error: x
      });
    }
    }
  }

  render() {

    let data = this.state.data;
    let error = this.state.error;
    let ejex = this.state.ejex;
    let ejey = this.state.ejey
    if(error){
      return (
      <div>
      <h1 style={{color: "white"}}>Componente Vega</h1>
         <br/>
        <div className="contenedor-vega">
          <div ref={(div) => this.divrender=div}></div>
        </div>
        <br/>
        <h3 style={{color: "white"}}>{error}</h3>
        <FormGroup style={{width: "80%", margin: "auto"}}>
          <Row>
              <Col>
                  <Label for="ejex">Nombre del eje X</Label>
                  <Input type="text" name="text" id="ejex" value={ejex} onChange={this.onChangeTextEjeX}/>
              </Col>
              <Col>
                  <Label for="ejey">Nombre del eje Y</Label>
                  <Input type="text" name="text" id="ejey" value={ejey} onChange={this.onChangeTextEjeY}/>
              </Col>
          </Row>  
          <Label for="exampleText">Ingrese los datos como texto</Label>
          <Input type="textarea" name="text" id="exampleText" value={data} onChange={this.onChangeText}/>
        </FormGroup>
         <br/>
         <Row>
         <Col><Button onClick={this.aceptar}>Aceptar</Button></Col>
         <Col>
         <button className="button icon-left">Back</button>
      	</Col>
        </Row>
      </div>
    );
    }
    return (
      <div>
      <h1 style={{color: "white"}}>Componente Vega</h1>
         <br/>
        <div className="contenedor-vega">
          <div ref={(div) => this.divrender=div}></div>
        </div>
        <br/>
        <FormGroup style={{width: "80%", margin: "auto"}}>
          <Row>
              <Col>
                  <Label for="ejex">Nombre del eje X</Label>
                  <Input type="text" name="text" id="ejex" value={ejex} onChange={this.onChangeTextEjeX}/>
              </Col>
              <Col>
                  <Label for="ejey">Nombre del eje Y</Label>
                  <Input type="text" name="text" id="ejey" value={ejey} onChange={this.onChangeTextEjeY}/>
              </Col>
          </Row>  
          <Label for="exampleText">Ingrese los datos como texto</Label>
          <Input type="textarea" name="text" id="exampleText" value={data} onChange={this.onChangeText}/>
          <br/>
        </FormGroup>
         <br/>
        <Row>
         <Col><Button onClick={this.aceptar}>Aceptar</Button></Col>
         <Col>
         <button className="button icon-left">Back</button>
         </Col>
         </Row>
      </div>
    );  
    }
}

export default VegaItem;

