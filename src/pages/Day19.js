import React from "react"
import axios from "axios"
export default class Day19 extends React.Component {
    constructor() {
        super()
        const img = "https://rb.gy/tt1rwg"
        this.state = {
            loaded: false,
            img: img,
            colors: {}
        }
        this.url = process.env.REACT_APP_COMPVISION_URL
        this.key = process.env.REACT_APP_CV_AZURE_KEY
    }

    componentDidMount() {
        this.getData()
    }
    getData = () => {
        const { img } = this.state
        let data =
            { "url": img }
        let url = this.url
        axios({
            method: 'post',     //put
            url: url,
            headers: {
                'Ocp-Apim-Subscription-Key': this.key,
                'Content-Type': 'application/json'
            },
            data: data
        }).then((res) => {
            this.setState({
                colors: res.data.color,
                loaded: true
            })
        })
            .catch((e) => console.log(e))
    }

    getColors = () => {
        const { colors } = this.state
        const squareNum = 2
        let colorDetails = ['dominantColorForeground', 'dominantColorBackground', 'accentColor']
        // we don't want repeating colors 
        // {dominantColorForeground: "Green", dominantColorBackground: "Green",}
        // colorDetails should only have dominantColorForegrond 
        let colorObj = {}
        for (let key in colors) {
            if (!colorObj[colors[key]]) {
                colorObj[colors[key]] = 1
            }
            else {
                colorDetails = colorDetails.filter((x) => x !== key)
            }
        }
        return colorDetails.map((detail) => {
            if (detail === 'accentColor') {
                colors[detail] = `#${colors[detail]}`
            }

            return (
                <div className="flex">
                    <div className="square" style={{
                        backgroundColor: colors[detail]
                    }} />
                    <p>{colors[detail]}</p>
                </div>)
        })
    }
    render() {
        const { img, loaded } = this.state
        return (
            <div>
                <img style={{
                    width: 500,
                    height: 500,
                    objectFit: 'cover',
                }} src={img} />
                <div>
                    <p>Colors:</p>
                    {loaded && this.getColors()}
                </div>
            </div>
        )
    }
}