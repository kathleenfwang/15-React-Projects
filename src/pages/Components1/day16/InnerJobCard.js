import React from "react"
import InnerTitle from "./InnerTitle"
import InnerBody from "./InnerBody"
export default function InnerJobCard(props) {
    const data = props.info 

    return(
        <div className ="centerFlexCol">
            {/*title*/}
           <InnerTitle theme ={props.theme} data = {data}/>
            {/* body */}
            <InnerBody theme ={props.theme} data = {data} />
        </div>
    )
}