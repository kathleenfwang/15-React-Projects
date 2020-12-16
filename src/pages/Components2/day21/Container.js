import React from "react"
import axios from "axios"
import StreamCard from "./StreamCard"
import { Fade, Slide, Rotate } from 'react-reveal';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Container extends React.Component {
    constructor() {
        super()
        this.state = {
            queries: ["Lilypichu", "Pokimane", "Sykkuno", "Scarra"],
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
        const { name } = this.state
        if (prevState.name !== name) {
            this.getStreams(name, false)
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
    getBody = (data,filled = false) => {
        return data.map((data) => {
            return <StreamCard data={data} filled ={filled}/>
        })
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
                            <h1>Suggested:</h1>
                            <div>
                                {loaded ? <Fade>{this.getBody(currentData,true)} </Fade> : null}
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