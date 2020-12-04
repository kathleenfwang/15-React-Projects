import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger, faArrowRight, faCommentDots, faSun, faMoon, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { handleThemeToggle } from "../redux"
import { connect } from "react-redux";

function Header({ theme,handleThemeToggle }) {
    const [show, setShow] = useState(true)
    const [random, setRandom] = useState(null)
    const [clicked, setClick] = useState(false)
    const [page, setPage] = useState(0)
    function handleClick(e) {
        let url = window.location.href
        let page = window.location.href.slice(-2)
        if (page[1] === "/" || url.includes('Blog') || url.includes('Contact')) page = 1
        else if (url.includes('start')) {
            page = url.slice(0, -6).slice(-2)
        }
        if (page[0] === "/") page = page[1]
        page++
        setPage(page)
        setClick(true)
    }
    const handleShow = () => {
        setShow(!show)
    }
    if (!theme) {
        document.body.style.backgroundColor = "#333";
        document.body.style.color = "#f2f2f2";

    }
    else {
        document.body.style.backgroundColor = "#f2f2f2"
        document.body.style.color = "#333"
    }
    const handleTest = (e) => {
        handleThemeToggle() 
    }
    return (
        <div className="header">
            <button onClick={handleShow}><FontAwesomeIcon icon={faHamburger} /></button>
            {show ?
                <div className="nav">
                    <ul>
                        <li> <Link to="/">Home</Link></li>
                        <li><Link to="/Blog">Blog</Link></li>
                        <li><Link to="/Contact"> <FontAwesomeIcon icon={faEnvelope} /></Link></li>
                        <li onClick={handleClick}>Next Project <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon> </li>
                        <li onClick={handleTest}> <FontAwesomeIcon icon={theme ? faMoon : faSun} /> Mode</li>
                    </ul>
                </div>
                : null}
            {clicked ? <Redirect to={`/day/${page}`} /> : null}
        </div>
    )
}
export default connect(
    state => {
        return { theme: state.theme};
    },
    { handleThemeToggle}
)(Header);