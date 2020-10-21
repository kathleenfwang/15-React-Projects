import React from "react"

export default function JobCard({data}) {
    const logoStyle =  {
        position: 'absolute',
        left: 30, 
        top: -25,
        width:50,
        height:50
    }
    const cardStyle = {
        position: 'relative',
        border:'2px solid white', 
        padding:30,
    }
    return(
        <div style ={cardStyle}>
            <h2>{data.title}</h2>
            <p>{data.type}</p>
            <p>{data.company}</p>
            <p>{data.created_at}</p>
            <p>{data.location}</p>
            <p>{data.company_url}</p>
            <img className = "square" style ={logoStyle} src ={data.company_logo}/>
        </div>
    )
}