import React from "react"
import axios from "axios"
import { connect } from "react-redux";
import JobCard from "./Components1/day16/JobCard"
class Day16 extends React.Component {
    constructor({theme}) {
        super({theme}) 
        this.state = {
            url: 'https://jobs.github.com/positions.json?page=1&',
            search: 'code',
            location:'',
            fullTime: false,
            data:null
        }
        this.proxyurl = "https://cors-anywhere.herokuapp.com/"
    }

    componentDidMount() {
        this.getCards()
    }
    getCards = () => {
        const {url,search,location,fullTime} = this.state 
        let fullUrl = `${this.proxyurl}${url}description=${search}&location=${location}&full_time=${fullTime}`
        axios.get(fullUrl)
        .then(resp => {
            console.log(resp.data)
            this.setState({
                data:resp.data
            })
        })
        .catch((e) => console.log(e))
    }
    makeCards = () => {
        const {data} = this.state
        return data.map((job) => {
            return (
            <JobCard data = {job}/>)
        })
    }
    handleRole = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    handleLocation= (e) => {
        this.setState({
            location: e.target.value
        })
    }
    handleType = (e) => {
        let checked = this.refs.type.checked
        this.setState({
            fullTime: checked
        })
    }
    handleSearch = (e) => {
        e.preventDefault()
        this.getCards()
    }
    navBar = () => {
        return (<div className ="center">
            <input onChange ={this.handleRole} placeholder ="Find your next role"/>
            <input onChange = {this.handleLocation}placeholder = "Location"/>
            <input ref ="type" onChange = {this.handleType} type="checkbox"/>Full Time Only 
            <button onClick ={this.handleSearch}>Search</button>
        </div>)
    }
    render() {
        const {theme} = this.props
        const {data} = this.state
        const classTheme = theme ? "day16light" : "day16dark"
        console.log(theme)
        return(
            <div className ={`${classTheme} day16`}>
                <header>
                    <h1 className ="bold">devjobs</h1>
                    <div>
                        {this.navBar()}
                    </div>
                </header>

                <div class ="container down">
                    <div class = "threeGrid">
                    {data ? this.makeCards(): "Loading ... "}
                    </div>

                </div>
            </div>
        )
    }
}
export default connect(
    state => {
        return { theme: state };
      }
  )(Day16);