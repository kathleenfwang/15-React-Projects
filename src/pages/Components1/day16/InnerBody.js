import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle} from '@fortawesome/free-solid-svg-icons'
export default function InnerBody({data}) {
    const getDate = date => {
        // Wed Oct 21 10:37:58 UTC 2020 -> Oct 21 
        return date.slice(4, 10)
    }
    return(
        <div className ="midwidth">
            {/* title  */}
            <div className="flex spaceBetween">
            <div>
            <div style ={{width:200}} className="grey flexTitle down">
                    <p>{getDate(data.created_at)}</p>
                    <FontAwesomeIcon icon={faCircle} />
                    <p>{data.type}</p>
            </div>
            <div>
                <h1>{data.title}</h1>
                <p>{data.location}</p>
            </div>
            </div>
            <div>
                <a>
                    <button>Apply Now</button>
                </a>
            </div>
            </div>
        </div>
    )
}