import React from "react"
import pixelart1 from "./Components1/day7/pixelart1.gif"
import pixelart2 from "./Components1/day7/pixelart2.gif"
import pixelart3 from "./Components1/day7/pixelart3.gif"
import domtoimage from 'dom-to-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faThLarge, faPlus, faSquare, faEraser, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import Fade from "react-reveal"
import { saveAs } from 'file-saver';

export default class Day7 extends React.Component {
    constructor() {
        super()
        this.state = {
            img: pixelart1,
            photos: [pixelart1, pixelart2, pixelart3],
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
    images = () => {
        let { photos } = this.state
        while (photos.length < 6) photos.push("")

        return photos.map((photo, i) => {
            if (photo === "") {
                return <div id={i} className="square alignInMiddle" onClick={() => this.inputUpload(i)}>
                    <input ref={`fileUpload${i}`} style={{ display: "none" }} type="file" name="imgUpload" id="file" className="inputfile" onChange={(e) => this.handleUpload(e, i)}
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
        let file = `fileUpload${i}`
        let upload = this.refs[file]
        upload.click()
    }
    handleUpload = (e, i) => {
        const { photos } = this.state
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            let src = URL.createObjectURL(img);
            if (i !== 5 && i) {
                photos.splice(i, 1, src)
                this.setState({ photos: photos })
            }
            this.setState({ img: src })
        }
    }
    onDrop = (picture) => {
        this.setState({
            photos: this.state.photos.concat(picture),
            img: picture });
    }
    handleClickImage = (e) => {
        const { photos } = this.state
        let id = e.target.id
        this.setState({ img: photos[id] })
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
        this.setState({ rgba: rgba });
    }
    componentDidUpdate(prevprops, prevState) {
        if (prevState.img !== this.state.img) this.loadImg()
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let input = this.refs.urlinput.value
        let img = new Image()
        img.src = input
        img.onload = () => {
            if (img.width) {
                this.setState({
                    img: input })}}
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
        this.setState(prevState => ({
            isShown: !prevState.isShown,
            index: i
        }))
    }
    colorDivs = () => {
        const { clickRgba, isShown, index } = this.state
        let num = 8
        let divs = []
        for (let i = 0; i < num; i++) {
            divs.push(
                <div className="flex">
                    <div style={{
                        backgroundColor: clickRgba[i] ? clickRgba[i] : "white",
                    }} onMouseLeave={() => this.handleMouseEnter(i)} onMouseEnter={() => this.handleMouseEnter(i)} className="square" onClick={this.handleColor} key={i}></div>
                    <div style={{ color: clickRgba[i], borderRadius: 4, padding: 3, backgroundColor: this.isLight(clickRgba[i]) }} className={`${isShown && index === i}Show`}> {clickRgba[i] ? this.rgb2hex(clickRgba[i]) : <>empty<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></>}</div>
                </div>
            )
        }
        return divs
    }
    isLight = (color) => {
        if (color) {
            let colorArr = color.slice(5, -4).split(',')
            // check if all colors are > 150 
            colorArr = colorArr.filter((x) => x >= 150)
            return colorArr.length >= 2 ? "#404040" : "#fefefe"
        }
    }
    rgb2hex = (rgb) => {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
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
            // setting eraser state - this will affect the hanleGridClick() function 
            eraser: !prevState.eraser
        }))
    }
    download = () => {
        // first have to make sure lines are removed
        const prevLineState = this.state.removeLines
        this.setState({ removeLines: false })
        // convert grid to image and save as pixelart.png
        domtoimage.toBlob(this.refs.grid)
            .then(blob => {
                window.saveAs(blob, 'pixelart.png');
                // set lines back if it was originally there 
                this.setState({ removeLines: prevLineState })
            });
    }
    removeLines = () => {
        this.setState(prevState => ({ removeLines: !prevState.removeLines }))
    }
    handleSmall = (e) => {
        this.setState({
            sqSize: "smSq",
            columns: 40 })
    }
    handleMedium = (e) => {
        this.setState({
            sqSize: "medSq",
            columns: 20 })
    }
    handleLarge = (e) => {
        this.setState({
            sqSize: "lgSq",
            columns: 10 })
    }
    pixelImgs = () => {
        let pixelImgs = ['https://media.discordapp.net/attachments/701277128951595032/760395150382989342/pixel-art_9.png', 'https://media.discordapp.net/attachments/701277128951595032/760060989982113832/pixel-art_2.png']
        return pixelImgs.map((img) => {
            return (
                <div className="smallImgDiv" style={{ backgroundImage: `url(${img})` }}></div>)
        })
    }
    handleDelete = () => {
        const { clickRgba } = this.state
        let clickRgbaNew = [...clickRgba]
        clickRgbaNew.pop()
        console.log(clickRgbaNew)
        this.setState({ clickRgba: clickRgbaNew })
    }
    getHeader = () => {
        return <> <div className="flex" style={{ justifyContent: "space-around" }}>
            <div className='flex'>
                {this.pixelImgs()}
            </div>
            <h1>Create your own pixel art</h1>
            <div className='flex' style={{ flexDirection: 'row-reverse' }}>
                {this.pixelImgs()}
            </div>
        </div>
            <div className="twoGrid">
                <h4>Click anywhere on the image to extract colors to create pixel art!</h4>
                <h4><span>&nbsp;</span>Use your extracted colors or click anywhere on the image for colors to create pixel art</h4>
            </div> </>
    }
    getEmptySquares = () => {
        const { clickRgba } = this.state
        return (
            <>
                <div className="square" style={{ backgroundColor: this.state.rgba, }} onClick={this.handleColor}></div>
                {this.colorDivs()}
                <button style={{ marginTop: 5, backgroundColor: clickRgba.length ? "whitesmoke" : "lightgrey" }} onClick={this.handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
            </>)
    }
    render() {
        let buttons = [
            <button className={this.state.sqSize === "smSq" ? 'active' : ''} onClick={this.handleSmall}><FontAwesomeIcon icon={faTh} /></button>,
            <button className={this.state.sqSize === "medSq" ? 'active' : ''} onClick={this.handleMedium}><FontAwesomeIcon icon={faThLarge} /></button>,
            <button className={this.state.sqSize === "lgSq" ? 'active' : ''} onClick={this.handleLarge}><FontAwesomeIcon icon={faSquare} /></button>
        ]
        let downloadButtons = [
            <button onClick={this.handleEraser}><FontAwesomeIcon icon={faEraser} /></button>,
            <button onClick={this.download}><FontAwesomeIcon icon={faDownload} /></button>,
            <button onClick={this.removeLines}>{this.state.removeLines ? "No Borders" : "Add Borders"}</button>,
        ]
        return (
            <div className="day7" >
                <Fade clear>
                    <div className="block">
                        {this.getHeader()}
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
                                        {this.getEmptySquares()}
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
                </Fade>
            </div>
        )
    }
}
// future additions:
// save to database displayed on side 
// share to twitter
