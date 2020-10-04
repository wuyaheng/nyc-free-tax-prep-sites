import React, { Component } from 'react';
import MapBox from "./components/MapBox/index"
import SearchForm from "./components/SearchForm/index";
import './App.css';
import axios from "axios"

class App extends Component {
  state = {
    boroughs: [],
    sel_borough: "",
    results: [],
    filtered: []
  }

  componentDidMount() {
    this.setState(
      {
        sel_borough: "Bronx",
      },
      this.fetchSites
    );
    this.fetchboroughs();
  }

  fetchboroughs = async () => {
    try {
      const res = await axios.get(
        'https://data.cityofnewyork.us/resource/5kqf-fg3n.json?$group=borough&$select=borough'
      );
      this.setState({
        boroughs: res.data.map((x) => x.borough)
      });
    } catch (error) {
      console.log(error)
    }
  } 

  fetchSites = async () => { 
    const res = await axios.get('https://data.cityofnewyork.us/resource/5kqf-fg3n.json',
    {
      params: {
        boroughs: this.state.sel_borough 
      }
    }
    )
    this.setState({
      filtered: res.data
    })
  }

  handleInputChange = (event) => {
    this.setState(
      {
        sel_borough: event.target.value
      },
      this.fetchSites
    )
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
      <h5 className="text-center mt-4">Choose a borough</h5>
      <div className="row">
        <SearchForm results={this.state.boroughs} handleInputChange={this.handleInputChange} />
      </div>
        <div className="row">
          <div className="col-md-12">
              <div className="card">
                <MapBox results={this.state.results} /> 
              </div>
            </div>
        </div>
       </div> 
      </>
    )
  }
}

export default App;
