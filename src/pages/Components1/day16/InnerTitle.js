import React from "react"

export default function InnerTitle({data}) {
    const sqSize = 100
    const bgImg = {
        width:sqSize,
        height:sqSize,
        backgroundImage: `url(${data.company_logo ? data.company_logo : "https://www.iconpacks.net/icons/2/free-briefcase-icon-1965-thumb.png"})`
    }
    return (
        <div className ="flex spaceBetween midwidth">
        <div className ="flex">
        <div style ={bgImg}></div>
        <div>
            <h1>{data.company}</h1>
            <p>{data.company_url}</p>
        </div>
        </div>
        <div>
            <a href = {data.company_url} target ="_blank">
                <button>Company Site</button>
            </a>
        </div>
    </div>
    )
}