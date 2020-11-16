import React, { useState } from "react"
import { useForm } from '@formcarry/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
export default function FeedbackFooter() {
    const [show, setShow] = useState(false)
    function handleShow() {
        setShow(!show)
    }
    const { state, submit } = useForm({
        id: 'ukYM3SFrq'
    });

    // Success message
    if (state.submitted) {
        return(
        <div className ="flex center feedback">
            <form className ="form center">
            <h1 classname ="bold center">Thank you! I will get back to you as soon as I can.</h1></form>
        </div>);
    }
    function form() {
        return (
            <div className = "feedback flex center">
            <form className={`up form`} onSubmit={submit}>
                <h1 className ="bold center">Say hello!</h1>
                <br></br>
                <label htmlFor="email">Email *</label>
                <br></br>
                <input placeHolder ="Enter your email.."id="email" type="email" name="email" />
                <br></br>
                <label htmlFor="message">Message *</label>
                <br></br>
                <textarea placeHolder="Message here.." id="message" name="message" />
                <br></br>
                <button  type="submit">Send</button>
            </form>
            </div>
        )
    }
    return (
        <div className="feedbackFooter">
            {form()}
        </div>
    )
}