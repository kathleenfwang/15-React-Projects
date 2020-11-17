import React, {useState} from "react"
import Smallbutton from "./Smallbutton"
export default function Card({ testimony }) {
    const [color,setColor] = useState("") 
    const [bg,setBgColor] = useState("") 
    const [secondColor, setSecondColor]= useState({})
    const [secondText,setSecondText] = useState({})
    const [secondColorText,setSecondColorText] = useState("")
    const [themeName,setThemeName] = useState("     ")
    const [theme,setTheme] = useState({})
    const colors = [
        {
            theme: "Midnight",
            backgroundColor:"#232946",
            secondText: "#b8c1ec",
            secondColor: "#b8c1ec",
        color:'#eebbc3'},
        {
            theme: "Cherry Blossom",
            backgroundColor:"#faeee7",
            secondText: "#55423d",
           color: '#ff8ba7',
        }, 
        {
            theme: "Mint Chocolate",
            secondText: "#ff8ba7",
            backgroundColor: "#c3f0ca",
            color:'#594a4e'
        }, 
        {
            theme: "Charlie Brown",
            secondText: "#e3f6f5",
            backgroundColor:"#ffd803",
            color:"#272343"
        }, 
        {   theme: "Lavender",
            backgroundColor:"#d9d4e7",
            secondText: "#232946",
            color:"#a786df"
        }, 
        {
            theme: "Seafoam",
            backgroundColor: "#e3f6f5",
            secondColor: "#ffd803",
            color: "#272343"
        }, 
        {
            theme: "Chocolate",
            backgroundColor: "#55423d",
            secondText: "#e78fb3",
            color: "#ffc0ad"
        }, 
        {
            theme: "Festive",
            backgroundColor: "#e16162",
            secondText: "#f9bc60",
            color:"#004643"
        }
    ]
  
    const handleTheme = () => {
        const len = colors.length 
        let randNum = Math.floor(Math.random() * len); 
        // color names 
        const colorName = colors[randNum]
        const validText = colorName.secondText
        const validColor = colorName.secondColor
        const styleColor = {backgroundColor: validColor}
        const styleText = {color: validText}

        setColor(colorName.color)
        setBgColor(colorName.backgroundColor)
        setSecondColor(validColor ? styleColor : {})
        setSecondText(validText ? styleText : {})
        setSecondColorText(validText ? validText : validColor ? validColor: "")
        setThemeName(colorName.theme)
        // style 
        setTheme(colorName)
    }
   
    return (
        <div className ="  cardStyle" style={theme}>
            <div className="textcenter lessLineHeight">
                <h1 >{testimony.name}</h1>
                <h2 style ={secondText}>{testimony.status}</h2>
            </div>
            <h3 style ={secondColor}> {testimony.highlight}</h3>
            <p>{testimony.desc}</p>
            <div className ="flex spaceAround">
        <div className ="flex">
            <button onClick ={handleTheme}>Change Theme</button>
        </div>
        <div className ="box lessLineHeight">
        <p className ="black"><b>Theme:</b> {themeName} </p>
        <p><b>Text:</b> {color}</p>
        <p><b>Background:</b> {bg}</p>
        <p><b>Inner:</b> {secondColorText}</p>
           
        </div>
        </div>
        </div>
    )
}