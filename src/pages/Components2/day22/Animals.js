import React from "react"
import AnimalCard from "./AnimalCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp, faHamburger } from '@fortawesome/free-solid-svg-icons'
import NavOptions from "../day20/NavOptions"
import axios from "axios"
export default class Animals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            animalDic: {},
            animalPersonalities: {},
            animalHobbies: {},
            loaded: false,
            clickedHamburger: true,
            tab: 0, 
            defaultColors: {}, 
            defaultHobbyColors:{},
            liked: [], 
            isLoggedIn:false,
            user: "",
            username: "",
            password: "",
            showLoginForm:false,
            buttonmsg:"",
            defaultMsg: "Must be logged in first to save",
            userLikes: [], 
            userId: "", 
            combinedLikes: []
        }
        this.animalData = null
        this.colors = { pastel: ["#C1A7FF", "#C2CBFF", "#C7FCBA", "#FDFEC9", "#FFD8B6", " #FEBCC2", "#FD63B0", "#67D0DD"], beach: ["#C8F69B", "#FFEEA5", "#FFCBA5", "#FFB1AF", " #9EE09E", "#B3EEFF", "#E5A4BE", "#A890C3"] }
        this.proxyurl = "https://tranquil-bastion-97053.herokuapp.com/"
        this.userUrl = `${this.proxyurl}${process.env.REACT_APP_USER_URL}`
        this.userLogin = `${this.proxyurl}${process.env.REACT_APP_USER_URL}/login`
        this.userVillagerURL = `${this.proxyurl}${process.env.REACT_APP_USER_VILLAGERS_URL}`
    }
    componentDidMount() {
        this.getAnimals()
    }
   
    makeDictionary = (type) => {
        const { data } = this.props
        let animalDic = {}
        data.forEach((animal) => {
            if (animalDic[animal[type]]) animalDic[animal[type]].push(animal)
            else { animalDic[animal[type]] = [animal] }
        })
        return animalDic
    }
    getAnimals = () => {
        const animalDic = this.makeDictionary("species")
        const animalPersonalities = this.makeDictionary("personality")
        const animalHobbies = this.makeDictionary("hobby")
        this.setState({ animalDic, animalPersonalities, animalHobbies, firstLoad: true }, () => this.getDefaultColors())
    }
    handleLike = (data,filled) => {
        const {liked, isLoggedIn,userId,userLikes,combinedLikes} = this.state
        if (isLoggedIn) {
            if (filled) {
                console.log(userLikes.indexOf(data.id))
                if (userLikes.indexOf(data.id) == -1) {
                    const newLikes = [...userLikes, data.id]
                    axios.put(`${this.userVillagerURL}/${userId}`, {likedVillagers:newLikes  })
                    .then((res) => {
                        this.setState(prevState => ({liked: [...prevState.liked, data], combinedLikes: [...prevState.combinedLikes, data ], userLikes: [...prevState.userLikes, data.id]}))
                    }).catch((e) => console.log(e))
                }
            }
            else {
                const filteredLikes = userLikes.filter((like) => like !== data.id)
                axios.put(`${this.userVillagerURL}/${userId}`, {likedVillagers:filteredLikes})
                .then((res) => this.setState({userLikes: filteredLikes}))
                .catch((e) => console.log(e))
                const filteredLikesState = combinedLikes.filter((like) => like !== data)
            this.setState({liked:filteredLikesState, combinedLikes: filteredLikesState,userLikes: filteredLikes})
            }
        }
        else {
        if (filled) this.setState(prevState => ({liked: [...prevState.liked, data]}))
        else {
            const filteredLikes = liked.filter((like) => like !== data)
            this.setState({liked:filteredLikes})
        }
    }
    }
    getAnimalCards = async () => {
        const result = await this.makeAnimalCards()
        this.animalData = result
        this.setState({ loaded: true })
    }
    makeAnimalCards = () => {
        const { animalDic, defaultColors, defaultHobbyColors} = this.state
        let animalCards = []
        let i = 0
        for (let animal in animalDic) {
            animalCards.push(
                <div id={animal}>
                    <h1 className="textCenter button" style={this.getColor(i)}>{animal}</h1>
                    <div className="flex center">
                        {animalDic[animal].map((animal) => <AnimalCard filled = {false}key={animal.id} data={animal} defaultColors = {defaultColors}defaultHobbyColors = {defaultHobbyColors} handleLike = {this.handleLike} />)}
                    </div>
                </div>)
            i++
        };
        return animalCards
    }
    handleHamburger = (e) => {
        this.setState(prevState => ({ clickedHamburger: !prevState.clickedHamburger }))
    }
    getHeaderTags = () => {
        const { animalDic } = this.state
        let i = 0
        let buttons = []
        for (let animal in animalDic) {
            buttons.push(<div className="bigger margin"><a href={`#${animal}`}><button style={this.getColor(i)}>{animal}</button></a></div>)
            i++
        }
        return buttons
    }
    getDefaultColors = () => {
        const {animalPersonalities,animalHobbies} = this.state
        const defaultColors = this.defaultColorsHelper(Object.keys(animalPersonalities),"personality")
        const defaultHobbyColors = this.defaultColorsHelper(Object.keys(animalHobbies),"hobby")
        this.setState({defaultColors, defaultHobbyColors}, () => this.getAnimalCards())
    }
    defaultColorsHelper = (array,type) => {
        const palette = type == "hobby" ? "beach" : "pastel"
        const {colors} = this
        const defaultColors = array.reduce((prev,next,i) => {
            prev[next] = colors[palette][i % colors[palette].length]
            return prev},{})
        return defaultColors
    }
    getColor = (i) => {
        const {colors} = this
        const color = i % colors.beach.length
        return { backgroundColor: colors.beach[color], color: "rgb(99, 89, 89)" }
    }
    getArrow = () => {
        const arrowStyle = {
            position: "fixed",
            right: 30,
            bottom: "30px",
        }
        return <a href="#start" style={arrowStyle}> <button><FontAwesomeIcon icon={faArrowUp} /></button></a>
    }
    getFixedHeader = () => {
        const { loaded, clickedHamburger } = this.state
        return (
            <div className="flex fixedHeader">
                <div  className="cursor" onClick={this.handleHamburger} ><button style={{ width: 40 }}><FontAwesomeIcon icon={faHamburger} /></button></div>
                <div className={`flex ${clickedHamburger}Form`}>
                    {loaded && this.getHeaderTags()}
                </div>
            </div>)
    }
    setOptionNav = (tab) => {
        this.setState({ tab: tab })
    }
    getOptionNav = () => {
        const { tab } = this.state
        const titles = ["All", "|","My Collection"]
        return (
            <NavOptions titles = {titles} tab = {tab} functionName = {this.setOptionNav} />
        )
    }
    getLikedVillagers = () => {
        const {isLoggedIn, userLikes,liked, combinedLikes} = this.state 
        if (isLoggedIn && userLikes.length > 0) return this.mapLikedAnimalCards(combinedLikes)
        else { return this.mapLikedAnimalCards(liked)}
    }
    mapLikedAnimalCards = (liked) => {
        const {defaultColors, defaultHobbyColors} = this.state
        return liked.map((animal) => <AnimalCard key={animal.id} filled ={true} data={animal}  defaultColors = {defaultColors} defaultHobbyColors = {defaultHobbyColors} handleLike = {this.handleLike} />)
    }
    getLikedStats = () => {
        const {combinedLikes,defaultColors,liked} = this.state 
        const likedStatsArray = []
        let likedStats = []
        let i = 0 
        if (combinedLikes.length > 0) {
           likedStats= combinedLikes.reduce((prev,next) => {
                prev[next.personality] ? prev[next.personality]++ : prev[next.personality] = 1 
                return prev}, {})
        }
        else {
            likedStats= liked.reduce((prev,next) => {
                prev[next.personality] ? prev[next.personality]++ : prev[next.personality] = 1 
                return prev}, {})
        }
        for (let stat in likedStats) {
            likedStatsArray.push(<p style ={{fontWeight:"bold",backgroundColor: defaultColors[stat]}}className="smallTag upLess">{`${stat} | ${likedStats[stat]}`}</p>)
            i++
        }
        return likedStatsArray
    }
    getTypeStats = () => {
        const {combinedLikes,liked} = this.state 
        const likedStatsArray = []
        let likedStats = []
        let i = 0 
        if (combinedLikes.length > 0) {
           likedStats =  combinedLikes.reduce((prev,next) => {
                prev[next.species] ? prev[next.species]++ : prev[next.species] = 1 
                return prev}, {})
        }
        else {
           likedStats =  liked.reduce((prev,next) => {
                prev[next.species] ? prev[next.species]++ : prev[next.species] = 1 
                return prev}, {})
        }
      
        for (let stat in likedStats) {
            likedStatsArray.push(<p style ={this.getColor(i)}className="smallTag upLess"><b>{`${stat} | ${likedStats[stat]}`}</b></p>)
            i++
        }
        return likedStatsArray
    }
    handleOptionNav = () => {
        // const { isLoggedIn } = this.state
        const { loaded, tab,liked, isLoggedIn, userLikes } = this.state
        if (tab === 2) {
              return (liked.length == 0 && userLikes.length == 0) ? null : (<>
                 <div className ="flex center">{this.getLikedStats()}</div>
                 <div className ="flex center">{this.getTypeStats()}</div>
                  <div className ="flex center">{this.getLikedVillagers()}</div>
                  {!isLoggedIn && <h2 className ="textCenter">Log in to save your collection!</h2>}
                  </>)
        }
        if (tab === 0) return (loaded && this.animalData)
    }
    getNav = () => {
        const { isLoggedIn, user, defaultMsg } = this.state
        return (
            <nav className="alignCenter flexEnd">
                <div className="flex">
                    <li><button onClick={(e) => this.handleLogin(e, "Log In")}>{isLoggedIn ? "Logout" : "Login"}</button></li>
                    <li>{this.loginForm()}</li>
                </div>
                <div className="flex">
                    <li className="miniCard">{isLoggedIn ? `Hi ${user}!` : defaultMsg}</li>
                    <li>{!isLoggedIn && <button onClick={(e) => this.handleLogin(e, "Sign Up")}>Sign Up</button>}</li>
                </div>
            </nav>)
    }
    getUserData = () => {
        const {user,liked} = this.state
        const {data} = this.props
        let newLikes = []
        let combinedLikes = []
        axios.get(`${this.userVillagerURL}/${user}`)
        .then((res) => {
            const result = res.data
            if (result.likedVillagers.length > 0) {
                const userLikes = result.likedVillagers
                const userLikesData = userLikes.map((id) => data[id-1])
                combinedLikes =[...liked,...userLikesData]
                this.setState({combinedLikes})
            }
                
            if (liked.length > 0) {
                // add liked data to user if any 
                newLikes = liked.map((like) => like.id)
                let newAddedLikes = [...result.likedVillagers,...newLikes]
                axios.put(`${this.userVillagerURL}/${result._id}`, {likedVillagers:newAddedLikes })
                .then((res)=>console.log('added to new person')).catch((e) => console.log(e.response))
                }
            combinedLikes = combinedLikes.length == 0 ? combinedLikes = liked : combinedLikes
            this.setState({userId: result["_id"], combinedLikes: combinedLikes, userLikes: [...result.likedVillagers,...newLikes]})
        })
    }
    handleLogin = (e, msg) => {
        e.preventDefault()
        const { username, password, showLoginForm, isLoggedIn} = this.state
        // logout 
        if (isLoggedIn) {
            this.setState({
                user: "",
                isLoggedIn: false, 
                liked: [],
                combinedLikes: [],
                userLikes: []
            })
        }
        //signup
        else if (msg === "Sign Up") {
            this.setState(prevState => ({buttonmsg: msg}))
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
                        if (result == 200) this.setState({isLoggedIn: true, user: username}, () => this.getUserData())
                        else {
                            this.setState({ defaultMsg: 'Invalid username/password' })
                        }
                    }).catch((e) => {
                        if (e.response) this.setState({ defaultMsg: e.response.data.message })
                    })
            }
            this.setState({
                username: "",
                password: "",
            })
        }
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
    handleUserName = (e) => {
        this.setState({ username: e.target.value })
    }
    handlePass = (e) => {
        let value = e.target.value
            this.setState({ password: value })
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
                    }, () => this.getUserData())
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status !== 500) {
                            this.setState({ defaultMsg: "Username already exists" })
                        }
                    }
                    else { console.log(error.response) }
                })
        }
        this.setState({
            username: "",
            password: "",
        })
    }
    render() {
        const {tab,user} = this.state
        return (
            <div className="day22" id="start">
                {this.getNav()}
                {tab == 0 ? this.getFixedHeader() : null}
                <div className="downHeader">
                {this.getOptionNav()}
                <h2>Double click an icon to add/remove to your collection!</h2>
                {this.handleOptionNav()}
                </div>
                {this.getArrow()}
            </div>
        )
    }
}