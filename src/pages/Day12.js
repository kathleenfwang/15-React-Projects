import React from "react"
import heel from "./Components1/day12/heel.mp3"
import sneaker from "./Components1/day12/sneaker.mp3"
import girllaugh from "./Components1/day12/girllaugh.mp3"
export default class Day12 extends React.Component { 
    constructor() {
        super() 
        this.state = {
            play: false,
            pause: true,
        } 
        this.sneaker = new Audio(sneaker);
        this.heel = new Audio(heel)
        this.laugh = new Audio(girllaugh)
    }
    componentDidMount() {
        document.addEventListener("keydown", this.startFootsteps)
        document.addEventListener("keyup", this.pauseFoosteps)
    }
    startFootsteps = (e) => {
        let key = e.key 
        if (key === "ArrowUp") {
        this.sneaker.play();
        setTimeout(() => {
            this.laugh.play()
        }, 2000)
        setTimeout(() => {
            this.showFirst()
        },4000)
        }
    }
    pauseFoosteps = (e) => {
        this.sneaker.pause()
        this.laugh.pause()
    }
    showFirst = () => {
    
    }
    render(){
        return(
            <div className ="day12">
                <p>Halloween special :) </p>
                <h1>Press the "up" arrow key to start walking</h1>
            </div>
        )
    }
}