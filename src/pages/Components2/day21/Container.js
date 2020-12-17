import React from "react"
import axios from "axios"
import StreamCard from "./StreamCard"
import { Fade } from 'react-reveal';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Container extends React.Component {
    constructor() {
        super()
        this.state = {
            queries: ["lilypichu", "pokimane", "sykkuno", "scarra"],
            name: "",
            loaded: false,
            newLoaded: false,
            currentData: [],
            data: []
        }
        this.client_id = process.env.REACT_APP_TWITCH_CLIENT_ID
        this.client_auth = process.env.REACT_APP_TWITCH_AUTH_CODE
    }
    componentDidMount() {
        this.state.queries.forEach((query) => this.getStreams(query, true))
    }
    componentDidUpdate(prevprops, prevState) {
        const { name, queries } = this.state
        if (prevState.name !== name) {
            this.getStreams(name, false)
        }
        if (prevState.queries !== queries) {
            // check if added one: 
            if (prevState.queries.length < queries.length) {
                const last = queries.length - 1
                this.getStreams(queries[last], true)
            }
        }
    }
    getStreams = (query, first) => {
        const url = 'https://api.twitch.tv/helix/search/channels?query=' + query
        const headers = {
            'client-id': this.client_id,
            Authorization: 'Bearer ' + this.client_auth,
            //the token is a variable which holds the token
        }
        axios.get(url, { headers })
            .then((res) => {
                let data = res.data.data
                if (first) {
                    this.setState(prevState => ({
                        currentData: [...prevState.currentData, data[0]],
                        loaded: true
                    }))
                }
                else {
                    this.setState({
                        newLoaded: true,
                        data: data
                    })
                }
            })
            .catch((e) => console.log(e.response))
    }
    handleChange = (e) => {
        this.setState({ name: e.target.value })
    }
    getHeader = () => {
        // title 
        // search bar 
        return (
            <div >
                <h1 style={{ color: "#6441A4" }}>Check if your favorite Twitch streamer is online: </h1>
                <div className="center">
                    <input className="darkInput" onChange={this.handleChange} placeholder="Search"></input>
                    <FontAwesomeIcon style={{ color: "grey", padding: 5 }} icon={faSearch} />
                </div>
            </div>
        )
    }
    addToQueries = (name, liked) => {
        const { queries, currentData } = this.state
        if (!liked) {
            // make sure was not previously added 
            if (queries.indexOf(name) == -1) {
                this.setState(prevState => ({
                    queries: [...prevState.queries, name]
                }))
            }
        }
        else {
            //remove from queries 
            const newQueries = queries.filter((username) => username !== name)
            console.log(currentData)
            const newCurrentData = currentData.filter((username) => username.display_name !== name)
            this.setState({ queries: newQueries, currentData: newCurrentData })
        }
    }
    getBody = (data, filled = false, reverse = false) => {
        if (reverse) {
            return data.map((data) => {
                return <StreamCard key={data.id} data={data} filled={filled} addToQueries={this.addToQueries} />
            }).reverse()
        }
        else {
            return data.map((data) => {
                return <StreamCard key={data.id} data={data} filled={filled} addToQueries={this.addToQueries} />
            })
        }
    }

    render() {
        const { loaded, newLoaded, currentData, data } = this.state
        return (
            <Fade>
                <div className="day21">
                    <div className="flex center">
                        {this.getHeader()}
                    </div>
                    <div className="flex baseLine spaceEvenly">
                        <div>
                            <h1>Community Favorited:</h1>
                            <div className="heightScroll noScroll">
                                {loaded ? <Fade>{this.getBody(currentData, true, true)} </Fade> : null}
                            </div>
                        </div>
                        <div>
                            <h1>Searches: </h1>
                            <div className="heightScroll noScroll">
                                {newLoaded ? <Fade>{this.getBody(data)}</Fade> : <div className="falseShow">{this.getBody(currentData)}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        )
    }
}