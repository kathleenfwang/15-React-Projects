import React from "react"
import {day2,day3} from "./ProjectTypes"
import Error from "./Error"
 
export default function Projects(props){
    const components = {
        2: day2, 
        3: day3
    }
    let day = (props.match.params.num)
    const ProjectType = components[day] 
    return (
        <div>
          {components[day] ? <ProjectType /> : <Error components = {components}/>} 
        </div>
    )
}