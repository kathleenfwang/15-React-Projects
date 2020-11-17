import React, {useState} from "react"
import Smallbutton from "./Smallbutton"
export default function Card({ testimony }) {
    let [color,setColor] = useState("") 
    let [bg,setBgColor] = useState("") 
    let [secondColor,setSecondColor] = useState("")
    const getColor = () => {
        switch(color){
            case "black": 
                bg = "#232946"
                color = '#b8c1ec'
                break
            case "red": 
                bg = "#faeee7"
                color = '#ff8ba7'
                break
            case "green":
                bg = "#c3f0ca"
                color = '#594a4e'
                break
            case "yellow":
                bg = "#ffd803"
                color = "#272343"
                break
            case "purple":
                bg = "#d9d4e7"
                color = "#a786df"
                break
        }   
        return {
            backgroundColor: bg, 
            color: color
        }
    }

    const getSecondColor = () => {
        let newcolor = ""
        switch(color) {
            
            case "black": 
                newcolor = "white"
                break
        }
        return {
            color: newcolor
        }
    }
   
    const handleTheme = (color) => {
        console.log('click')
        setColor(color)
    }
    const getButtons = () => {
        let colors = ['black','green','red','yellow','purple']
        return colors.map((color) => {
            return <Smallbutton handleTheme = {handleTheme} color = {color}/>
        })
    }
    return (
        <div className ="cardStyle" style={getColor()}>
            <div className="textcenter lessLineHeight">
                <h1 >{testimony.name}</h1>
                <h2 style ={getSecondColor()}>{testimony.status}</h2>
            </div>
            <h3> {testimony.highlight}</h3>
            <p>{testimony.desc}</p>
            <div className ="flex spaceAround">
        <div className ="flex">
            <p>Change theme: </p>
            {getButtons()}
        </div>
        <div className ="box lessLineHeight">
        <p><b>Background:</b> {bg}</p>
            <p><b>Text:</b> {color}</p>
        </div>
        </div>
        </div>
    )
}