import React from "react"
import clouds from "./Components1/clouds.jpg"
import ocean from "./Components1/ocean.jpg"
import parot from "./Components1/parot.jpg"
import ocean2 from "./Components1/ocean2.jpg"
import domtoimage from 'dom-to-image';
import saveAs from 'file-saver'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faThLarge, faPlus, faSquare, faEraser } from '@fortawesome/free-solid-svg-icons'
import { TwitterIcon, TwitterShareButton } from "react-share"
import { urlencoded } from "body-parser";
import ImageUploader from 'react-images-upload';

export default class Day7 extends React.Component {
    constructor() {
        super()
        this.state = {
            img: clouds,
            photos: [clouds,ocean,parot],
            input: "",
            ctx: null,
            rgba: null,
            clickRgba: [],
            singleClickRgba: null,
            colorPicker: "white",
            eraser: false,
            removeLines: true,
            colorDiv: false,
            columns: 20,
            sqSize: "medSq",
            active: "medSq"
        }
        this.canvasDiv ={
            width:450,
            height:450,
        }
        this.canvasStyle = {
            cursor: "crosshair"
        }
        this.colorDiv = {
            border: "1px solid #ddd",
            backgroundColor: "white",
            width: 50, height: 50, 
            borderRadius:5,
            marginLeft:5
        }
        this.grid = {
            width: 200,
            display: "grid",
            gridTemplateColumns: `repeat(${this.state.columns}, 1fr)`,
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
    images = () => {
        let {photos} = this.state
       while (photos.length < 5) {
           photos.push("")
       }
        return photos.map((photo,i) => {
            if (photo === "") {
                return <div id ={i} onClick ={this.handleUpload}className ="square alignInMiddle">
                    <FontAwesomeIcon icon ={faPlus}  style ={{color:"lightgrey"}}/>
                    </div>
            }
            else {
            return <div id ={i} className ="square" style={{
                backgroundImage: `url(${photo})`,
                backgroundSize: "cover",
            }} onClick ={this.handleClickImage}/>
        }
        })
    }
    handleUpload =(e) => {
    }
    onDrop = (picture) => {
        this.setState({
            photos: this.state.photos.concat(picture),
            img: picture
        });
    }
    handleClickImage = (e) => {
        const {photos} = this.state
        let id = e.target.id
        this.setState({
            img:photos[id]
        })
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
            eraser: false,
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
                    backgroundColor: clickRgba[i] ? clickRgba[i] : "white",
                }} className ="square" onClick={this.handleColor} key={i}></div>
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
        const { removeLines, columns, sqSize } = this.state
        let grid = []
        let size = columns
        for (let i = 0; i < size; i++) {
            let arr = []
            for (let j = 0; j < size; j++) {
                arr.push(<div className={`${removeLines}Border ${sqSize}`} onClick={this.handleGridClick}></div>)
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
    handleSmall = (e) => {
        this.setState({
            sqSize: "smSq",
            columns: 40
        })
    }
    handleMedium = (e) => {
        this.setState({
            sqSize: "medSq",
            columns: 20
        })
    }
    handleLarge = (e) => {
        this.setState({
            sqSize: "lgSq",
            columns: 10
        })
    }
    render() {
        console.log(this.state.img)
        let buttons = [
            <button className={this.state.sqSize === "smSq" ? 'active' : ''} onClick={this.handleSmall}><FontAwesomeIcon icon={faTh} /></button>,
            <button className={this.state.sqSize === "medSq" ? 'active' : ''} onClick={this.handleMedium}><FontAwesomeIcon icon={faThLarge} /></button>,
            <button className={this.state.sqSize === "lgSq" ? 'active' : ''} onClick={this.handleLarge}><FontAwesomeIcon icon={faSquare} /></button>
        ]
        return (
            <div >
                <h1>Create your own pixel art</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <input onChange={this.handleChange} value={this.state.input} ref="urlinput" placeholder="enter img url"></input>
                    <button type="submit">Submit</button> */}
                </form>
                <div className="twoGrid">
                    <h4>Click anywhere on the image to extract colors to create pixel art!</h4>
                    <h4>Use your extracted colors or click anywhere on the image for colors to create pixel art</h4>
                </div>
                <div className="twoGrid">
                    <div className="twoGrid">
                        <div className ="twoGrid">
                            <div>
                                <div style ={this.canvasDiv}>
                                <canvas style={this.canvasStyle} ref="canvas"/>
                                </div>
                                <div className ="flex">
                                    {this.images()}
                                </div>
                            </div>
                            <div>
                                <div className ="square" style={{ border: "1px solid #ddd", backgroundColor: this.state.rgba, width: 50, height: 50 }} onClick={this.handleColor}></div>
                                {this.colorDivs()}
                            </div>
                        </div>
                        <div className="twoGrid">
                            <div>
                                <div ref="grid" className="grid" style={{ gridTemplateColumns: `repeat(${this.state.columns}, 1fr)`, }}>
                                    {this.grids()}
                                </div>
                            </div>
                            <br></br>
                        </div>
                        <div className="oneGrid">
                            <button onClick={this.handleEraser}><FontAwesomeIcon icon={faEraser} /></button>
                            <button onClick={this.download}>Download</button>
                            <button onClick={this.removeLines}>{this.state.removeLines ? "Remove Borders" : "Add Borders"}</button>
                            <h3>Change Grid size: </h3>
                            <div>
                                {buttons}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// future additions:
// create pixel art from image 
// share to twitter
