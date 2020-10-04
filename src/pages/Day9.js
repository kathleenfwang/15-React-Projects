import React from "react"
import Card from "./Components1/day9/Card"
export default class Day9 extends React.Component {
    constructor() {
        super()
        this.state = {
            show: true,
            likes: [],
            active: [],
            filtered: null,
            promptList: false
        }
        this.srcs = ['https://media.discordapp.net/attachments/701277128951595030/762123087553888307/Shape_4.png?width=347&height=490', 'https://media.discordapp.net/attachments/701277128951595030/762123167476613130/Shape_5.png?width=355&height=489', 'https://media.discordapp.net/attachments/701277128951595030/762116290059698186/imgonline-com-ua-twotoone-DRi4gTlNCiK6Jvq.jpg?width=403&height=457',]
        this.titles = ['fish', 'wisp', 'bulky',]
        this.promptListUrl = 'https://media.discordapp.net/attachments/701277128951595030/762183039857065994/official-inktober-2020-prompt-list.png?width=461&height=461'
    }
    makeCards = (notLikes) => {
        const { active } = this.state
        return this.titles.map((title, i) => {
            return (
                <Card key={i} notLikes={notLikes} active={active} i={i} handleLike={this.handleLike} src={this.srcs[i]} day={i + 1} title={title} />)
        })
    }
    handleLike = (i) => {
        const { active } = this.state
        // if already liked, take away like status
        if (active.includes(i)) {
            this.setState(prevState => ({
                active: [...prevState.active.filter((x) => x !== i)],
                likes: [...prevState.likes.filter((x) => {
                    return x.props.i !== i
                })],
            }))
        }
        else {
            this.setState((prevState) => ({
                likes: [...prevState.likes, ...this.makeCards(false).filter((x) => {
                    return x.props.i === i
                })],
                active: [...prevState.active, i]
            }))
        }
    }
    handleToggle = () => {
        this.setState((prevState) => ({
            show: !prevState.show, 
            promptList: false
        }))
    }
    handleInput = (e) => {
        let value = e.target.value
        let days = this.titles.length
        if (this.titles.includes(value.toLowerCase()) || (value >= 0 && value <= days)) {
            if (Number(value)) {

                this.setState({
                    filtered: Number(value) - 1
                }
                )
            }
            else {

                this.setState({
                    filtered: this.titles.indexOf(value) !== -1 ? this.titles.indexOf(value) : null
                })
            }
        }
        else {
            this.setState({
                filtered: null,
                promptList: false
            })
        }
    }
    handlePromptList = () => {
        this.setState(prevState => ({
            promptList: !prevState.promptList
        }))
    }
   
    render() {
        const { show, likes, filtered, promptList } = this.state
        console.log(promptList)
        return (
            <div className="day9">
                <div className="flex">
                    <h1>Inktober is here! </h1>
                    <h4>I drew these with pen and then scanned into my computer using Adobe Capture :) </h4>
                </div>
                <nav className="nav center" >
                    <li style={{ borderBottom: show ? "2px solid pink" : "none" }} onClick={this.handleToggle}>All</li>
                    <li style={{ borderBottom: show ? "none" : "2px solid pink" }} onClick={this.handleToggle}>Likes</li>
                    {/* <li onClick={this.handlePromptList}>Prompt List</li> */}
                    <li><input placeholder="Search by day or name..." onChange={this.handleInput}></input></li>

                </nav>
                { promptList ?
                    <div className ="flex center down">
                        <img src={this.promptListUrl} />
                    </div> : filtered || filtered == 0 ?
                        <div className="flex center">
                            {this.makeCards(true)[filtered]}
                        </div>
                        :
                        show ? <div className="flex center">
                            {this.makeCards(true)}
                        </div>
                            :
                            <div>
                                <div className="flex center">
                                    {likes.length > 0 ? likes : <h3>Empty :( Click the heart icon to like!</h3>}
                                </div>
                            </div>
                }
            </div>
        )
    }
}