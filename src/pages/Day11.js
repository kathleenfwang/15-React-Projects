import React from "react"
import Unsplash, { toJson } from 'unsplash-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrashAlt, } from '@fortawesome/free-regular-svg-icons'
import { faDownload, faTimes, faAngleDoubleRight, faAngleDoubleLeft,faSearch, faHeart as faFilledHeart } from '@fortawesome/free-solid-svg-icons'
import FlipMove from 'react-flip-move';

export default class Day11 extends React.Component {

    constructor() {
        super()
        this.state = {
            imageData: null,
            isShown: false,
            index: null,
            amount: 30,
            value: '',
            loaded: false,
            data: null,
            bigImage: null,
            active: [],
            activeList: 0
        }
        this.bigDiv = {
            borderRadius: 8,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgb(0,0,0,.5)',
            position: "fixed", top: 0,
            boxShadow: '2px 4px 25px rgba(0, 0, 0, .5)'
        }
        this.middleDiv = {
            fontSize: '1.2em',
            position: "relative",
            backgroundColor: "#f2f3f4",
            padding: 30,
            borderRadius: 5,
            width: '70%',
            height: '90%',
        }
        this.key = process.env.REACT_APP_ACCESS_KEY
        this.unsplash = new Unsplash({ accessKey: this.key });
    }
    componentDidMount() {
        this.callImages()
    }
    callImages = () => {
        const defaultSearch = "cats"
        const start = 1, imgAmount = 30
        let { value } = this.state
        if (!value) value = defaultSearch
        this.unsplash.search.photos(value, start, imgAmount)
            // only getting 30 images because search data will return undefined if there is less than 30 images available
            .then(toJson)
            .then(json => {
                if (json) {
                    let data = json.results
                    this.setState({
                        loaded: true,
                        data: data
                    })
                }
                else { console.log('error') }
            })
            .catch((e) => console.log(e))
    }
    toggleHeartImage = (data, show, size, right, top, icon) => {
        const { active } = this.state
        return <FontAwesomeIcon
            className={`cursor`}
            onClick={show ? () => this.handleLike(data) : () => this.handleTrash(data)}
            id="outerHeart"
            style={{
                fontSize: size,
                color: show ? "#ff6666" : "lightgrey",
                position: "absolute",
                right: right, top: top
            }}
            icon={show ? active.includes(data) ? faFilledHeart : faHeart : icon} />
    }
    getImages = (data, show) => {
        let images = []
        for (let i = 0; i < data.length; i++) {
            images.push(
                <div style={{ position: "relative", }}>
                    {this.toggleHeartImage(data[i], show, '1.2em', 10, 10, faTimes)}
                    <img style={{ boxShadow: '2px 4px 25px rgba(0, 0, 0, .1)' }} className="cursor borderRadius" onClick={() => this.handleImgClick(i, data[i])} title={data[i]['alt_description']} src={data[i].urls.small} />
                </div>)
        }
        return images
    }
    handleClear = () => {
        this.setState({
            value: ""
        })
    }
    handleTrash = (info) => {
        const { active } = this.state
        let filtered = active.filter((x) => x !== info)
        this.setState((prevState) => ({
            active: [...filtered]
        }))
    }
    handleLike = (info) => {
        this.setState((prevState) => ({
            active: [...prevState.active, info]
        }))
    }
    handleImgClick = (i, stuff) => {
        this.setState(prevState => ({
            imageData: stuff,
            index: i,
            isShown: !prevState.isShown
        }))
    }
    handleClose = () => {
        this.setState(prevState => ({
            isShown: !prevState.isShown
        }))
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
    handleToggle = (i) => {
        this.setState({
            activeList: i
        })
    }
    pageItems = () => {
        // toggle between the "All" and "Likes" tab
        const { activeList, active, data } = this.state
        switch (activeList) {
            case 0:
                return this.getImages(data, true)
            case 1:
                return (
                    active.length > 0 ? <FlipMove>{this.getImages(active, false)}</FlipMove> :
                        <div className="flex center">
                            <img src="https://thumbs.gfycat.com/GlossyImpishFrilledlizard-small.gif"></img>
                        </div>)
        }
    }
    getNavList = () => {
        let list = ['All', <FontAwesomeIcon icon={faFilledHeart} />]
        const { activeList } = this.state
        return list.map((x, i) => {
            return (
                <li i={i} className="navList" style={{ fontSize: '1.3em', padding: 10, borderBottom: activeList == i ? "2px solid #E0C3FC" : "2px solid transparent", boxShadow: activeList == i ? ' 2px 4px 25px rgba(0, 0, 0, .1)' : 'none' }} onClick={() => this.handleToggle(i)} >{x}</li>)
        })
    }
    getHeader = () => {
        const { amount,value} = this.state
        return (
            <>
                <h1>Make your own image collage of anything:</h1>
                <form className ="flex center" onSubmit={this.handleSubmit}>
                    <input className ="lightDark" onChange={this.handleChange} value={value} placeholder="Cats.."></input> {<FontAwesomeIcon className ={`cursor ${value !== "" ? 'trueShow' : 'falseShow'}`}style ={{color:"#777",backgroundColor: "whitesmoke",marginLeft : -40,borderRadius:5,height:41}} onClick={this.handleClear} icon={faTimes} />}
                    <button><FontAwesomeIcon icon={faSearch} /></button>
                </form>
            </>
        )
    }
    handleNextImage = (imageData, activeList, direction) => {
        const { data, active } = this.state
        const currentIndexAll = data.indexOf(imageData)
        const currentIndexLikes = active.indexOf(imageData)
        const directionCount = direction === "right" ? 1 : -1
        if (activeList === 0) {
            this.setState({
                imageData: this.state.data[currentIndexAll + directionCount]
            })
        }
        else {
            this.setState({
                imageData: this.state.active[currentIndexLikes + directionCount]
            })
        }

    }
    showPopOut = () => {
        const { isShown, imageData, activeList } = this.state
        let heart = activeList === 0
        return (<div className={`${isShown}Show flex center`} style={this.bigDiv}>
            <div style={this.middleDiv}>
                <div>
                    <div className="flex padding" style={{ justifyContent: "space-between", }}>
                        <div className="flex">
                            <img style={{ borderRadius: 5, boxShadow: '2px 4px 25px rgba(0, 0, 0, .2)' }} src={imageData.user.profile_image.small} />
                            <div className="lineHeight">
                                <p className="left" style={{ color: "#333" }}>{`${imageData.user.name}`}</p>
                                <p className="left"><a href={`https://unsplash.com/@${imageData.user.username}`} target="_blank">{`@${imageData.user.username}`}</a></p>
                            </div>
                            <FontAwesomeIcon className="arrow cursor bigger lightDark rightarrow" icon={faAngleDoubleRight} onClick={() => this.handleNextImage(imageData, activeList, 'right')} />
                            <FontAwesomeIcon className="arrow cursor bigger lightDark leftarrow" icon={faAngleDoubleLeft} onClick={() => this.handleNextImage(imageData, activeList, 'left')} />
                        </div>

                    </div>
                    {this.toggleHeartImage(imageData, heart, '1.5em', 60, 50, faTrashAlt)}
                </div>
                <FontAwesomeIcon icon={faTimes} className ="cursor bigger lightDark"
                    style={{ position: "absolute", top: 10, right: 10 }} onClick={this.handleClose} />
                <div className="flex"></div>
                <img
                    style={{ borderRadius: 5, objectFit: "contain", width: '100%', height: '90%', overflow: "auto" }} src={imageData.urls.regular} />
            </div>
        </div>)
    }
    getFooter = () => {
        return (<p className="caption">Images provided by <a href="https://unsplash.com/developers" target="_blank">Unsplash API</a></p>)
    }
    render() {
        const { loaded, imageData, active } = this.state
        return (
            <div style={{ position: "relative" }}>
                <div className="flex center">
                    {this.getHeader()}
                    <nav style={{ justifyContent: "center" }}>
                        {this.getNavList()}
                    </nav>
                    <div className="photos down">
                        {loaded ? this.pageItems() : null}
                    </div>
                </div>
                <br></br>
                {imageData ? this.showPopOut() : null}
                {this.getFooter()}
            </div>
        )
    }
}