import React from "react"
import timeSince from "../../timestamp"
export default class RecipeCard extends React.Component {
    constructor({recipe}) {
        super({recipe}) 
        this.state = {} 
    }
   recipeCardStyle = (recipe) => {
        return {
            backgroundImage: `url(${this.props.recipe.image})`,
            backgroundSize: "cover",
            height:387,
            marginRight:30,
        }
    }
    
   render() {
    const aDay = this.props.recipe.date
    const time = timeSince(aDay)
    return (
        <div style={this.recipeCardStyle(this.props.recipe)} className="plantCard">
            <div className="innerPlantCard">
                <h3>{this.props.recipe.name}</h3>
                <p  className ="up"><span className="smallTxt"><b>Date Added:</b>{time} Ago</span></p>
                <h4 className ="up">Ingredients:</h4>
                <p style ={{width:300}} className ="up">{this.props.recipe.description}</p>
                <img className="medImg" src={this.props.recipe.image} />
                <p><b>Done? </b>{this.props.recipe.done ? <input ref ="checkbox" type="checkbox" checked/>:<input type="checkbox" />}</p>
            </div>
        </div>
    )
   }  
}
