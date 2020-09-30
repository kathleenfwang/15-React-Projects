import React from "react"
import axios from "axios"
import { faEthereum } from "@fortawesome/free-brands-svg-icons"
export default class Day8 extends React.Component {
    constructor() {
        super()
        this.state = {
            date: "",
            text: "",
            wordCount: 0,
            score: 0.5
        }
        this.url = process.env.REACT_APP_SENTIMENT_URL
        this.key =  process.env.REACT_APP_AZURE_KEY
 
    }
    componentDidMount() {
        this.getDate()
    }
    sentimentAnalyzer =() => {
   
        let data = {
            documents: [
                {
                    language: "en", 
                    id: 1, 
                    text:  this.state.text
                },
            ]
        } 
        axios({
            method: 'post',     //put
            url: this.url,
            headers: {'Ocp-Apim-Subscription-Key': this.key}, 
            data: data
          }).then((res) => {
              let score = (res.data.documents[0].score.toFixed(5))
              this.setState({score: score})
          })
          .catch((e) => console.log(e))
    }
    getDate = () => {
        let d = new Date();
        let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let fullDate = `${days[d.getDay()]},${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` 
      this.setState({date:fullDate})
    }
    handleChange = (e) => {
   
        this.setState({
            text: e.target.value
        })
        let wordCount= this.state.text.split(" ").length
        let listener = wordCount 
        // every 20 words, will give sentiment? 
        this.setState({
            wordCount: wordCount
        })
        if (listener%20 == 0) {
            this.sentimentAnalyzer()
        }
        
    }
    render() {
        const {date,text,wordCount,score} = this.state
        return(
            <div className = "day8">
                <h1>{date}</h1>
                <textarea value = {text} onChange ={this.handleChange} autoFocus/>
                <p>Word count: {wordCount}</p>
   
  <input type="range" min="0" max="1" step ="0.01" defaultValue ="0.5" value={score} className="slider" id="myRange"/> {score} 
 
            </div>
        )
    }
}