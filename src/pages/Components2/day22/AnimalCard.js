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
    imageData = () => {
        const {data} = this.props
        console.log(data)
        return data.name["name-USen"]
    }
    render() {
        const {data} = this.props
        const {clicked} = this.state
        return(
            <div>
                <img onClick ={this.getImageData} className ="cursor" src ={data.icon_uri}/>
                <p className ={`${clicked}Show`}>{this.imageData()}</p>
            </div>
        )
    }
}