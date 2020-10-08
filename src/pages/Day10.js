import React from "react"
import sf from "./Components1/sf.jpg"
export default class Day10 extends React.Component {

    constructor() {
        super()
        this.state = {
            img: sf,
            imageData:null,
            imageData2:null,
            loaded:false
        }
 
    }
    componentDidMount() {
      this.loadImg()
    }
    componentDidUpdate(prevprops,prevState) {
        if (prevState.img !== this.state.img){
            this.loadImg()
        }
    }
    loadImg = () => {
        var img = new Image();
        img.src = this.state.img
        let canvas = this.refs.canvas
        let ctx = canvas.getContext('2d')
        canvas.width = 800 
        canvas.height = 600
        img.onload = () => {    
            ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                0, 0, canvas.width, canvas.height);
            let imageData = ctx.getImageData(10,10,img.width,img.height) 
 
            this.setState({
 
                imageData: imageData, 
                loaded:true
            })
        };
    }
    getSquares = (imageData) => {
 
        let squares = [] 
        for (let i =0;i<5;i++) {
            console.log(imageData.data[i])
            squares.push(
                <div className ="square" style = {{border: '2px solid black',backgroundColor: `rgb(${imageData.data[i+50]}, ${imageData.data[i+1]},${imageData.data[i+50+2]}`}}>

                </div>
            )
        }
        return squares
    }
    handleUpload = (e) => {
        console.log('lcick')
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            let src = URL.createObjectURL(img);
            this.setState({
                img:src
            })       
        }
    }
    inputUpload = () => {
        let upload = this.refs.upload
        upload.click()
    }
    render() {
        const {imageData,imageData2} = this.state
        return(
            <div className = "flex center">
            <div className ="day10 flex center" ref ="day10">
                <canvas  ref = "canvas"></canvas>
            </div>
            <div className ="flex center">
                    <div>{this.state.loaded && this.getSquares(imageData)}</div>
                </div>
                <input ref = "upload" style ={{display:"none"}}type="file" name="imgUpload" id="file" className="inputfile" onChange={this.handleUpload}accept=".png,.jpg"/>
            <button onClick ={this.inputUpload}>Upload Image</button>
            </div>
        )
    }
}