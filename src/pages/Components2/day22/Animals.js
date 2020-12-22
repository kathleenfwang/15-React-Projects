import React from "react"
import AnimalCard from "./AnimalCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSmile, faArrowUp, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faBluetooth } from "@fortawesome/free-brands-svg-icons"
export default class Animals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            animalDic: {},
            animalPersonalities: {},
            animalHobbies: {},
            loaded:false
        }
    }
    componentDidMount() {
        this.getAnimals()
    }
 
    getAnimals = () => {

        // headers: ["ant", "cow", etc.. ]
        const animalDic = this.makeDictionary("species")
        const animalPersonalities = this.makeDictionary("personality")
        const animalHobbies = this.makeDictionary("hobby")
        this.setState({animalDic, animalPersonalities, animalHobbies, loaded:true})
    }
    makeDictionary = (type) => {
        const { data } = this.props
        let animalDic = {}
        data.forEach((animal) => {
            if (animalDic[animal[type]]) {
                animalDic[animal[type]].push(animal)
            }
            else {
                animalDic[animal[type]] = [animal]
            }
        })
        return animalDic
    }
    getAnimalCards = () => {
        const {animalDic,animalPersonalities, animalHobbies} = this.state
        let animalCards = []
        let i = 0
        for (let animal in animalDic) {
            animalCards.push(
                <div id ={animal}>
                    <h1 className="textCenter button" style ={this.getColor(i)}>{animal}</h1>
                    <div className="flex center">
                        {animalDic[animal].map((animal) => <AnimalCard  key ={animal.id} data={animal} animalPersonalities = {animalPersonalities} animalHobbies = {animalHobbies}/>)}
                    </div>
                </div>)
                i++
        }
        return animalCards
    }
    getHeader = () => {
        const {animalDic} = this.state
        let i = 0
        let buttons = [] 
        for (let animal in animalDic) {
            buttons.push(<div className ="bigger margin"><a href ={`#${animal}`}><button style ={this.getColor(i)}>{animal}</button></a></div>)
            i++ 
        }
        return buttons
    }
    getColor = (i) => {
        const colors = {pastel: ["#C1A7FF", "#C2CBFF", "#C7FCBA", "#FDFEC9", "#FFD8B6", " #FEBCC2"], beach: ["#C8F69B", "#FFEEA5", "#FFCBA5", "#FFB1AF", " #D6D4FF", "#B3EEFF"]}
        const color = i % colors.beach.length
        return {backgroundColor: colors.beach[color],color:"rgb(99, 89, 89)"}
    }
    getArrow = () => {
        const arrowStyle = {
            position:"fixed", 
            right:20, 
            bottom: 20
        }
        return <a href="#start" style ={arrowStyle}> <button><FontAwesomeIcon icon ={faArrowUp}/></button></a>
    }
    
    render() {
        const {loaded} = this.state
        return (
            <div className ="day22" id ="start">
                <div className ="flex center">
                {loaded && this.getHeader()}
                </div>
                {loaded && this.getAnimalCards()}
                {this.getArrow()}
            </div>
        )
    }
}