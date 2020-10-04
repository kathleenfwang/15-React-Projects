import React from "react"
import Card from "./Components1/day9/Card"
export default class Day9 extends React.Component {
    constructor() {
        super()
        this.state = {
            show: true,
            likes: [],
            active: [] 
        }
        this.srcs = ['https://media.discordapp.net/attachments/701277128951595030/762123087553888307/Shape_4.png?width=347&height=490','https://media.discordapp.net/attachments/701277128951595030/762123167476613130/Shape_5.png?width=355&height=489','https://media.discordapp.net/attachments/701277128951595030/762116290059698186/imgonline-com-ua-twotoone-DRi4gTlNCiK6Jvq.jpg?width=403&height=457', ]
        this.titles = ['fish','wisp','bulky',]
    }
    makeCards = (notLikes) => {
        const {active} = this.state
        return this.titles.map((title,i) =>  {
            return(
                <Card key = {i} notLikes = {notLikes} active = {active} i = {i} handleLike = {this.handleLike} src = {this.srcs[i]} day = {i+1} title ={title}/>)
        })
    }
    handleLike = (key) => {
        this.setState((prevState) => ({
            likes: [...prevState.likes,this.makeCards(false)[key]],
            active: [...prevState.active,key]
        }))
    }
    handleToggle = () => {
        this.setState((prevState) => ({
            show: !prevState.show
        }))
    }
    render() {
        console.log(this.state.likes)
        const {show,likes} = this.state
        return(
            <div className ="day9">
                <h1>Inktober is here! </h1>
    
                <p>I drew these with ink and then scanned them into my computer using Adobe Capture :) </p>
                <nav className ="nav center" >
                    <li style ={{borderBottom: show ? "2px solid pink" : "none"}} onClick ={this.handleToggle}>All</li>
                    <li style ={{borderBottom: show ? "none" : "2px solid pink"}} onClick ={this.handleToggle}>Likes</li>
                </nav>
                { show ? <div className ="flex center">
                 {this.makeCards(true)}
                 </div> : 
                 <div>
                     <div className ="flex center">
                     {likes.length > 0 ? likes : <h2>Empty :( Click the heart icon to like!</h2>}
                     </div>
                 </div>
                }
                
            </div>
        )
    }
}