import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";

function JobCard({ data, theme}) {
    const logoStyle = {
        objectFit: "contain",
        position: 'absolute',
        left: 30,
        top: -25,
        width: 50,
        height: 50
    }
    const cardStyle = {
        backgroundColor: theme ? '#FFFFFF' : '#19202D',
        position: 'relative',
        borderRadius:5,
        padding: 30,
        width:'60%'

    }
    const title = theme ? "darkgrey" : "white"
    const themeClass = theme ? "lightCard" : "darkCard"
    const getDate = date => {
        // Wed Oct 21 10:37:58 UTC 2020 -> Oct 21 
        return date.slice(4, 10)
    }
    const applyLink = data.how_to_apply.indexOf("http")
    const endApplyLink = data.how_to_apply.indexOf("\">")
    const apply = data.how_to_apply.slice(applyLink,endApplyLink)
    const imgLogo = data.company_logo ? data.company_logo : "https://www.iconpacks.net/icons/2/free-briefcase-icon-1965-thumb.png"
    return (
        <div className ={`${themeClass} hover cursor`} style={cardStyle}>
            <div>
            <div className="grey flexTitle down">
                <p>{getDate(data.created_at)}</p>
                <FontAwesomeIcon icon = {faCircle}/>
                <p>{data.type}</p>
            </div>
            <div>
                <h2 className ={`${title} bold`}>{data.title}</h2>
                <p className ="grey">{data.company}</p>
            </div>
            </div>
            <div className ="flex spaceBetween">
                <p className ="lightPurple">{data.location}</p>
                <div>
                {/* <a target ="_blank" href ={data.url}><button>Read More</button></a> */}
                <a target ="_blank" href ={apply}><button className ="darkButton">Apply</button></a>
                </div>
            </div>
            <a target ="_blank"  href ={data.company_url}><img alt = {data.company_url}className="square" style={logoStyle} src={imgLogo} /></a>
        </div>
    )
}
export default connect(
    state => {
        return { theme: state };
      }
  )(JobCard);