import React from "react"

export default function InnerTitle({data}) {
    const sqSize = 100
    const bgImg = {
        borderRadius:5,
        marginRight:10,
        backgroundColor:"white",
        width:sqSize,
        height:sqSize,
        objectFit:"contain"
    }
    const img = data.company_logo ? data.company_logo : "https://www.iconpacks.net/icons/2/free-briefcase-icon-1965-thumb.png"
    return (
        <div className ="darkContainer flex spaceBetween midwidth">
        <div className ="flex">
        <div><img src ={img} style ={bgImg}/></div>
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