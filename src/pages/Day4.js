import React, {useEffect,useState} from "react"

export default function Day4() {
    const [mouseX,setMouseX] = useState(0)
    const [mouseY,setMouseY] = useState(0)
    const [text,setText] = useState("")
    const [textList,setTextList] = useState([])
    useEffect(() => {
        soTired()
        document.addEventListener("mousemove", (e) => {
            setMouseX(e.pageX)
            setMouseY(e.pageY)
        })
 
    })
    let style = {
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr"
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
    function handleChange(e) {
        setText(e.target.value)
    }
    function soTired(e){
 
      if (e) {
          if (e.key === "Enter") {
              e.preventDefault() // this prevents skpping new line
              let value = e.target.value
              setText("")
              setTextList((prevText) => (
                  [...prevText,value]
              ))
          }
      }
     
    }
    function putTextList() {
        return textList.map((text) => {
            return (
                <div>
                    <p>{text}</p>
                </div>
            )
        })
    }
    function clear() {
        setText("")
        setTextList([])
    }
    function downloadTxtFile(){
        const element = document.createElement("a");
        const file = new Blob(textList, {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "feelings.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }
    return(
        <div className ="day4">
             <h1>FEELINGS </h1>
             
             <textarea id ="myInput" autoFocus placeholder ="How are you feeling?" value ={text} onChange = {handleChange} onKeyPress = {soTired}></textarea>
             <br></br>
            <button onClick ={clear}>Clear </button>
            <button onClick ={downloadTxtFile}>Save as .txt</button>
             <div style ={mouseStyle(1)}>
        </div>
        <div style ={mouseStyle(3)}>
        </div>
        <div style = {style}>
            {putTextList()}
        </div>
    
        </div>
    )
}