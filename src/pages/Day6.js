import React from "react"
import axios from "axios"

export default class Day6 extends React.Component{
 constructor() {
     super()
     this.state = {
         plants: null, 
         loaded: false 
     }
    this.plantsStyle = {
        display: "grid", 
        gridTemplateColumns: "1fr 1fr 1fr", 
        border: "1px solid whitesmoke", 
        borderRadius:4, 
        padding: 30, 
        gridGap: 20
     }
     this.proxyurl = "https://cors-anywhere.herokuapp.com/"
     this.url = `${this.proxyurl}https://plant-app-1.herokuapp.com/plants`
 }
 componentDidMount = () => {
    axios.get(this.url)
    .then(res => {
      const plants = res.data;
      this.setState({
          plants: plants,
          loaded:true,
          undos: {} 
       
      });
    })
 }
 loadPlants = () => {
     
     const {plants,undos} = this.state
     console.log(undos)
     return plants.map((plant,i) => {
   
         return (
             <div  key = {i}>
                 <h3>{plant.name}</h3>
                 {undos[plant._id] ? <button onClick ={() => this.deletePlant(plant._id,i)}>Delete</button> : null}
                 <p>{plant.description}</p>
                 <img className ="medImg" src ={plant.image} />
             </div>
         )
     })
 }
 deletePlant = (id,i) =>{
     let newPlants = this.state.plants.filter((plant,index) => index !== i)
     this.setState({
         plants: newPlants
     })
    axios.delete(`${this.url}/${id}`)
    .then(res => {
        console.log(res);
        console.log(res.data);
      })
      this.setState((prevState) => ({
          undos: {...prevState.undos,[prevState.undos[id]] : false}
      }))
 }
 addPlant = () => {
  
     const plant = {
         name: "test plant2", 
         description: "Sansevieria trifasciata is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, Saint Georges sword, mother-in-laws tongue, and vipers bowstring hemp, among other names.",
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/2560px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg",
         
     }

    axios.post(this.url, plant)
    .then(res => {
        let plant = res.data
        this.setState((prevState) =>({
            plants: [...prevState.plants, plant], 
            undos:  {...prevState.undos,[plant._id]: true}

        }));
      })
      
 }
 render = () => {
     return(
         <div>
             <h1>Plant Library</h1> 
             <nav>
                 <li> <button onClick ={this.addPlant}>Add Plant </button></li>
             </nav>
             <div style ={this.plantsStyle}>
             {this.state.loaded ? this.loadPlants() : null}
             </div>
         </div>
     )
 }
}