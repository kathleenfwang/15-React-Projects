import { urlencoded } from "body-parser";
import React from "react"

export default class Day5 extends React.Component {
    constructor() {
        super()
        this.state = {
            img: 'https://cdn.shopify.com/s/files/1/1679/2319/products/uyu-milk_deskmat_choccy_720x.png?v=1594674775'
        }
    }

    componentDidMount() {
        var img = new Image();
        img.src = this.state.img
        let canvas = this.refs.canvas
        let canvas2 = this.refs.canvas2 
        let canvas3 = this.refs.canvas3
        let ctx2 = canvas2.getContext('2d') 
        let ctx = canvas.getContext('2d')
        let ctx3 = canvas3.getContext('2d')
        console.log(this.refs)
        img.onload = () => {
            this.drawImageProp(ctx,img,canvas)
            ctx2.drawImage(img,-img.width / 4,-img.height/4,img.width,img.height)
            ctx3.drawImage(img, -img.width / 4,-img.height/4,img.width,img.height)
        };
    }
 
    drawImageProp = (ctx,image,canvas) => {
        var wrh = image.width / image.height;
        var newWidth = canvas.width;
        var newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
			newHeight = canvas.height;
        	newWidth = newHeight * wrh;
      	}
        var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
        var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

      	ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);

    }

    render() {
        const canvasStyle = {
            border: `2px solid grey`,
            width: 500,
            height: 500,
            objectFit: "contain"
     
        }
        const canvas2Style = {
            border: `2px solid grey`,
            width: 500,
            height: 500,
            objectFit:"contain"
        }
        const canvas3Style = {
            border: `2px solid grey`,
            width: 500,
            height: 500,
            objectFit:"cover"
        }
        const divStyle = {
            border: `2px solid black`,
            width: 500,
            height: 500,
            backgroundImage: `url(${this.state.img})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }
        const h1 = {
            display:"flex", 
            alignItems: "center",
            justifyContent: "space-around"
        }
        const day5 = {
            display:"grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: 20
        }
        return (
            <div className ="day5" style ={day5}>
                <h1 style ={h1}> day 5: <span className ="smallTxt">playing with canvas transformations, don't mind me! </span></h1>
                <div>
                <h2>Original Image</h2>
                <img src={this.state.img}></img>
                </div>
                <div>
                    <h3>Canvas with aspect height ratio and object fit: contain</h3>
                <canvas style={canvasStyle} ref="canvas"></canvas>
                </div>
                <div>
                    <h3>Canvas with object fit: contain and x,y fitted to middle of image</h3>
                  <canvas style={canvas2Style} ref="canvas2"></canvas>
                 </div>
                  <div>
                <h3>Canvas with objectFit: cover and centered</h3>
                  <canvas style={canvas3Style} ref="canvas3"></canvas>
                  </div>
                 
                  <div style={divStyle}>
                  <h3>Div with backgroundSize: cover</h3>
                  </div>
                  <div>
                  {/* https://stackoverflow.com/questions/62542725/how-can-i-lock-an-html-canvass-aspect-ratio-to-an-images-aspect-ratio-and-al try this */}
                <h3>Canvas with objectFit: cover and centered</h3>
                  {/* <canvas id ="canvas4" style={
                    //   width = this.state.canvasWidth, 
                    //   height = this.state.canvasHeight
                  } ref="canvas4"></canvas> */}
                  </div>
             
          </div>
        )
    }
}