import React, {useState} from "react"
import {Link, Redirect} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import FeedbackFooter from "./FeedbackFooter"
export default function Header() {
    const [show,setShow] = useState(true)
    const [random,setRandom] = useState(null) 
    const [clicked,setClick] = useState(false)
    const [page,setPage] = useState(0)
    function handleClick(e) {
      console.log(window.location.href)
     let page = window.location.href.slice(-2) 
     console.log(page)
     if (page[1] === "/") page = 1
     else if (page[0] === "/") page = page[1]
      page++
      console.log(page)
        setPage(page)
        setClick(true)
    }
    function handleShow() {
      setShow(!show)
    }
  
    return (
        <div className ="header">
        <button onClick ={handleShow}><FontAwesomeIcon icon={faHamburger} /></button>
        {show ? 
        <div className = "nav">
        <ul>
            <li> <Link to ="/">Home</Link></li>
            <li><Link to ="/Blog">Blog</Link></li> 
            <li onClick ={handleClick}>Next Project <FontAwesomeIcon icon = {faArrowRight}></FontAwesomeIcon> </li>
            {/* <li><FeedbackFooter/></li> */}
        </ul>
    </div>
    : null }
 {clicked ?  <Redirect to = {`/day/${page}`} /> :null}
    </div>
    )
}