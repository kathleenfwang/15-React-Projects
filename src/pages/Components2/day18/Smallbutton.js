import React from "react"
export default function Smallbutton(props) {
    const smallButton = {
        backgroundColor: props.color,
        borderRadius:'100%', 
        width:30,
        height:30,
        marginLeft:10
    }
    return (
        <div onClick = {() => props.handleTheme(props.color)}style = {smallButton} className ="cursor smallButton">
        </div>
    )
}