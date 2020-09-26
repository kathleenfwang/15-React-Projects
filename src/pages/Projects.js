import React from "react"
import { day2, day3, day4, day5,day6 } from "./ProjectTypes"
import Error from "./Error"
import FeedbackFooter from "../headers/FeedbackFooter"
export default function Projects(props) {
    const components = {
        2: day2,
        3: day3,
        4: day4, 
        5: day5,
        6: day6 
    }
    let day = (props.match.params.num)
    const ProjectType = components[day]
    return (
        <div>
            {components[day] ?
                <>
                    <ProjectType />
                </> :
                <Error components={components} />}
        </div>
    )
}