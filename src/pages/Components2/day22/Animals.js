import React from "react"
import AnimalCard from "./AnimalCard"
export default class Animals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
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
        console.log(animalDic)
        return this.getAnimalCards(animalDic)

    }
    getAnimalCards = (animalDic) => {
        let animalCards = []
        for (let animal in animalDic) {
            animalCards.push(
                <div>
                    <h1>{animal}</h1>
                    <div className="flex">
                        {animalDic[animal].map((animal) => <AnimalCard data={animal} />)}
                    </div>
                </div>)
        }
        return animalCards
    }
    render() {
        return (
            <div>
                {this.getAnimals()}
            </div>
        )
    }
}