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
            show:true
        }
        this.url = process.env.REACT_APP_SENTIMENT_URL
        this.key = process.env.REACT_APP_AZURE_KEY
        this.defaultLabelStyle = {
            fontSize: '5px',
            fontFamily: 'sans-serif',
        };
    }
    
    componentDidMount() {
        this.getDate()
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
        axios({
            method: 'post',     //put
            url: this.url,
            headers: { 'Ocp-Apim-Subscription-Key': this.key },
            data: data
        }).then((res) => {
            let score = (res.data.documents[0].score.toFixed(5))
            this.setState({ score: score })
        })
            .catch((e) => console.log(e))
    }
    getDate = () => {
        let d = new Date();
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let fullDate = `${days[d.getDay()]},${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
        this.setState({ date: fullDate })
    }
    handlePaste = (e) => {
            let text = (e.clipboardData.getData('Text'));
           
            this.setState({text:text}, () => { 
                let wordCount = text.split(" ").length
                if (wordCount >= 10) {
                 this.sentimentAnalyzer()
                }
            });
            
    }
    handleChange = (e) => {
        let text = e.target.value
        this.setState({
            text: text
        })
        if(e.type == "keydown") {
 
        }
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
    render() {
        const { date, text, wordCount, score,show} = this.state
        return (
            <div className="day8">
                <h1>{date}</h1>
                <textarea value={text} onInput = {this.handleChange} onKeyDown={this.handleChange} onPaste={this.handlePaste} autoFocus />

                <div className="flex between">
                    <div className ="flex">
                        <p>Word count: {wordCount}</p>

                        <button className="secondary" onClick={this.downloadTxtFile}>Save as .txt</button>
                    </div>
                    <div>
                    <PieChart
                        className = {`${show}Show`}
                
                        data={[
                            { title: 'Negative', value: Number(1 - score), color: '#E38627' },
                            { title: 'Positive', value: Number(score), color: '#C13C37' },
                        ]}
                        startAngle={180}
                        lengthAngle={180}
                        label={({ dataEntry }) => {
                            return `${dataEntry.title}:${Math.round(dataEntry.percentage) + '%'}`
                        }

                        }
                        labelStyle={this.defaultLabelStyle}
                    />
                    <button onClick = {this.handleShow}>{show ? "Hide Text Analyzer" : "Analyze Text"}</button>
                    </div>

                    </div>
            </div>
        )
    }
}