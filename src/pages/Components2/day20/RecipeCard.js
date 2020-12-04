import React from "react"
import timeSince from "../../timestamp"
import axios from "axios"
import { connect } from "react-redux";
import {handleCheckedToggle} from "../../../redux/index"
class RecipeCard extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
  
            checked: this.props.recipe.done
        } 
        this.proxyurl = "https://cors-anywhere.herokuapp.com/"
        this.recipeUrl =   `${this.proxyurl}${process.env.REACT_APP_RECIPE_URL}`
    }
  
    handleChange = (e) => {
      handleCheckedToggle()
      this.setState(prevState => ({
          checked: !prevState.checked
      }), () => {
          this.updateDone()
      })
    }
    updateDone = () => {
        const {checked } = this.state
        const id = this.props.recipe._id
        console.log(id)
        axios.put(`${this.recipeUrl}/${id}`,{ done: checked })
        .then((res) => console.log(res))
       
    }
   recipeCardStyle = (recipe) => {
        return {
            backgroundImage: `url(${recipe.image})`,
            backgroundSize: "cover",
            height:387,
            marginRight:30,
        }
    }
    
   render() {
       console.log(this.props.checked)
       const {checked } = this.state
    const aDay = this.props.recipe.date
    const time = timeSince(aDay)
    console.log(checked)
    return (
        <div style={this.recipeCardStyle(this.props.recipe)} className="plantCard">
            <div className="innerPlantCard">
                <h3>{this.props.recipe.name}</h3>
                <p  className ="up"><span className="smallTxt"><b>Date Added:</b>{time} Ago</span></p>
                <h4 className ="up">Ingredients:</h4>
                <p style ={{width:300}} className ="up">{this.props.recipe.description}</p>
                <img className="medImg" src={this.props.recipe.image} />
                <p><b>Done? </b>{checked ? <input onChange ={this.handleChange} value = {checked} type="checkbox" checked/>:<input onChange ={this.handleChange}value = {checked} type="checkbox" />}</p>
            </div>
        </div>
    )
   }  
}
export default connect(
    state => {
        return { checked: state.checked};
    }, 
    {handleCheckedToggle}
)(RecipeCard);