import React from "react"
import Fade from 'react-reveal/Fade';
export default class Day11 extends React.Component {
    constructor() {
        super() 
        this.state = {
            text:false
        }
    }

  componentDidMount() {
   this.startCount()
  }
  startCount = () => {
    setInterval(() => {
         this.setState({
             text:true
         }) }, 
    1000);
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
        return <h2>Your life isn't a film, don't end it</h2>
        case 5: 
        return (<div><h2>National Suicide Prevention Lifeline</h2>
            <p style ={{fontSize:'1.2em', fontFamily:'Arial'}}>Available 24 hours. Languages: English, Spanish. Learn more
            800-273-8255</p></div>)
      }
   
  }
 
    render() {
        return(
            <div className ="day11 flex center">
            <div style ={{textAlign:"center", fontFamily: "Times New Roman", alignItems: "center"}}>
            <Fade top cascade>
           <h2>{this.state.text && this.renderText(1)}</h2>
           
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