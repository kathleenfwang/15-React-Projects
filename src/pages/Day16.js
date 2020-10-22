import React from "react"
import axios from "axios"
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faHeart, faSearch, faMapMarkerAlt, faSadCry } from '@fortawesome/free-solid-svg-icons'
import JobCard from "./Components1/day16/JobCard"
import { Fade, Slide, Rotate } from 'react-reveal';
import { Font } from "three";
class Day16 extends React.Component {
    constructor({ theme }) {
        super({ theme })
        this.state = {
            url: 'https://jobs.github.com/positions.json?&',
            search: '',
            location: 'united states',
            fullTime: false,
            data: null,
            loadMore: false
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
                })
            })
            .catch((e) => console.log(e))
    }
    makeCards = () => {
        const { data } = this.state
        return data.map((job) => {
            return (
                <JobCard data={job} />)
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
                <a href="#start"> <button><FontAwesomeIcon icon={faArrowUp} /></button></a>
                <div className="center">
                    <button onClick={this.handleMore}> {loadMore ? "Show less" : "Load more"}</button>
                </div></>
        )
    }
    render() {
        const { theme } = this.props
        const { data } = this.state
        const classTheme = theme ? "day16light" : "day16dark"
        const themeClass = theme ? "lightCard" : "darkCard"
        return (
            <div id="start" className={`${classTheme} day16`}>
                <header>
                    <div className="bold borderHeader">
                        <img style={{ marginLeft: 100 }} src={this.devjobslogo}></img>
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
            </div>
        )
    }
}
export default connect(
    state => {
        return { theme: state };
    }
)(Day16);