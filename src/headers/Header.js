import React, {useState} from "react"
import {Link, Redirect} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger,faArrowRight, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import FeedbackFooter from "./FeedbackFooter"
export default function Header() {
    const [show,setShow] = useState(true)
    const [random,setRandom] = useState(null) 
    const [clicked,setClick] = useState(false)
    const [page,setPage] = useState(0)
    const [dark,setDark] = useState(true)
    function handleClick(e) {
     let url = window.location.href
     let page = window.location.href.slice(-2) 
     if (page[1] === "/" || url.includes('Blog') || url.includes('Contact')) page = 1
     else if (page[0] === "/") page = page[1]
      page++
        setPage(page)
        setClick(true)
 
    }
    function handleShow() {
      setShow(!show)
    }
    function handleDark() {
        setDark(!dark)
        console.log(dark)
       
    }
    if (dark) {
        document.body.style.backgroundColor = "#333";
        document.body.style.color = "white";
    }
    else {
        document.body.style.backgroundColor = "whitesmoke"
        document.body.style.color = "#333"
    }
    console.log(document.body.style.backgroundColor)
    return (
        <div className ="header">
        <button onClick ={handleShow}><FontAwesomeIcon icon={faHamburger} /></button>
        {show ? 
        <div className = "nav">
        <ul>
            <li> <Link to ="/">Home</Link></li>
            <li><Link to ="/Blog">Blog</Link></li> 
            <li><Link to ="/Contact"> <FontAwesomeIcon icon={faCommentDots} /></Link></li>
            <li onClick ={handleClick}>Next Project <FontAwesomeIcon icon = {faArrowRight}></FontAwesomeIcon> </li>
            <li onClick ={handleDark}> {dark ? "Light Mode" : "Dark Mode" }</li>
            {/* <li><FeedbackFooter/></li> */}
        </ul>
    </div>
    : null }
 {clicked ?  <Redirect to = {`/day/${page}`} /> :null}
    </div>
    )
}