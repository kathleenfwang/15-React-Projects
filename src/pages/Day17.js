import React from "react"
import Image from "./Components2/day17/Image"
export default class Day17 extends React.Component {
    constructor(){
        super()
        this.state ={
            grayscale:0
        }
        this.penguinSrc = "https://unsplash.com/photos/3Xd5j9-drDA/download"
    
    }
    imgStyle1 = () => {
        console.log(this.state.grayscale)
        return {
            width:'50%',
            height:'50%',
            filter: `grayscale(${this.state.grayscale}%)`    
        }
    }

    handleChange = (e) => {
         
        this.setState({grayscale:e.target.value})
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
        <input value = {this.state.grayscale} onChange ={this.handleChange}type ="range"></input>
        <p>{this.state.grayscale}%</p>
        </div>

        <div className ="flex center">
        <p>Brightness:</p>
        <input value = {this.state.grayscale} onChange ={this.handleChange}type ="range"></input>
        <p>{this.state.grayscale}%</p>
        </div>
      
        </div>
        
        )
    }
}