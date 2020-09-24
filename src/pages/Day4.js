import React, {useEffect,useState} from "react"

export default function Day4() {
    const [mouseX,setMouseX] = useState(0)
    const [mouseY,setMouseY] = useState(0)
    const [text,setText] = useState("")
    useEffect(() => {
        soTired()
        document.addEventListener("mousemove", (e) => {
            setMouseX(e.pageX)
            setMouseY(e.pageY)
        })
 
    })
    let style = {
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr 1fr"
    }

    function mouseStyle(num) {
        return {
            backgroundColor:`rgba(${mouseX/mouseY} ,${mouseX/mouseY * num},${mouseY})`,
            width:mouseX * num,
            height:mouseY * num,
            bottom:0,
            zIndex: -1,
            opacity:0.2, 
            position:"fixed",
            left: (mouseX - (300 * num)) , 
            top:mouseY - (100 * num),
            borderRadius:100
      
        }
    }
    function soTired(e){
        console.log(e)
    }
    return(
        <div className ="day4">
             <h1>FEELINGS </h1>
             <textarea placeholder ="How are you feeling?"onSubmit = {soTired}></textarea>
             <button  type="submit">submit</button>
             <div style ={mouseStyle(1)}>
        </div>
        <div style ={mouseStyle(3)}>
        </div>
        <div style = {style}>
           {text}
        </div>
    
        </div>
    )
}