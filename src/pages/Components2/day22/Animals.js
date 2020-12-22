import React from "react"
import AnimalCard from "./AnimalCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSmile, faArrowUp, faHeart } from '@fortawesome/free-solid-svg-icons'
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
        for (let animal in animalDic) {
            animalCards.push(
                <div id ={animal}>
                    <h1 className="textCenter">{animal}</h1>
                    <div className="flex center">
                        {animalDic[animal].map((animal) => <AnimalCard data={animal} />)}
                    </div>
                </div>)
        }
        return animalCards
    }
    getHeader = () => {
        const {animalDic} = this.state
        let buttons = [] 
        for (let animal in animalDic) {
            buttons.push(<a href ={`#${animal}`}><button>{animal}</button></a>)
        }
        return buttons
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