import React from "react"
import axios from "axios"
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faHeart, faSearch, faLocationArrow, faSadCry } from '@fortawesome/free-solid-svg-icons'
import JobCard from "./Components1/day16/JobCard"
import { Fade, Slide, Rotate } from 'react-reveal';
import { Font } from "three";
class Day16 extends React.Component {
    constructor({theme}) {
        super({theme}) 
        this.state = {
            url: 'https://jobs.github.com/positions.json?page=1&',
            search: 'code',
            location:'',
            fullTime: false,
            data:null,
            loadMore:false
        }
        this.proxyurl = "https://cors-anywhere.herokuapp.com/"
    }

    componentDidMount() {
        this.getCards()
    }
    componentDidUpdate(prevprops,prevState) {
        const {loadMore} = this.state
        console.log(loadMore)
        if (loadMore !== prevState.loadMore) {
            this.makeCards()
        }
    }
    getCards = () => {
        const {url,search,location,fullTime} = this.state 
        let fullUrl = `${this.proxyurl}${url}description=${search}&location=${location}&full_time=${fullTime}`
        axios.get(fullUrl)
        .then(resp => {
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
            <FontAwesomeIcon icon ={faSearch}/><input onChange ={this.handleRole} placeholder ="Find your next role"/>
            <FontAwesomeIcon icon ={faLocationArrow}/><input onChange = {this.handleLocation}placeholder = "Location"/>
            <input ref ="type" onChange = {this.handleType} type="checkbox"/>Full Time Only 
            <button onClick ={this.handleSearch}>Search</button>
        </div>)
    }
    handleMore = () => {
        this.setState(prevState => ({loadMore: !prevState.loadMore}))
    }
    getAllCards = () => {
        const {loadMore} = this.state
        let cards = this.makeCards() 
        if (cards.length > 0){
        return loadMore ? cards : cards.slice(0,20)
        }
        else {
           return  <div className ="flex center"><h2>No jobs found, maybe try changing the location?<FontAwesomeIcon icon ={faSadCry}/></h2></div>
        }
    }
    getButtons = () => {
        const {loadMore} = this.state
        return (
            <>
            <a href="#start"> <button><FontAwesomeIcon icon ={faArrowUp}/></button></a>
            <div className ="center">
            <button onClick ={this.handleMore}> {loadMore ? "Show less" : "Load more" }</button>
            </div></>
        )
    }
    render() {
        const {theme} = this.props
        const {data} = this.state
        const classTheme = theme ? "day16light" : "day16dark"
        return(
            <div id ="start" className ={`${classTheme} day16`}>
                <header>
                    <h1 className ="bold">devjobs</h1>
                    <div>
                        {this.navBar()}
                    </div>
                </header>
                <Fade cascade clear>
                <div class ="container down">
                    <div class = "threeGrid">
                    {data ? this.getAllCards() : "Loading..."}
                    </div>
                </div>
                </Fade>
                <div style ={{textAlign:"right", marginBottom:30}}>
                {this.getButtons()}
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