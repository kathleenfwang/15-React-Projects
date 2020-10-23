import React from "react"
import InnerTitle from "./InnerTitle"
import InnerBody from "./InnerBody"
export default function InnerJobCard(props) {
    const data = props.info 

    return(
        <div className ="centerFlexCol">
            {/*title*/}
           <InnerTitle data = {data}/>
            {/* body */}
            <InnerBody data = {data} />
        </div>
    )
}