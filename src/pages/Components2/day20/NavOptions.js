import React from "react"

export default function NavOptions(props) {
    const { tab,titles,functionName } = props
    const navTitles = titles.map((title, i) => {
        return (<li style={{ borderBottom: i === tab ? "2px solid pink" : "none" }} onClick={() => functionName(i)}>{title}</li>)
    })
    return (
        <nav className="center">
            {navTitles}
        </nav>
    )
}