import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";

function JobCard({ data, theme}) {
    console.log(theme)
    const logoStyle = {
        position: 'absolute',
        left: 30,
        top: -25,
        width: 50,
        height: 50
    }
    const cardStyle = {
        backgroundColor: theme ? '#FFFFFF' : '#202530',
        position: 'relative',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column',
        borderRadius:5,
        padding: 30,
        width:'60%',

    }
    const title = theme ? "darkgrey" : "white"
    const getDate = date => {
        // Wed Oct 21 10:37:58 UTC 2020 -> Oct 21 
        return date.slice(4, 10)
    }
    const imgLogo = data.company_logo ? data.company_logo : "https://static.thenounproject.com/png/47074-200.png"
    return (
        <div style={cardStyle}>
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
            <div>
                <p className ="purple">{data.location}</p>
            </div>
            <a target ="_blank" href ={data.company_url}><img className="square" style={logoStyle} src={imgLogo} /></a>
        </div>
    )
}
export default connect(
    state => {
        return { theme: state };
      }
  )(JobCard);