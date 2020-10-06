import React from "react"
import Card from "./Components1/day9/Card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarTimes, faSmile} from '@fortawesome/free-solid-svg-icons'
export default class Day9 extends React.Component {
    constructor() {
        super()
        this.state = {
            likes: [],
            active: [],
            filtered: [],
            activeList: 0,
        }
        this.promptListUrl = 'https://media.discordapp.net/attachments/701277128951595030/762183039857065994/official-inktober-2020-prompt-list.png?width=490&height=490'

        this.titles = [
            {
                title: 'fish',
                src: 'https://media.discordapp.net/attachments/701277128951595030/762123087553888307/Shape_4.png?width=347&height=490',
            },
            {
                title: 'wisp',
                src: 'https://media.discordapp.net/attachments/701277128951595030/762123167476613130/Shape_5.png?width=355&height=489',
            },
            {
                title: 'bulky',
                src: 'https://media.discordapp.net/attachments/701277128951595030/762116290059698186/imgonline-com-ua-twotoone-DRi4gTlNCiK6Jvq.jpg?width=403&height=457',
            },
            {
                title: 'radio',
                src: ['https://media.discordapp.net/attachments/701277128951595030/762471917680459786/Shape_9.png?width=327&height=491', 'https://media.discordapp.net/attachments/519058439339507743/762476509633576990/Shape_10.png'],
            },
            {
                title: 'blade',
                src: 'https://media.discordapp.net/attachments/701277128951595030/762848428199641138/Shape_14.png?width=340&height=490'
            }, 
            {
                title: 'rodent',
                src: 'https://media.discordapp.net/attachments/701277128951595030/763182790686277662/Shape_15.png'
            }
        ]
    }
    makeCards = (notLikes) => {
        const { active } = this.state
        let cards = []
        let index = 0
        let titles = this.titles
        titles.forEach((obj,i) =>{
            if (Array.isArray(obj.src)) {
                obj.src.forEach((x,ind) =>{
 
                    cards.push(<Card notLikes={notLikes} active={active} i={ind + i +titles.length } handleLike={this.handleLike} src={x} day={i + 1} title={`${obj.title} ${ind+1}`} />)
                })
            }
            else {
            cards.push(<Card notLikes={notLikes} active={active} i={i} handleLike={this.handleLike} src={obj.src} day={i + 1} title={obj.title} />)
            }
        })
        return cards
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
        let titles = this.titles
        let value = e.target.value !== "" ? e.target.value : null
        let allTitles = titles.map((obj) => obj.title)
        let titleNum = Number(value)-1
        if (allTitles.join().includes(value)) {
            this.setState({
                filtered: titles.reduce((prev, next, i) => {
                    if (next.title.includes(value)) 
                    {   
                         if (Array.isArray(next.src)) {
                            next.src.forEach((x,ind) => {
                                 prev.push(ind + i + titles.length) })}
                         else {
                         prev.push(i)}}
                    return prev
                }, [])
            })
        }
        else if (titles[titleNum]) {
            if (Array.isArray(titles[titleNum].src)){
                let arr = [] 
                titles[titleNum].src.forEach( (x,i) =>{
                    arr.push(titleNum + titles.length + i)
                })
                this.setState({
                    filtered:[...arr]
                })
            }
                else {
                    this.setState({
                        filtered:[titleNum]
                    })
                }
            }
      
        else {
            this.setState({
                filtered: []
            })
        }
    }
    getList = () => {
        let list = ['All', 'Likes', 'Prompt List', 'About']
        const { activeList } = this.state
        return list.map((x, i) => {
            return (
                <li i={i} className="navList" style={{ fontSize: '1.2em',borderBottom: activeList == i ? "2px solid #E0C3FC" : "2px solid transparent" }} onClick={() => this.handleToggle(i)} >{x}</li>
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
            case 3:
                return (
                    <div style={{ backgroundColor:"#222", padding: 30, color: "white", margin: '0 auto', marginTop: 40, fontSize:'1.5em', width: '50%', borderRadius:5}}>
                        <div className = "flex center">
                        <p>I drew these with pen and then scanned using Adobe Capture <FontAwesomeIcon icon = {faSmile}/> </p>
                        </div>
                        <div  >
                        <p>Honestly this is my first year I am really trying to commit the whole month of Inktober. Every other year I attempt to but ultimately forget after the first week, due to the business of everyday life. This year's Inktober is during quarantine, so what other commitments could I possibly have.
                        </p>
                        <p>In the future, I am planning on converting this into a full stack app with database storage and authentication, to allow authenticated users to upload their entries and like and comment on others. <br></br>It would be a convenient and fun way to encourage my friends to participate and share our progress together.</p>
                        <p className ="flex center"><a href="https://inktober.com/" target="_blank">Official Inktober Website</a></p>
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
                    {this.getList()}
                    <li><input ref = "input" placeholder="Search by day or name..." onChange={this.handleInput}></input><FontAwesomeIcon onClick = {this.handleClear} icon = {faCalendarTimes}/></li>
                </nav>
                {filtered.length > 0 ?
                    <div className="flex center down">
                        {this.makeCards(true).filter((x,ind) => {
                            return filtered.includes(x.props.i)  
                        })}
                    </div> : <div className="down">{this.items()}</div>}
            </div>
        )
    }
}