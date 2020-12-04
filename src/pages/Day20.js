import React from "react"
import axios from "axios"
import RecipeCard from "./Components2/day20/RecipeCard"
import { connect } from "react-redux";
import { Fade, Slide, Rotate } from 'react-reveal';
class Day20 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes:null,
            loaded:false
        }
        this.proxyurl = "https://cors-anywhere.herokuapp.com/"
        this.recipeUrl =   `${this.proxyurl}${process.env.REACT_APP_RECIPE_URL}`
    }
    componentDidMount() {
        this.getRecipes()
    }
    getRecipes = () => {
        axios.get(this.recipeUrl)
        .then(res => {
          const recipes = res.data;
          this.setState({ recipes, loaded: true });
        })
    }
    componentDidUpdate(prevProps,prevState) {
        if (prevProps.count !== this.props.count) {
             this.getRecipes()
        }
    }
    getRecipeCardsDone = () => {
        const {recipes}  = this.state
        return recipes.map((recipe) => {
            if (recipe.done) return <RecipeCard recipe = {recipe} /> 
        })
    }
    getRecipeCardsNotDone = () => {
        const {recipes}  = this.state
        return recipes.map((recipe) => {
            if (!recipe.done) return <RecipeCard recipe = {recipe} /> 
        })
    }
    render() {
        const {loaded} = this.state
        return (
            <div>
                <h1>Recipe List:</h1>
               <div className ="flex spaceEvenly">
                   
                   <div className = "flex baseLine">
                   <div style ={{borderRight: '2px solid black',marginRight:30}}>
                   <h2 style = {{borderBottom:'2px solid black',marginRight:30}}>In progress:</h2>
                   <div className ="flex">
                       {loaded && this.getRecipeCardsNotDone()}
                   </div>
                   </div>
                   <div>
                   <h2 style = {{borderBottom:'2px solid black'}}>Finished:</h2>
                   <div className ="flex">
                       {loaded && this.getRecipeCardsDone()}
                   </div>
                   </div>
                   </div>
               </div>
            </div>
        )
    }
}
export default connect(
    state => {
        return { count:state.count};
    }
)(Day20);