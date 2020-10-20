import React from "react"
import Card from "./Components1/day9/Card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSmile, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import FlipMove from 'react-flip-move';
import { Fade, Slide, Rotate } from 'react-reveal';
import { svgDark, svgLight } from "./Components1/day9/svg"
import { inktoberEntries, promptListUrl, about, future,inspo} from './Components1/day9/inktoberEntries'
import { connect } from "react-redux";

class Day9 extends React.Component {
    constructor({ theme }) {
        super({ theme })
        this.state = {
            likes: [],
            active: [],
            filtered: [],
            activeList: 0,
        }
        this.aboutStyle = { backgroundColor: "#222", padding: 30, color: "white", margin: '0 auto', marginTop: 20, fontSize: '1.5em', width: '50%', borderRadius: 5 }
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
        this.setState({ value: value })
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
                    filtered: [...arr]
                })
            }
            else {
                this.setState({
                    filtered: [titleNum]
                })
            }
        }

        else {
            this.setState({
                filtered: []
            })
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
    getAbout = () => {
        return (
            <>
             <p ><a href="https://inktober.com/" target="_blank">Official Inktober Website</a></p>
                <p>{about}</p>
                <p>{future}</p>
               <p>{inspo}</p>
              </>
        )
    }
    getNoLikes = () => {
        return (
            <> <h3>Empty :(</h3>
                <h3>Click the heart icon to like!</h3> </>
        )
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
                    <Fade>
                    <div className="flex center">
                        {likes.length > 0 ? likes :
                            <div className="down textCenter">
                                {this.getNoLikes()}
                                <div style={this.aboutStyle} className="falseShow up">
                                    {this.getAbout()}
                                </div>
                            </div>
                        }
                    </div>
                    </Fade>)
            case 2:
                return (
                    <Fade>
                    <div className="flex center down">
                        <img src={promptListUrl} />
                    </div>
                    </Fade>
                    )
            case 3:
                return (
                    <Fade> 
                        <div className="falseShow">
                            {this.getNoLikes()}
                        </div>
                        <div style={this.aboutStyle}>
                            <div className="flex center">
                                {this.getAbout()}
                            </div>
                        </div>
                    </Fade>
                )
        }
    }
    handleClear = () => {
        this.setState({
            filtered: [],
            value: ""
        })
        this.refs.input.value = ""
    }
    render() {
        const { filtered, value } = this.state
        const { theme } = this.props
        const lightBg = "https://img1.picmix.com/output/stamp/normal/8/4/6/4/1094648_53964.gif"
        const darkBg = "https://i.gifer.com/2iiB.gif"

        return (
            <div   id ="start" className="day9" style={{ backgroundImage: theme ? `url(${lightBg})` : `url(${darkBg})` }} >
                <div className="flex center bold">
                    <h1 ><b>Inktober is here!</b> </h1>
                </div>
                <nav className="nav center " >
                    {this.getNavList()}
                    <li><input ref="input" value={value} placeholder="Search by day or name..." onChange={this.handleSearchInput}></input>{<FontAwesomeIcon className="left" style={{ visibility: value ? "visible" : "hidden" }} onClick={this.handleClear} icon={faTimes} />}</li>
                </nav>
                <Fade>
                {filtered.length > 0 ?
                    <div className="flex center down">
                        {this.makeCards(true).filter((x, ind) => {
                            return filtered.includes(x.props.i)
                        })}
                    </div> : <div className="down">{this.pageItems()}</div>}
                   <div className ="down" style ={{textAlign:"center"}}> 
                   <a href="#start"> <button><FontAwesomeIcon icon ={faArrowUp}/></button></a>
                   </div>
                <div>{theme ? svgDark : svgLight}</div>
            
                </Fade>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { theme: state };
};

export default connect(
    mapStateToProps,
)(Day9);