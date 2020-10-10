import React, { useEffect, useState } from "react"
import { TwitterIcon, TwitterShareButton } from "react-share"
import { Form, TextArea, Button } from 'semantic-ui-react'
export default function Day4() {
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [text, setText] = useState("")
    const [textList, setTextList] = useState([])
    useEffect(() => {
        soTired()
        document.addEventListener("mousemove", (e) => {
            setMouseX(e.pageX)
            setMouseY(e.pageY)
        })
    })
    let style = {
        margin: "0 auto",
        marginTop: 10,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        width: "90%"
    }
    function mouseStyle(num) {
        return {
            backgroundColor: `rgba(${mouseX / mouseY} ,${mouseX / mouseY * num},${mouseY})`,
            width: mouseX * num,
            height: mouseY * num,
            bottom: 0,
            zIndex: -1,
            opacity: 0.2,
            position: "fixed",
            left: (mouseX - (300 * num)),
            top: mouseY - (100 * num),
            borderRadius: 100
        }
    }
    function handleChange(e) {
        setText(e.target.value)
    }
    function soTired(e) {
        if (e) {
            if (e.key === "Enter") {
                e.preventDefault() // this prevents skpping new line
                let value = e.target.value
                setText("")
                setTextList((prevText) => (
                    [...prevText, value]
                ))
            }
        }

    }
    function putTextList() {
        return textList.map((text) => {
            return (
                <div><p>{text}</p></div>
            )
        })
    }
    function clear() {
        setText("")
        setTextList([])
    }
    function downloadTxtFile() {
        const element = document.createElement("a");
        let textString = textList.join(" ").split() // join back into an array of one big string with spaces
        const file = new Blob(textString, { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "feelings.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    return (
        <div className="day4">
            <h1>FEELINGS </h1>
            <TextArea id="myInput" autoFocus placeholder="How are you feeling?" value={text} onChange={handleChange} onKeyPress={soTired}></TextArea>
            <br></br>
            <div className="buttons">
                <Button onClick={clear}>Clear </Button>
                <Button className="secondary" onClick={downloadTxtFile}>Save as .txt</Button>
                <TwitterShareButton
                    url={`Feelings: ${textList.length == 0 ? text : textList.join(" ")} ${"\n"} Shared from http://kathleenwang180projects.surge.sh/day/4`}>
                    <TwitterIcon
                        size={32}
                        round />
                </TwitterShareButton>
            </div>
            <div style={mouseStyle(1)}>
            </div>
            <div style={mouseStyle(3)}>
            </div>
            <div style={style}>
                {putTextList()}
            </div>
        </div>
    )
}