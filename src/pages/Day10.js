import React from "react"
import sf from "./Components1/sf.jpg"
import Unsplash, { toJson } from 'unsplash-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, } from '@fortawesome/free-solid-svg-icons'
const APP_ACCESS_KEY = 'kHTYj3FV6pkquHtwCsHJQdBU2lqx6WY2z-FZm7iXukQ'
const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

export default class Day10 extends React.Component {

    constructor() {
        super()
        this.state = {
            isShown: false,
            index: null,
            amount: 30,
            value: 'san francisco',
            img: sf,
            loaded: false,
            data: null,
            bigImage: null
        }
        this.bigDiv = { 
            borderRadius:4,
        width:'100vw',
        height:'100vh',
        padding:30,
        backgroundColor:'rgb(0,0,0,.5)',
        position:"fixed", top: 0}
    }
    componentDidMount() {
        this.callImages()
    }
    componentDidUpdate(prevprops, prevState) {

    }
    callImages = () => {
        const { value } = this.state
        unsplash.search.photos(value, 1, 30,)
            .then(toJson)
            .then(json => {
                // Your code
                let data = json.results
                console.log(data)
                this.setState({
                    loaded: true,
                    data: data
                })
            });
    }
 
 
    getImages = (data) => {
        let firstHalf = []
        for (let i = 0; i < this.state.amount; i++) {
            firstHalf.push(
                <div>
                    <img onClick = {() => this.handleClick(i, data[i].urls.regular)}title={data[i]['alt_description']} src={data[i].urls.small} />
                </div>)
        }
        return firstHalf
    }
    handleClick = (i,url) => {
        this.setState(prevState => ({
            bigImage: url, 
            index: i,
            isShown: !prevState.isShown
            
        }))
    }
    handleDownload = (url) => {
        console.log('click')
        var element = document.createElement("a");
        var file = new Blob([url],
          { type: "image/*" }
        );
        element.href = URL.createObjectURL(file);
        element.download = "image.jpg";
        element.click();
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
        const { loaded, data, amount,bigImage, isShown } = this.state
        return (
            <div style ={{position:"relative"}}>
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
                <div className ={`${isShown}Show flex center`} style ={this.bigDiv}>
                    <img src = {bigImage}/>
                </div>
                <p className="caption">Images provided by <a href="https://unsplash.com/developers" target="_blank">Unsplash API</a></p>
            </div>
        )
    }
}