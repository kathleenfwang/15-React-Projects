import React, {useState} from "react"
import Circle from "./Components1/Circle"
export default function Day2() {
   const sidePic = {
       marginTop:50,
       width:80,
       height:100
   }
    const [count,setCount] = useState(0)
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
    console.log(count)
    return (
       
        <div className ="day2">
            <h1> Fill this page with colored bubbles</h1>
            <button onClick = {handleClick}> Bubble </button>
            <div >
            <img style = {sidePic} src ="https://www.netclipart.com/pp/m/274-2743302_silhouette-blowing-bubbles-clipart.png"></img>
            </div>
            {circles()}
        </div>
    )
}