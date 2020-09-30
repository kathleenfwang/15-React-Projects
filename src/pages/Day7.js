import React from "react"
import pixelart1 from "./Components1/pixelart1.gif"
import pixelart2 from "./Components1/pixelart2.gif"
import pixelart3 from "./Components1/pixelart3.gif"
import domtoimage from 'dom-to-image';
import saveAs from 'file-saver'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faThLarge, faPlus, faSquare, faEraser, faDownload } from '@fortawesome/free-solid-svg-icons'
import { TwitterIcon, TwitterShareButton } from "react-share"
import { urlencoded } from "body-parser";
import ImageUploader from 'react-images-upload';

export default class Day7 extends React.Component {
    constructor() {
        super()
        this.state = {
            img: pixelart1,
            photos: [pixelart1,pixelart2,pixelart3],
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
            active: "medSq", 
            isShown: false,
            index: null
        }
        this.canvasDiv = {
            width: 450,
            height: 450,
        }
        this.canvasStyle = {
            cursor: "crosshair", 
            objectFit: "contain"
        }
        this.colorDiv = {
            border: "1px solid #ddd",
            backgroundColor: "white",
            width: 50, height: 50,
            borderRadius: 5,
            marginLeft: 5
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
        let { photos } = this.state
        while (photos.length < 6) {
            photos.push("")
        }
        return photos.map((photo, i) => {
            if (photo === "") {
                return <div id={i} className="square alignInMiddle" onClick = {() => this.inputUpload(i)}>
                        <input ref = {`fileUpload${i}`} style ={{display:"none"}}type="file" name="imgUpload" id="file" className="inputfile" onChange={(e) => this.handleUpload(e,i)}
                                accept=".png,.jpg"
                            />
                    <FontAwesomeIcon icon={faPlus} style={{ color: "lightgrey" }} />
                </div>
            }
            else {
                return <div id={i} className="square" style={{
                    backgroundImage: `url(${photo})`,
                    backgroundSize: "cover",
                }} onClick={this.handleClickImage} />
            }
        })
        
    }
    inputUpload = (i) => {
        console.log('clicked')
        let file = `fileUpload${i}`
        let upload = this.refs[file]
        upload.click()
    }
    handleUpload = (e,i) => {
        console.log('uploading',i)
        const {photos} = this.state
     
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            let src = URL.createObjectURL(img);
            if (i !== 5 && i) {
                photos.splice(i,1,src)
                this.setState({
                    photos: photos
                })
            }
            this.setState({
                img:src
            })       
        }
    }
    onDrop = (picture) => {
        this.setState({
            photos: this.state.photos.concat(picture),
            img: picture
        });
    }
    handleClickImage = (e) => {
        const { photos } = this.state
        let id = e.target.id
        this.setState({
            img: photos[id]
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
    handleMouseEnter = (i) => {
        console.log(i)
        this.setState(prevState => ({
            isShown: !prevState.isShown,
            index: i 
        }))
    }
    colorDivs = () => {
        const { clickRgba,isShown, index} = this.state
        let num = 7
        let divs = []
        for (let i = 0; i < num; i++) {
            divs.push(
                <div className ="flex">
                <div style={{
                    backgroundColor: clickRgba[i] ? clickRgba[i] : "white",
                }}  onMouseLeave = {() => this.handleMouseEnter(i)}onMouseEnter ={() => this.handleMouseEnter(i)} className="square" onClick={this.handleColor} key={i}></div>
                    <div style ={{color: clickRgba[i], padding:3, backgroundColor: this.isLight(clickRgba[i])}} className ={`${isShown && index === i}Show`}> { clickRgba[i] ? this.rgb2hex(clickRgba[i]) : <>#ffffff<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></>}</div>
                  </div>
            )
        }
        return divs
    }
    isLight = (color) => {
        if (color) {
        let colorArr = color.slice(5,-4).split(',')
        // check if all colors are > 150 
        colorArr = colorArr.filter((x) => x >= 150)
        return colorArr.length >=2 ? "#4d4d4d" : "#fefefe"
        }
    }
     rgb2hex = (rgb) => {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
         ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
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
    pixelImgs = () => {
        let pixelImgs = ['https://media.discordapp.net/attachments/701277128951595032/760057518931181568/pixel-art_1.png', 'https://media.discordapp.net/attachments/701277128951595032/760395150382989342/pixel-art_9.png', 'https://media.discordapp.net/attachments/701277128951595032/760060999855636520/pixel-art_3.png','https://media.discordapp.net/attachments/701277128951595032/760060989982113832/pixel-art_2.png']
        return pixelImgs.map((img) => {
            return (
                <div className="smallImgDiv" style={{ backgroundImage: `url(${img})` }}></div>
            )
        })
    }
    render() {
        let buttons = [
            <button className={this.state.sqSize === "smSq" ? 'active' : ''} onClick={this.handleSmall}><FontAwesomeIcon icon={faTh} /></button>,
            <button className={this.state.sqSize === "medSq" ? 'active' : ''} onClick={this.handleMedium}><FontAwesomeIcon icon={faThLarge} /></button>,
            <button className={this.state.sqSize === "lgSq" ? 'active' : ''} onClick={this.handleLarge}><FontAwesomeIcon icon={faSquare} /></button>
        ]
        let downloadButtons  =[
            <button onClick={this.handleEraser}><FontAwesomeIcon icon={faEraser} /></button>,
            <button onClick={this.download}><FontAwesomeIcon icon = {faDownload}/></button>,
            <button onClick={this.removeLines}>{this.state.removeLines ? "No Borders" : "Add Borders"}</button>
        ]
        return (
            <div className="day7" >
                 <div className="block">
                <div className="flex" style={{ justifyContent: "space-around" }}>
               
                    <div className='flex'>
                        {this.pixelImgs()}
                    </div>

                    <h1>Create your own pixel art</h1>

                    <div className='flex' style ={{flexDirection: 'row-reverse'}}>
                        {this.pixelImgs()}
                    </div>
                </div>
           
                    <div className="twoGrid">
                        <h4>Click anywhere on the image to extract colors to create pixel art!</h4>
                        <h4><span>&nbsp;</span>Use your extracted colors or click anywhere on the image for colors to create pixel art</h4>
                    </div>
                    <br></br>
                    <div className="twoGrid">
                        <div className="twoGrid">
                            <div className="twoGrid">
                                <div>
                                    <div style={this.canvasDiv}>
                                        <canvas style={this.canvasStyle} ref="canvas" />
                                    </div>
                                    <div className="flex">
                                        {this.images()}
                                    </div>
                                </div>
                                <div>
                                    <div className="square" style={{ border: "1px solid #ddd", backgroundColor: this.state.rgba, width: 50, height: 50 }} onClick={this.handleColor}></div>
                                    {this.colorDivs()}
                                </div>
                            </div>
                            <div className="twoGrid">
                                <div>
                                    <div ref="grid" className="grid" style={{ gridTemplateColumns: `repeat(${this.state.columns}, 1fr)`, }}>
                                        {this.grids()}
                                    </div>
                                    <br></br>
                                    <div>
                                    {buttons}
                                    {downloadButtons}
                                </div>
                                </div>
                                
                                <br></br>
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
