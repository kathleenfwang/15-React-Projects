import React from "react"

export default class Image extends React.Component {
    constructor(props) {
        super(props)
        this.state = {} 
    
    }
    render() {
        return(
       <img style ={this.props.style} src = {this.props.src} />

        )
    }
}