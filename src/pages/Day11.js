import React from "react"
import sf from "./Components1/sf.jpg"
import Unsplash, { toJson } from 'unsplash-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faDownload, faTimes, faSearch, faHeart as faFilledHeart } from '@fortawesome/free-solid-svg-icons'

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
            bigImage: null,
            active: [],
            activeList: 0
        }
        this.bigDiv = {
            borderRadius: 4,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgb(0,0,0,.5)',
            position: "fixed", top: 0
        }
        this.middleDiv = {
            fontSize: '1.2em',
            position: "relative",
            backgroundColor: "whitesmoke",
            padding: 30,
            borderRadius: 5,
            width: '70%',
            height: '90%',
        }
    }
    componentDidMount() {
        this.callImages(30, true)
    }
    callImages = () => {
        let { value } = this.state
        if (!value) value = "cats"
        unsplash.search.photos(value, 1, 30,)
            .then(toJson)
            .then(json => {
                if (json.results.length > 29) {
                    let data = json.results
                    this.setState({
                        loaded: true,
                        data: data})
                }
                else {console.log('error')}
            })
    }
    getImages = (data, show) => {
        let firstHalf = []
        const { active,activeList } = this.state
        for (let i = 0; i < data.length; i++) {
            firstHalf.push(
                <div style={{ position: "relative" }}>
                    <FontAwesomeIcon
                        className ={`${show}Show cursor`}
                        onClick={show ? () => this.handleLike(data[i]) : () => this.handleTrash(data[i])}
                        id="outerHeart"
                        style={{
                            color: show ? "#ff6666" : "lightgrey",
                            position: "absolute", right: 10, top: 10
                        }}
                        icon={show ? active.includes(data[i]) ? faFilledHeart : faHeart : faTimes} />
                    <img className="cursor borderRadius" onClick={() => this.handleClick(i, data[i])} title={data[i]['alt_description']} src={data[i].urls.small} />
                </div>)
        }
        return firstHalf
    }
    handleTrash = (info) => {
        const { active } = this.state
        let filtered = active.filter((x) => x !== info)
        this.setState((prevState) => ({
            active: [...filtered] }))
    }
    handleLike = (info) => {
        this.setState((prevState) => ({
            active: [...prevState.active, info]}))
    }
    handleClick = (i, stuff) => {
        console.log(stuff)
        this.setState(prevState => ({
            imageData: stuff,
            bigImage: stuff.urls.regular,
            index: i,
            isShown: !prevState.isShown}))
    }
    handleClose = () => {
        this.setState(prevState => ({
            isShown: !prevState.isShown}))
    }
    handleDownload = () => {
        console.log('click')
        let data = this.state.imageData
        let url = data.urls.regular
        var element = document.createElement("a");
        var file = new Blob([url],
            { type: "image/*" }
        );
        element.href = URL.createObjectURL(file);
        element.download = "image.jpg";
        element.click();
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
                img: src})
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
            value: e.target.value})
    }
    handleToggle = (i) => {
        this.setState({
            activeList: i})
    }
    items = () => {
        const { activeList, active, data } = this.state
        switch (activeList) {
            case 0:
                return this.getImages(data, true)
            case 1:
                return (
                    active.length > 0 ? this.getImages(active, false) :
                        <div className="flex center">
                            <img src="https://thumbs.gfycat.com/GlossyImpishFrilledlizard-small.gif"></img>
                        </div>)
        }
    }
    getList = () => {
        let list = ['All', <FontAwesomeIcon icon = {faFilledHeart}/>]
        const { activeList } = this.state
        return list.map((x, i) => {
            return (
                <li i={i} className="navList" style={{ fontSize: '1.3em', backgroundColor: activeList == i ? "#F0F0F0": "white", padding:10,borderBottom: activeList == i ? "2px solid #E0C3FC" : "2px solid transparent" }} onClick={() => this.handleToggle(i)} >{x}</li>)
        })
    }
    getHeader = () => {
        const { amount } = this.state
        return (
            <>
                <h1>Make your own image collage of anything:</h1>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.value} placeholder="'Cats','Japan'.."></input>
                    <button><FontAwesomeIcon icon={faSearch} /></button>
                </form>
            </>
        )
    }
    showPopOut = () => {
        const { bigImage, isShown, imageData, active,activeList } = this.state
        let heart = activeList === 0 
        return (<div className={`${isShown}Show flex center`} style={this.bigDiv}>
            <div style={this.middleDiv}>
                <div>
                    <div className="flex padding" style={{ justifyContent: "space-between" }}>
                        <div className="flex">
                            <img src={imageData.user.profile_image.small} />
                            <div className="lineHeight">
                                <p className="left">{`${imageData.user.name}`}</p>
                                <p className="left"><a href={`https://unsplash.com/@${imageData.user.username}`} target="_blank">{`@${imageData.user.username}`}</a></p>
                            </div>
                        </div>
                        <FontAwesomeIcon
                            className={`${true}Show icon`}
                            onClick={heart ? () => this.handleLike(imageData) : () => this.handleTrash(imageData)}
                            id="outerHeart"
                            className={`${isShown}Show cursor`}
                            style={{
                                fontSize: '1.5em',
                                color: heart ? "#ff6666" : "lightgrey",
                            }}
                            icon={heart ? active.includes(imageData) ? faFilledHeart : faHeart : faTrashAlt} />
                    </div>
                </div>
                <FontAwesomeIcon
                    icon={faTimes}
                    style={{ cursor: "pointer", color: "#555", fontSize: "2em", position: "absolute", top: 5, right: 5 }}
                    onClick={this.handleClose}/>
                <img
                    style={{ borderRadius: 5, objectFit: "contain", width: '100%', height: '90%', overflow: "auto" }} src={bigImage} />
            </div>
        </div>)
    }

    render() {
        const { loaded, imageData, active } = this.state
        console.log(active)
        return (
            <div style={{ position: "relative" }}>
                <div className="flex center">
                    {this.getHeader()}
                    <nav>
                        {this.getList()}
                    </nav>
                    <div className="photos down">
                        {loaded ? this.items() : null}
                    </div>
                </div>
                <br></br>
                {imageData ? this.showPopOut() : null}
                <p className="caption">Images provided by <a href="https://unsplash.com/developers" target="_blank">Unsplash API</a></p>
            </div>
        )
    }
}