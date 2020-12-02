import React from "react"
import axios from "axios"
import RecipeCard from "./Components2/day20/RecipeCard"
export default class Day20 extends React.Component {
    constructor() {
        super()
        this.state = {
            recipes:null,
            loaded:false
        }
        this.proxyurl = "https://cors-anywhere.herokuapp.com/"
        this.recipeUrl =   `${this.proxyurl}${process.env.REACT_APP_RECIPE_URL}`
    }
    componentDidMount() {
        axios.get(this.recipeUrl)
        .then(res => {
          const recipes = res.data;
          console.log(recipes)
          this.setState({ recipes, loaded: true });
        })
    }
    getRecipeCards = () => {
        const {recipes}  = this.state
        return recipes.map((recipe) => <RecipeCard recipe = {recipe} /> )
    }
    render() {
        const {loaded} = this.state
        return (
            <div>
               <div >
                   <h1>Recipe List:</h1>
                   <div className = "flex">
                   <div>
                   <h2>Doing:</h2>
                   <div className ="flex">
                       {loaded && this.getRecipeCards()}
                   </div>
                   </div>
                   <div>
                   <h2>Done:</h2>
                   <div className ="flex">
                       {loaded && this.getRecipeCards()}
                   </div>
                   </div>
                   </div>
               </div>
            </div>
        )
    }
}