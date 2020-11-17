import React from "react"
import axios from "axios"
export default class Day19 extends React.Component {
    constructor() {
        super()
        const img = "https://rb.gy/tt1rwg"
        this.state = {
            loaded: false,
            img: img,
            photos: ['https://www.goodinfonet.com/uploads/news/goodinfonet_whats_up_wednesday_1596012821_0.jpg','https://www.rightstufanime.com/images/productImages/816546022563_anime-the-promised-neverland-blu-ray-primary.jpg?resizeid=3', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'],
            colors: {}
        }
        this.url = process.env.REACT_APP_COMPVISION_URL
        this.key = process.env.REACT_APP_CV_AZURE_KEY
    }

    componentDidMount() {
        this.getData()
    }
    componentDidUpdate(prevprops,prevState) {
        if (prevState.img !== this.state.img) {
            this.getData()
        }
    }
    getData = () => {
        this.setState({loaded:false})
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
            let detailText = ""
            if (detail === 'accentColor') {
                detailText = `#${colors[detail]}`
            }
            else {
                detailText = colors[detail]
            }

            return (
                <div className="flex">
                    <div className="square" style={{
                        backgroundColor: detailText
                    }} />
                    <p>{detailText}</p>
                </div>)
        })
    }
    changePhoto = (photo) => {
        this.setState({img: photo})
    }
    getPhotos = () => {
        const {photos} = this.state 
        return photos.map((photo) => {
            return (<div className ="square" onClick ={() => this.changePhoto(photo)} style={{
                backgroundImage: `url(${photo})`,
                backgroundSize: "cover",}}></div>)
        })
    }
    // getLoading = () => {
    //     return (<img src ="https://i.gifer.com/YCZH.gif"/>)
    // }
    render() {
        const { img, loaded } = this.state
        return (
            <div>
                <div className ="flex">
                <img style={{
                    width: 500,
                    height: 500,
                    objectFit: 'cover',
                }} src={img} />
                <div>
                    <p>Colors:</p>
                    {loaded ? this.getColors() : 'Loading!'}
                </div>
            
                </div>
                <div className ='flex'>
                    {this.getPhotos()}
                </div>
            </div>
        )
    }
}