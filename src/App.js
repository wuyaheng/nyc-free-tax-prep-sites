import React, { Component } from 'react';
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
      <div className="App">
      </div>
    )
  }
}

export default App;
