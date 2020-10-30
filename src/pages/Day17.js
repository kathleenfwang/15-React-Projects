import React from "react"
import Image from "./Components2/day17/Image"
import Slider from "./Components2/day17/Slider"
export default class Day17 extends React.Component {
    constructor() {
        super()
        this.state = {
            grayscale: 0,
            brightness: 100,
            hue: 0,
            invert: 0,
            sepia: 0
        }
        this.penguinSrc = "https://unsplash.com/photos/3Xd5j9-drDA/download"
        this.defaultImgStyle = {
            borderRadius: 5,
            width: '50%',
            height: '50%',
        }
    }
    imgStyle1 = () => {
        const { grayscale, brightness, hue, invert, sepia } = this.state
        console.log(hue)
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
    images = () => {
        const styles = [this.defaultImgStyle, this.imgStyle1()] 
        const src = this.penguinSrc
        return styles.map((img) => {
            return <Image style = {img} src = {src} />
        })
    }
    inputs = () => {
        let titles = ['grayscale','brightness','hue','invert','sepia'] 
        return titles.map((title) => {
            return <Slider title = {title} value = {this.state[title]} handleChange = {this.handleChange} /> 
        })
    }
    render() {
        return (
            <div className="day17">
                <h1>Image Filtering</h1>
                <div className="flex center">
                    {this.images()}
                </div>
                <button onClick={this.handleReset}>Reset</button>
                {this.inputs()}
            </div>
        )
    }
}