import React from "react"
import { faHeart as faFilledHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class StreamCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.twitchUrl = "https://www.twitch.tv/"
    }

    getLiveIcon = (isLive) => {
        return (
            <div className={`${isLive}Color flex liveIcon`}>
                <div className={`${isLive}Icon circle`}></div>
                <div>{isLive ? "LIVE" : "OFFLINE"}</div>
            </div>
        )
    }
    getHeartIcon = () => {
        const { filled } = this.props
        const heartStyle = {color: "#ff8080"}
        const heartType = filled ? faFilledHeart : faHeart 
        return <FontAwesomeIcon icon ={heartType} style ={heartStyle} className ={"left"}/> 
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