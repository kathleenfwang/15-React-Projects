import React from "react"
import Fade from 'react-reveal/Fade';
import { TwitterIcon, TwitterShareButton } from "react-share"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import truecolors from "./Components1/truecolors.mp3"
export default class Day11 extends React.Component {
    constructor() {
        super()
        this.state = {
            play: true,
            pause: true,
            text: false
        }
        this.audio = new Audio(truecolors);
        this.items = [
            { id: 1, text: "Your skin isn't paper, don't cut it" },
            { id: 2, text: "Your face isn't a mask, don't hide it" },
            { id: 3, text: "Your size isn't a book, don't judge it" },
            { id: 4, text: "Your life isn't a film, don't end it" },
            { id: 5, text: "National Suicide Prevention Lifeline" },
            { id: 6, text: "Available 24 hours. Languages: English, Spanish. Learn more 800-273-8255" }
        ]
        this.image = "https://img.freepik.com/free-photo/background-crumpled-paper-sheet_1194-7545.jpg?size=626&ext=jpg"
    }
    componentDidMount() {
        this.play()
        this.startCount()
    }
    startCount = () => {
        setInterval(() => {
            this.setState({
                text: true
            })
        },
            500);
    }
    play = () => {
        this.setState({ play: true, pause: false })
        this.audio.play();
    }
    pause = () => {
        this.setState({ play: false, pause: true })
        this.audio.pause();
    }
    renderText = (num) => {
        switch (num) {
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
                    <p style={{ fontSize: '1.2em', }}>Available 24 hours. Languages: English, Spanish. Learn more
            800-273-8255</p>
                    <p style={{ fontSize: '1.2em', }}>"Don't be afraid, to let them show, your true colors are beautiful".</p>
                </div>)
        }
    }
    getText = () => {
        return (<div style={{ textAlign: "center", fontFamily: "Times New Roman", alignItems: "center", }}>
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
        </div>)
    }
    render() {
        const { play } = this.state
        const musicControl = <FontAwesomeIcon style={{ color: "grey" }} icon={play ? faPause : faPlay} onClick={play ? this.pause : this.play} />
        return (
            <div className="day3 flex center">
                {this.getText()}
                {musicControl}
            </div>
        )
    }
}