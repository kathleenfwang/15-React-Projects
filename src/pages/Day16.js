import React from "react"
import axios from "axios"
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faHeart, faSearch, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import JobCard from "./Components1/day16/JobCard"
import InnerJobCard from "./Components1/day16/InnerJobCard"
import { Fade, Slide, Rotate } from 'react-reveal';
class Day16 extends React.Component {
    constructor({ theme }) {
        super({ theme })
        this.state = {
            url: 'https://jobs.github.com/positions.json?/',
            search: '',
            location: '',
            fullTime: false,
            data: null,
            loadMore: false, 
            shown: false,
            ids: {} 
        }
        this.proxyurl = "https://cors-anywhere.herokuapp.com/"
        this.devjobslogo = "https://media.discordapp.net/attachments/701277128951595030/768689587710197760/devjobs.png"
    }

    componentDidMount() {
        this.getCards()
    }
    componentDidUpdate(prevprops, prevState) {
        const { loadMore } = this.state
        if (loadMore !== prevState.loadMore) {
            this.makeCards()
        }
    }
    getCards = () => {
        const { url, search, location, fullTime } = this.state
        let fullUrl = `${this.proxyurl}${url}description=${search}&location=${location}&full_time=${fullTime}`
        axios.get(fullUrl)
            .then(resp => {
                console.log(resp.data)
                this.setState({
                    data: resp.data
                    // when calling the getIds, cannot put getIds() because this will call the function right away before the data gets set! similarly to onClick functions, just pass in the function name so it doesn't get called immediately. 
                }, this.getIds)
            })
            .catch((e) => console.log(e))
    }
    makeCards = () => {
        const { data } = this.state
        return data.map((job) => {
            return (
                <JobCard data={job} showPopOut = {this.handleShow} />)
        })
    }
    getIds =() => {
        const {data} = this.state 
        // want to make a dictionary of ids -> indexes in data  
        let ids = {} 
            data.forEach((info,i) => {
            ids[info['id']] = i 
        })
        this.setState({
            ids: ids 
        })
    }
    handleRole = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    handleLocation = (e) => {
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
        const { search, location } = this.state
        return (<div className="search center">

            <FontAwesomeIcon icon={faSearch} />
            <input onChange={this.handleRole} placeholder="Find your next role" />
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <input onChange={this.handleLocation} placeholder="Location" />
            <button type="submit" className ="darkButton" onClick={this.handleSearch}>Search</button>

        </div>)
    }
    handleMore = () => {
        this.setState(prevState => ({ loadMore: !prevState.loadMore }))
    }
    getAllCards = () => {
        const { loadMore } = this.state
        let cards = this.makeCards()
        if (cards.length > 0) {
            return loadMore ? cards : cards.slice(0, 20)
        }
        else {
            return <div className="flex center" style ={{width:600,marginLeft:'25%'}}><h2>No jobs found, maybe try changing the location?</h2></div>
        }
    }
    getButtons = () => {
        const { loadMore } = this.state
        return (
            <>
                <a href="#start"> 
                <button><FontAwesomeIcon icon={faArrowUp} /></button>
                </a>
                <div className="center">
                    <button onClick={this.handleMore}> {loadMore ? "Show less" : "Load more"}</button>
                </div></>
        )
    }
    handleRefresh = () => {
        window.location.reload(false);
    }
  handleShow = (id) => {
    const {ids} = this.state
    const size = Object.keys(ids).length;
      if (typeof id === "number") {
          // to handle "next", the function passes in the original index, we are checking if there is a next index available so the next information will be shown 
          this.setState({ ind: id + 1 < size ? id + 1 : id})
      }
      else {
        this.setState(prevState =>({
            shown: !prevState.shown, 
            ind: ids[id]
        }))
      }
}
showPopOut = () => {
    const {shown,data,ids,ind} = this.state
    const {theme} = this.props
    if (shown) {
    const info = data[ind]
    return (
        <div className={`${shown}Form flex center bigDiv`}>
            <div className={`${theme ? 'light' : 'dark'} middleDiv`}>
            <FontAwesomeIcon icon={faTimes} className={`${theme ? 'light' : 'dark'} cursor bigger`}
                style={{position: "absolute", top: 20,right:20}} 
                onClick={this.handleShow} />
            <InnerJobCard ind = {ind} handleNext = {this.handleShow} theme ={theme} info = {info} />
            </div>
           
        </div>)
    }
}
    render() {
        const { theme } = this.props
        const { data } = this.state
        const classTheme = theme ? "day16light" : "day16dark"
        const themeClass = theme ? "lightCard" : "darkCard"
        return (
            <div id="start" className={`${classTheme} day16`}>
                <header>
                    <div className="cursor bold borderHeader">
                        <img onClick ={this.handleRefresh} style={{ marginLeft: 100 }} src={this.devjobslogo}></img>
                    </div>
                    <div className={`center ${theme}Bar searchBar`} 
                    style={{ position: "absolute", top: 90, left: '30%' }}>
                        {this.navBar()}
                    </div>
                </header>
                <Fade cascade clear>
                    <div class="container down">
                        <div class="threeGrid">
                            {data ? this.getAllCards() : "Loading..."}
                        </div>
                    </div>
                </Fade>
                <div style={{ textAlign: "right", marginBottom: 30 }}>
                    {this.getButtons()}
                </div>
                {this.showPopOut()}
            </div>
        )
    }
}
export default connect(
    state => {
        return { theme: state };
    }
)(Day16);