import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
export default function Card(props) {
    return(
        <div className ="inktoberCard">
            <h1>{props.title}<FontAwesomeIcon className = {`${props.notLikes}Show`}onClick = {() => props.handleLike(props.i)}id ="outerHeart" style ={{color: props.active.includes(props.i) ? "palevioletred" : "" , position:"absolute",right:5,top:5}} icon = {faHeart}/></h1>
            <h2>Day: {props.day}</h2>
            <img src ={props.src}/>
        </div>
    )
}