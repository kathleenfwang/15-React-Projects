import React from "react"
import { faHeart as faFilledHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"
export default class StreamCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filled:null
        }
        this.twitchUrl = "https://www.twitch.tv/"
        this.streamerDbUrl = process.env.REACT_APP_STREAMER_URL
    }
    componentDidMount() {
        this.setState({filled:this.props.filled})
    }
    resetState = () => {
        this.setState({filled:this.props.filled})
    }
    getLiveIcon = (isLive) => {
        return (
            <div className={`${isLive}Color flex liveIcon`}>
                <div className={`${isLive}Icon circle`}></div>
                <div>{isLive ? "LIVE" : "OFFLINE"}</div>
            </div>
        )
    }
    addToDB = (name,id) => {
        const params = {
            name,
            id
        }
        axios.post(this.streamerDbUrl, params)
        .then(res => console.log('succesfully added ',name,id))
        .catch(e => console.log(e))
    }
    updateStreamerDB = () => {
        const {filled} = this.state 
        const {display_name,id} = this.props.data
        const findurl = `${this.streamerDbUrl}/id/${id}`
        // if filled is not true, we are removing from db 
        // if filled is true, we are adding streamer to db
        if (filled) {
            // first make sure streamer not currently in db     
            axios.get(findurl)
            .then((res) => {
                // if data is null, means streamer does not exist (yet!) 
                // we can now add 
                const {data} = res
                if (!data) {
                    this.addToDB(display_name,id)
                }
                // else if already exists, don't do anything. 
            })
            .catch((e) => console.log(e))
        } 
        else {
            // since streamer is now unliked, remove from DB :(
            axios.delete(findurl)
            .then((res) => console.log(res))
            .catch(e => console.log(e))
        }
    }
    handleHeartClick = (e) => {
        this.setState(prevState => ({filled: !prevState.filled}), () => this.updateStreamerDB()) 
    }
    getHeartIcon = () => {
        const {addToQueries,data} = this.props
        const { filled} = this.state
        const heartStyle = {color: "#ff8080"}
        const heartType = filled ? faFilledHeart : faHeart 
        return <FontAwesomeIcon icon ={heartType} style ={heartStyle} className ={"left"} onClick ={() => {
            addToQueries(data.display_name, filled)
            this.handleHeartClick()
        }}/> 
    }
    render() {
        const { data} = this.props
        const twitchUrl = this.twitchUrl + data.display_name
        return (
            <div className="flex spaceBetween noWrap streamCard hover">
                <div className="flex ">
                    <div>
                        <a href={twitchUrl} target="_blank"><img className="bigCircle" src={data.thumbnail_url} /></a>
                    </div>

                    <div>
                        <div className ="flex">
                        <div className="big whiteText">{data.display_name}</div>
                        {this.getHeartIcon()}
                        </div>
                        <div className="whiteText">{data.title}</div>
                    </div>
                </div>
                <div>
                    <div><a className="whiteText" href={twitchUrl} target="_blank">{data.is_live ? this.getLiveIcon(true) : this.getLiveIcon(false)}</a></div>
                </div>
            </div>
        )
    }
}