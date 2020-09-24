import React from "react"
import {Link} from "react-router-dom"
 
export default function Day(props) {
    return (
        <div>
            <li> Day {props.i}: <a href = {`/day/${props.i}`}>{props.title}</a></li>
        </div>
    )
}