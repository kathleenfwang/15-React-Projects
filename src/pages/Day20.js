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
            showLoginForm: false,
            name: "", 
            description: "", 
            image: "", 
            username: "", 
            password: "", 
            isLoggedIn: false,
            user: ""
        }
        this.proxyurl = "https://cors-anywhere.herokuapp.com/"
        this.recipeUrl =   `${this.proxyurl}${process.env.REACT_APP_RECIPE_URL}`
        this.userUrl =   `${this.proxyurl}${process.env.REACT_APP_USER_URL}`
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
    handleUserName = (e) => {
        this.setState({ username: e.target.value })
    }
    handlePass = (e) => {
        this.setState({ password: e.target.value })
    }
    form = () => {
        if (!this.state.isLoggedIn) {
            return (
                <div>Must be logged in first to add recipe</div>
            )
        }
        return (
            <form style={{ width: '70%' }} onSubmit={this.addRecipe} className={`form ${this.state.showForm}Form`}>
                <label>Name *</label>
                <input placeholder="Spaghetti" onChange={this.handleName} value={this.state.name}></input>
                <br></br>
                <label>By: </label>
                <input value={this.state.user}></input>
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
    loginForm = () => {
        return (
            <form style={{ width: '70%' }} onSubmit={this.handleLogin} className={`form ${this.state.showLoginForm}Form`}>
                <label>Username *</label>
                <input placeholder="Spaghetti" onChange={this.handleUserName} value={this.state.username}></input>
                <br></br>
                <label>Password *</label>
                <textarea placeholder="" onChange={this.handlePass} value={this.state.password}></textarea>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        )
    }
    handleLogin = (e) => {
        e.preventDefault()
        const { username,password,showLoginForm } = this.state
        this.setState(prevState => ({
            showLoginForm: !prevState.showLoginForm
        }))
        if (showLoginForm) {
            axios.post(`${this.userUrl}/login`, {username, password})
                .then(res => {
                    let result = res.status
                    console.log(result)
                    if (result == 200) {
                        this.setState(
                            {isLoggedIn:true, user: username
                            })
                    }
                }).catch((e) => console.log(e))
        }
        this.setState({
            username: "",
            password: "",
        })
    }
    handleNewLogin = (e) => {
        e.preventDefault()
        const { username,password } = this.state
        this.setState(prevState => ({
            showLoginForm: !prevState.showLoginForm
        }))
        const user = {
            username,
            password
        }
        if (this.state.showLoginForm) {
            axios.post(this.userUrl, user)
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
    getNav = () => {
        const {isLoggedIn, user} = this.state
        return(
        <nav className ="alignCenter">
            <div className ="flex">
            <li> <h1>Recipe Library </h1></li>
            <li> <button onClick={this.addRecipe}>Add Recipe </button></li>
            <li><button onClick = {this.handleLogin}>Login/Logout</button></li>
            <li>{this.form()}</li>
            <li>{this.loginForm()}</li>
            </div>
            <div>
                <li>{isLoggedIn && `Hi ${user}!`}</li>
            </div>
        </nav>)
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