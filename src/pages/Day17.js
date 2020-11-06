import React from "react"
import Image from "./Components2/day17/Image"
import Slider from "./Components2/day17/Slider"
export default class Day17 extends React.Component {
    constructor() {
        super()
        this.state = {
            grayscale: 0,
            contrast:100,
            brightness: 100,
            hue: 0,
            invert: 0,
            sepia: 0, 
            show:false
        }
        this.penguinSrc = "https://unsplash.com/photos/3Xd5j9-drDA/download"
        this.defaultImgStyle = {
            position:"relative",
            borderRadius: 5,
            width: '50%',
            height: '50%',
        }
        this.hoverStyle = {
            position:"absolute", 
            left:200,
            top: 200, 
            color:'blue'
        }
    }
    imgStyle1 = () => {
        const { grayscale, contrast,brightness, hue, invert, sepia } = this.state
        return {
            borderRadius: 5,
            width: '50%',
            height: '50%',
            filter: `
            grayscale(${grayscale}%)      
            brightness(${brightness}%)
            hue-rotate(${hue}deg)
            invert(${invert}%)
            sepia(${sepia}%)
            `,
        }
    }
    

    handleChange = (e, type) => {
        this.setState({ [type]: e.target.value })
    }
    handleReset = () => {
        this.setState({
            grayscale: 0,
            brightness: 100,
            hue: 0,
            invert: 0,
            sepia: 0
        })
    }
    inputs = () => {
        let titles = ['grayscale','brightness','hue','invert','sepia'] 
        return titles.map((title) => {
            return <Slider title = {title} value = {this.state[title]} handleChange = {this.handleChange} /> 
        })
    }
    hover =(state) => {
        this.setState({show: state})
    }
    render() {
        const src = this.penguinSrc
        const {show} = this.state
        return (
            <div className="day17">
                <h1>Image Filtering</h1>
                <div className="flex center">
                <img onMouseLeave = {() => this.hover(false)}onMouseOver= {() => this.hover(true)} className = "hoverOpacity" style = {this.defaultImgStyle} src = {src} />
                {/* <h2 className = {`${show}Show`}style = {this.hoverStyle}>Original</h2> */}
                <img style = {this.imgStyle1()} src = {src} />
                </div>
                <button onClick={this.handleReset}>Reset</button>
                {this.inputs()}
            </div>
        )
    }
}