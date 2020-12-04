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
            loaded:false, 
            showForm: false, 
            name: "", 
            description: "", 
            image: ""
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
    getNav = () => {
        return(
        <nav className ="alignCenter">
            <li> <h1>Recipe List </h1></li>
            <li> <button onClick={this.addRecipe}>Add Recipe </button></li>
            <li>{this.form()}</li>
        </nav>)
    }
    addRecipe = (e) => {
        e.preventDefault()
        const { name, description, image } = this.state
        this.setState(prevState => ({
            showForm: !prevState.showForm
        }))
        const recipe = {
            name,
            description,
            image
        }
        console.log(recipe)
        if (this.state.showForm) {
            axios.post(this.recipeUrl, recipe)
                .then(res => {
                    let recipe = res.data
                    this.setState((prevState) => ({
                        recipes: [...prevState.recipes, recipe],
                    }));
                }).catch((e) => console.log(e))
        }
        this.setState({
            name: "",
            description: "",
            image: ""
        })
    }
    handleName = (e) => {
        this.setState({ name: e.target.value })
    }
    handleDesc = (e) => {
        this.setState({ description: e.target.value })
    }
    handleImg = (e) => {
        this.setState({ image: e.target.value })
    }
    form = () => {
        return (
            <form style={{ width: '70%' }} onSubmit={this.addRecipe} className={`form ${this.state.showForm}Form`}>
                <label>Name *</label>
                <input placeholder="Spaghetti" onChange={this.handleName} value={this.state.name}></input>
                <br></br>
                <label>Ingredients *</label>
                <textarea placeholder="Marinara sauce, ground beef, pasta noodles, zucchini, basil, mushrooms" onChange={this.handleDesc} value={this.state.description}></textarea>
                <br></br>
                <label>Image URL: *</label>
                <input placeHolder="spaghetti.png" onChange={this.handleImg} value={this.state.image}></input>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        )
    }
    render() {
        const {loaded} = this.state
        const {theme} = this.props 
        const border = `2px solid ${theme ? "black" : "whitesmoke"}`
        const pass = "2px solid rgb(74, 193, 138)"
        const nopass = "2px solid  rgb(253, 178, 178)"
        return (
            <div>
                {this.getNav()}
                <Fade>
               <div className ="flex spaceEvenly">
                   
                   <div className = "flex baseLine">
                   <div className ="mr" style ={{borderRight: border}}>
                   <h2 className ="no mr" style = {{borderBottom:nopass}}>In progress:</h2>
                   <div className ="flex">
                       {loaded && this.getRecipeCardsNotDone()}
                   </div>
                   </div>
                   <div>
                   <h2 className =" pass" style = {{borderBottom:pass}}>Finished:</h2>
                   <div className ="flex">
                       {loaded && this.getRecipeCardsDone()}
                   </div>
                   </div>
                   </div>
               </div>
               </Fade>
            </div>
        )
    }
}
export default connect(
    state => {
        return { count:state.count, theme: state.theme};
    }
)(Day20);