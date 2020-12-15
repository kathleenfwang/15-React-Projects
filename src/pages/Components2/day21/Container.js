import React from "react"
import axios from "axios"
import StreamCard from "./StreamCard"
export default class Container extends React.Component {
    constructor() {
        super() 
        this.state = {
            queries: ["Lilypichu","Pokimane","Sykkuno"],
            loaded:false,
            currentData: [] 
        }
        this.client_id = process.env.REACT_APP_TWITCH_CLIENT_ID
        this.client_auth = process.env.REACT_APP_TWITCH_AUTH_CODE
    }
    componentDidMount() {
         this.state.queries.forEach((query) => this.getFirstStreams(query))
    }
    getFirstStreams = (query) => {
        const url = 'https://api.twitch.tv/helix/search/channels?query=' + query
        const headers =  {
            'client-id': this.client_id,
          Authorization: 'Bearer ' + this.client_auth,
          //the token is a variable which holds the token
        }
        axios.get(url, {headers})
        .then((res) => {
            console.log(res.data.data)
            let data = res.data.data 
            this.setState({
                loaded:true})
            this.setState( prevState =>({
                currentData: [...prevState.currentData, data[0]]
            }))
        })
        .catch((e) => console.log(e.response))
    }
    getHeader = () => {
        // title 
        // search bar 
        return (
            <div>
                <h1>Check if your favorite streamer is online ... </h1>
                <input placeholder="Search.."></input>
            </div>
        )
    }
    getBody =() => {
        const {currentData} = this.state 
        return currentData.map((data) => {
            return <StreamCard data = {data}/>
        })
    }
    render() {
        const {loaded} = this.state
        return(
            <div>
               <div className ="flex center">{this.getHeader()}</div>
               <div>
                   <h1>Past:</h1>
                   {loaded && this.getBody()}
               </div>
            </div>
        )
    }
}