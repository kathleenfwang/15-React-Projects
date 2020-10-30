import React from "react"

export default function Slider(props) {
    function toUpperCase(word) {
        return word[0].toUpperCase() + word.slice(1)
    }
    return (
        <div className="flex center">
            <p>{toUpperCase(props.title)}:</p>
            <input value={props.value} onChange={(e) => props.handleChange(e, props.title)} type="range"></input>
            <p>{props.value}%</p>
        </div>
    )
}