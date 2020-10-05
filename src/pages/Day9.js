import React from "react"
import Card from "./Components1/day9/Card"
export default class Day9 extends React.Component {
    constructor() {
        super()
        this.state = {
            likes: [],
            active: [],
            filtered: [],
            activeList: 0,
            titles: ['fish', 'wisp', 'bulky','radio']
        }
        this.promptListUrl = 'https://media.discordapp.net/attachments/701277128951595030/762183039857065994/official-inktober-2020-prompt-list.png?width=461&height=461'
        this.srcs = ['https://media.discordapp.net/attachments/701277128951595030/762123087553888307/Shape_4.png?width=347&height=490', 'https://media.discordapp.net/attachments/701277128951595030/762123167476613130/Shape_5.png?width=355&height=489', 'https://media.discordapp.net/attachments/701277128951595030/762116290059698186/imgonline-com-ua-twotoone-DRi4gTlNCiK6Jvq.jpg?width=403&height=457','https://media.discordapp.net/attachments/701277128951595030/762471917680459786/Shape_9.png?width=327&height=491']
 

    }
    makeCards = (notLikes) => {
        const { active,titles } = this.state
        return titles.map((title, i) => {
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
    handleToggle = (i) => {
        this.setState({
            activeList: i
        })
    }
    handleInput = (e) => {
        const {titles} =this.state
        let value = e.target.value !== "" ? e.target.value : null
        if (titles.join().includes(value)) {
            this.setState({
                filtered: titles.reduce((prev, next, i) => {
                    if (next.includes(value)) prev.push(i)
                    return prev
                }, [])
            })
        }
        else if (titles[Number(value) - 1]) {
            this.setState({
                filtered: [Number(value) - 1]
            })
        }
        else {
            this.setState({
                filtered: []
            })
        }
    }
    getList = () => {
        let list = ['All', 'Likes', 'Prompt List']
        const { activeList } = this.state
        return list.map((x, i) => {
            return (
                <li i={i} style={{ borderBottom: activeList == i ? "2px solid pink" : "none" }} onClick={() => this.handleToggle(i)} >{x}</li>
            )
        })
    }
    items = () => {
        const { activeList, filtered, likes } = this.state
        switch (activeList) {
            case 0:
                return (
                    <div className="flex center">
                        {this.makeCards(true)}
                    </div>)
            case 1:
                return (
                    <div className="flex center">
                        {likes.length > 0 ? likes :
                            <h3>Empty :( Click the heart icon to like!</h3>}
                    </div>)
            case 2:
                return (
                    <div className="flex center down">
                        <img src={this.promptListUrl} />
                    </div>)
        }
    }
    render() {
        const { filtered } = this.state
        return (
            <div className="day9">
                <div className="flex">
                    <h1>Inktober is here! </h1>
                    <h4>I drew these with pen and then scanned into my computer using Adobe Capture :) </h4>
                </div>
                <nav className="nav center " >
                    {this.getList()}
                    <li><input placeholder="Search by day or name..." onChange={this.handleInput}></input></li>
                </nav>
                {filtered.length > 0 ?
                    <div className="flex center">
                        {this.makeCards(true).filter((x, i) => {
                            return filtered.includes(i)
                        })}
                    </div> : this.items()}
            </div>
        )
    }
}