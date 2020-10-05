import React from "react"

export default function Card(props) {
    const {date,p,i} = props 
    console.log(i)
    let color = `rgba(${50}, ${i * 50}, ${i*50}, 0.2)`
    return (
        <div className ="card">
           <h3>{date}</h3>
           <p> {p}</p>
        </div>
    )
}