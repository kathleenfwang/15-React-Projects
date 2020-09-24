import React from "react"

export default function Circle({i}) {
    let maxWidth = window.innerWidth
 
    let randomNum = Math.floor(Math.random() * maxWidth)  - 200 
    let randomOpacity = Math.floor(Math.random()*10)
 
 
    function randomColor() {
        return Math.floor(Math.random() * 255)
    }
    const mystyle = {
        position:"absolute",
        left: randomNum ,
        width:randomNum - (100 * i),
        height:randomNum - (100 * i),
        borderRadius:"100%",
        backgroundColor:`rgb(${randomColor()},${randomColor()},${randomColor()},.${randomOpacity})`,
        padding: "10px",
        fontFamily: "Arial", 
 
      };
    return (
        <div style ={mystyle}>
       
        </div>
    )
}