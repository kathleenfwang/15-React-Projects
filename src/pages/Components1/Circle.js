import React from "react"

export default function Circle({i}) {
    let randomNum = Math.floor(Math.random() * i * 100) + 100 
    let randomOpacity = Math.floor(Math.random()*10)
 
 
    function randomColor() {
        return Math.floor(Math.random() * 255)
    }
    const mystyle = {
        position:"absolute",
        top:280,
        left: randomNum ,
        width:randomNum - (100 * i),
        height:randomNum - (100 * i),
        borderRadius:"100%",
        backgroundColor:`rgb(${randomColor()},${randomColor()},${randomColor()},.${randomOpacity})`,
        padding: "10px",
        fontFamily: "Arial"
      };
    return (
        <div style ={mystyle}>
             
        </div>
    )
}