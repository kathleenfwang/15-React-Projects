import React from "react"
import {Link} from "react-router-dom"
export default function Error({components}) {
    function listComponents() {
       let list = [] 
       for (let key in components) {
           list.push(<li><Link to ={`/day/${key}`}>Day {key}</Link></li>)
       }
        return list
    }
    return (
        <div>
            <h1> Error! </h1> 
            <h2>This day has not been completed yet! We only have these days: 
            {listComponents()}
            </h2>
        </div>
    )
}