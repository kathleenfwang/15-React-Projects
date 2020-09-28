import Axios from "axios"
import React from "react"
import axios from "axios"
import { isElementOfType } from "react-dom/test-utils"
import clouds from "./Components1/clouds.jpg"
export default class Day7 extends React.Component {
    constructor() {
        super()
        this.state = {
            img: clouds,
            input: "",
            ctx: null,
            rgba: null,
            clickRgba: [], 
            singleClickRgba: null
        }
        this.colorDiv = { 
            border: "2px solid black", 
            backgroundColor: "white", 
            width: 50, height: 50 }

    }
    componentDidMount() {
        this.loadImg()


    }
    loadImg = () => {

        let img = new Image();
        img.crossOrigin = "Use-Credentials";


        var canvas = this.refs.canvas
        var ctx = canvas.getContext('2d');
        this.setState({ ctx: ctx })
        img.onload = function () {
            if (img.width > img.height) {
                canvas.width = 500
                canvas.height = 390
            }
            else {
                canvas.width = 390
                canvas.height = 500
            }


            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


        };
        canvas.addEventListener('mousemove', this.pick);
        canvas.addEventListener('click', this.canvasClick)
        img.src = this.state.img

    }
    canvasClick = (event) => {
        console.log('click')
        var x = event.layerX;

        var y = event.layerY;
        const { ctx } = this.state
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        var rgba = 'rgba(' + data[0] + ', ' + data[1] +
            ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        this.setState(prevState => ({
            singleClickRgba: rgba,
            clickRgba: [...prevState.clickRgba,rgba]
        }))
    }
    pick = (event) => {
        var x = event.layerX;

        var y = event.layerY;
        const { ctx } = this.state
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        var rgba = 'rgba(' + data[0] + ', ' + data[1] +
            ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        this.setState({
            rgba: rgba
        });

    }
    componentDidUpdate(prevprops, prevState) {
        if (prevState.img !== this.state.img) {
            this.loadImg()
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let input = this.refs.urlinput.value
        let img = new Image()
        img.src = input
        img.onload = () => {
            if (img.width) {
                this.setState({
                    img: input
                })
            }
        }

    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }
    colorDivs = () => {
        const {clickRgba} = this.state
        let num = 10
        let divs = []
        for (let i = 0; i < num; i++) {
            divs.push(
                <div style={{ 
                    border: "2px solid black", 
                    backgroundColor: clickRgba[i] ? clickRgba[i] : "white", 
                    width: 50, height: 50 }} key={i}></div>
            )
        }
        return divs
    }
    render() {
        return (
            <div>
                <h1>day7</h1>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.input} ref="urlinput" placeholder="enter img url"></input>
                    <button type="submit">Submit</button>
                </form>
                <canvas style={this.canvasStyle} ref="canvas"></canvas>
                <div style={{ border: "2px solid black", backgroundColor: this.state.singleClickRgba, width: 50, height: 50 }} />
                <div style ={ {display:"flex"}}>
                {this.colorDivs()}
                </div>
                <h1 style={{ color: this.state.rgba }}>{this.state.rgba}</h1>

            </div>
        )
    }
}