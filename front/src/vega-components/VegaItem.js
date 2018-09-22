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
      user:'',
      comment:'',
      spec:''
    };
    this.onChangeText=this.onChangeText.bind(this);
    this.aceptar=this.aceptar.bind(this);
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
      user,
      comment,
      spec
    }= this.state;
    let schema = spec.$schema;
      let description = spec.description;
      let d = spec.data;
      let mark = spec.mark;
      let encoding = spec.encoding;
      let s={};
      s.schema=schema;
      s.description=description;
      s.data=d;
      s.mark=mark;
      s.encoding=encoding;
    if(data && spec && user && comment){
      fetch('/api/view/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: data,
          spec: s,
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
          spec: '',
          json: '',
          text:''
    });
    }
});
    }
    else {
      alert("Debe llenar todos los datos");
    }
}
  onChangeTextJson(event){
    let json='';
    try{
      json = JSON.parse(event.target.value);
    }
    catch(error){
    this.setState({error:error});
    json='';    
    }

    this.setState({text:event.target.value,
      spec:json});
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
  onChangeText(event){
    this.setState({
      data: event.target.value,
      error: ''
    },()=>{this.aceptar()});
  }
  aceptar(){
    let {
      data,
      spec
    }=this.state;
    if(!spec ){
      this.setState({
        error: 'Mising spec a default one will be asigned'
      });
    }
    else if(!data){
      this.setState({
        error: 'Mising value: Data '
      });
    }
    else {
     
    try {
      let data = JSON.parse(this.state.data);
      let specPrueba;
      if(!spec){
      specPrueba ={
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
    };
    }
    else {
      specPrueba=spec;
    }
      const embed_opt = {"mode": "vega-lite"};    
      const el = this.divrender;
      vegaEmbed(el, specPrueba, embed_opt)
      .catch(error => showError(el, error))
      .then((res) =>  res.view.insert(specPrueba.data.name, data).run())
      .then(
        this.setState({spec:specPrueba}));
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
    let user = this.state.user;
    let comment = this.state.comment;
    let text = this.state.text;   
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
        
        
        <FormGroup style={{width: "80%", margin: "auto"}}>
          
            <Label for="exampleText">Insert spec as JSON</Label>
          <Input type="textarea" name="text" id="exampleText" value={text} onChange={this.onChangeTextJson}/>
          <br/>
          <Label for="exampleText">Insert data as Json</Label>
          <Input type="textarea" name="text" id="exampleText" value={data} onChange={this.onChangeText}/>
        </FormGroup>
         <br/>

         
        
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
          <FormGroup style={{width: "80%", margin: "auto"}}>
          
            <Label for="exampleText">Insert spec JSON</Label>
          <Input type="textarea" name="text" id="exampleText" value={text} onChange={this.onChangeTextJson}/>
          <br/>
          <Label for="exampleText">Insert data as Json</Label>
          <Input type="textarea" name="text" id="exampleText" value={data} onChange={this.onChangeText}/>
        </FormGroup>
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

