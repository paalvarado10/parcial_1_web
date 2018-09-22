import React, { Component } from 'react';
import '../vega-components/Vega.css';
import { Button, FormGroup, Row, Col, Label, Input } from 'reactstrap';

class Ratting extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.id,
      rate: '',
      user:'',
    };
    this.onChangeUser = this.onChangeUser.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.save=this.save.bind(this);
  }
  componentDidMount(){
    fetch('/api/reting/rate?id='+this.state.id)
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
  handleChange(event){
    this.setState({rate: event.target.value});
  }
  save(){
    let {
      rate,
      user,
      id
    } =this.state;
    if(rate && user){
      //-------------------------------------------------------------
      fetch('/api/rating/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          rate: rate,
          user: user
        }),
      })
      .then(res => res.json())
      .then(json => {
      if(json.succes) {
        alert("rate saved");
      this.setState({
        rate: '',
        user: ''
        });
      }
      else{
        alert("Error: "+json.message);
      }
    })
    }
    else if(!rate) {
      alert("Missing rate");
    }
    else {
      alert("Missing Name")
    }

  }
  onChangeUser(event){
    this.setState({ 
      user: event.target.value,
      error: ''
    });
  }
  render() {
    let{
      rate,
      user
    }  = this.state;
    return (
      <div className="contenedor-vega">
      <FormGroup style={{width: "80%", margin: "auto"}}>
      <h2>Leave your rate</h2>
      <Row >
      <Col>
      <Label for="userText" style={{color: "black"}}>Fill your name</Label>
      <Input type="text" id="userText" value={user} onChange={this.onChangeUser}/>
      </Col>
      <Col>
        <Label for="rating" style={{color: "black"}}>
       Rate view</Label>
        <Input type="select" name="select" id="rating" value={rate} onChange={this.handleChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </Col>
      <br/>
     

      </Row>
      </FormGroup>
      <br/>
       <Button onClick={this.save}>save</Button>
      <br/>
      <br/>
      </div>
      );
  }
}

export default Ratting;



  