import React from "react"
import Image from "./Components2/day17/Image"
export default class Day17 extends React.Component {
    constructor(){
        super()
        this.state ={
            grayscale:0,
            brightness: 100
        }
        this.penguinSrc = "https://unsplash.com/photos/3Xd5j9-drDA/download"
    
    }
    imgStyle1 = () => {
        console.log(this.state.grayscale)
        return {
            width:'50%',
            height:'50%',
            filter: `
            grayscale(${this.state.grayscale}%)        
            brightness(${this.state.brightness}%)`, 
        }
    }

    handleChange = (e,type) => {
        this.setState({[type]:e.target.value})
    }
    render() {
        return(
        <div className ="day17">
            <h1>Image Filtering</h1>
        <div className ="flex center">
           <Image style = {this.imgStyle1()}src = {this.penguinSrc}/>
        </div>
        <div className ="flex center">
        <p>Grayscale:</p>
        <input value = {this.state.grayscale} onChange ={(e) =>this.handleChange(e,'grayscale')}type ="range"></input>
        <p>{this.state.grayscale}%</p>
        </div>

        <div className ="flex center">
        <p>Brightness:</p>
        <input value = {this.state.brightness} onChange ={(e) => this.handleChange(e,'brightness')}type ="range"></input>
        <p>{this.state.brightness}%</p>
        </div>
      
        </div>
        
        )
    }
}