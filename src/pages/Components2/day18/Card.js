import React, {useState} from "react"
export default function Card({ testimony }) {
    let [color,setColor] = useState("") 
    let [bg,setBgColor] = useState("") 
    const getColor = () => {
        switch(color){
            case "black": 
                bg = "#333"
                break
            case "red": 
                bg = "palevioletred"
                break
            case "green":
                bg = "darkgreen"
                break
        }
        return {
            backgroundColor: bg, 
            color: color
        }
    }

   
    const handleTheme = (color) => {
        setColor(color)
    }
    const getButtons = () => {
        let colors = ['black','green','red']
        return colors.map((color) => {
            return <button onClick = {() => handleTheme(color)}>{color}</button>
        })
    }
    return (
        <div className ="cardStyle" style={getColor()}>
            <div className="textcenter">
                <h1 >{testimony.name}</h1>
                <h2>{testimony.status}</h2>
            </div>
            <h3> {testimony.highlight}</h3>
            <p>{testimony.desc}</p>
        <div className ="flex">
            <p>Change theme: </p>
            {getButtons()}
        </div>
        </div>
    )
}