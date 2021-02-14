import React, { Component } from 'react';
import MapBox from "./components/MapBox/index"
import SearchForm from "./components/SearchForm/index";
import CheckForm from "./components/CheckForm/index";
import AppointmentForm from "./components/AppointmentForm/index";
import './App.css';
import axios from "axios"

const ALLBOROUGHS = "All Boroughs"

const compare = (a,b) => {
  return a.toLowerCase() === b.toLowerCase()
}

class App extends Component {
  state = {
    boroughs: [],
    sel_borough: "",
    taxSites: [],
    amended: {"yes": true, "no": true},
    appointment: {"walk": true, "both": true, "appo": true} 
  }

  componentDidMount() {
    this.setState(
      {
        sel_borough: ALLBOROUGHS,
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
      const dropdownBoroughs = res.data.map((x) => x.borough)
      const dropdown = [ALLBOROUGHS, ...dropdownBoroughs]
      this.setState({
        boroughs: dropdown
      });
    } catch (error) {
      console.log(error)
    }
  } 


  
  fetchSites = async () => { 
    let options = {}
    if (this.state.sel_borough !== ALLBOROUGHS) {
      options = {
        params: {
          borough: this.state.sel_borough 
        }
      }
    }
    const res = await axios.get('https://data.cityofnewyork.us/resource/5kqf-fg3n.json', options)

    this.setState({
      taxSites: res.data
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


  handleAmendChange = (event) => {
    let val = event.target.value;
    let isChecked = event.target.checked;
    console.log(isChecked)
    let newState = {...this.state}
    newState.amended[val] = isChecked
    this.setState(
      newState
    )
  }


  handleAppointChange =(event) => {
    let val = event.target.value;
    let isChecked = event.target.checked;
    console.log(isChecked)
    let newState = {...this.state}
    newState.appointment[val] = isChecked
    this.setState(
      newState
    )
  }

  render() {
    let data = this.state.taxSites
    if (this.state.amended.yes === false) {
      data=data.filter((item) => {
        return !compare(item.amendedreturn, "Yes")
      }) 
    } 

    if (this.state.amended.no === false) {
      data=data.filter((item) => {
        return !compare(item.amendedreturn, "No")
      }) 
    } 

    if (this.state.appointment.both === false) {
      data=data.filter((item) => {
        return !compare(item.apptorwalkin.slice(0,4), "Both")
      }) 
    } 

    if (this.state.appointment.walk === false) {
      data=data.filter((item) => {
        return !compare(item.apptorwalkin.slice(0,4), "Walk")
      }) 
    } 

    if (this.state.appointment.appo === false) {
      data=data.filter((item) => {
        return !compare(item.apptorwalkin.slice(0,4), "Appo")
      }) 
    } 


    return (
      <>
      <nav>
        <div className="nav-wrapper">
          <p className="center projectTitle p-0 m-0">NYC Free Tax Prep Sites</p>
        </div>
       </nav>
   
      <div className="container-fluid">

      <div className="row mt-2 mb-0"> 
      <div className="col-md-3">
      <h5 className="mt-0">choose a borough</h5>
        <SearchForm results={this.state.boroughs} handleInputChange={this.handleInputChange} /> 


      <h5>amended return</h5>
      <CheckForm amended={this.state.amended} handleAmendChange={this.handleAmendChange} />

      
      <h5>appointment or walk-in</h5> 
        <AppointmentForm appointment={this.state.appointment} handleAppointChange={this.handleAppointChange} />  



        </div> 
          <div className="col-md-9">
              <div className="card">
                <MapBox results={data} /> 
              </div>
            </div>
        </div>
        <div className="row justify-content-end">
          <p className="mr-3">Data Source: <a target="_blank" rel="noopener noreferrer" aria-label="NYC open data" href="https://data.cityofnewyork.us/Business/NYC-Free-Tax-Prep-Sites/5kqf-fg3n">NYC OpenData  </a></p>
        </div>

       </div> 
      </>
    )
  }
}

export default App;
