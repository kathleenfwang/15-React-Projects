import React from "react"
import axios from "axios"
import RecipeCard from "./Components2/day20/RecipeCard"
import { connect } from "react-redux";
import { Fade, Slide, Rotate } from 'react-reveal';
class Day20 extends React.Component {
    constructor({checked}) {
        super({checked})
        this.state = {
            recipes:null,
            loaded:false
        }
        this.proxyurl = "https://cors-anywhere.herokuapp.com/"
        this.recipeUrl =   `${this.proxyurl}${process.env.REACT_APP_RECIPE_URL}`
    }
    componentDidMount() {
        console.log(this.props.checked)
        axios.get(this.recipeUrl)
        .then(res => {
          const recipes = res.data;
          console.log(recipes)
          this.setState({ recipes, loaded: true });
        })
    }
    componentDidUpdate(prevProps) {
        console.log(prevProps.checked,this.props.checked)
        if (prevProps.checked !== this.props.checked) {
            console.log('wow')
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
                   
                   <div className = "flex">
                   <div style ={{borderRight: '2px solid black',marginRight:30}}>
                   <h2 style = {{borderBottom:'2px solid black',marginRight:30}}>Doing:</h2>
                   <div className ="flex">
                       {loaded && this.getRecipeCardsNotDone()}
                   </div>
                   </div>
                   <div>
                   <h2 style = {{borderBottom:'2px solid black'}}>Done:</h2>
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
        return { checked: state.checked};
    }
)(Day20);