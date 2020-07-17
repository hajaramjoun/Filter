import React from "react";
import "./App.css";
import axios from 'axios';
import Elems from "./Elems";


class App extends React.Component {
  constructor(props) {
    super(props);

    // Initialisation de l'état, la liste est vide au début
    this.state = {
      list: [{ key: "colliers", hash: "40" },
      { key: "bagues casa ", hash: "Nairobi" },]
    };

    // Binding des méthodes (pour pouvoir utiliser le "this" de notre composant)

    this.removeHash = this.removeHash.bind(this);
  }
  componentDidMount() {
    let carteList = [];
    axios.get('http://localhost:8081/all')//'http://172.17.0.1:8081/doc
      .then(res => {
        carteList = res.data;

        this.setState({ list: carteList })
      })
      .catch((error) => {
        console.log('error ' + error);
      });

  }

  removeHash(index) {
    this.setState(state => {
      return {
        list: state.list.filter((e, i) => i !== index)
      };
    })
    axios.post('http://localhost:8081/delete', { index })//'http://172.17.0.1:8081/doc
      .then(res => {
        // console.log(res.data);
      }).catch((error) => {
        console.log('error ' + error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const product = this.getProduct.value;
    const prix = this.getPrix.value;
    const marque = this.getMarque.value;
    const status = this.getStatus.value;

    const data = {
      product: product,
      prix: prix,
      marque: marque,
      status: status,
    }
    console.log(data);
    axios.post('http://localhost:8081/addcarte', data)
      .then(res => {

      })
      .catch((error) => {
        console.log(error);
      });
    this.setState(state => {
      return {
        list: [...state.list, data]
      };
    });
    this.getPrix.value = '';
    this.getMarque.value = '';
    this.getProduct.value = '';
    this.getStatus.value = '';
  }

  render() {
    return (
      <div className="App">
        <div class="row">
          <div class="col-sm-12 col-md-10 col-md-offset-1">
            <form className="form-horizontal" onSubmit={this.handleSubmit} >
              <div className="control-group">
                <label className="control-label">Product</label>
                <div className="controls">
                  <input className="form-control" size="16" type="text" ref={(input) => this.getProduct = input} />
                </div>
              </div>
              <div className="control-group">
                <label className="control-label">Prix</label>
                <div className="controls">
                  <input className="form-control" size="16" type="number" require="required" id="quantity" name="quantity" min="1" max="500" ref={(input) => this.getPrix = input} />
                </div>
              </div>
              <div className="control-group">
                <label className="control-label" >Marque</label>
                <div className="controls">
                  <input className="form-control" size="16" type="text" ref={(input) => this.getMarque = input} />
                </div>
              </div>
              <div className="control-group">
                <label className="control-label">Status</label>
                <div className="controls">
                  <input className="form-control" size="16" type="text" ref={(input) => this.getStatus = input} />
                </div>
              </div>
              <div class="controls">
                <button id="button1id" name="button1id" class="btn btn-success">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
        {/* Utilisation d'une fonction de callback "handleDelete" pour permettre à l'enfant d'envoyer de l'information au parent  */}
        <Elems list={this.state.list} handleDelete={this.removeHash} />
      </div>
    );
  }
}

export default App;
