import React from "react"
import AnimalCard from "./AnimalCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSmile, faArrowUp, faHeart, faHamburger } from '@fortawesome/free-solid-svg-icons'
export default class Animals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            animalDic: {},
            animalPersonalities: {},
            animalHobbies: {},
            loaded: false,
            firstLoad: false,
            finalLoad: false,
            clickedHamburger: true,
        }
        this.animalData = null
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
        // headers: ["ant", "cow", etc.. ]
        const animalDic = this.makeDictionary("species")
        const animalPersonalities = this.makeDictionary("personality")
        const animalHobbies = this.makeDictionary("hobby")
        this.setState({ animalDic, animalPersonalities, animalHobbies, firstLoad: true }, () => this.getAnimalCards())
    }
    getAnimalCards = async () => {
        const result = await this.makeAnimalCards()
        this.animalData = result
        this.setState({ loaded: true })
    }
    makeAnimalCards = () => {
        const { animalDic, animalPersonalities, animalHobbies } = this.state
        let animalCards = []
        let i = 0
        for (let animal in animalDic) {
            animalCards.push(
                <div id={animal}>
                    <h1 className="textCenter button" style={this.getColor(i)}>{animal}</h1>
                    <div className="flex center">
                        {animalDic[animal].map((animal) => <AnimalCard key={animal.id} data={animal} animalPersonalities={animalPersonalities} animalHobbies={animalHobbies} />)}
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
    getColor = (i) => {
        const colors = { pastel: ["#C1A7FF", "#C2CBFF", "#C7FCBA", "#FDFEC9", "#FFD8B6", " #FEBCC2"], beach: ["#C8F69B", "#FFEEA5", "#FFCBA5", "#FFB1AF", " #D6D4FF", "#B3EEFF"] }
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
                <div><button style={{ width: 40 }} className="cursor" onClick={this.handleHamburger}><FontAwesomeIcon icon={faHamburger} /></button></div>
                <div className={`flex ${clickedHamburger}Show`}>
                    {loaded && this.getHeaderTags()}
                </div>
            </div>)
    }
    render() {
        const { loaded } = this.state
        console.log(loaded, this.animalData)
        return (
            <div className="day22" id="start">
                {this.getFixedHeader()}
                <div className="downHeader">
                    {loaded && this.animalData}
                </div>
                {this.getArrow()}
            </div>
        )
    }
}