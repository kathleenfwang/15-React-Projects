import React from "react"
import sf from "./Components1/sf.jpg"
import Unsplash, { toJson } from 'unsplash-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faTimes } from '@fortawesome/free-solid-svg-icons'
// import {faTimes} from '@fortawesome/free-regular-svg-icons'
const APP_ACCESS_KEY = 'kHTYj3FV6pkquHtwCsHJQdBU2lqx6WY2z-FZm7iXukQ'
const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

export default class Day11 extends React.Component {

    constructor() {
        super()
        this.state = {
            imageData: null,
            isShown: false,
            index: null,
            amount: 30,
            value: '',
            img: sf,
            loaded: false,
            data: null,
            bigImage: null
        }
        this.bigDiv = {
            borderRadius: 4,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgb(0,0,0,.5)',
            position: "fixed", top: 0
        }
        this.middleDiv = {
            fontSize:'1.2em',
            position: "relative",
            backgroundColor: "whitesmoke",
            padding: 30,
            borderRadius: 5,
            width: '70%',
            height: '90%',

        }
    }

    componentDidMount() {
        this.callImages()
    }
    componentDidUpdate(prevprops, prevState) {

    }
    callImages = () => {
        let { value } = this.state
        if (!value) value = "dogs"
        unsplash.search.photos(value, 1, 30,)
            .then(toJson)
            .then(json => {
                // Your code
            
                if (json.results.length > 29) {
                let data = json.results
                this.setState({
                    loaded: true,
                    data: data
                })
            }
            else {
                console.log('error')
            }
            })
           

    }


    getImages = (data) => {
        let firstHalf = []
        for (let i = 0; i < this.state.amount; i++) {
            firstHalf.push(
                <div>
                    <img className ="cursor borderRadius" onClick={() => this.handleClick(i, data[i])} title={data[i]['alt_description']} src={data[i].urls.small} />
                </div>)
        }
        return firstHalf
    }
    handleClick = (i, stuff) => {
        console.log(stuff)
        this.setState(prevState => ({
            imageData: stuff,
            bigImage: stuff.urls.regular,
            index: i,
            isShown: !prevState.isShown

        }))
    }
    handleClose = () => {
        this.setState(prevState => ({

            isShown: !prevState.isShown

        }))
    }
    handleDownload = () => {
        console.log('click')
        let data = this.state.imageData
        let url = data.urls.regular
        // console.log(url)
        // var element = document.createElement("a");
        // var file = new Blob([url],
        //   { type: "image/*" }
        // );
        // element.href = URL.createObjectURL(file);
        // element.download = "image.jpg";
        // element.click();
        var img = new Image;
        var c = document.createElement("canvas");
        var ctx = c.getContext("2d");

        img.onload = () => {
            c.width = this.naturalWidth;     // update canvas size to match image
            c.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);       // draw in image

        };
        img.crossOrigin = "";              // if from different origin
        img.src = url;
    }

    handleUpload = (e) => {
        console.log('lcick')
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            let src = URL.createObjectURL(img);
            this.setState({
                img: src
            })
        }
    }
    inputUpload = () => {
        let upload = this.refs.upload
        upload.click()
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.callImages()
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    handleChangeAmount = () => {
        this.setState(prevState => ({
            amount: prevState.amount === 30 ? 15 : 30
        }))
    }
    render() {
        const { loaded, data, amount, bigImage, isShown, imageData } = this.state
        return (
            <div style={{ position: "relative" }}>
                <div className="flex center">
                    <h1>Make your own image collage of anything:</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleChange} value={this.state.value} placeholder="'Dogs','Brugge'.."></input>
                        <button>Submit</button>
                    </form>
                    <button onClick={this.handleChangeAmount}>Show {amount === 30 ? 'Less' : 'More'}</button>
                    <div className="photos down">
                        {loaded ? this.getImages(data) : null}
                    </div>
                </div>
                <br></br>
                {imageData ? <div className={`${isShown}Show flex center`} style={this.bigDiv}>

                    <div style={this.middleDiv}>
                        <div>
                            <div className="flex padding"style ={{justifyContent:"space-between"}}>
                            <div className ="flex">
                                <img src={imageData.user.profile_image.small} />
                                <div className ="lineHeight">
                                    <p className="left">{`${imageData.user.name}`}</p>
                                    <p className = "left"><a href={`https://unsplash.com/@${imageData.user.username}`} target="_blank">{`@${imageData.user.username}`}</a></p>
                                </div>
                            </div>
              
                            </div>
                
                        </div>
                        <FontAwesomeIcon icon={faTimes} style={{ cursor: "pointer", color: "#555", fontSize: "2em", position: "absolute", top: 5, right: 5 }} onClick={this.handleClose} />
                        <img style={{ borderRadius:5,objectFit: "contain", width: '100%', height: '90%', overflow:"auto" }} src={bigImage} />

                    </div>
                </div>
                    : null}
                <p className="caption">Images provided by <a href="https://unsplash.com/developers" target="_blank">Unsplash API</a></p>
            </div>
        )
    }
}