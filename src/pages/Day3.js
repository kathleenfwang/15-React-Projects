import Radium from 'radium'
import React, {useState,useEffect} from "react"

export default class Day3 extends React.Component {
    constructor(){
        super()
        this.state = {}
        this.petalUrl = "https://media.discordapp.net/attachments/701277128951595030/761760654595588116/imageedit_4_8977268586.png"
    }
 
    componentDidMount() {
        const canvas = this.refs.canvas 
        
    }
    getPetals = (num) => {
        let colors = ['red','orange','yellow','green','blue','purple']
        let petals = []
        for (let i =num;i<5;i++) {   
            petals.push(<img style ={{ top: `${20 + 19 * i}px`, transform: `rotate(${i*18}deg)`, left: `${150 + i*20}px`}}  key = {i} src = {this.petalUrl}></img>)

        }
        return petals
    }
 render() {
 
    return (
        <div>
   
            <div>
     
            <img src ="https://media.discordapp.net/attachments/701277128951595030/761754268901310484/Untitled_Artwork.png?width=359&height=478"></img>
         
            {this.getPetals(0)}
            <div className = "petals" >
            {this.getPetals(1)}
            </div>
            <div className = "petals" >
            {this.getPetals(1)}
            </div>
            <div className = "petals" >
            {this.getPetals(0)}
            </div>
       
            </div>
        </div>
    )
 }
}

 