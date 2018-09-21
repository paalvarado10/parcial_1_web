import React, { Component } from 'react';
import './Vega.css';
import Vega from './Vega';


class VegaListComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      views:'',
    };
    this.verDetalle= this.verDetalle.bind(this);
  }
  componentDidMount(){
  	fetch('/api/views')
		.then(res => res.json())
		.then(json =>{
			let result = json.result;
        	this.setState({
        		views: result
        	});
		});
  }
  verDetalle(vista){
    this.props.verDetalle(vista);
  }
  render() {
    let views = this.state.views;
    if(views){
    	let lista = views.map((n,i)=>{
    		return(
    			
        <Vega view={n}
          verDetalle={this.verDetalle}
          key={n._id+i}
          />
    			);
    	});
      return (
      <div className="lista-vistas">
      <h2 style={{color: "white"}}>View List</h2>
      <div className="contenedor-vega">
      {lista}
      </div>
      </div>
    );
    }
    return (
      <div>
      <h1 style={{color: "white"}}>.....Cargando Historial.....</h1>
      </div>
    );  
    }
}

export default VegaListComponent;

            

