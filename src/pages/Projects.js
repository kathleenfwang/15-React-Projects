import React from "react"
import { dayList } from "./ProjectTypes"
import Error from "./Error"

export default function Projects(props) {
    const components = dayList.reduce((prev,next,i) => {
        prev[i+2] = next
        return prev
    }, {})

    let day = (props.match.params.num)
    const ProjectType = components[day]
    return (
        <div>
            {components[day] ? <ProjectType /> :
                <Error components={components} />}
        </div>
    )
}