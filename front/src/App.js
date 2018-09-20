import React, { Component } from 'react';
import './App.css';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      estadoPrueba:''
    }
  }

  componentDidMount(){
    fetch("/api?id=0")
    .then((res)=>{
      if(res.json){
      return res.json();
}
    })
    .then((prueba)=>{
      console.log(prueba);
      this.setState({ estadoPrueba: prueba })
    })
    .catch((err) =>{console.log(err)});
  }
  render() {
    let x = this.state.estadoPrueba;
    if(x){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Parcial 1 Pablo Alvarado</h1>
        </header>
          
           <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <Card body outline color="danger">
                <CardTitle>{x.name}</CardTitle>
                <CardText>{x.texto}</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
          <br/>
      </div>
    );  
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Parcial 1 Pablo Alvarado</h1>
        </header>
        <h2>.....Cargando........</h2>
      </div>
    );
  }
}

export default App;
