import React, {useRef,useState} from "react"
import Projects from "./Projects"
import Day from "./Day"
import {Link, Redirect} from "react-router-dom"
export default function Home() {
    const projList = useRef(null)
    const [clicked,setClick] = useState(false)
    const [randomNum,setRandomNum] = useState(null)
    function handleClick(e) {
        let max = (projList.current.children.length)
 
        let randomNum =  Math.floor(Math.random() * Math.floor(max)) + 1;
        console.log(randomNum)
        setClick(!clicked)
        setRandomNum(randomNum)
     
    }
    return (
        <div className="home">
            <div className="firstPanel">
                <div className="pic">
                </div>
                <div>
                    <div>
                        <h1>Hi, I'm Kathleen Wang!</h1>
                        <p>Software Engineer</p>
                    </div>
                    <div className="desc">
                        <p>I enjoy working with multiple problems. I love design and want to study the interesection between art and coding! Also a sucker for pixel art apparently.</p>
                    </div>
                    <div>
                        <div className="links">
                            <p>Twitter</p>
                            <p>Github</p>
                            <p>Linkedin</p>
                        </div>
                    </div>
                    <div className>
                <div>
                    <h1> Projects: <span className ="smallTxt">180 React Projects in 180 Days!</span></h1>
                        <p><i> Inspired by Jennifer Dewalt's <a href="https://jenniferdewalt.com/" target="_blank"> 180 Projects in 180 Days</a></i></p>
                </div>
                <div className="projectList">
                    <button className ="whiteButton" onClick = {handleClick}> Feeling Lucky </button>
                    <ul ref = {projList}>
                        <Day i = "1" title = "This Website"/>
                        <Day i = "2" title = "Solar System"/>
                        <Day i = "3" title = "Animation Practice"/>
                        <Day i = "4" title = "Feelings"/>
                        <Day i = "5" title = "Picture Canvas"/>
                        <Day i ="6" title = "Plants" />
                    </ul>
                </div>
                {clicked ? randomNum == 1 ? <Redirect to = "/"/> : <Redirect to = {`/day/${randomNum}`} /> : null }
            </div>
                </div>

            </div>
            
        </div>

    )
}