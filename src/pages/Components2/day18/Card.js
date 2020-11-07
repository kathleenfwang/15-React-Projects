import React from "react"
export default function Card({ testimony }) {
    const cardStyle = {
        borderRadius: 5,
        padding: 20,
        margin: 10,
        border: '2px solid white',
        width: '30%',
        height: 500
    }
    return (
        <div style={cardStyle}>
            <div className="textcenter">
                <h1 >{testimony.name}</h1>
                <h2>{testimony.status}</h2>
            </div>
            <h3> {testimony.highlight}</h3>
            <p>{testimony.desc}</p>
        </div>
    )
}