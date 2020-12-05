import React from "react"
import timeSince from "../../timestamp"
import axios from "axios"
import { connect } from "react-redux";
import {handleCountUpdate} from "../../../redux"
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
      this.setState(prevState => ({
          checked: !prevState.checked
      }), () => {
          this.updateDone()
      })
    }
    updateDone = () => {
        const {checked } = this.state
        const id = this.props.recipe._id
        axios.put(`${this.recipeUrl}/${id}`,{ done: checked })
        .then((res) => {
            this.props.handleCountUpdate()
        })
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
       const {checked } = this.state
    const aDay = this.props.recipe.date
    const time = timeSince(aDay)
    return (
        <div style={this.recipeCardStyle(this.props.recipe)} className="plantCard">
            <div className="innerPlantCard">
                <h3 className ="bigger">{this.props.recipe.name}</h3>
                <h4 className ="up"><b>Date Added:</b><span className="smallTxt">{time} Ago</span></h4>
                <h4 className ="up">By: {this.props.recipe.author}</h4>
                <h3 className = "up">Ingredients:</h3>
                <p style ={{width:300}} className ="up">{this.props.recipe.description}</p>
                <p className = {checked ? "miniCardPass" : "miniCard"}><b>Done? </b>{<input onChange ={this.handleChange} value = {checked} type="checkbox" checked = {checked}/>}</p>
            </div>
        </div>
    )
   }  
}
const mapStateToProps = state => {
    return { count:state.count };
};

export default connect(
    mapStateToProps,
    { handleCountUpdate }
)(RecipeCard);