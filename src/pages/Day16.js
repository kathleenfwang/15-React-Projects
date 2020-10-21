import React from "react"
import axios from "axios"
import { connect } from "react-redux";
import JobCard from "./Components1/day16/JobCard"
class Day16 extends React.Component {
    constructor({theme}) {
        super({theme}) 
        this.state = {
            url: 'https://jobs.github.com/positions.json?page=1&search=code',
            data:null
        }
        this.proxyurl = "https://cors-anywhere.herokuapp.com/"
    }

    componentDidMount() {
        this.getCards()
    }
    getCards = () => {
        const {url} = this.state 
        axios.get(this.proxyurl + url)
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
    navBar = () => {
        return (<div className ="center">
            <input placeholder ="Find your next role"/>
            <input placeholder = "Location"/>
            <input type="checkbox" value ="true"/>Full Time Only 
            <button>Search</button>
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