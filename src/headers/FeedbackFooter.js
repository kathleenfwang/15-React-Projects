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
            <div className = "feedback flex center">
            <form className={`up form`} onSubmit={submit}>
                <h1 className ="bold center">I would love to hear your comments or feedback!</h1>
                <br></br>
                <label htmlFor="name">Name *</label>
                <br></br>
                <input placeHolder ="Enter your name.."id="name" type="name" name="name" />
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