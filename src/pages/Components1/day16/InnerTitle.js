import React from "react"

export default function InnerTitle({data,theme}) {
    const sqSize = 100
    const bgImg = {
        borderRadius:6,
        marginRight:10,
        backgroundColor:"white",
        width:sqSize,
        height:sqSize,
        objectFit:"contain",
        boxShadow: '2px 4px 25px rgba(0, 0, 0, .2)'
    }
    const themeColor = theme ? "light" : "dark"
    const img = data.company_logo ? data.company_logo : "https://www.iconpacks.net/icons/2/free-briefcase-icon-1965-thumb.png"

    function getUrl(str) {
        if (str.length <= 25) return str 
        return `${str.slice(0,25)}...`
    }
    return (
        <div className ={`${themeColor}Container flex spaceBetween midwidth`}>
        <div className ="flex">
        <div><a href = {data.company_url} target = "_blank"><img src ={img} style ={bgImg}/></a></div>
        <div style ={{lineHeight:0}}>
            <h1>{data.company}</h1>
            <p>{getUrl(data.company_url)}</p>
        </div>
        </div>
        <div>
            <a href = {data.company_url} target ="_blank">
                <button className ="noMargin">Company Site</button>
            </a>
        </div>
    </div>
    )
}