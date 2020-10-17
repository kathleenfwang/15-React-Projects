import React from "react"
import { colors } from "./Components1/day10/data"
import Fade from 'react-reveal/Fade';
export default class Day10 extends React.Component {
    constructor() {
        super()
        this.state = {
            num: 4,
            currentColor: "white"
        }
        this.colorFont = { color: "#5FD7C3", textAlign: "center", fontWeight: "bold" }

        this.bigDiv = {
            width: 600,
            height: 400,
            border: '1px solid gainsboro',
            borderRadius: 5,
            boxShadow: '2px 4px 25px rgba(0, 0, 0, .2)'
        }

    }
    getRectangles = (num) => {
        let divs = []
        for (let i = 0; i < num; i++) {
            divs.push(<div onClick={this.setColor} refs={`div${i}`} style={{
                height: 400 / (this.state.num), width: 600,
                borderBottom: '1px solid gainsboro', backgroundColor: "white"
            }}></div>)
        }
        return divs
    }
    getRainbowSquares = () => {
        return colors.map((color) => {
            let squares = []
            for (let key in color) {
                var name = key
                squares = color[key].map((x) => {
                    return (<div onClick={this.chooseColor} className="square" style={{ backgroundColor: x, margin: 3 }} />)
                })
            }
            return (
                <div style={{ marginLeft: 20 }}>
                    <p style={{ color: "#5F73D7" }}>{name[0].toUpperCase() + name.slice(1)}</p>
                    <div className="flex">
                        {squares}
                    </div>
                </div>)
        })
    }
    chooseColor = (e) => {
        let color = e.target.style.backgroundColor
        this.setState({
            currentColor: color
        })
    }
    setColor = (e) => {
        const { currentColor } = this.state
        console.log(currentColor)
        e.target.style.backgroundColor = currentColor
    }
    addLines = (lines) => {
        this.setState(prevState => ({
            num: prevState.num + lines
        }))
    }
    getRectangleOutline = () => {
        return (
            <div style={this.bigDiv}>
                {this.getRectangles(this.state.num)}
                <br></br>
                <div className="flex center">
                    <button onClick={() => { this.addLines(1) }}>Add Lines</button>
                    <button onClick={() => { this.addLines(-1) }}>Subtract Lines</button>
                </div>
            </div>
        )
    }
    getSquaresSection = () => {
        return (
            <div>
                <div className="flex">
                    {this.getRainbowSquares()}
                </div>
                <br></br>
                <div>
                    <button><a href="https://www.pride.com/pride/2018/6/13/complete-guide-queer-pride-flags-0#media-gallery-media-1" target="_blank">Learn more about the pride flags</a></button>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="day11">

                <h2 style={{ marginBottom: -30, color: "white", textAlign: "center", fontStyle: "italic" }}>Pride month is celebrated every June to honor the 1969 Stonewall riots in Manhattan</h2>

                <div className="biggrid center">
                    <Fade clear cascade>
                        {this.getSquaresSection()}
                    </Fade>
                    <Fade up>
                        {this.getRectangleOutline()}
                    </Fade>
                    <div>
                    </div>
                </div>

            </div>
        )
    }
}