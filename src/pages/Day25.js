import React from "react"
import axios from "axios"
export default class Day25 extends React.Component {
    constructor() {
        super()
        this.state = {
            data: {},
            id: "", 
            solutions: [], 
            loaded: false
        } 
        this.solutions = []
    }
    componentDidMount() {
        // get a maze 
        // this.getMaze()
        // solve a maze 
        // return the solution
    }
    getMaze = () => {
        // sample maze id: ebaf
        const getMazeUrl = "https://maze.coda.io/maze/"
        axios.post(getMazeUrl)
        .then((res) => 
        {
            console.log(res)
            this.setState({data: res.data, id: res.data.id}, () => this.getMazeSolution())
        })
        .catch((e) => console.log("Error from getting maze:",e))
    }

    getMazeSolution = () => {
         
        const {data} = this.state 
        const {height,width,id} = data 
        let solutionUrl = ""
        let x = 0,y = 0 
     
   
        // x < width - 1 and y < height - 1
    
       
            // increase x and y  until x = width - 1 and y = height - 1 
            // check to make sure it is valid 
            // if valid, add to solutions array 
            // otherwise go in the other direction 
            solutionUrl = `https://maze.coda.io/maze/${id}/check?x=${x}&y=${y}`
            let solutions = this.startCheckMazeSolution(solutionUrl, [],x,y,{})
            solutions.then(res => console.log('res',res))
         
       
     
    }
    startCheckMazeSolution = async (solutionUrl,solutions,x,y,previous) => {
        const resp = await this.checkMazeSolution(solutionUrl,solutions,x,y,previous)
        console.log('resp',resp)
        return await resp 

    }
     checkMazeSolution =   (solutionUrl,solutions,x,y,previous) => {
         const {id,data} = this.state
         const {width, height} = data
         if (x == width - 1 && y == height -1) {
             console.log(solutions)
             solutions.push({"x": width -1, "y":height -1 })
              this.testSolution(solutions) 
             return solutions
         }
         axios.get(solutionUrl).then((res) => {
            console.log(res)
            solutions.push({"x":x,"y":y})
            previous.x = x
            previous.y = y 
            console.log(y,height - 1)
            if (y < height - 1) {
                console.log('first')
                y+=1
            } 
            else if (x < width -1 ){
                console.log('second')
                x+=1 
            } 
            else if (y > height - 1 || x > width -1 ) {
                console.log("third")
                return solutions
            }
            console.log(x,y)
             solutionUrl = `https://maze.coda.io/maze/${id}/check?x=${x}&y=${y}`
            this.checkMazeSolution(solutionUrl,solutions,x,y,previous)
        }) 
        .catch((e) => {
            
            // reset back to previous 

            // if we previously increased x, we will icnrease y and vice versa 
            console.log(e)
            if (x == 0 && y == 0) return   solutions
            if (x == width - 1 && y == height -1) return   solutions
            if (previous.x > x) {
                // increase y 
                x = previous.x 
                if (y < height - 1) y+=1 
               
            }
            else {
                y = previous.y 
                if (x < height - 1) x+=1 
                
            }
            console.log(x,y)
            solutionUrl = `https://maze.coda.io/maze/${id}/check?x=${x}&y=${y}`
            this.checkMazeSolution(solutionUrl,solutions,x,y,previous)
        })
    }
    testSolution = (solution) => {
        const {id} = this.state.data 
        const solutionUrl = `https://maze.coda.io/maze/${id}/solve`

        axios.post(solutionUrl, solution).then((res) => {
           
            console.log("GOOD", res)})
        .catch((e) => console.log("Error from test solution:",e))
        this.setState({loaded:true})
    }
    outputSolution = () => {
        console.log(this.solutions)
        let result = [] 
     
        for (let i =0;i<this.solutions.length;i++) {
            
            result.push(<div>x: {this.solutions[i].x}</div>)
        }
   
         console.log(result)
         return result
    }
    render() {
        
        const {loaded,id,solutions} = this.state
        console.log(solutions)
        return(
            <div>
            {loaded && 
            <div>
                <h1>ID: {id}</h1>
                {console.log('hiiiiii',this.solutions)}
                <div>solution: {this.solutions} </div>
                </div>}
            </div>
        )
    }
}