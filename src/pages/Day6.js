import React from "react"
import axios from "axios"

export default class Day6 extends React.Component{
 constructor() {
     super()
     this.state = {
         plants: null, 
         loaded: false, 
         undos: {}, 
         showForm: false, 
         name: "",
         description: "",
         image: "", 
         az: false, 
         newest: true, 
         plantDivs: []
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
      });
    })
 }
 
 loadPlants = () => {
     let reversePlants = [] 

     const {plants,undos} = this.state
     plants.forEach((plant) => {
         reversePlants.unshift(plant) 
     })
    return reversePlants.map((plant,i) => {
   
         return (
             <div  key = {i}>
                 <h3>{plant.name}</h3>
                 {undos[plant._id] ? <button onClick ={() => this.deletePlant(plant._id)}>Undo</button> : null}
                 <p>{plant.description}</p>
                 <img className ="medImg" src ={plant.image} />
             </div>
         )
     })
 
 }
 deletePlant = (id) =>{
     let newPlants = this.state.plants.filter((plant) => plant._id !== id)
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
 handleName = (e) => {
     this.setState({name: e.target.value})
 }
 handleDesc = (e) => {
    this.setState({description: e.target.value})
}
handleImg = (e) => {
    this.setState({image: e.target.value})
}
 addPlant = (e) => {
     e.preventDefault()
     const {name,description,image} = this.state
    this.setState(prevState =>({
        showForm: !prevState.showForm
    }))
    const plant = {
        name, 
        description, 
        image
    }
    console.log(plant)
    if (this.state.showForm) {
    axios.post(this.url, plant)
    .then(res => {
        let plant = res.data
        this.setState((prevState) =>({
            plants: [...prevState.plants,plant], 
            undos:  {...prevState.undos,[plant._id]: true}

        }));
      }).catch((e) => console.log(e))
    }
 
        this.setState({
            name: "",
            description: "",
            image: ""
        })
   
 }
 form = () => {
     const {state} = this.state
    return (
        <form onSubmit = {this.addPlant}className ={`form ${this.state.showForm}Form`}>
                     <label>name</label>
                     <input placeholder ="Aloe" onChange = {this.handleName}value ={this.state.name}></input>
                     <br></br>
                     <label>Description</label>
                     <textarea placeholder = "Best plant" onChange = {this.handleDesc}value ={this.state.description}></textarea>
                     <br></br>
                     <label>Image Src</label>
                     <input placeHolder ="aloeplant.png" onChange = {this.handleImg}value ={this.state.image}></input>
                     <br></br>
                     <button type ="submit">Submit</button>
                     </form>
                    
    )
 }
 compare = (a, b) => {
    let multiplier = this.state.az ? 1 : -1 
    const bandA = a.name.toUpperCase();
    const bandB = b.name.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison * multiplier;
  }
 sortPlants = (action) => {
     if (action === "name") {
     this.setState(prevState => ({
         az: !prevState.az
     }))
     const {plants} = this.state  
     // sort a - z by name 
     let sortedPlants = [] 
  sortedPlants = plants.sort(this.compare);
  this.setState({plants: sortedPlants})
    }
    else {
        this.setState(prevState => ({
            newest: !prevState.newest
        }))
    }

 }
 render = () => {
     const {az,newest,plantDivs} = this.state
     return(
         <div>
             <h1>Plant Library</h1> 
             <nav>
                 <li> <button onClick ={this.addPlant}>Add Plant </button></li>
                 <li>{this.form()}</li>
                 <li><button onClick ={() => this.sortPlants("name")}>Sort {az ? "Z-A" : "A-Z"}</button></li>
                 <li><button onClick ={() => this.sortPlants("date")}>Sort {newest ? "newest - oldest" : "oldest - newest"}</button></li>
             </nav>
             <div style ={this.plantsStyle}>
             {this.state.loaded ? this.loadPlants(): <img src ="https://i.pinimg.com/originals/47/72/87/477287eff59923ade6336b5eb3307de4.gif"></img>}
             </div>
         </div>
     )
 }
}