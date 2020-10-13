import React from "react"
import Card from "./Components1/day9/Card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarTimes, faSmile } from '@fortawesome/free-solid-svg-icons'
import FlipMove from 'react-flip-move';
import {inktoberEntries,promptListUrl,about,future} from './Components1/day9/inktoberEntries'
export default class Day9 extends React.Component {
    constructor() {
        super()
        this.state = {
            likes: [],
            active: [],
            filtered: [],
            activeList: 0,
        }
    }
    makeCards = (notLikes) => {
        const { active } = this.state
        let cards = []
        let index = 0
        let titles = inktoberEntries
        titles.forEach((obj, i) => {
            if (Array.isArray(obj.src)) {
                obj.src.forEach((x, ind) => {
                    cards.push(<Card notLikes={notLikes} active={active} i={ind + i + titles.length} handleLike={this.handleLike} src={x} day={i + 1} title={`${obj.title} ${ind + 1}`} />)
                })
            }
            else {
                cards.push(<Card notLikes={notLikes} active={active} i={i} handleLike={this.handleLike} src={obj.src} day={i + 1} title={obj.title} />)
            }
        })
        return cards.reverse()
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
    handleSearchInput = (e) => {
        let titles = inktoberEntries
        let value = e.target.value !== "" ? e.target.value : null
        let allTitles = titles.map((obj) => obj.title)
        let titleNum = Number(value) - 1
        if (allTitles.join().includes(value)) {
            this.setState({
                filtered: titles.reduce((prev, next, i) => {
                    if (next.title.includes(value)) {
                        if (Array.isArray(next.src)) {
                            next.src.forEach((x, ind) => {
                                prev.push(ind + i + titles.length)
                            })
                        }
                        else {
                            prev.push(i)
                        }
                    }
                    return prev
                }, [])
            })
        }
        else if (titles[titleNum]) {
            if (Array.isArray(titles[titleNum].src)) {
                let arr = []
                titles[titleNum].src.forEach((x, i) => {
                    arr.push(titleNum + titles.length + i)
                })
                this.setState({
                    filtered: [...arr]})
            }
            else {
                this.setState({
                    filtered: [titleNum]})
            }
        }

        else {
            this.setState({
                filtered: []})
        }
    }
    getNavList = () => {
        let list = ['All', 'Likes', 'Prompt List', 'About']
        const { activeList } = this.state
        return list.map((x, i) => {
            return (
                <li i={i} className="navList" style={{ fontSize: '1.2em', borderBottom: activeList == i ? "2px solid #E0C3FC" : "2px solid transparent" }} onClick={() => this.handleToggle(i)} >{x}</li>
            )
        })
    }
    pageItems = () => {
        const { activeList, likes } = this.state
        switch (activeList) {
            case 0:
                return (
                    <FlipMove>
                        <div className="flex center">
                            {this.makeCards(true)}
                        </div>
                    </FlipMove>)
            case 1:
                return (
                    <div className="flex center">
                        {likes.length > 0 ? likes :
                            <h3>Empty :( Click the heart icon to like!</h3>}
                    </div>)
            case 2:
                return (
                    <div className="flex center down">
                        <img src={promptListUrl} />
                    </div>)
            case 3:
                return (
                    <div style={{ backgroundColor: "#222", padding: 30, color: "white", margin: '0 auto', marginTop: 20, fontSize: '1.5em', width: '50%', borderRadius: 5 }}>
                        <div className="flex center up">
                            <p>I drew these with pen and then scanned using Adobe Capture <FontAwesomeIcon icon={faSmile} /> </p>
                        </div>
                        <div className="up">
                            <p>{about}</p>
                            <p>{future}</p>
                            <p className="flex center"><a href="https://inktober.com/" target="_blank">Official Inktober Website</a></p>
                        </div>
                    </div>
                )
        }
    }
    handleClear = () => {
        this.setState({
            filtered: []
        })
        this.refs.input.value = ""
    }
    render() {
        const { filtered } = this.state
        return (
            <div className="day9">
                <div className="flex center bold">
                    <h1><b>Inktober is here!</b> </h1>
                </div>
                <nav className="nav center " >
                    {this.getNavList()}
                    <li><input ref="input" placeholder="Search by day or name..." onChange={this.handleSearchInput}></input><FontAwesomeIcon onClick={this.handleClear} icon={faCalendarTimes} /></li>
                </nav>
                {filtered.length > 0 ?
                    <div className="flex center down">
                        {this.makeCards(true).filter((x, ind) => {
                            return filtered.includes(x.props.i)
                        })}
                    </div> : <div className="down">{this.pageItems()}</div>}
            </div>
        )
    }
}