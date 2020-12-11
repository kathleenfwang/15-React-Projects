import React from "react"
import axios from "axios"
import RecipeCard from "./Components2/day20/RecipeCard"
import GetRecipeCards from "./Components2/day20/GetRecipeCards"
import NavOptions from "./Components2/day20/NavOptions"
import { connect } from "react-redux";
import { Fade, Slide, Rotate } from 'react-reveal';
class Day20 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: null,
            loaded: false,
            showForm: false,
            showLoginForm: false,
            name: "",
            description: "",
            image: "",
            username: "",
            password: "",
            isLoggedIn: false,
            user: "",
            buttonmsg: "",
            defaultMsg: "Must be logged in first to add/move recipes",
            tab: 0
        }
        this.proxyurl = "https://tranquil-bastion-97053.herokuapp.com/"
        this.secondProxy = "https://cors-anywhere.herokuapp.com/"
        this.recipeUrl = `${this.secondProxy}${process.env.REACT_APP_RECIPE_URL}`
        this.userUrl = `${this.proxyurl}${process.env.REACT_APP_USER_URL}`
        this.userLogin = `${this.proxyurl}${process.env.REACT_APP_USER_URL}/login`
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
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.count !== this.props.count || prevState.username !== this.state.username) this.getRecipes()
    }
    getRecipeCards = (done, showUser = false) => {
        const { recipes, user } = this.state
        return recipes.map((recipe) => {
            if (!showUser) {
                if (done) {
                    if (recipe.done) return <RecipeCard username={user} recipe={recipe} />}
                else {
                    if (!recipe.done) return <RecipeCard username={user} recipe={recipe} />}
            }
            else {
                if (done) {
                    if (recipe.done && (user === recipe.author)) return <RecipeCard username={user} recipe={recipe} />}
                else {
                    if (!recipe.done && (user === recipe.author)) return <RecipeCard username={user} recipe={recipe} />}
            }
        }).reverse()
    }

    addRecipe = (e) => {
    
        e.preventDefault()
        const { name, description, image, user} = this.state
        this.setState(prevState => ({
            showForm: !prevState.showForm
        }))
        const recipe = {
            name,
            description,
            image,
            author: user
        }
            axios.post(this.recipeUrl, recipe, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
                .then(res => {
                    let recipe = res.data
                    console.log(recipe)
                    this.setState((prevState) => ({
                        recipes: [...prevState.recipes, recipe],
                    }));
                }).catch((e) => console.log(e))
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
        let value = e.target.value
            this.setState({ password: value })
    }
    form = () => {
        const { defaultMsg } = this.state
        if (!this.state.isLoggedIn) {
            return (
                <div className="warning">{defaultMsg}</div>
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
        const { buttonmsg } = this.state
        let placeholderUser = ""
        let placeholderPass = ""
        let loginFunc = this.handleNewLogin

        if (buttonmsg == "Log In") {
            loginFunc = this.handleLogin
            placeholderUser = "Demo: a"
            placeholderPass = "Demo: 123"
        }
        return (
            <form style={{ width: '70%' }} onSubmit={loginFunc} className={`form ${this.state.showLoginForm}Form`}>
                <label>Username *</label>
                <input required placeholder={placeholderUser} onChange={this.handleUserName} value={this.state.username}></input>
                <br></br>
                <label>Password *</label>
                <input required type="password" placeholder={placeholderPass} onChange={this.handlePass} value={this.state.password}></input>
                <br></br>
                <button type="submit">{buttonmsg}</button>
            </form>
        )
    }
    handleLogin = (e, msg) => {
        e.preventDefault()
        const { username, password, showLoginForm, isLoggedIn } = this.state
        // logout 
        if (isLoggedIn) {
            this.setState({
                user: "",
                isLoggedIn: false
            })
        }
        //signup
        else if (msg === "Sign Up") {
            this.setState(prevState => ({
                buttonmsg: msg
            }))
            this.handleNewLogin(e)
        }
        else {

            this.setState(prevState => ({
                showLoginForm: !prevState.showLoginForm,
                buttonmsg: msg
            }))
            const user = {
                username,
                password
            }
            if (showLoginForm) {
                axios.post(`${this.userLogin}`, user)
                    .then(res => {
                        let result = res.status
                        if (result == 200) {
                            this.setState(
                                {
                                    isLoggedIn: true, user: username
                                })
                        }
                        else {
                            this.setState({ defaultMsg: 'Invalid username/password' })
                        }
                    }).catch((e) => {
                        if (e.response.data.message) {
                            console.log(e.response)
                            this.setState({ defaultMsg: e.response.data.message })
                        }
                    })
            }
            this.setState({
                username: "",
                password: "",
            })
        }
    }
    handleNewLogin = (e) => {
        e.preventDefault()
        const { username, password } = this.state
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
                    this.setState({
                        user: username,
                        isLoggedIn: true
                    })
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status !== 500) {
                            this.setState({ defaultMsg: "Username already exists" })
                        }
                    }
                    else { console.log(error) }
                })
        }
        this.setState({
            username: "",
            password: "",
        })
    }
    getNav = () => {
        const { isLoggedIn, user } = this.state
        return (
            <nav className="alignCenter">
                <div className="flex">
                    <li> <h1>Recipe Library </h1></li>
                    <li> <button onClick={this.addRecipe}>Add Recipe </button></li>
                    <li><button onClick={(e) => this.handleLogin(e, "Log In")}>{isLoggedIn ? "Logout" : "Login"}</button></li>
                    <li>{this.form()}</li>
                    <li>{this.loginForm()}</li>
                </div>
                <div className="flex">
                    {isLoggedIn && <li className="miniCard">{`Hi ${user}!`}</li>}
                    <li>{!isLoggedIn && <button onClick={(e) => this.handleLogin(e, "Sign Up")}>Sign Up</button>}</li>
                </div>
            </nav>)
    }
    setOptionNav = (tab) => {
        this.setState({ tab: tab })
    }
    handleOptionNav = () => {
        const { isLoggedIn } = this.state
        const { loaded, tab } = this.state
        const { theme } = this.props
        if (tab === 1) {
            if (!isLoggedIn) return (<div className="down">Must be logged in to view!</div>)
            else {
                return (<GetRecipeCards loaded={loaded} function={this.getRecipeCards} params={{ first: [false, "user"], second: [true, "user"] }} />) }
        }
        if (tab === 0) {
            // return "all" 
            return (<GetRecipeCards loaded={loaded} function={this.getRecipeCards} params={{ first: [false], second: [true] }} />)}
    }
    getOptionNav = () => {
        const { tab } = this.state
        const titles = ["All", "My Recipes"]
        return (
            <NavOptions titles = {titles} tab = {tab} functionName = {this.setOptionNav} />
        )
    }
    render() {
        return (
            <div>
                {this.getNav()}
                <Fade>
                    <div className="flex spaceEvenly">
                        {this.getOptionNav()}
                        {this.handleOptionNav()}
                    </div>
                </Fade>
            </div>
        )
    }
}
export default connect(
    state => {
        return { count: state.count, theme: state.theme };
    }
)(Day20);