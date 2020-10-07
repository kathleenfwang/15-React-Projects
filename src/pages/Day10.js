import React from "react"
import sf from "./Components1/sf.jpg"
export default class Day10 extends React.Component {

    constructor() {
        super()
        this.state = {
            img: sf,
            imageData:null
        }
 
    }
    componentDidMount() {
        var img = new Image();
        img.src = this.state.img
        let canvas = this.refs.canvas
        let ctx = canvas.getContext('2d')
        canvas.width = 800 
        canvas.height = 600
        img.onload = () => {    
            ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                0, 0, canvas.width, canvas.height);
            let imageData = ctx.getImageData(0,0,img.width,img.height) 
            this.setState({
                imageData: imageData
            })
        };
        
      
    }
    render() {
        console.log(this.state.imageData)
        return(
            <div className ="day10" ref ="day10">
                <canvas  ref = "canvas"></canvas>
            </div>
        )
    }
}