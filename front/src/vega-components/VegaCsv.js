
//--------------------------------------------------------------------------------------
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import vegaEmbed from 'vega-embed';
import showError from 'vega-embed';


class VegaCsv extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data:'',
      error:'',
      ejex:'',
      ejey:''
    };
    this.aceptar=this.aceptar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
	aceptar(){
		let data = this.state.data;
		let spec ={
		"$schema": "https://vega.github.io/schema/vega-lite/v2.json",
        "description": "A simple bar chart with embedded data.",
  		"data": {"url": "./ejemplo.csv"},
  		"mark": "bar",
 		"encoding": {
   			"x": {"field": "a", "type": "ordinal"},
   			"y": {"field": "b", "type": "quantitative"}
 			}
		}
		const embed_opt = {"mode": "vega-lite"};    
      	const el = this.divrender;
      	vegaEmbed(el, spec, embed_opt)
      	.catch(error => showError(el, error))
      	.then((res) =>  res.view.insert(data).run());

	}
  crearTabla(){
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
      let x = new Object();
      x.field = this.state.ejex;
      x.type = "quantitative";
      let y = new Object();
      y.field = this.state.ejey;
      y.type = "ordinal";
      let encoding = new Object();
      encoding.y=y;
      encoding.x=x;
      specPrueba.encoding= encoding;
      const embed_opt = {"mode": "vega-lite"};    
      const el = this.divrender;
      const view = vegaEmbed(el, specPrueba, embed_opt)
      .catch(error => showError(el, error))
      .then((res) =>  res.view.insert("myData", data).run());
    }catch(error) {
      let x = error.toString();
      this.setState({
        error: x
      });
    }
    }

  handleChange(event){
  	console.log("Entra el archivo");
  	let file = event.target.files[0];
  	let reader = new FileReader();
  	reader.onloadend = handleFileRead;
  	console.log("Leyendo el archivo");
  	const handleFileRead =(e) =>{
  	console.log("handling reader");
  	const content = reader.result;
  	console.log(content);
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
      <h1 style={{color: "white"}}>Componente Vega CSV</h1>
         <br/>
        <div className="contenedor-vega">
          <div ref={(div) => this.divrender=div}></div>
        </div>
        <br/>
        <h3 style={{color: "white"}}>{error}</h3>
        <FormGroup style={{width: "80%", margin: "auto"}}>
        <Label for="exampleFile">A partir de un csv</Label>
          <Input type="file" name="file" id="exampleFile" value={data} onChange={this.handleChange}/>
        </FormGroup>
         <br/>
        <Button onClick={this.aceptar}>Aceptar</Button>
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
        <Label for="exampleFile">A partir de un csv</Label>
          <Input type="file" name="file" id="exampleFile" onChange={this.handleChange}/>
        </FormGroup>
         <br/>
        <Button onClick={this.aceptar}>Aceptar</Button>
      </div>
    );  
    }
}

export default VegaCsv;

            
