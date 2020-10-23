import React, {useRef} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
export default class InnerBody extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {} 
        this.divStyle = {
            display:'flex',
            alignItems: 'baseline',
            height: '60vh',
        }
    }
    componentDidMount() {
        this.getDesc()
    }
    
    getDate = date => {
        // Wed Oct 21 10:37:58 UTC 2020 -> Oct 21 
        return date.slice(4, 10)
    }
   getApplyLink = () => {
       const {data} = this.props
        const applyLink = data.how_to_apply.indexOf("http")
        const endApplyLink = data.how_to_apply.indexOf("\">")
        return data.how_to_apply.slice(applyLink, endApplyLink)
    }
   getDesc = () => {
    const {data} = this.props
    const div = document.getElementById("desc")
    div.innerHTML = data.description
    }
    render() {
        const {data} = this.props
        const {theme} = this.props
        const themeColor = theme ? "light" : "dark"
    return (
        <div style ={this.divStyle} className={`down midwidth ${themeColor}Container`}>
            {/* title  */}
            <div style ={{padding: 20}} className="flex spaceBetween">
                <div >
                    <div style={{width: 150,marginBottom:-20}} className="grey smallTxt flexTitle">
                        <p>{this.getDate(data.created_at)}</p>
                        <FontAwesomeIcon style ={{fontSize: '.5em'}}icon={faCircle} />
                        <p>{data.type}</p>
                    </div>
                    <div>
                        <h1>{data.title}</h1>
                        <p  className ="smallTxt lightPurple">{data.location}</p>
                    </div>
                </div>
                <div>
                    <a href={this.getApplyLink()} target="_blank">
                        <button className ="darkButton" style ={{marginLeft:0,marginTop:20}}>Apply Now</button>
                    </a>
                </div>
            </div>
            <div id ="desc" style ={{overflow:"auto",height:'60vh',marginLeft:30,paddingRight:20}}>
            </div>
        </div>
    )
    }
}