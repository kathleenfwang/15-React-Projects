import React from "react"
import Fade from 'react-reveal/Fade';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import {TwitterIcon, TwitterShareButton} from "react-share"
export default class Day11 extends React.Component {
    constructor() {
        super() 
        this.state = {
            text:false
        }
        this.items =  [
            {id: 1, text: "Your skin isn't paper, don't cut it"},
            {id: 2, text: "Your face isn't a mask, don't hide it"},
            {id: 3, text: "Your size isn't a book, don't judge it"},
            {id: 4, text: "Your life isn't a film, don't end it"},
            {id: 5, text:"National Suicide Prevention Lifeline"},
            {id: 6, text:"Available 24 hours. Languages: English, Spanish. Learn more 800-273-8255"}
          ]
          this.image = "https://img.freepik.com/free-photo/background-crumpled-paper-sheet_1194-7545.jpg?size=626&ext=jpg"
    }

  componentDidMount() {
   this.startCount()
   let canvas = this.refs.canvas 

  }
  startCount = () => {
    setInterval(() => {
         this.setState({
             text:true
         }) }, 
    500);
    // setTimeout(() => {
    //     this.setState({
    //       text: true,
    //     })
    //   }, 1000);
    //   this.setState({
    //       text:false
    //   })
    //   setTimeout(() => {
    //     this.setState({
    //       text: true,
    //     })
    //   }, 2000);
  }

  renderText = (num) => {
      switch(num){
        case 1: 
        return <h2>Your skin isn't paper, don't cut it</h2>
        case 2:
        return <h2>Your face isn't a mask, don't hide it</h2>
        case 3: 
        return <h2>Your size isn't a book, don't judge it</h2>
        case 4: 
        return <h2>Your life isn't a film, don't end it.</h2>
        case 5: 
        return (<div><h2>National Suicide Prevention Lifeline</h2>
            <p style ={{fontSize:'1.2em',}}>Available 24 hours. Languages: English, Spanish. Learn more
            800-273-8255</p>
            <p style ={{fontSize:'1.2em',}}>Please share this link with someone you may know.</p>
            <TwitterShareButton
        url= {`National Suicide Prevention Lifeline - Available 24 hours. Languages: English, Spanish. Learn more 800-273-8255 http://kathleenwang180projects.surge.sh/day/11`}>
        <TwitterIcon
          size={32}
          round />
      </TwitterShareButton>
            </div>)
      }
   
  }
 
    render() {
        return(
            <div className ="day3 flex center">
 
            <div style ={{textAlign:"center", fontFamily: "Times New Roman", alignItems: "center"}}>
            <Fade top cascade>
           <h2 >{this.state.text && this.renderText(1)}</h2>
           
            </Fade>
            <Fade right cascade>
            <h2>{this.state.text && this.renderText(2)}</h2>
            </Fade>
            <Fade clear cascade>
            <h2>{this.state.text && this.renderText(3)}</h2>
            </Fade>
            <Fade clear left cascade>
            <h2>{this.state.text && this.renderText(4)}</h2>
            </Fade>
            <Fade clear bottom cascade>
            {this.state.text && this.renderText(5)}
            </Fade>
    
 
            </div>
            </div>
        )
    }
}