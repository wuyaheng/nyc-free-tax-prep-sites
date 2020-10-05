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
        borough: this.state.sel_borough 
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
      <div className="row">
      <h5 className="mt-2">Choose a borough</h5>
        <SearchForm results={this.state.boroughs} handleInputChange={this.handleInputChange} /> 
      </div>
        <div className="row">
          <div className="col-md-12 p-0">
              <div className="card">
                <MapBox results={this.state.filtered} /> 
              </div>
            </div>
        </div>
        <div className="row justify-content-end">
          <p>Data Source: <a target="_blank" rel="noopener noreferrer" aria-label="NYC open data" href="https://data.cityofnewyork.us/Business/NYC-Free-Tax-Prep-Sites/5kqf-fg3n">NYC OpenData</a></p>
        </div>
       </div> 
      </>
    )
  }
}

export default App;
