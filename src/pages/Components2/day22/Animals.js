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
            loaded:false
        }
    }
    componentDidMount() {
        this.getAnimals()
    }
 
    getAnimals = () => {
        const { data } = this.props
        // headers: ["ant", "cow", etc.. ]
        let animalDic = {}
        data.forEach((animal) => {
            let type = animal.species
            if (animalDic[type]) {
                animalDic[type].push(animal)
            }
            else {
                animalDic[type] = [animal]
            }
        })
        this.setState({animalDic,loaded:true})
    }
    getAnimalCards = () => {
        const {animalDic} = this.state
        let animalCards = []
        let i = 0
        for (let animal in animalDic) {
            animalCards.push(
                <div id ={animal}>
                    <h1 className="textCenter button" style ={this.getColor(i)}>{animal}</h1>
                    <div className="flex center">
                        {animalDic[animal].map((animal) => <AnimalCard  key ={animal.id} data={animal} />)}
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
        return {backgroundColor: colors.beach[color],color:"#333"}
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