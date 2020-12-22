import React from "react"
export default class AnimalCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {} 
    }
    render() {
        const {data} = this.props
        return(
            <div>
                <img src ={data.icon_uri}/>
            </div>
        )
    }
}