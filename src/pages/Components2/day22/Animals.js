import React from "react"
import AnimalCard from "./AnimalCard"
export default class Animals extends React.Component {
    constructor(props){
        super(props)
        this.state ={}
    }
    getStuff =   () => {
        const {data} = this.props 
        console.log(data)
        let results = [] 
      setTimeout(() => { 
            results = data.map((animal) => <AnimalCard data = {animal} />)
            console.log(results)
         }, 3000);
         console.log(results)
 
         return results
    }
    render() {
        const {data} = this.props
       
        return(
            <div>
                {this.getStuff() }
            </div>
        )
    }
}