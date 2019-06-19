import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap"
import "./orcamentos.css"



export default class Orcamentos extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
        orcamentos:[],
        orcamentoHtml:"",
        show: false
    };
  }

  handleClose() {
      this.setState({
          show: false
      });
  }

  handleShow(orcamento) {
      this.setState({
          show: true,
          description: orcamento.description
      });
  }

  componentDidMount() {
     
      let url = 'https://my-json-server.typicode.com/codificar/oficina/proposals';
      fetch(url)
      .then(res=>{
          return res.json();
      }).then(json=>{
          let orcamentos = json;
          let orcamentoHtml = orcamentos.map(orcamento => (
            <li className="linha" onClick={()=>this.handleShow(orcamento)} key={orcamento.customer}>{orcamento.id}-{orcamento.customer}-{orcamento.value}-{orcamento.seller}</li>
          ));
          this.setState({orcamentoHtml});
      })    
  }

  render() {
    return (
      <div className="orcamento">
        <h2>Clique para ver a descrição</h2>
         
         <ol>
            {this.state.orcamentoHtml}
         </ol>
         
        
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>DESCRIÇÃO</Modal.Title>
          </Modal.Header>
          <Modal.Body className="descricao-modal">{this.state.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
