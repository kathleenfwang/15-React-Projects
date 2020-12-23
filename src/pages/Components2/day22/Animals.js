import React from "react"
import AnimalCard from "./AnimalCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp, faHamburger } from '@fortawesome/free-solid-svg-icons'
import NavOptions from "../day20/NavOptions"
export default class Animals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            animalDic: {},
            animalPersonalities: {},
            animalHobbies: {},
            loaded: false,
            clickedHamburger: true,
            tab: 0, 
            defaultColors: {}, 
            defaultHobbyColors:{},
            liked: []
        }
        this.animalData = null
        this.colors = { pastel: ["#C1A7FF", "#C2CBFF", "#C7FCBA", "#FDFEC9", "#FFD8B6", " #FEBCC2", "#FD63B0", "#67D0DD"], beach: ["#C8F69B", "#FFEEA5", "#FFCBA5", "#FFB1AF", " #9EE09E", "#B3EEFF", "#E5A4BE", "#A890C3"] }
    }
    componentDidMount() {
        this.getAnimals()
    }
    makeDictionary = (type) => {
        const { data } = this.props
        let animalDic = {}
        data.forEach((animal) => {
            if (animalDic[animal[type]]) animalDic[animal[type]].push(animal)
            else { animalDic[animal[type]] = [animal] }
        })
        return animalDic
    }
    getAnimals = () => {
        const animalDic = this.makeDictionary("species")
        const animalPersonalities = this.makeDictionary("personality")
        const animalHobbies = this.makeDictionary("hobby")
        this.setState({ animalDic, animalPersonalities, animalHobbies, firstLoad: true }, () => this.getDefaultColors())
    }
    handleLike = (data,filled) => {
        const {liked} = this.state
        if (filled) this.setState(prevState => ({liked: [...prevState.liked, data]}))
        else {
            const filteredLikes = liked.filter((like) => like !== data)
            this.setState({liked:filteredLikes})
        }
    }
    getAnimalCards = async () => {
        const result = await this.makeAnimalCards()
        this.animalData = result
        this.setState({ loaded: true })
    }
    makeAnimalCards = () => {
        const { animalDic, defaultColors, defaultHobbyColors} = this.state
        let animalCards = []
        let i = 0
        for (let animal in animalDic) {
            animalCards.push(
                <div id={animal}>
                    <h1 className="textCenter button" style={this.getColor(i)}>{animal}</h1>
                    <div className="flex center">
                        {animalDic[animal].map((animal) => <AnimalCard filled = {false}key={animal.id} data={animal} defaultColors = {defaultColors}defaultHobbyColors = {defaultHobbyColors} handleLike = {this.handleLike} />)}
                    </div>
                </div>)
            i++
        };
        return animalCards
    }
    handleHamburger = (e) => {
        this.setState(prevState => ({ clickedHamburger: !prevState.clickedHamburger }))
    }
    getHeaderTags = () => {
        const { animalDic } = this.state
        let i = 0
        let buttons = []
        for (let animal in animalDic) {
            buttons.push(<div className="bigger margin"><a href={`#${animal}`}><button style={this.getColor(i)}>{animal}</button></a></div>)
            i++
        }
        return buttons
    }
    getDefaultColors = () => {
        const {animalPersonalities,animalHobbies} = this.state
        const defaultColors = this.defaultColorsHelper(Object.keys(animalPersonalities),"personality")
        const defaultHobbyColors = this.defaultColorsHelper(Object.keys(animalHobbies),"hobby")
        this.setState({defaultColors, defaultHobbyColors}, () => this.getAnimalCards())
    }
    defaultColorsHelper = (array,type) => {
        const palette = type == "hobby" ? "beach" : "pastel"
        const {colors} = this
        const defaultColors = array.reduce((prev,next,i) => {
            prev[next] = colors[palette][i % colors[palette].length]
            return prev},{})
        return defaultColors
    }
    getColor = (i) => {
        const {colors} = this
        const color = i % colors.beach.length
        return { backgroundColor: colors.beach[color], color: "rgb(99, 89, 89)" }
    }
    getArrow = () => {
        const arrowStyle = {
            position: "fixed",
            right: 30,
            bottom: "30px",
        }
        return <a href="#start" style={arrowStyle}> <button><FontAwesomeIcon icon={faArrowUp} /></button></a>
    }
    getFixedHeader = () => {
        const { loaded, clickedHamburger } = this.state
        return (
            <div className="flex fixedHeader">
                <div  className="cursor" onClick={this.handleHamburger} ><button style={{ width: 40 }}><FontAwesomeIcon icon={faHamburger} /></button></div>
                <div className={`flex ${clickedHamburger}Form`}>
                    {loaded && this.getHeaderTags()}
                </div>
            </div>)
    }
    setOptionNav = (tab) => {
        this.setState({ tab: tab })
    }
    getOptionNav = () => {
        const { tab } = this.state
        const titles = ["All", "|","My Collection"]
        return (
            <NavOptions titles = {titles} tab = {tab} functionName = {this.setOptionNav} />
        )
    }
    getLikedVillagers = () => {
        const {liked,defaultHobbyColors, defaultColors} = this.state 
        return liked.map((animal) => <AnimalCard key={animal.id} filled ={true} data={animal}  defaultColors = {defaultColors} defaultHobbyColors = {defaultHobbyColors} handleLike = {this.handleLike} />)
    }
    getLikedStats = () => {
        const {liked,defaultColors} = this.state 
        const likedStatsArray = []
        let i = 0 
       const likedStats =  liked.reduce((prev,next) => {
            prev[next.personality] ? prev[next.personality]++ : prev[next.personality] = 1 
            return prev}, {})
      
        for (let stat in likedStats) {
            likedStatsArray.push(<p style ={{fontWeight:"bold",backgroundColor: defaultColors[stat]}}className="smallTag upLess">{`${stat} | ${likedStats[stat]}`}</p>)
            i++
        }
        return likedStatsArray
    }
    getTypeStats = () => {
        const {liked} = this.state 
        const likedStatsArray = []
        let i = 0 
       const likedStats =  liked.reduce((prev,next) => {
            prev[next.species] ? prev[next.species]++ : prev[next.species] = 1 
            return prev}, {})
        for (let stat in likedStats) {
            likedStatsArray.push(<p style ={this.getColor(i)}className="smallTag upLess"><b>{`${stat} | ${likedStats[stat]}`}</b></p>)
            i++
        }
        return likedStatsArray
    }
    handleOptionNav = () => {
        // const { isLoggedIn } = this.state
        const { loaded, tab,liked } = this.state
        if (tab === 2) {
              return (liked.length == 0) ? <h1>Add villagers to your collection by clicking the star icon</h1> : (<>
                 <div className ="flex center">{this.getLikedStats()}</div>
                 <div className ="flex center">{this.getTypeStats()}</div>
                  <div className ="flex center">{this.getLikedVillagers()}</div>
                  {/* <h2 className ="textCenter">Log in to save your collection!</h2> */}
                  </>)
        }
        if (tab === 0) return (loaded && this.animalData)
    }
    render() {
        const {tab} = this.state
        return (
            <div className="day22" id="start">
                {tab == 0 ? this.getFixedHeader() : null}
                <div className="downHeader">
                {this.getOptionNav()}
                <h2>Double click an icon to add to your collection!</h2>
                {this.handleOptionNav()}
                </div>
                {this.getArrow()}
            </div>
        )
    }
}