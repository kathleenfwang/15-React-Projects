import React from "react"

export default function Slider(props) {
    return(
        <div className ="flex center">
        <p>{props.title}:</p>
        <input value = {props.value} onChange ={(e) => props.handleChange(e,props.value)}type ="range"></input>
        <p>{props.value}%</p>
        </div>
    )
}