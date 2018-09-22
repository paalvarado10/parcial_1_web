import React, { Component } from 'react';
import './Vega.css';
import { Button } from 'reactstrap';
import vegaEmbed from 'vega-embed';
import showError from 'vega-embed';
import Ratting from '../Ratting/Ratting';
import { Row, Col } from 'reactstrap';




class Graph extends Component {
  constructor (props) {
    super(props);
    this.state = {
      view: this.props.view,
      text: '',
      id:'',
      list:''
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
  	this.plot();
   const id=this.state.view._id;
   this.setState({ id: id});
    fetch('/api/reting/rate?id='+id)
    .then(res => res.json())
    .then(json=>{
      if(json.succes){
        let rs = json.result
        this.setState({
          list: rs
        });
      }
    });
  }
  rate(b){
    if(b){
    const id=this.state.view._id;
    fetch('/api/reting/rate?id='+id)
    .then(res => res.json())
    .then(json=>{
      if(json.succes){
        let rs = json.result
        this.setState({
          list: rs
        });
      }
    });
    }
  };
  plot(){
    const plot = this.state.view;
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
    let list = this.state.list;
    let id = this.state.id;
    if(list){
      let prom=0;
      let lista = list.map((n,i)=>{
        prom+=parseInt(n.rate);
        return(
          <div key={"list item rate"+i}>
          <hr/>
          <h3>{n.user}</h3>
          <h4>{n.rate}</h4>
          </div>
          )
      });
      prom = (prom/(list.length)).toFixed(1);

      //-----------------------------------------------------
      return(
      <div>
      <h1 style={{color: "white"}}>Plot Detail</h1>
         <br/>
         <Row>
         <Col>
            <div className="contenedor-vega">
              <div ref={(div) => this.divTarget=div}></div>
            </div>
            <br/>
            <Ratting id={id} />
         </Col>
         <Col>
            <div key="listaCalificaciones" className="contenedor-vega">
            <h2>Rating list</h2>
            {lista}

            <h2 style={{color: "blue"}}>{"Average rating: "+prom}</h2>
            <br/>
            <br/>
            </div>
         </Col>
         </Row>  
        <br/>
        
        <Button color="danger" onClick={this.volver}>Back</Button>
      </div>
    );
      //-----------------------------------------------------
    }
    else{
      return(
      <div>
      <h1 style={{color: "white"}}>Plot Detail</h1>
         <br/>
         <Row>
         <Col>
            <div className="contenedor-vega">
              <div ref={(div) => this.divTarget=div}></div>
            </div>
         </Col>
         <Col>
            <h1>Calificacion actual(lista)</h1>
         </Col>
         </Row>  
        <br/>
        <Ratting id={this.state.view._id}/>
        <Button color="danger" onClick={this.volver}>Back</Button>
      </div>
    );
    }
    }
}

export default Graph;

