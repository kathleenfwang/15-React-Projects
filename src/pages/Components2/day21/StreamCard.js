import { getAllByDisplayValue } from "@testing-library/react"
import React from "react"
import { Geometry } from "three"

export default class StreamCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.twitchUrl = "https://www.twitch.tv/" + this.props.data.display_name
    }
    getLiveIcon = (isLive) => {
        return (
            <div className={`${isLive}Color flex liveIcon`}>
                <div className={`${isLive}Icon circle`}></div>
                <div>{isLive ? "LIVE" : "OFFLINE"}</div>
            </div>
        )
    }
    render() {
        const { data } = this.props
        return (
            <div className ="flex spaceBetween noWrap streamCard hover">
                    <div className="flex ">
                        <div>
                            <a href={this.twitchUrl} target="_blank"><img className="bigCircle" src={data.thumbnail_url} /></a>
                        </div>

                        <div>
                            <div className="big whiteText">{data.display_name}</div>
                            <div className ="whiteText">{data.title}</div>
                        </div>
                    </div>
                    <div>
                        <div>{data.is_live ? this.getLiveIcon(true) : this.getLiveIcon(false)}</div>
                    </div>
                </div>
        )
    }
}