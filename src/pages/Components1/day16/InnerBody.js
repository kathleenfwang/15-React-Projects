import React, {useRef} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
export default class InnerBody extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            props:null,
            description: null 
        } 
  
    }
    componentDidMount() {
        this.getDesc()
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.state.props) {
            this.getDesc()
        }
    }
    getDate = date => {
        // Wed Oct 21 10:37:58 UTC 2020 -> Oct 21 
        return date.slice(4, 10)
    }
   getApplyLink = () => {
       const {data} = this.props
        const applyLink = data.how_to_apply.indexOf("http")
        const endApplyLink = data.how_to_apply.indexOf("\">")
        let finalLink = data.how_to_apply.slice(applyLink, endApplyLink)
        if (finalLink.length <=10) {
            finalLink = data.company_url
        }
        console.log(finalLink)
        return finalLink
    }
   getDesc = () => {
    const {description} = this.props.data
    const div = document.getElementById("desc")
    div.innerHTML = description
    }
    render() {
        const {data} = this.props
        const {theme} = this.props
        const themeColor = theme ? "light" : "dark"
    return (
        <div className={`down innerBody midwidth ${themeColor}Container`}>
            {/* title  */}
            <div style ={{padding: 20}} id ="innerBody" className="flex spaceBetween">
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
                        <button className ="darkButton" style ={{marginTop:20, marginLeft:0}}>Apply Now</button>
                    </a>
                </div>
            </div>
            <div id ="desc" style ={{overflow:"auto",height:'60vh',marginLeft:30,paddingRight:20}}>
            </div>
        </div>
    )
    }
}