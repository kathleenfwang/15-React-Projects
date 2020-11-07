import React from "react"
import testimonies from "./Components2/day18/testimonies"
import Card from "./Components2/day18/Card"
export default class Day18 extends React.Component {
    constructor() {
        super()
        this.state = {} 
    }
    getCards = () => {
        return testimonies.map((testimony) => {
            return <Card testimony = {testimony}/>
        })
    }
    render() {
        return(
            <div>
            <div className ="down flex">
              {this.getCards()}
              </div>
            </div>
        )
    }
}