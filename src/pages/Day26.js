import React from "react"

export default class Day26 extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
       this.drawCanvas()
};
 drawCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const drawing = new Image();
    drawing.src = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"; // can also be a remote URL e.g. http://
    const columns = 2 
    const rows = 2  
    drawing.onload = function() {
        canvas.width = drawing.width * columns
        canvas.height = drawing.height * rows
        for (let i =0;i<columns;i++) {
            for (let j =0;j<rows;j++) {
                ctx.drawImage(drawing,i * drawing.width,j * drawing.height);
            }
        }
      // now you can download 
 }

 
    }
    render() {
        return(
            <div>
                <canvas id="canvas"></canvas>

            </div>
        )
    }
}