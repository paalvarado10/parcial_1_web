import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import vegaEmbed from 'vega-embed';
import showError from 'vega-embed';
import './Vega.css';


class VegaCsv extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data:'',
      error:'',
      spec:'',
      text:'',
      exit: false,
      comment: '',
      user:''
    };
    this.guardar=this.guardar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.onChangeComment=this.onChangeComment.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeTextJson=this.onChangeTextJson.bind(this);
        this.volver = this.volver.bind(this);
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
    console.log(event.target.value);
    console.log(json);

    this.setState({text:event.target.value,
      spec:json});
  }
    guardar(){
      let {
        data,
        comment,
        user,
        spec
      }=this.state;
      if(!data || !user || !comment){
        alert("Mising Values, data, user and comment are require for saving");
      }
      else{
      //-------------------------------------
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
        }),
      }).then(res => res.json())
  .then(json => {
    console.log(json.message);
      if(json.succes) {
        alert("La vista ha sido guardada");
      this.setState({
          data: '',
          spec:'',
          user:'',
          comment:''
      });
    }else {
      alert("Error saving the graph: "+json.message)
      }
      });

    }
  }
    onChangeComment(event){
    this.setState({ comment: event.target.value});
  }
  onChangeUser(event){
    this.setState({ user: event.target.value});
  }

  updateData(result) {
    let spec=this.state.spec;
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
            "x": {"field": "a", "type": "ordinal"},
            "y": {"field": "b", "type": "quantitative"}
          }
        }
    console.log(JSON.stringify(specPrueba)+"    Spec original");
    }

    else{
      specPrueba=this.state.spec;
      let data = specPrueba.data;
      let mark = specPrueba.mark;
      let encoding = specPrueba.encoding;
      let temp={};
      console.log(JSON.stringify(specPrueba)+" ASI LLEGA");
      if(!specPrueba.$schema){
        temp.$schema="https://vega.github.io/schema/vega-lite/v2.json";

      }else{
        temp=specPrueba.$schema;
      }

      if(!specPrueba.description){
        temp.description="A simple bar chart with embedded data.";
      }
      else{
        temp.description=specPrueba.description;
      }
      temp.data = data;
      temp.mark=mark;
      temp.encoding=encoding;
      specPrueba=temp;
      console.log(data);
      console.log('Spec de salida'+JSON.stringify(specPrueba));
    }
    const data = result.data;
    console.log(data);
    try { 
      const embed_opt = {"mode": "vega-lite"};    
      const el = this.divrender;
      vegaEmbed(el, specPrueba, embed_opt)
      .catch(error => showError(el, error))
      .then((res) =>  res.view.insert(specPrueba.data.name, data).run())
      .then(   
        this.setState({exit:true, data: JSON.stringify(data), spec:specPrueba}));
    }catch(error) {
      let x = error.toString();
      this.setState({
        error: x
      });
    }
    };
   volver(){
    this.props.volver(true);
   }
  handleChange(event){
  	console.log("Entra el archivo");
  	let file = event.target.files[0];
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(file, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
  }

  render() {
    let {
      data,
      error,
      comment,
      user,
      text
    }= this.state;
    if(error){
      return (
      <div>
      <h1 style={{color: "white"}}>Generate Viz form a .csv</h1>
         <br/>
        <div className="contenedor-vega">
          <div ref={(div) => this.divrender=div}></div>
        </div>
        <br/>
        <h3 style={{color: "white"}}>{error}</h3>

        <div className="contenedor-vega">
        <FormGroup style={{width: "80%", margin: "auto"}}>
            <Label for="exampleText">Insert JSON</Label>
          <Input type="textarea" name="text" id="exampleText" value={text} onChange={this.onChangeTextJson}/>
          </FormGroup>
        <FormGroup style={{width: "50%", margin: "auto"}}>
        <Label for="exampleFile">A partir de un csv</Label>
          <Input type="file" name="file" id="exampleFile" value={data} onChange={this.handleChange}/>
        </FormGroup>
        </div>


        <br/>
         <FormGroup style={{width: "80%", margin: "auto"}}>
         <Label for="userText">Fill your name please</Label>
         <Input type="text" id="userText" value={user} onChange={this.onChangeUser}/>
         <br />
         <Label for="commenText">Description of the plot</Label>
         <Input type="textarea"  id="commenText" value={comment} onChange={this.onChangeComment}/>
         </FormGroup>
         <br/>
         <Button color="success" onClick={this.guardar}>Save</Button>
      </div>
    );
    }
    return (
      <div>
      <h1 style={{color: "white"}}>Generate Viz form a .csv</h1>
         <br/>
        <div className="contenedor-vega">
          <div ref={(div) => this.divrender=div}></div>
        </div>
        <br/>

        <div className="contenedor-vega">
        <FormGroup style={{width: "80%", margin: "auto"}}>
            <Label for="exampleText" style={{color: "black"}}>Insert JSON</Label>
          <Input type="textarea" name="text" id="exampleText" value={text} onChange={this.onChangeTextJson}/>
          </FormGroup>
        <FormGroup style={{width: "50", margin: "auto"}}>
        <Row>
        <Col></Col>
        <Col>
        <h5>Select your csv file</h5>
        <Input type="file" name="file" id="exampleFile" onChange={this.handleChange}/>
        </Col>
        <Col></Col>
        </Row>
        </FormGroup>
        <br/>
        </div>


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

export default VegaCsv;

            
