import React from "react"
import { faHeart as faFilledHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class StreamCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filled:null
        }
        this.twitchUrl = "https://www.twitch.tv/"
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
    handleHeartClick = (e) => {
        this.setState(prevState => ({filled: !prevState.filled}))
    }
    test = () => {
        console.log( "test"
        )
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