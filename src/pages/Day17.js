import React from "react"

export default function Day17() {
    const borders = {
        border:'2px solid black'
    }
    return(
        <div className ="flex center">
           <div style ={borders}>
               <h1>Fylo</h1>
               <div>Buttons</div>
           </div>
           <div style ={borders}>
               <p> You've used storage</p>
               <input type="range" value="100" min="0" max="500"/>
               <div className ="flex">
                   <p>0 GB</p>
                   <p>1000 GB</p>
               </div>
               <p>185 GB Left</p>
           </div>
        </div>
    )
}