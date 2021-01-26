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
      <nav>
        <div class="nav-wrapper">
          <p className="center projectTitle">NYC Free Tax Prep Sites</p>
        </div>
       </nav>
   
      <div className="container">
      <div className="row mb-0">
      <h5>Choose a borough</h5>
        <SearchForm results={this.state.boroughs} handleInputChange={this.handleInputChange} /> 
      </div>
        <div className="row mb-0">
          <div className="col-md-12 p-0">
              <div className="card">
                <MapBox results={this.state.filtered} /> 
              </div>
            </div>
        </div>
        <div className="row justify-content-end mb-1">
          <p className="mb-1">Data Source: <a target="_blank" rel="noopener noreferrer" aria-label="NYC open data" href="https://data.cityofnewyork.us/Business/NYC-Free-Tax-Prep-Sites/5kqf-fg3n">NYC OpenData</a></p>
        </div>
       </div> 
      </>
    )
  }
}

export default App;
