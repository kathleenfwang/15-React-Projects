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
        return <div>Thank you! We received your submission.</div>;
    }
    function form() {
        return (
            <form className={`form ${show}Form`} onSubmit={submit}>
                <p>I would love to hear your feedback! Feel free to send comments or any questions.</p>
                <br></br>
                <label htmlFor="name">Name *</label>
                <br></br>
                <input id="name" type="name" name="name" />
                <br></br>
                <label htmlFor="message">Message *</label>
                <br></br>
                <textarea placeHolder="Message here .." id="message" name="message" />
                <br></br>
                <button className ="secondary" type="submit">Send</button>
            </form>
        )
    }
    return (
        <div className="feedbackFooter">
            <p onClick={handleShow}>
                <FontAwesomeIcon style ={{color:"moccasin"}} icon={faCommentDots} /></p>
            {form()}


        </div>
    )
}