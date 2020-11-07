import React from "react"
import InnerTitle from "./InnerTitle"
import InnerBody from "./InnerBody"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
export default function InnerJobCard(props) {
    const data = props.info 

    return(
        <div className ="centerFlexCol">
            {/*title*/}
           <InnerTitle theme ={props.theme} data = {data}/>
            {/* body */}
            <InnerBody theme ={props.theme} data = {data} />
            <button className ="down cursor" onClick ={() => props.handleNext(props.ind)} >Next <FontAwesomeIcon  icon ={faArrowRight} /></button>
        </div>
    )
}