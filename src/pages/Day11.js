import React from "react"
export default class Day11 extends React.Component {
    constructor() {
        super()
        this.state = {
 
            num: 3,
            currentColor: "white"
        }
        this.colorFont = { color: "#5FD7C3", textAlign: "center", fontWeight: "bold" }
        this.grid = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: 'center',
            marginTop: 50,
        }
        this.bigDiv = {
            width: 600,
            height: 400,
            border: '2px solid whitesmoke',
            borderRadius: 4,
            boxShadow: '0 4px 7px 0 rgba(0,0,0,0.1)'
        }
        this.colors = [
            { rainbow: ["red", "orange", "yellow", "green", "blue", "purple"] },
            { lesbian: ["rgb(189,40,0)", "#D46923", "#E2894C", "white", "#BA5792", "#A14C80", "#A14C80"] },
            { genderQueer: ["rgb(144,100,174)", "white", "rgb(58,102,24)"] },
            { agender: ["rgb(58,102,24)", "rgb(147,147,147)", "white", "rgb(146,193,104)"] },
            { genderFluid: ["#E26991", "white", "#AA0FBF", "black", "#2B35A9"] },
            { asexual: ["black", "#919191", "white", "#720072"] },
            { nonbinary: ['rgb(199,193,39)', 'white', 'rgb(123,73,168)', 'black'] },
            { pansexual: ['#D11D7D', '#E0C005', '#1D9DE2'] },
            { bisexual: ['#BF0064', '#8B4586', '#002F97'] },
            { transexual: ['rgb(81,184,222)', '#DA98A4', 'white'] }
        ]
    }
 
    getDivs = (num) => {
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
        return this.colors.map((color) => {
            let squares = []
            for (let key in color) {
                var name = key
                squares = color[key].map((x) => {
                    return (<div onClick={this.chooseColor} className="square" style={{ backgroundColor: x }} />)
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
    render() {
        return (
            <div className="day11">
                <h2 style={{ color: "white", textAlign: "center", fontStyle: "italic" }}>Pride month is celebrated every June to honor the 1969 Stonewall riots in Manhattan</h2>
                <div style={this.grid} className="center">
                    <div>
                        <div className="flex">
                            {this.getRainbowSquares()}
                        </div>
                        <br></br>
                        <div>
                            <button><a href="https://www.pride.com/pride/2018/6/13/complete-guide-queer-pride-flags-0#media-gallery-media-1" target="_blank">Learn more about the pride flags</a></button>
                        </div>
                    </div>
                    <div style={this.bigDiv}>
                        {this.getDivs(this.state.num)}
                        <br></br>
                        <div className="flex center">
                            <button onClick={() => { this.addLines(1) }}>Add Lines</button>
                            <button onClick={() => { this.addLines(-1) }}>Subtract Lines</button>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}