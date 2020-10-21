import React from "react"
import axios from "axios"
import { PieChart } from 'react-minimal-pie-chart';
export default class Day8 extends React.Component {
    constructor() {
        super()
        this.state = {
            date: "",
            text: "",
            wordCount: 0,
            score: 0.5,
            show: false,
            phrases: [],
            begColors: []
        }
        this.url = process.env.REACT_APP_SENTIMENT_URL
        this.key = process.env.REACT_APP_AZURE_KEY
        this.defaultLabelStyle = {
            fontSize: '5px',
            fontFamily: 'sans-serif',
        };
        this.colors = ['#E64A39', ' #E97439', '#FBF87D', '#65ED99', '#5F8BE9', '#6F1BC6']
        this.placeholders = ['What they REALLY mean...', 'Sparknotes a text: ', 'Write or copy/paste text here...']
    }
    componentDidMount() {
        this.getDate()
        this.beginningColors()
    }
    componentDidUpdate(prevprops, prevState) {
        if (prevState.text !== this.state.text) {
            this.sentimentAnalyzer()
        }
    }
    handleShow = () => {
        this.setState((prevState) => ({
            show: !prevState.show
        }))
    }
    sentimentAnalyzer = () => {
        let data = {
            documents: [
                {
                    language: "en",
                    id: 1,
                    text: this.state.text
                },
            ]
        }
        let url = this.url + 'sentiment'
        axios({
            method: 'post',     //put
            url: url,
            headers: { 'Ocp-Apim-Subscription-Key': this.key },
            data: data
        }).then((res) => {
            let score = (res.data.documents[0].score.toFixed(5))
            this.setState({ score: score }, this.keyPhrases())
        })
            .catch((e) => console.log(e))
    }
    keyPhrases = () => {
        console.log('hi')
        let data = {
            documents: [
                {
                    language: "en",
                    id: 1,
                    text: this.state.text
                },
            ]
        }
        let url = this.url + 'keyPhrases'
        axios({
            method: 'post',     //put
            url: url,
            headers: { 'Ocp-Apim-Subscription-Key': this.key },
            data: data
        }).then((res) => {
            let phrases = res.data.documents[0].keyPhrases
            this.setState({
                phrases: phrases
            })
        })
            .catch((e) => console.log(e))
    }
    getDate = () => {
        let d = new Date();
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let fullDate = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
        this.setState({ date: fullDate })
    }
    handlePaste = (e) => {
        let text = (e.clipboardData.getData('Text'));
        // to prevent copy/paste from duplicating, make text previous
        this.setState(prevState => (
            { text: prevState.text }
        ), () => {
            let wordCount = text.split(" ").length
            if (wordCount >= 10) {
                this.sentimentAnalyzer()
            }
        })
    }
    handleChange = (e) => {
        console.log(e.type)
        let text = e.target.value
        this.setState({ text: text })
        let wordCount = this.state.text.split(" ").length
        let listener = wordCount
        // every 20 words, will give sentiment? 
        this.setState({
            wordCount: wordCount
        })
        if (listener % 5 == 0) {
            this.sentimentAnalyzer()
        }
    }
    downloadTxtFile = () => {
        const { text, date } = this.state
        const element = document.createElement("a");
        // join back into an array of one big string with spaces
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${date}.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    randSize = (first, max) => {
        return Math.floor(Math.random() * Math.floor(max) + first);
    }
    randWeight = () => {
        let weights = []
        for (let i = 100; i <= 900; i += 100) {
            weights.push(i)
        }
        return weights[this.randSize(0, weights.length)]
    }
    randColor = () => {
        return this.colors[this.randSize(0, this.colors.length)]
    }
    beginningColors = () => {
        // set initial color state: 
        let begColors = []
        this.colors.map((color) => {
            begColors.push(this.colors[this.randSize(0, this.colors.length)])
        })
        this.setState({
            begColors: begColors
        })
    }
    getPhrases = () => {
        const { phrases, begColors } = this.state
        return phrases.map((phrase, i) => {
            return (<p style={{ fontFamily: "sans-serif", fontSize: this.randSize(18, 20), margin: 0, fontWeight: this.randWeight(), color: this.randColor() }}>{phrase}</p>)
        })
    }
    getText = () => {
        return this.placeholders[this.randSize(0, this.placeholders.length)]
    }
    getPieChart = () => {
        const {score} = this.state
        return <PieChart
        style={{ width: '20%', height: '20%' }}
        data={[
            { title: 'Negative', value: Number(1 - score), color: this.colors[4] },
            { title: 'Positive', value: Number(score), color: this.colors[3] },
        ]}
        animate={true}
        startAngle={180}
        lengthAngle={180}
        label={({ dataEntry }) => {
            return `${dataEntry.title}:${Math.round(dataEntry.percentage) + '%'}`
        }
        }
        labelStyle={this.defaultLabelStyle}
    />
    }
    render() {
        const { date, text, wordCount, show} = this.state
        return (
            <div className="day8">
                <h1 style={{ fontWeight: "bold", color: this.colors[2] }}>{date}</h1>
                <div className="flex center">
                    <textarea placeHolder={this.getText()} value={text} onChange={this.handleChange} onKeyDown={this.handleChange} onPaste={this.handlePaste} autoFocus />
                </div>
                <div className="flex between">
                    {this.getPieChart()}
                    <h2>Key Phrases: </h2>
                    <div className="flex">
                        <p>Word count: {wordCount}</p>
                        <button className="secondary" onClick={this.downloadTxtFile}>Save as .txt</button>
                        <button onClick={this.handleShow}>{show ? "Hide Text Analyzer" : "Analyze Text"}</button>
                    </div>
                </div>
                <div style={{ marginTop: '-8%' }} className={`${show}Show flex center`}>
                    {this.getPhrases()}
                </div>
            </div>
        )
    }
}