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
      ejey:'',
      x:'',
      y:'',
      user:'',
      comment:'',
      json:''
    };
    this.onChangeText=this.onChangeText.bind(this);
    this.aceptar=this.aceptar.bind(this);
    this.onChangeTextEjeY=this.onChangeTextEjeY.bind(this);
    this.onChangeTextEjeX=this.onChangeTextEjeX.bind(this);
    this.guardar=this.guardar.bind(this);
    this.onChangeComment=this.onChangeComment.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeTextJson = this.onChangeTextJson.bind(this);
        this.volver = this.volver.bind(this);


  }
  volver(){
    this.props.volver(true);
   }
  guardar(){
    let { 
      data,
      x,
      y,
      user,
      comment
    }= this.state;
    if(data && x && y && user && comment){
      fetch('/api/view/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: data,
          ejex: x,
          ejey: y,
          user: user,
          comment: comment

          //spec: this.state.spec
        }),
      }).then(res => res.json())
  .then(json => {
      if(json.succes) {
        alert("La vista ha sido guardada");
      this.setState({
          data: '',
          ejex: '',
          ejey: '',
          spec: '',
          json: '',
          x:'',
          y:''
      });
    }
});
    }
    else {
      alert("Debe llenar todos los datos");
    }
}
  onChangeTextJson(event){
    this.setState({ 
      json: event.target.value,
      error: ''
    });
  }
  onChangeComment(event){
    this.setState({ 
      comment: event.target.value,
      error: ''
    });
  }
  onChangeUser(event){
    this.setState({ 
      user: event.target.value,
      error: ''
    });
  }
  onChangeTextEjeX(event){
    this.setState({
      ejex: event.target.value,
      error: ''
    },()=>{this.aceptar()});
  }
  onChangeTextEjeY(event){
    this.setState({
      ejey: event.target.value,
      error: ''
    },()=>{this.aceptar()});
  }
  onChangeText(event){
    this.setState({
      data: event.target.value,
      error: ''
    },()=>{this.aceptar()});
  }
  aceptar(){
    let {
      ejex,
      ejey,
      data,
      json
    }=this.state;
    if(!ejex){
      this.setState({
        error: 'Mising value: X axis missing'
      });
    }
    else if(!ejey){
      this.setState({
        error: 'Mising value: Y axis missing'
      });
    }
    else if(!data){
      this.setState({
        error: 'Mising value: Data '
      });
    }
    else {
      if(!json){
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
      x.type = "ordinal";
      let y = {};
      y.field = this.state.ejey;
      y.type = "quantitative";
      this.setState({
        x:x,
        y:y
      });
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
  }

  render() {

    let data = this.state.data;
    let error = this.state.error;
    let ejex = this.state.ejex;
    let ejey = this.state.ejey;
    let user = this.state.user;
    let comment = this.state.comment;
    let json = this.state.json;
    if(error){
      return (
      <div>
      <h1 style={{color: "white"}}>Generate Plot Viz</h1>
         <br/>
         <h2 style={{color: "white"}}>{error}</h2>
        <div className="contenedor-vega">
          <div ref={(div) => this.divrender=div}></div>
        </div>
        <br/>
        <h3 style={{color: "white"}}>{error}</h3>
        <Row>
        <Col> 
        <FormGroup style={{width: "80%", margin: "auto"}}>
          <Row>
              <Col>
                  <Label for="ejex">X axis name</Label>
                  <Input type="text" name="text" id="ejex" value={ejex} onChange={this.onChangeTextEjeX}/>
              </Col>
              <Col>
                  <Label for="ejey">Y axis name</Label>
                  <Input type="text" name="text" id="ejey" value={ejey} onChange={this.onChangeTextEjeY}/>
              </Col>
          </Row>  
          <Label for="exampleText">Insert data as Json</Label>
          <Input type="textarea" name="text" id="exampleText" value={data} onChange={this.onChangeText}/>
        </FormGroup>
         <br/>

         </Col>
        <Col>
          <FormGroup style={{width: "80%", margin: "auto"}}>
            <Label for="exampleText">Insert JSON</Label>
          <Input type="textarea" name="text" id="exampleText" value={json} onChange={this.onChangeTextJson}/>
          </FormGroup>
        </Col>
        </Row>
        <br/>
         <FormGroup style={{width: "80%", margin: "auto"}}>
         <Label for="userText">Fill your name please</Label>
         <Input type="text" id="userText" value={user} onChange={this.onChangeUser}/>
         <br />
         <Label for="commenText">Description of the plot</Label>
         <Input type="textarea"  id="commenText" value={comment} onChange={this.onChangeComment}/>
         </FormGroup>
         <br/>
         <br/>
         <Row>
         <Col>
         <Button color="success" onClick={this.guardar}>Save</Button>  
         </Col>
         <Col>
         <Button color="danger" onClick={this.volver}>Back</Button>  
         </Col>
         </Row>
      </div>
    );
    }
    return (
      <div>
      <h1 style={{color: "white"}}>Generate Plot Viz</h1>
         <br/>
        <div className="contenedor-vega">
          <div ref={(div) => this.divrender=div}></div>
        </div>
        <br/>
        <Row>
          <Col>

          <FormGroup style={{width: "80%", margin: "auto"}}>
          <Row>
            <Col>
              <Label for="ejex">X axis name</Label>
              <Input type="text" name="text" id="ejex" value={ejex} onChange={this.onChangeTextEjeX}/>
            </Col>
            <Col>
              <Label for="ejey">Y axis name</Label>
              <Input type="text" name="text" id="ejey" value={ejey} onChange={this.onChangeTextEjeY}/>
            </Col>
          </Row>  
          <Label for="exampleText">Insert data as text (JSON)</Label>
          <Input type="textarea" name="text" id="exampleText" value={data} onChange={this.onChangeText}/>
          <br/>
        </FormGroup>
         <br/>

          </Col>
          <Col>
            <FormGroup style={{width: "80%", margin: "auto"}}>
            <Label for="exampleText">Insert JSON</Label>
          <Input type="textarea" name="text" id="exampleText" value={json} onChange={this.onChangeTextJson}/>
          </FormGroup>
          </Col>
        </Row>
         <br/>
         <FormGroup style={{width: "80%", margin: "auto"}}>
         <Label for="userText">Fill your name please</Label>
         <Input type="text" id="userText" value={user} onChange={this.onChangeUser}/>
         <br />
         <Label for="commenText">Description of the plot</Label>
         <Input type="textarea"  id="commenText" value={comment} onChange={this.onChangeComment}/>
         </FormGroup>
         <br/>
         <Row>
         <Col>
         <Button color="success" onClick={this.guardar}>Save</Button>  
         </Col>
         <Col>
         <Button color="danger" onClick={this.volver}>Back</Button>  
         </Col>
         </Row>
      </div>
    );  
    }
}

export default VegaItem;

