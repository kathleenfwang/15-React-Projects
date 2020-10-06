import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
export default function Footer() {
    return (
        <div className ="footer" style ={{fontStyle:"normal"}}>
           <p>Made with <FontAwesomeIcon style ={{color: "palevioletred"}} icon = {faHeart}/> by Kathleen Wang 2020 </p>
        </div>
    )
}