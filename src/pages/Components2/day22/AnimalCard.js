import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons'
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons'
import React from "react"
import { Fade } from 'react-reveal';
export default class AnimalCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                    <h2>{data.name["name-USen"]}</h2>
                    <FontAwesomeIcon className ="cursor" style ={starStyle} onClick ={() => this.fillStar(data)}icon ={filled ? faStar : faStarOutline} />
                    </div>
                    <div>
                    <FontAwesomeIcon className="cursor red" icon={faTimes} onClick={this.handleClick} />
                    </div>
                </div>
                <img className="bigSquare" src={data["image_uri"]} />
                <div className="flexVertical spaceAround">
                    <p>Birthday: {data["birthday-string"]}</p>
                    <div className="flex">
                        <p style={this.getColor(data.personality)} className="smallTag upLess">{data.personality}</p>
                        <p style={this.getHobbyColor(data.hobby)} className="smallTag upLess">{data.hobby}</p>
                    </div>
                    <p className="quote upLess">{`"${data.saying}"`}</p>
                </div>
            </div>)
    }
    getColor = (personality) => {
        const { animalPersonalities } = this.props
        const personalities = Object.keys(animalPersonalities) // ["Peppy", "Normal".. ]
        const personalityIndex = personalities.indexOf(personality)
        const colors = { pastel: ["#C1A7FF", "#C2CBFF", "#C7FCBA", "#FDFEC9", "#FFD8B6", " #FEBCC2"], beach: ["#C8F69B", "#FFEEA5", "#FFCBA5", "#FFB1AF", " #D6D4FF", "#B3EEFF"] }
        const color = personalityIndex % colors.beach.length
        return { backgroundColor: colors.beach[color], color: "rgb(99, 89, 89)" }
    }
    getHobbyColor = (hobby) => {
        const { animalHobbies } = this.props
        const hobbies = Object.keys(animalHobbies)
        const hobbyIndex = hobbies.indexOf(hobby)
        const colors = { pastel: ["#C1A7FF", "#C2CBFF", "#C7FCBA", "#FDFEC9", "#FFD8B6", " #FEBCC2"], beach: ["#C8F69B", "#FFEEA5", "#FFCBA5", "#FFB1AF", " #D6D4FF", "#B3EEFF"] }
        const color = hobbyIndex % colors.pastel.length
        return { backgroundColor: colors.pastel[color], color: "rgb(99, 89, 89)" }
    }
    render() {
        const { data } = this.props
        return (
            <Fade cascade>
                <div className=" relative">
                    <img onDoubleClick={() => this.fillStar(data)}onClick={this.getImageData} className="cursor" src={data.icon_uri} />
                    {this.imageData()}
                </div>
            </Fade>
        )
    }
}