import React, {useRef,useState} from "react"
import Projects from "./Projects"
import Day from "./Day"
import {Link, Redirect} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal'
export default function Home() {
    const projList = useRef(null)
    const [clicked,setClick] = useState(false)
    const [randomNum,setRandomNum] = useState(null)
    const [recentTitle,setRecentTitle] = useState(null)
    function handleClick(e) {
        let max = (projList.current.children.length) - 1
        let randomNum =  Math.floor(Math.random() * Math.floor(max)) + 2;
        setClick(!clicked)
        setRandomNum(randomNum)
     
    }
    function days() {
        let daysList = []
        let days = [
           "Color Palette","Inktober","Text Analyzer","Pixel Art Maker","Plant Library","Picture Canvas","feelings", "Mental Health Message","Solar System","This Website"]
            for (let i = days.length;i>0;i--)
             daysList.push(<Day i = {i} title = {days[days.length - i]} /> )
        return [days,daysList]
    }
    function handleRecent() {
        let max = (projList.current.children.length)
        setClick(!clicked)
        setRandomNum(max)
    }
    return (
        <div className="home">
            <div className="firstPanel">
                <div>
                    <div>
                 
                        <Fade left cascade>
                        <h1>Hi, I'm Kathleen Wang!</h1>
                        <p>Software Engineer</p>
                        </Fade>
                       <Fade left cascade>
                        <div className ="flex icons up" >
                        <p><a target="_blank" href ="https://github.com/kathleenfwang"><FontAwesomeIcon icon ={faGithub}/></a></p>
                        <p><a target="_blank" href ="https://www.linkedin.com/in/kathleen-wang/"><FontAwesomeIcon icon ={faLinkedin}/></a></p>
                        <p><Link to ="/Contact"><FontAwesomeIcon icon = {faEnvelope}/></Link></p>
                      
                    
                    </div> 
                    </Fade>
                    </div>
                    <div className="desc up">
                        <Fade clear cascade>
                        <p>I enjoy working with multiple problems. I love design and want to study the interesection between art and coding! Also a sucker for pixel art apparently.</p>
                        </Fade>
                    </div>
                    <div>
                    </div>
                    <div className>
                <div>
                    <h1> Projects: <span className ="smallTxt">180 React Projects in 180 Days!</span></h1>
                        <p><i> Inspired by Jennifer Dewalt's <a href="https://jenniferdewalt.com/" target="_blank"> 180 Projects in 180 Days</a></i></p>
                </div>
                <div className="projectList">
                <button className ="blueButton" onClick = {handleRecent}> Most Recent: <span style ={{color:"moccasin"}}>{days()[0][0]}</span></button>
                    <button className ="whiteButton" onClick = {handleClick}> Feeling Lucky </button>
              
                    <ul ref = {projList}>
                        <Fade clear cascade>
                        {days()[1]}
                        </Fade>
                    </ul>
                  
                </div>
                {clicked ? <Redirect to = {`/day/${randomNum}`} /> : null }
            </div>
                </div>
            </div>
        </div>
    )
}