import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons'
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons'
import React from "react"
import { Fade } from 'react-reveal';
import { urlencoded } from "body-parser";
export default class AnimalCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded:false,
            clicked: false,
            filled: false 
        }
    }
    componentDidMount() {
        this.setState({filled: this.props.filled})
    }
    getImageData = () => {
        this.setState(prevState => ({ clicked: !prevState.clicked }))
    }
    handleClick = (e) => {
        this.setState({ clicked: false })
    }
    fillStar = (data) => {
        const {handleLike} = this.props 
        this.setState(prevState => ({filled: !prevState.filled}), () => handleLike(data,this.state.filled))
    }
    imageData = () => {
        const { data} = this.props
        const { clicked, filled} = this.state
        const starStyle = {color: "gold", marginLeft:5, fontSize:"1.2em", fontWeight:"bold"}
        return (
            <div className={`${clicked}Show floatingCard`}>
                <div className="up flex spaceBetween">
                    <div className ="flex">
                    <h3>{data.name["name-USen"]}</h3>
                    <FontAwesomeIcon className ="cursor" style ={starStyle} onClick ={() => this.fillStar(data)}icon ={filled ? faStar : faStarOutline} />
                    </div>
                    <div>
                    <FontAwesomeIcon className="cursor red" icon={faTimes} onClick={this.handleClick} />
                    </div>
                </div>
                <img className="bigSquare" src={data["image_uri"]} />
                <div className="flexVertical spaceAround">
                    <p>Birthday: <b>{data["birthday-string"]}</b></p>
                    <div className="flex">
                        <p style={this.getColor(data.personality)} className="smallTag upLess">{data.personality}</p>
                        <p style={this.getHobbyColor(data.hobby)} className="smallTag upLess">{data.hobby}</p>
                    </div>
                    <p className="quote upLess">{`"${data.saying}"`}</p>
                </div>
            </div>)
    }
    getColor = (personality) => {
        const {defaultColors} = this.props
        return { backgroundColor: defaultColors[personality], color: "rgb(99, 89, 89)" }
    }
    getHobbyColor = (hobby) => {
        const {defaultHobbyColors} = this.props
        return { backgroundColor: defaultHobbyColors[hobby], color: "rgb(99, 89, 89)" }
    }
    render() {
        const { data } = this.props
        const {loaded} = this.state
        return (
            <Fade cascade>
                <div className="relative">
                {loaded ? null :
          <div
            style={{
              background: 'rgb(232,232,232,.5)',
              borderRadius:8,
              height: '128px',
              width: '128px',
            }}
          />
        }
                    <img 
                    onDoubleClick={() => this.fillStar(data)}onClick={this.getImageData} className="cursor" 
                    src={data.icon_uri} 
                    style={loaded ? {} : {display: 'none'}}
                    onLoad={() => this.setState({loaded: true})}
                    />
                    {this.imageData()}
                </div>
            </Fade>
        )
    }
}