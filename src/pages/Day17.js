import React from "react"
import Image from "./Components2/day17/Image"
export default class Day17 extends React.Component {
    constructor(){
        super()
        this.state ={
            grayscale:0,
            brightness: 100,
            hue: 0,
            invert:0,
            sepia:0
        }
        this.penguinSrc = "https://unsplash.com/photos/3Xd5j9-drDA/download"
        this.defaultImgStyle = {
            borderRadius:5,
                width:'50%',
                height:'50%',
        }
    }
    imgStyle1 = () => {
        const {grayscale,brightness,hue,invert,sepia} = this.state
        console.log(hue)
        return {
            borderRadius:5,
            width:'50%',
            height:'50%',
            filter: `
            grayscale(${grayscale}%)        
            brightness(${brightness}%)
            hue-rotate(${hue}deg)
            invert(${invert}%)
            sepia(${sepia}%)
            `, 
        }
    }

    handleChange = (e,type) => {
        this.setState({[type]:e.target.value})
    }
    handleReset = () => {
         this.setState({
            grayscale:0,
            brightness: 100,
            hue: 0,
            invert:0,
            sepia:0
         })
    }
    render() {
        return(
        <div className ="day17">
            <h1>Image Filtering</h1>
        <div className ="flex center">
            <Image style ={this.defaultImgStyle} src ={this.penguinSrc}/>
           <Image style = {this.imgStyle1()}src = {this.penguinSrc}/>
        </div>
        <button onClick ={this.handleReset}>Reset</button>
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

        <div className ="flex center">
        <p>Hue Rotate:</p>
        <input max = '360' value = {this.state.hue} onChange ={(e) => this.handleChange(e,'hue')}type ="range"></input>
        <p>{this.state.hue}deg</p>
        </div>
      
        <div className ="flex center">
        <p>Invert:</p>
        <input value = {this.state.invert} onChange ={(e) =>this.handleChange(e,'invert')}type ="range"></input>
        <p>{this.state.invert}%</p>
        </div>

        <div className ="flex center">
        <p>Sepia:</p>
        <input value = {this.state.sepia} onChange ={(e) =>this.handleChange(e,'sepia')}type ="range"></input>
        <p>{this.state.sepia}%</p>
        </div>

        </div>
        
        )
    }
}