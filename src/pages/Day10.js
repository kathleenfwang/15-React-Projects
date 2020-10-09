import React from "react"
import sf from "./Components1/sf.jpg"
import Unsplash, { toJson } from 'unsplash-js';
 
const APP_ACCESS_KEY = 'kHTYj3FV6pkquHtwCsHJQdBU2lqx6WY2z-FZm7iXukQ'
const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });
 
export default class Day10 extends React.Component {

    constructor() {
        super()
        this.state = {
            value: 'san francisco',
            img: sf,
            loaded:false,
            data:null,
        }
 
    }
    componentDidMount() {
        this.callImages()
    }
    componentDidUpdate(prevprops,prevState) {

    }
    callImages = () => {
        const {value} = this.state
        unsplash.search.photos(value, 1, 20,)
        .then(toJson)
        .then(json => {
          // Your code
          console.log(json)
          let data = json.results 
          this.setState({
              loaded: true, 
              data: data
          })
        });
    }
    getImages = (data) => {
        let firstHalf = [] 
        for (let i =0;i<20;i++) {
            firstHalf.push( <img src ={data[i].urls.small}/>)
        }
        return firstHalf 
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
    handleSubmit = (e) =>{
        e.preventDefault()
        this.callImages()
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        const {loaded,data} = this.state
        return(
            <div className ="flex center">
                <h1>Make your own image collage of anything:</h1>
                <form onSubmit ={this.handleSubmit}>
               <input onChange = {this.handleChange} value = {this.state.value} placeholder ="'Dogs','Brugge'.."></input>
               <button>Submit</button>
               </form>
            <div className ="photos">
                {loaded ? this.getImages(data) : null }
            </div>
            </div>
        )
    }
}