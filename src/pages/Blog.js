import React from "react"
import Card from "./Card"
export default function Blog() {
    const entries = [
        {
            p: "Today is the first day of this coding challenge. I feel pretty good about this project. I am actually excited and can't wait to keep this up. I am surprised I didn't do something like this earlier.. I always thought I would have to do really big projects instead of small things everyday.", 
            date: "9/23/20"
        }, 
        {
            p: "test", 
            date: "234234"
        }, 
        {
            p: "test", 
            date: "234234"
        }, 
        {
            p: "test", 
            date: "234234"
        }, 
        {
            p: "test", 
            date: "234234"
        }
    ]
    function getEntries() {
       return entries.map((entry,i) => {
            return <Card i = {i} p = {entry.p} date = {entry.date} key = {i} />
        })
        
    }
    return (
        <div className ="blog">
            <h1> Blog </h1>
            {getEntries()}
        </div>
    )
}