import React from "react"

export default function NavOptions(props) {
    const { tab,titles,functionName } = props
    const navTitles = titles.map((title, i) => {
        if (title === "|") {
            return(
<li i={i} className="navList" style={{ fontSize: '1.3em', padding: 10,  }} >{title}</li> 
            )
        }
        else {
        return (  <li i={i} className="navList" style={{ fontSize: '1.3em', fontWeight: tab == i && "bold", padding: 10, borderBottom: tab == i ? "2px solid #E0C3FC" : "2px solid transparent", boxShadow: tab == i ? ' 2px 4px 25px rgba(0, 0, 0, .1)' : 'none' }} onClick={() => functionName(i)} >{title}</li> )
        }
    })
    return (
        <nav className="center">
            {navTitles}
        </nav>
    )
}