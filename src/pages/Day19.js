import React from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import translate from 'moji-translate';
export default class Day19 extends React.Component {
    constructor(props) {
        super(props)
        const img = "https://rb.gy/tt1rwg"
        this.state = {
            loaded: false,
            img: img,
            imgUpload: null,
            photos: [img, 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/109778.jpg?output-format=auto&output-quality=auto', 'https://www.goodinfonet.com/uploads/news/goodinfonet_whats_up_wednesday_1596012821_0.jpg',],
            colors: {},
            tags: [],
            description: {},
            show: false
        }
        this.url = process.env.REACT_APP_COMPVISION_URL
        this.key = process.env.REACT_APP_CV_AZURE_KEY
    }

    componentDidMount() {
        this.getData()
    }
    componentDidUpdate(prevprops, prevState) {
        if (prevState.img !== this.state.img) {
            this.getData()
        }
    }
    getData = () => {
        this.setState({ loaded: false })
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
                tags: res.data.tags,
                description: res.data.description,
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
        this.setState({ img: photo })
    }
    inputUpload = () => {
        let upload = this.refs.fileUpload
        upload.click()
    }
    handleUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            let src = URL.createObjectURL(img);
            this.setState({
                img: src,
                imgUpload: img
            })
        }
    }
    getPhotos = () => {
        let photosArr = []
        const { photos } = this.state
        photosArr = photos.map((photo) => {
            return (<div className="square" onClick={() => this.changePhoto(photo)} style={{
                backgroundImage: `url(${photo})`,
                backgroundSize: "cover",
            }}></div>)
        })
        // push empty 
        //     photosArr.push(<div className="square alignInMiddle" onClick={this.inputUpload}>
        //     <input ref="fileUpload" style={{ display: "none" }} type="file" name="imgUpload" id="file" className="inputfile" onChange={(e) => this.handleUpload(e)}
        //         accept=".png,.jpg"
        //     />
        //     <FontAwesomeIcon icon={faPlus} style={{ color: "lightgrey" }} />
        // </div>)
        return photosArr
    }

    handleChange = (e) => {
        let value = e.target.value
        this.setState({ img: value })
    }
    isUnique = (words, word, i) => {
        return words.indexOf(word) === i
    }
    getTags = () => {
        const { tags } = this.state
        // make sure tags are unique 
        let filteredTags = tags.filter((tag, i) => this.isUnique(tags, tag, i))
        return filteredTags.map((tag, i) => {
            // even words are bolded
            let even = i % 2 === 0
            return (<div>
                <p className={even && "boldSize"} style={{ marginLeft: 5 }}>#{tag.name}</p>
            </div>)
        })
    }
    getEmojiTags = () => {
        const { tags } = this.state
        // make sure tags are unique 
        let filteredTags = tags.filter((tag, i) => this.isUnique(tags, tag, i))
        return filteredTags.map((tag, i) => {
            const emoji = (translate.getEmojiForWord(tag.name))
            console.log(emoji)
            return (emoji && <div>
                <p className={"big"} style={{ marginLeft: 5 }}>#{emoji}</p>
            </div>)
        })
    }
    getDescription = () => {
        const { description } = this.state
        const { captions } = description
        return <p>{captions[0].text}</p>
    }
    handleTest = (e) => {
        this.handleShow()
    }
    handleShow = () => {
        this.setState(prevState => ({
            show: !prevState.show
        }))
    }
    render() {
        const { img, loaded, show } = this.state
        return (
            <div>

                <div className="down flex spaceEvenly start">
                    <div>
                        <h3 className="underBorder">Computer Vision with Images</h3>
                        <img style={{
                            width: 500,
                            height: 500,
                            objectFit: 'cover',
                        }} src={img} />
                        <div className='flex'>
                            {this.getPhotos()}
                        </div>
                        <div className="flex">
                            <h3>Image URL</h3>
                            <input placeHolder="Paste here" onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className="baseLine" style={{ width: 800 }}>
                        <div>
                            <div>
                                <h3 className="underBorder">Colors</h3>
                                {loaded ? this.getColors() : 'Loading...'}
                            </div>
                            <div>
                                <h3 className="underBorder">Description</h3>
                                {loaded ? this.getDescription() : 'Loading...'}
                            </div>
                        </div>
                        <div>
                            <h3 className="underBorder">Tags</h3>
                            <div>
                                {loaded ? <div className="up flex baseLine">{this.getTags()} </div> : 'Loading...'}
                            </div>
                        </div>
                        <div>
                            <h3 className="underBorder">Emoji Tags</h3>
                            <div>
                                {loaded ? <div className="up flex baseLine">{this.getEmojiTags()} </div> : 'Loading...'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center">
                    <button onClick={this.handleTest}>About</button>
                    <p style={{ width: 600, marginLeft: 10 }} className={`${show}Show`}>
                        Using Microsoft Azure's Computer Vision API. You can use the sample images provided or by pasting in an image URL. 
                </p>
                </div>
            </div>
        )
    }
}
