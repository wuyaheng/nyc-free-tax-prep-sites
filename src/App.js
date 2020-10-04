import React, { Component } from 'react';
import MapBox from "./components/MapBox/index"
import './App.css';
import axios from "axios"

class App extends Component {
  state = {
    results: []
  }

  componentDidMount() {
    this.fetchSites()
  }

  fetchSites = () => {
    axios.get('https://data.cityofnewyork.us/resource/5kqf-fg3n.json')
      .then((response) => {
        console.log(response)
        this.setState({
          results: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <>
      <nav className="navbar navbar-light bg-dark justify-content-center">
          <span className="navbar-brand mb-0 h1 text-white pt-1">
          NYC Free Tax Prep Sites
          </span>
      </nav>
   
      <div className="container">
          <div className="col-md-12">
              <div className="card">
                <MapBox results={this.state.results} /> 
              </div>
            </div>
       </div> 
      </>
    )
  }
}

export default App;
