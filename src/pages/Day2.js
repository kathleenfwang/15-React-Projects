import React, {useState} from "react"
import Circle from "./Components1/Circle"
export default function Day2() {
   const sidePic = {
       marginTop:50,
       width:80,
       height:100
   }
    const [count,setCount] = useState(0)
    const [name,setName] = useState("") 
    function circles() {
        circles = [] 
        for (let i =0;i<count;i++) {
            circles.push(<Circle i = {i}/>)
        }
        return circles
    }
    function handleClick() {
        setCount(prevCount => prevCount + 1)
    }
    function destroyPlanet() {
        setCount(prevCount => prevCount - 1)
    }
 
    return (
        <div className ="day2">
            <h1 className ="center"> Make your own solar system!</h1>
            <h3 className ="center"> Planets in orbit: {count} </h3>
 
            <button onClick = {handleClick}> Planet </button>
            <button onClick ={destroyPlanet}> Destroy </button>
            {circles()}
        </div>
    )
}