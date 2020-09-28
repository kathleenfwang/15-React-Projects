import React from "react"
import clouds from "./Components1/clouds.jpg"
import domtoimage from 'dom-to-image';
import saveAs from 'file-saver'
import { TwitterIcon, TwitterShareButton } from "react-share"

export default class Day7 extends React.Component {
    constructor() {
        super()
        this.state = {
            img: clouds,
            input: "",
            ctx: null,
            rgba: null,
            clickRgba: [],
            singleClickRgba: null,
            colorPicker: "white",
            eraser: false,
            removeLines: true,
            colorDiv: false

        }
        this.canvasStyle = {
            cursor: "crosshair"
        }
        this.colorDiv = {
            border: "1px solid #ddd",
            backgroundColor: "white",
            width: 50, height: 50
        }

        this.grid = {
            width: 200,
            display: "grid",
            gridTemplateColumns: "repeat(20, 1fr)",
            gridGap: 0,
            cursor: "crosshair"
        }
    }

    componentDidMount() {
        this.loadImg()
    }
    documentClick = () => {
        console.log('clicked')
    }
    loadImg = () => {

        let img = new Image();
        img.crossOrigin = "Use-Credentials";


        var canvas = this.refs.canvas
        var ctx = canvas.getContext('2d');
        this.setState({ ctx: ctx })
        img.onload = function () {
            if (img.width > img.height) {
                canvas.width = 440
                canvas.height = 334
            }
            else {
                canvas.width = 334
                canvas.height = 440
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
            eraser:false,
            colorDiv: false,
            singleClickRgba: rgba,
            clickRgba: [...prevState.clickRgba, rgba]
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
    handleColor = (e) => {
        this.setState({
            colorDiv: true,
            colorPicker: e.target.style.backgroundColor,
            eraser: false
        })
    }
    colorDivs = () => {
        const { clickRgba } = this.state
        let num = 7
        let divs = []
        for (let i = 0; i < num; i++) {
            divs.push(
                <div style={{
                    border: "1px solid #ddd",
                    backgroundColor: clickRgba[i] ? clickRgba[i] : "white",
                    width: 50, height: 50
                }} onClick={this.handleColor} key={i}></div>
            )
        }
        return divs
    }
    handleGridClick = (e) => {
        const { singleClickRgba, colorPicker, eraser, colorDiv } = this.state
        if (eraser) {
            e.target.style.backgroundColor = "transparent"
        }
        else if (colorDiv) {
            e.target.style.backgroundColor = colorPicker
        }
        else {
            e.target.style.backgroundColor = singleClickRgba
        }
    }

    grids = () => {
        const { removeLines } = this.state
        let grid = []
        let size = 20
        for (let i = 0; i < size; i++) {
            let arr = []
            for (let j = 0; j < size; j++) {
                arr.push(<div className={`${removeLines}Border smSq`} onClick={this.handleGridClick} style={this.smSq}></div>)
            }
            grid.push(arr)
        }
        return grid
    }
    handleEraser = () => {
        let grid = this.refs.grid
        console.log(grid.style)
        grid.style.cursor = "crosshair"
        this.setState(prevState => ({
            eraser: !prevState.eraser
        }))
    }
    download = () => {

        domtoimage.toBlob(this.refs.grid)
            .then(function (blob) {
                window.saveAs(blob, 'pixel-art.png');
            });
        domtoimage.toPng(this.refs.grid)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                console.log(img.src)
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }
    removeLines = () => {
        this.setState(prevState => ({
            removeLines: !prevState.removeLines
        }))
    }
    render() {
        return (
            <div >
                <h1>Create your own pixel art</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <input onChange={this.handleChange} value={this.state.input} ref="urlinput" placeholder="enter img url"></input>
                    <button type="submit">Submit</button> */}
                </form>
                <div className ="twoGrid">
                <h4>Click anywhere on the image to extract colors to create pixel art!</h4>
                <h4>Use your extracted colors or click anywhere on the image for colors to create pixel art</h4>
                </div>
                <div className="twoGrid">
                    <div className="twoGrid">
                        <div>
                            <canvas style={this.canvasStyle} ref="canvas"></canvas>
                        </div>
                        <div>
                    
                        <div style={{ border: "1px solid #ddd", backgroundColor: this.state.rgba, width: 50, height: 50 }}></div>
                        {this.colorDivs()}
                        
                        </div>
                    </div>

                
              
                <div className ="twoGrid">
               
                    <div>
             
                    <div ref="grid" style={this.grid}>
                        {this.grids()}
                    </div>
                    </div>
                    <br></br>
                    
                    {/* <TwitterShareButton
        url= {`Check out my new pixel art: Created from http://kathleenwang180projects.surge.sh/day/7`}>
        <TwitterIcon
          size={32}
          round />
      </TwitterShareButton> */}
                </div>
                <div className ="oneGrid">
                    <button onClick={this.handleEraser}>Erase</button>
                    <button onClick={this.download}>Download</button>
                    <button onClick={this.removeLines}>{this.state.removeLines ? "Remove Borders" : "Add Borders"}</button>
                    </div>
            </div>
            
                </div >
        )
    }
}
// future additions:
// create pixel art from image 
// share to twitter
