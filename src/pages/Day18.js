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
            <div className ="down twoGrid spaceEvenly">
              {this.getCards()}
              </div>
            <p className ="right">Colors from <a target ="_blank" href ="https://www.happyhues.co/">Happy Hues</a>. Thinking about adding more in the future!</p>
            </div>
        )
    }
}