import Radium from 'radium'
import React, {useState,useEffect} from "react"

export default function Day3() {
    const [mouseX,setMouseX] = useState(null)
    const [mouseY,setMouseY] = useState(null)
    const buttonStyle  = {
        outline: "none", 
        border: "none", 
        display:"block",
        position: "relative",
        backgroundColor: "#fcad26",
        fontSize:16, 
        fontWeight: 300, 
        textTransform: "uppercase",
        letterSpacing:2,
        margin: "0 auto", 
        borderRadius:20,
        boxShadow: `0 6px #efa424`, 
        color:"white",
        // relative means that it is moving 2px RELATIVE TO THE PARENT. if it was fixed it would be 2px relative to the window. 
        ':hover': {
            boxShadow: `0 4px #efa424`,
            top: 2,
        }, 
        ':active': {
            boxShadow: "none",
            top:6
        }, 
     
    }
    const square = {
        width:50,
        height:50,
        backgroundColor:"lightblue",
        transform: `translate(10px, 100px)`
    }
    
    const bigSquare = {
        width: 500, 
        height: 500, 
        border: `2px solid black`
    }
    function handleMove(e) {
        console.log(e.screenX,e.screenY)
        setMouseX(e.screenX)
        setMouseX(e.screenY)
 
 
    }
 
    return (
        <div>
            <h1>CSS Animation Practice</h1>
            <button key ="button" style = {buttonStyle}>
            Style Me</button>
            <div style ={bigSquare} onClick ={handleMove}>
            <div  key ="square" style ={square}>Move me!</div>
            </div>
        </div>
    )
}

Day3 = Radium(Day3)