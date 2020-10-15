import React from "react"
import {Fade,Slide,Rotate} from 'react-reveal';
export default class Day14 extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false,
            div2: false
        }
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }
    handleScroll = (e) => {
        let y = window.scrollY
        console.log(y)
        if (y > 800 && y < 1500) {
            this.setState({ show: true,div2:false})
        }
        else if (y > 1500) {
            this.setState({div2:true,show:false})
        }
        else if (y<700){
            this.setState({ show: false,div2:false })
        }
    }
    bigDiv = (color) => {
        return {
            height: '100vh',
            backgroundColor: color
        }
    }
    render() {
        const { show,div2 } = this.state
        console.log(div2)
        return (
            <div className ="bigger">
                <Fade>
                <div className="center" style={this.bigDiv("palevioletred")}>{!show && <Fade>
                    <div className="card">This is a big div</div>
                </Fade>}
                </div>
                </Fade>
                <Fade>
                <div className={`${show}Show center`} style={this.bigDiv("palegoldenrod")}>
             
                        {show && <Slide right cascade>
                            <div className="flexDirection width">
                            <div className="card">This is another big div</div>
                            <div className="card">This is another big div</div>
                            <div className="card">This is another big div</div>
                            </div>
                        </Slide>}
                
                </div>
                </Fade>
                <Fade>
                <div className={`${div2}Show center`} style={this.bigDiv("lightblue")}>
                {div2 && <Rotate top left>
                    <div className="card">This is another big div</div>
                    </Rotate>}
                </div>
                </Fade>
            </div>
        )
    }
}