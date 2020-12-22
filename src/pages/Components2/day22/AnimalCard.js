import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faSmile, faArrowUp, faHeart } from '@fortawesome/free-solid-svg-icons'
import React from "react"
export default class AnimalCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clicked: false
        } 
    }
    getImageData = () => {
        this.setState(prevState => ({clicked: !prevState.clicked}))
    }
    handleClick = (e) => {
        this.setState({clicked: false})
    }
    imageData = () => {
        const {data} = this.props
        const {clicked} = this.state
        console.log(data)
        return (
            <div className ={`${clicked}Show floatingCard`}>
                <div className ="up flex spaceBetween">
            <h2>{data.name["name-USen"]}</h2>
            <FontAwesomeIcon className ="cursor red" icon ={faTimes} onClick ={this.handleClick}/>
                </div>
            <img className ="bigSquare" src = {data["image_uri"]}/>
            <p>Birthday: {data["birthday-string"]}</p>
            <p>Hobby: {data.hobby}</p>
            <p className ="italic">{`"${data.saying}"`}</p>
            </div>)
    }

    render() {
        const {data} = this.props
        return(
            <div className ="relative">
                <img onClick ={this.getImageData} className ="cursor" src ={data.icon_uri}/>
                {this.imageData()}
               
            </div>
        )
    }
}