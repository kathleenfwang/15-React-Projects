import React from "react"

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
    render() {
        const { data } = this.props
        const twitchUrl = this.twitchUrl + data.display_name
        return (
            <div className="flex spaceBetween noWrap streamCard hover">
                <div className="flex ">
                    <div>
                        <a href={twitchUrl} target="_blank"><img className="bigCircle" src={data.thumbnail_url} /></a>
                    </div>

                    <div>
                        <div className="big whiteText">{data.display_name}</div>
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